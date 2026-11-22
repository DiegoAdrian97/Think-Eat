const { Receta, RecetaIngrediente, Ingrediente, Unidad, Categoria } = require('../models');
const { aComparable } = require('./conversion');
const { normalizar } = require('./texto');

// Condimentos y cantidades mínimas pesan menos: que te falte el comino no
// debería hundir una receta para la que tenés todo lo demás.
const PESO_MENOR = 0.3;
const UNIDADES_MENORES = new Set(['pizca', 'cdta']);
const esMenor = (ri) =>
  normalizar(ri.ingrediente?.categoria?.nombre).startsWith('condimentos')
  || UNIDADES_MENORES.has(ri.unidad?.abreviatura);

// Las recetas casi no cambian: las cacheamos un minuto para no ir a la base en cada pedido
let cache = { recetas: null, vence: 0 };

async function obtenerRecetas() {
  if (cache.recetas && Date.now() < cache.vence) return cache.recetas;
  const recetas = await Receta.findAll({
    include: [{
      model: RecetaIngrediente,
      as: 'ingredientes',
      include: [
        { model: Ingrediente, as: 'ingrediente', include: [{ model: Categoria, as: 'categoria' }] },
        { model: Unidad, as: 'unidad' },
      ],
    }],
  });
  cache = { recetas, vence: Date.now() + 60 * 1000 };
  return recetas;
}

function limpiarCache() {
  cache = { recetas: null, vence: 0 };
}

/** Id con el que se compara: si el ingrediente equivale a otro (Papa negra -> Papa), se usa ese */
const canonico = (ing) => (ing ? ing.equivaleAId || ing.id : null);

/**
 * Arma el inventario del usuario: idCanónico -> { valor, medida }
 * Si el mismo ingrediente (o uno equivalente) aparece dos veces, se suman las cantidades.
 */
async function armarInventario(items) {
  const ids = [...new Set(items.map((x) => Number(x.ingredienteId)).filter(Boolean))];
  const unidadIds = [...new Set(items.map((x) => Number(x.unidadId)).filter(Boolean))];
  const [ingredientes, unidades] = await Promise.all([
    Ingrediente.findAll({ where: { id: ids }, include: [{ model: Ingrediente, as: 'equivaleA' }] }),
    unidadIds.length ? Unidad.findAll({ where: { id: unidadIds } }) : [],
  ]);
  const ingPorId = new Map(ingredientes.map((i) => [i.id, i]));
  const uniPorId = new Map(unidades.map((u) => [u.id, u]));

  const inventario = new Map();
  for (const item of items) {
    const ingrediente = ingPorId.get(Number(item.ingredienteId));
    if (!ingrediente) continue;
    // Para convertir unidades usamos los datos del ingrediente; si es uno propio sin peso, los del equivalente
    const base = ingrediente.equivaleA;
    const datosMedida = base && !ingrediente.pesoUnidadGr
      ? { pesoUnidadGr: base.pesoUnidadGr, tieneTamanio: base.tieneTamanio }
      : ingrediente;
    const medida = aComparable({
      cantidad: item.cantidad,
      unidad: uniPorId.get(Number(item.unidadId)),
      ingrediente: datosMedida,
      tamanio: item.tamanio,
    });
    const id = canonico(ingrediente);
    const previo = inventario.get(id);
    if (!previo) {
      inventario.set(id, medida ? { ...medida } : { valor: null, medida: null });
    } else if (medida && previo.medida === medida.medida) {
      previo.valor += medida.valor;
    }
  }
  return inventario;
}

