/*
 * Genera database/02_datos.sql (PostgreSQL / Supabase) a partir de datos.js
 * Uso (desde esta carpeta):  node generar.js
 */
const fs = require('fs');
const path = require('path');
const { categorias, unidades, ingredientes, recetas } = require('./datos');

const TAMANIOS = ['chico', 'mediano', 'grande'];
const DIFICULTADES = ['Fácil', 'Media', 'Difícil'];

// ---------------------------------------------------------------------------
// Validaciones: cortamos antes de generar un script roto
// ---------------------------------------------------------------------------
const errores = [];
const catIdx = new Map(categorias.map((c, i) => [c.key, i + 1]));
const uniIdx = new Map(unidades.map((u, i) => [u.abrev, i + 1]));
const ingIdx = new Map();

ingredientes.forEach((ing, i) => {
  if (ingIdx.has(ing.key)) errores.push(`Ingrediente duplicado: ${ing.key}`);
  ingIdx.set(ing.key, i + 1);
  if (!catIdx.has(ing.cat)) errores.push(`Categoría inexistente en ${ing.key}: ${ing.cat}`);
  if (!uniIdx.has(ing.unidad)) errores.push(`Unidad inexistente en ${ing.key}: ${ing.unidad}`);
});

const nombresReceta = new Set();
recetas.forEach((rec) => {
  if (nombresReceta.has(rec.nombre)) errores.push(`Receta duplicada: ${rec.nombre}`);
  nombresReceta.add(rec.nombre);
  if (!DIFICULTADES.includes(rec.dif)) errores.push(`Dificultad inválida en ${rec.key}`);
  const vistos = new Set();
  rec.ing.forEach(([key, cant, uni, o = {}]) => {
    if (!ingIdx.has(key)) errores.push(`Ingrediente inexistente en receta ${rec.key}: ${key}`);
    if (!uniIdx.has(uni)) errores.push(`Unidad inexistente en receta ${rec.key}: ${uni}`);
    if (vistos.has(key)) errores.push(`Ingrediente repetido en receta ${rec.key}: ${key}`);
    vistos.add(key);
    if (o.t && !TAMANIOS.includes(o.t)) errores.push(`Tamaño inválido en ${rec.key}/${key}`);
    if (uni !== 'cn' && (cant === null || cant === undefined)) errores.push(`Falta cantidad en ${rec.key}/${key}`);
  });
  const principales = rec.ing.filter(([key, , , o = {}]) => !o.o && !ingredientes[ingIdx.get(key) - 1]?.basico);
  if (principales.length === 0) errores.push(`La receta ${rec.key} no tiene ingredientes principales`);
  if (!rec.pasos?.length) errores.push(`La receta ${rec.key} no tiene pasos`);
});

