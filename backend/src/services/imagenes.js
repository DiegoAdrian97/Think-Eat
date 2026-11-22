/*
 * Busca una imagen para un ingrediente o receta en Wikipedia/Wikimedia
 * (imágenes libres) y la guarda en la base para no volver a buscarla.
 * Si en la base ya hay una ImagenUrl cargada a mano, se usa esa.
 */
const UA = 'ThinkEat/1.0 (proyecto educativo; https://github.com/DiegoAdrian97/Think-Eat)';
const TAM = 480;

const sinResultado = new Map(); // término -> vencimiento (evita repetir búsquedas fallidas)
const enCurso = new Map(); // término -> promesa (evita pedir lo mismo dos veces a la vez)

// Limitador simple: como mucho 3 pedidos a Wikipedia en paralelo
let activos = 0;
const cola = [];
async function conLimite(fn) {
  if (activos >= 3) await new Promise((res) => cola.push(res));
  activos++;
  try {
    return await fn();
  } finally {
    activos--;
    cola.shift()?.();
  }
}

async function consultar(lang, params) {
  const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  Object.entries({ action: 'query', format: 'json', formatversion: '2', prop: 'pageimages', piprop: 'thumbnail', pithumbsize: TAM, ...params })
    .forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Api-User-Agent': UA }, signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error(`Wikipedia respondió ${res.status}`);
  const data = await res.json();
  return data?.query?.pages ?? [];
}

const esFoto = (src) => src && !/\.svg/i.test(src) && !/(flag|bandera|escudo|logo|mapa|map_)/i.test(src);

async function buscarEnWikipedia(termino) {
  for (const lang of ['es', 'en']) {
    // 1) Título exacto (sigue redirecciones)
    const exactas = await consultar(lang, { titles: termino, redirects: '1' });
    const exacta = exactas.find((p) => esFoto(p.thumbnail?.source));
    if (exacta) return exacta.thumbnail.source;

    // 2) Búsqueda: el primer resultado con foto
    const resultados = await consultar(lang, { generator: 'search', gsrsearch: termino, gsrlimit: '5', gsrnamespace: '0' });
    const conFoto = resultados
      .filter((p) => esFoto(p.thumbnail?.source))
      .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))[0];
    if (conFoto) return conFoto.thumbnail.source;
  }
  return null;
}

async function resolverTermino(termino) {
  const clave = termino.toLowerCase();
  const vence = sinResultado.get(clave);
  if (vence && vence > Date.now()) return null;
  if (enCurso.has(clave)) return enCurso.get(clave);

  const promesa = conLimite(() => buscarEnWikipedia(termino))
    .then((url) => {
      if (!url) sinResultado.set(clave, Date.now() + 6 * 60 * 60 * 1000);
      return url;
    })
    .catch(() => null)
    .finally(() => enCurso.delete(clave));
  enCurso.set(clave, promesa);
  return promesa;
}

/** Devuelve la URL de imagen de una instancia (Ingrediente o Receta) y la guarda */
async function imagenDe(instancia) {
  if (instancia.imagenUrl) return instancia.imagenUrl;
  const termino = instancia.busquedaImagen || instancia.nombre;
  const url = await resolverTermino(termino);
  if (url) {
    instancia.imagenUrl = url;
    await instancia.save({ fields: ['imagenUrl'] });
  }
  return url;
}

module.exports = { imagenDe, buscarEnWikipedia };
