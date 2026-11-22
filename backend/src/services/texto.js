/** Normaliza texto para comparar: minúsculas, sin acentos ni espacios extra */
function normalizar(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Singular aproximado en castellano: "papas" -> "papa", "morrones" -> "morron" */
function singular(palabra) {
  const p = normalizar(palabra);
  if (p.length > 4 && /(ones|ores|anes|enes|ines)$/.test(p)) return p.slice(0, -2);
  if (p.length > 3 && p.endsWith('es') && !/[aeiou]es$/.test(p)) return p.slice(0, -2);
  if (p.length > 3 && p.endsWith('s')) return p.slice(0, -1);
  return p;
}

/** Todas las formas en que se puede nombrar un ingrediente */
function formasDeIngrediente(ing) {
  const formas = new Set();
  [ing.nombre, ing.nombrePlural, ...(ing.sinonimos ? ing.sinonimos.split(',') : [])]
    .filter(Boolean)
    .forEach((f) => {
      const n = normalizar(f);
      formas.add(n);
      formas.add(n.split(' ').map(singular).join(' '));
    });
  return formas;
}

module.exports = { normalizar, singular, formasDeIngrediente };