/** Evalúa qué tan bien encaja una receta con lo que hay en la heladera */
function evaluar(receta, inventario) {
  const principales = [];
  const opcionales = [];
  for (const ri of receta.ingredientes) {
    if (ri.ingrediente?.esBasico) continue; // sal, pimienta, aceite: se asume que hay
    (ri.esOpcional ? opcionales : principales).push(ri);
  }

  const tenes = [];
  const faltan = [];
  const faltanMenores = [];
  const proporciones = [];
  let pesoTotal = 0;
  let pesoTenes = 0;
  let principalesQueTenes = 0;

  for (const ri of principales) {
    const menor = esMenor(ri);
    const peso = menor ? PESO_MENOR : 1;
    pesoTotal += peso;
    const stock = inventario.get(canonico(ri.ingrediente));
    if (!stock) {
      (menor ? faltanMenores : faltan).push(ri.ingrediente.nombre);
      continue;
    }
    pesoTenes += peso;
    tenes.push(ri.ingrediente.nombre);
    if (menor) continue;
    principalesQueTenes++;
    const necesario = aComparable({ cantidad: ri.cantidad, unidad: ri.unidad, ingrediente: ri.ingrediente, tamanio: ri.tamanio });
    if (necesario && stock.valor !== null && stock.medida === necesario.medida && necesario.valor > 0) {
      proporciones.push(stock.valor / necesario.valor);
    } else {
      proporciones.push(1); // no se puede comparar: asumimos que alcanza
    }
  }

  // Tiene que coincidir al menos un ingrediente "de verdad" (no solo especias)
  if (principalesQueTenes === 0) return null;

  const opcionalesQueTenes = opcionales.filter((ri) => inventario.has(canonico(ri.ingrediente))).map((ri) => ri.ingrediente.nombre);
  const cobertura = pesoTenes / pesoTotal;
  const suficiencia = proporciones.reduce((a, p) => a + Math.min(p, 1), 0) / proporciones.length;
  const alcance = Math.min(...proporciones);

  // 0 a 100: sobre todo cuántos ingredientes tenés, y un poco si alcanzan las cantidades
  const compatibilidad = Math.round(cobertura * 85 + suficiencia * 15);
  const puntaje = compatibilidad * 10 + Math.min(opcionalesQueTenes.length, 3) * 3 - faltan.length;

  return {
    puntaje,
    compatibilidad,
    tenes,
    faltan,
    faltanMenores,
    opcionalesQueTenes,
    // Para cuántas porciones alcanza lo que tenés (solo si no alcanza para la receta completa)
    porcionesPosibles: alcance < 1 ? Math.max(1, Math.floor(alcance * receta.porciones)) : null,
  };
}

function resumen(receta, ev) {
  return {
    id: receta.id,
    nombre: receta.nombre,
    descripcion: receta.descripcion,
    categoria: receta.categoria,
    tiempoMin: receta.tiempoMin,
    dificultad: receta.dificultad,
    porciones: receta.porciones,
    emoji: receta.emoji,
    imagenUrl: receta.imagenUrl,
    esPersonalizada: receta.esPersonalizada,
    compatibilidad: ev.compatibilidad,
    tenes: ev.tenes,
    faltan: ev.faltan,
    faltanMenores: ev.faltanMenores,
    opcionalesQueTenes: ev.opcionalesQueTenes,
    porcionesPosibles: ev.porcionesPosibles,
  };
}

/**
 * Devuelve hasta `limite` recetas ordenadas por cuánto aprovechan la heladera,
 * salteando las que ya se mostraron (para "Mostrar más alternativas").
 */
async function sugerir({ items = [], excluir = [], limite = 5 }) {
  const inventario = await armarInventario(items);
  if (inventario.size === 0) return { sugerencias: [], total: 0, restantes: 0 };

  const recetas = await obtenerRecetas();
  const evaluadas = [];
  for (const receta of recetas) {
    const ev = evaluar(receta, inventario);
    if (ev) evaluadas.push({ receta, ev });
  }

  evaluadas.sort((a, b) =>
    b.ev.puntaje - a.ev.puntaje
    || a.ev.faltan.length - b.ev.faltan.length
    || a.receta.tiempoMin - b.receta.tiempoMin
    || a.receta.nombre.localeCompare(b.receta.nombre));

  const yaVistas = new Set(excluir.map(Number));
  const disponibles = evaluadas.filter(({ receta }) => !yaVistas.has(receta.id));
  const elegidas = disponibles.slice(0, limite);

  return {
    sugerencias: elegidas.map(({ receta, ev }) => resumen(receta, ev)),
    total: evaluadas.length,
    restantes: disponibles.length - elegidas.length,
  };
}

module.exports = { sugerir, limpiarCache, obtenerRecetas };