if (errores.length) {
  console.error('No se generó el script. Errores:\n - ' + errores.join('\n - '));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers SQL (PostgreSQL)
// ---------------------------------------------------------------------------
const n = (v) => (v === null || v === undefined ? 'NULL' : String(v));
const ps = (v) => (v === null || v === undefined || v === '' ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const pb = (v) => (v ? 'true' : 'false');

let riId = 0;
const filasRI = [];
recetas.forEach((rec, i) => {
  rec.ing.forEach(([key, cant, uni, o = {}], orden) => {
    filasRI.push([
      ++riId, i + 1, ingIdx.get(key), n(uni === 'cn' ? null : cant), uniIdx.get(uni), ps(o.t), ps(o.n), pb(o.o), orden + 1,
    ]);
  });
});

let pasoId = 0;
const filasPasos = [];
recetas.forEach((rec, i) => {
  rec.pasos.forEach(([titulo, texto, minutos], k) => {
    filasPasos.push([++pasoId, i + 1, k + 1, ps(titulo), ps(texto), n(minutos ?? null)]);
  });
});

// ---------------------------------------------------------------------------
// Armado del script
// ---------------------------------------------------------------------------
function insertPg(tabla, columnas, filas, tamLote = 200) {
  const out = [];
  const cols = columnas.map((c) => `"${c}"`).join(', ');
  for (let i = 0; i < filas.length; i += tamLote) {
    const lote = filas.slice(i, i + tamLote);
    out.push(`INSERT INTO "${tabla}" (${cols}) VALUES`);
    out.push(lote.map((f) => `  (${f.join(', ')})`).join(',\n') + ';');
  }
  return out.join('\n') + '\n';
}

function upsertPg(tabla, columnas, filas) {
  const cols = columnas.map((c) => `"${c}"`).join(', ');
  const set = columnas.filter((c) => c !== 'Id').map((c) => `"${c}" = EXCLUDED."${c}"`).join(', ');
  return `INSERT INTO "${tabla}" (${cols}) VALUES
${filas.map((f) => `  (${f.join(', ')})`).join(',\n')}
ON CONFLICT ("Id") DO UPDATE SET ${set};
`;
}

const setval = (tabla) =>
  `SELECT setval(pg_get_serial_sequence('"${tabla}"', 'Id'), (SELECT COALESCE(MAX("Id"), 1) FROM "${tabla}"));`;

const pg = [];
pg.push(`/* =====================================================================
   Think&Eat - Datos iniciales para Supabase (PostgreSQL)
   Generado automáticamente por database/generador/generar.js
   ${categorias.length} categorías, ${unidades.length} unidades, ${ingredientes.length} ingredientes, ${recetas.length} recetas
   Pegalo en Supabase > SQL Editor y ejecutalo DESPUÉS de 01_tablas.sql
   ===================================================================== */
BEGIN;

-- Borra los datos base para poder volver a correr este script.
-- Los ingredientes que agregues desde la app (EsPersonalizado = true, Id >= 1000) se conservan.
DELETE FROM "RecetaPasos";
DELETE FROM "RecetaIngredientes";
DELETE FROM "Recetas";
DELETE FROM "Ingredientes" WHERE "EsPersonalizado" = false;
`);

pg.push('-- Categorías de ingredientes');
pg.push(upsertPg('CategoriasIngrediente', ['Id', 'Nombre', 'Emoji', 'Orden'],
  categorias.map((c, i) => [i + 1, ps(c.nombre), ps(c.emoji), i + 1])));

pg.push('-- Unidades');
pg.push(upsertPg('Unidades', ['Id', 'Nombre', 'NombrePlural', 'Abreviatura', 'Tipo', 'FactorBase', 'Orden'],
  unidades.map((u, i) => [i + 1, ps(u.nombre), ps(u.plural), ps(u.abrev), ps(u.tipo), n(u.factor), i + 1])));

pg.push('-- Ingredientes');
pg.push(insertPg('Ingredientes',
  ['Id', 'Nombre', 'NombrePlural', 'CategoriaId', 'Emoji', 'UnidadDefaultId', 'PesoUnidadGr', 'TieneTamanio', 'EsBasico', 'Sinonimos', 'BusquedaImagen', 'EsPersonalizado'],
  ingredientes.map((ing, i) => [
    i + 1, ps(ing.nombre), ps(ing.plural), catIdx.get(ing.cat), ps(ing.emoji), uniIdx.get(ing.unidad),
    n(ing.peso), pb(ing.tam), pb(ing.basico), ps(ing.sin), ps(ing.img), 'false',
  ])));

pg.push('-- Recetas');
pg.push(insertPg('Recetas',
  ['Id', 'Nombre', 'Descripcion', 'Categoria', 'TiempoMin', 'Dificultad', 'Porciones', 'Emoji', 'Consejo', 'BusquedaImagen'],
  recetas.map((rec, i) => [
    i + 1, ps(rec.nombre), ps(rec.desc), ps(rec.cat), n(rec.min), ps(rec.dif), n(rec.porc), ps(rec.emoji), ps(rec.tip), ps(rec.img),
  ])));

pg.push('-- Ingredientes de cada receta');
pg.push(insertPg('RecetaIngredientes',
  ['Id', 'RecetaId', 'IngredienteId', 'Cantidad', 'UnidadId', 'Tamanio', 'Nota', 'EsOpcional', 'Orden'],
  filasRI));

pg.push('-- Pasos de cada receta');
pg.push(insertPg('RecetaPasos', ['Id', 'RecetaId', 'Numero', 'Titulo', 'Descripcion', 'Minutos'],
  filasPasos, 100));

pg.push(`-- Los contadores de Id siguen después de los datos cargados
${setval('CategoriasIngrediente')}
${setval('Unidades')}
${setval('Recetas')}
${setval('RecetaIngredientes')}
${setval('RecetaPasos')}

COMMIT;

-- Resumen
SELECT
  (SELECT COUNT(*) FROM "Ingredientes") AS ingredientes,
  (SELECT COUNT(*) FROM "Recetas") AS recetas,
  (SELECT COUNT(*) FROM "RecetaIngredientes") AS ingredientes_por_receta,
  (SELECT COUNT(*) FROM "RecetaPasos") AS pasos;
`);

const destino = path.join(__dirname, '..', '02_datos.sql');
fs.writeFileSync(destino, pg.join('\n'), 'utf8');
console.log(`OK: ${destino}`);
console.log(`${ingredientes.length} ingredientes, ${recetas.length} recetas, ${filasRI.length} ingredientes de recetas, ${filasPasos.length} pasos`);
