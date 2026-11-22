/*
 * Genera database/02_datos.sql (PostgreSQL / Supabase) a partir de:
 *   datos.js                 categorías, unidades, ingredientes y recetas
 *   fuego.js                 fuego y tapa de cada paso de cocción
 *   fotos-ingredientes.json  foto verificada de cada ingrediente
 *
 * El script generado ACTUALIZA la base sin borrar lo que cargó la gente:
 *   - agrega las columnas nuevas si faltan (sirve para bases ya creadas)
 *   - inserta o actualiza ingredientes y recetas base por Id
 *   - conserva los ingredientes y recetas creados desde la app (Id >= 1000)
 *   - conserva las fotos ya encontradas, salvo que acá haya una verificada
 *
 * Uso:  node generar.js   (o "npm run datos" desde la raíz)
 */
const fs = require('fs');
const path = require('path');
const { categorias, unidades, ingredientes, recetas } = require('./datos');
const fuegos = require('./fuego');
const fotos = require('./fotos-ingredientes.json');

const TAMANIOS = ['chico', 'mediano', 'grande'];
const DIFICULTADES = ['Fácil', 'Media', 'Difícil'];

// ---------------------------------------------------------------------------
// Fuego y tapa
// ---------------------------------------------------------------------------
const FUEGO = {
  F: ['Fuego fuerte', 'a fuego fuerte'],
  MF: ['Fuego medio-fuerte', 'a fuego medio-fuerte'],
  M: ['Fuego medio', 'a fuego medio'],
  MB: ['Fuego medio-bajo', 'a fuego medio-bajo'],
  B: ['Fuego bajo', 'a fuego bajo'],
  m: ['Fuego mínimo', 'a fuego mínimo'],
  'F>M': ['Fuerte, después medio', 'a fuego fuerte hasta que hierva y después a fuego medio'],
  'M>F': ['Medio, después fuerte', 'primero a fuego medio y al final a fuego fuerte'],
  X: ['Fuera del fuego', 'fuera del fuego'],
};
const TAPA = {
  T: ['Tapado', 'Con la olla tapada.', 'Tapado con papel aluminio.'],
  D: ['Destapado', 'Sin tapa.', 'Sin tapar.'],
  S: ['Semitapado', 'Con la tapa apenas corrida.', 'Con la tapa apenas corrida.'],
};

function interpretarFuego(codigo) {
  const [f, t] = codigo.split('/');
  let fuego;
  if (/^H\d{3}$/.test(f)) fuego = { etiqueta: `Horno ${f.slice(1)} °C`, horno: Number(f.slice(1)) };
  else if (FUEGO[f]) fuego = { etiqueta: FUEGO[f][0], texto: FUEGO[f][1], codigo: f };
  else return null;
  if (t && !TAPA[t]) return null;
  return { fuego, tapa: t || null };
}

const RE_NIVEL = /fuego (muy )?(fuerte|medio-fuerte|medio-bajo|medio|bajo|mínimo|máximo)/i;
const RE_TAPA = /(tap[áa]|tapad|tapar|tapalo|tapala|destap|sin tap|tapa apenas)/i;

/** Completa el texto del paso cuando no menciona el fuego o la tapa */
function completarTexto(texto, { fuego, tapa }) {
  const agregados = [];
  if (fuego.horno) {
    if (!/°C/.test(texto)) agregados.push(`Horno a ${fuego.horno} °C.`);
  } else if (fuego.codigo === 'X') {
    if (!/fuera del fuego|apag/i.test(texto)) agregados.push('Fuera del fuego.');
  } else if (!RE_NIVEL.test(texto)) {
    agregados.push(`Hacelo ${fuego.texto}${tapa && !RE_TAPA.test(texto) ? (tapa === 'T' ? ', con la olla tapada' : tapa === 'D' ? (fuego.codigo.includes('>') ? ', sin tapa' : ' y sin tapa') : ', con la tapa apenas corrida') : ''}.`);
    return `${texto} ${agregados.join(' ')}`;
  }
  if (tapa && !RE_TAPA.test(texto)) agregados.push(TAPA[tapa][fuego.horno ? 2 : 1]);
  return agregados.length ? `${texto} ${agregados.join(' ')}` : texto;
}

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
  if (!(ing.key in fotos)) errores.push(`Falta la foto (o null) de ${ing.key} en fotos-ingredientes.json`);
});
if (ingredientes.length >= 1000) errores.push('Los ingredientes base no pueden pasar de 999');
if (recetas.length >= 1000) errores.push('Las recetas base no pueden pasar de 999');

const nombresIng = new Set();
ingredientes.forEach((ing) => {
  const n = ing.nombre.toLowerCase();
  if (nombresIng.has(n)) errores.push(`Nombre de ingrediente repetido: ${ing.nombre}`);
  nombresIng.add(n);
});

const nombresReceta = new Set();
const recetasPorKey = new Map();
recetas.forEach((rec) => {
  if (nombresReceta.has(rec.nombre)) errores.push(`Receta duplicada: ${rec.nombre}`);
  nombresReceta.add(rec.nombre);
  if (recetasPorKey.has(rec.key)) errores.push(`Clave de receta duplicada: ${rec.key}`);
  recetasPorKey.set(rec.key, rec);
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

// fuego/tapa por receta y paso
const fuegoPorPaso = new Map();
for (const [key, linea] of Object.entries(fuegos)) {
  const rec = recetasPorKey.get(key);
  if (!rec) {
    errores.push(`fuego.js: no existe la receta ${key}`);
    continue;
  }
  for (const item of linea.trim().split(/\s+/)) {
    const [paso, codigo] = item.split(':');
    const n = Number(paso);
    if (!n || n > rec.pasos.length) errores.push(`fuego.js: ${key} no tiene paso ${paso}`);
    const info = interpretarFuego(codigo || '');
    if (!info) errores.push(`fuego.js: código inválido en ${key}: ${item}`);
    else fuegoPorPaso.set(`${key}#${n}`, info);
  }
}

if (errores.length) {
  console.error('No se generó el script. Errores:\n - ' + errores.join('\n - '));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers SQL
// ---------------------------------------------------------------------------
const n = (v) => (v === null || v === undefined ? 'NULL' : String(v));
const ps = (v) => (v === null || v === undefined || v === '' ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const pb = (v) => (v ? 'true' : 'false');
const filas = (lista) => lista.map((f) => `  (${f.join(', ')})`).join(',\n');

function insertar(tabla, columnas, valores, tamLote = 200) {
  const cols = columnas.map((c) => `"${c}"`).join(', ');
  const out = [];
  for (let i = 0; i < valores.length; i += tamLote) {
    out.push(`INSERT INTO "${tabla}" (${cols}) VALUES\n${filas(valores.slice(i, i + tamLote))};`);
  }
  return out.join('\n') + '\n';
}

function upsert(tabla, columnas, valores, actualizar) {
  const cols = columnas.map((c) => `"${c}"`).join(', ');
  const set = actualizar ?? columnas.filter((c) => c !== 'Id').map((c) => `"${c}" = EXCLUDED."${c}"`).join(',\n    ');
  return `INSERT INTO "${tabla}" (${cols}) VALUES
${filas(valores)}
ON CONFLICT ("Id") DO UPDATE SET
    ${set};
`;
}

// ---------------------------------------------------------------------------
// Armado de filas
// ---------------------------------------------------------------------------
const filasIng = ingredientes.map((ing, i) => {
  const foto = fotos[ing.key];
  return [
    i + 1, ps(ing.nombre), ps(ing.plural), catIdx.get(ing.cat), ps(ing.emoji), uniIdx.get(ing.unidad),
    n(ing.peso), pb(ing.tam), pb(ing.basico), ps(ing.sin),
    // "-" = sin foto a propósito: la app muestra el emoji y no busca en Wikipedia
    ps(foto ? (ing.img || ing.nombre) : '-'), ps(foto), 'false',
  ];
});

const filasRec = recetas.map((rec, i) => [
  i + 1, ps(rec.nombre), ps(rec.desc), ps(rec.cat), n(rec.min), ps(rec.dif), n(rec.porc), ps(rec.emoji), ps(rec.tip), ps(rec.img), 'false',
]);

const filasRI = [];
recetas.forEach((rec, i) => {
  rec.ing.forEach(([key, cant, uni, o = {}], orden) => {
    filasRI.push([i + 1, ingIdx.get(key), n(uni === 'cn' ? null : cant), uniIdx.get(uni), ps(o.t), ps(o.n), pb(o.o), orden + 1]);
  });
});

let conFuego = 0;
let textosCompletados = 0;
const filasPasos = [];
recetas.forEach((rec, i) => {
  rec.pasos.forEach(([titulo, texto, minutos], k) => {
    const info = fuegoPorPaso.get(`${rec.key}#${k + 1}`);
    let desc = texto;
    if (info) {
      conFuego++;
      desc = completarTexto(texto, info);
      if (desc !== texto) textosCompletados++;
    }
    filasPasos.push([
      i + 1, k + 1, ps(titulo), ps(desc), n(minutos ?? null),
      ps(info?.fuego.etiqueta ?? null), ps(info?.tapa ? TAPA[info.tapa][0] : null),
    ]);
  });
});

// ---------------------------------------------------------------------------
// Script
// ---------------------------------------------------------------------------
const pg = [];
pg.push(`/* =====================================================================
   Think&Eat - Datos para Supabase (PostgreSQL)
   Generado automáticamente por database/generador/generar.js
   ${categorias.length} categorías, ${unidades.length} unidades, ${ingredientes.length} ingredientes, ${recetas.length} recetas

   Pegalo en Supabase > SQL Editor > Run.
   - En una base nueva: ejecutá antes 01_tablas.sql.
   - En una base existente: se puede correr encima. Actualiza y agrega datos
     sin borrar los ingredientes ni las comidas que cargaste desde la app,
     y sin perder las fotos ya guardadas.
   ===================================================================== */
BEGIN;

-- 1) Columnas nuevas (no hace nada si ya existen)
ALTER TABLE "Ingredientes" ADD COLUMN IF NOT EXISTS "EquivaleAId" integer REFERENCES "Ingredientes"("Id") ON DELETE SET NULL;
ALTER TABLE "Recetas" ADD COLUMN IF NOT EXISTS "EsPersonalizada" boolean NOT NULL DEFAULT false;
ALTER TABLE "Recetas" ADD COLUMN IF NOT EXISTS "FechaAlta" timestamptz NOT NULL DEFAULT now();
ALTER TABLE "RecetaPasos" ADD COLUMN IF NOT EXISTS "Fuego" varchar(30);
ALTER TABLE "RecetaPasos" ADD COLUMN IF NOT EXISTS "Tapa" varchar(20);

-- 2) Si cargaste desde la app un ingrediente que ahora viene en la lista base,
--    tu versión pasa a apuntar a la base (así no se duplica el nombre)
UPDATE "Ingredientes" SET "Nombre" = "Nombre" || ' (mío)'
WHERE "EsPersonalizado" = true AND lower("Nombre") IN (
${ingredientes.map((x) => `  ${ps(x.nombre.toLowerCase())}`).join(',\n')}
);
`);

pg.push('-- 3) Categorías de ingredientes');
pg.push(upsert('CategoriasIngrediente', ['Id', 'Nombre', 'Emoji', 'Orden'],
  categorias.map((c, i) => [i + 1, ps(c.nombre), ps(c.emoji), i + 1])));

pg.push('-- 4) Unidades');
pg.push(upsert('Unidades', ['Id', 'Nombre', 'NombrePlural', 'Abreviatura', 'Tipo', 'FactorBase', 'Orden'],
  unidades.map((u, i) => [i + 1, ps(u.nombre), ps(u.plural), ps(u.abrev), ps(u.tipo), n(u.factor), i + 1])));

pg.push('-- 5) Ingredientes base (la foto guardada se conserva salvo que acá venga una verificada)');
pg.push(upsert('Ingredientes',
  ['Id', 'Nombre', 'NombrePlural', 'CategoriaId', 'Emoji', 'UnidadDefaultId', 'PesoUnidadGr', 'TieneTamanio', 'EsBasico', 'Sinonimos', 'BusquedaImagen', 'ImagenUrl', 'EsPersonalizado'],
  filasIng,
  `"Nombre" = EXCLUDED."Nombre",
    "NombrePlural" = EXCLUDED."NombrePlural",
    "CategoriaId" = EXCLUDED."CategoriaId",
    "Emoji" = EXCLUDED."Emoji",
    "UnidadDefaultId" = EXCLUDED."UnidadDefaultId",
    "PesoUnidadGr" = EXCLUDED."PesoUnidadGr",
    "TieneTamanio" = EXCLUDED."TieneTamanio",
    "EsBasico" = EXCLUDED."EsBasico",
    "Sinonimos" = EXCLUDED."Sinonimos",
    "BusquedaImagen" = EXCLUDED."BusquedaImagen",
    "ImagenUrl" = CASE
      WHEN EXCLUDED."ImagenUrl" IS NOT NULL THEN EXCLUDED."ImagenUrl"
      WHEN EXCLUDED."BusquedaImagen" = '-' THEN NULL
      ELSE "Ingredientes"."ImagenUrl" END,
    "EsPersonalizado" = false`));

pg.push(`-- Los ingredientes tuyos que quedaron duplicados con la base pasan a contar como el de la base
UPDATE "Ingredientes" p SET "EquivaleAId" = b."Id"
FROM "Ingredientes" b
WHERE p."EsPersonalizado" = true AND b."EsPersonalizado" = false
  AND p."EquivaleAId" IS NULL AND lower(p."Nombre") = lower(b."Nombre") || ' (mío)';
`);

pg.push('-- 6) Recetas base (las recetas creadas desde la app no se tocan)');
pg.push(`DELETE FROM "RecetaPasos" WHERE "RecetaId" IN (SELECT "Id" FROM "Recetas" WHERE "EsPersonalizada" = false);
DELETE FROM "RecetaIngredientes" WHERE "RecetaId" IN (SELECT "Id" FROM "Recetas" WHERE "EsPersonalizada" = false);
`);
pg.push(upsert('Recetas',
  ['Id', 'Nombre', 'Descripcion', 'Categoria', 'TiempoMin', 'Dificultad', 'Porciones', 'Emoji', 'Consejo', 'BusquedaImagen', 'EsPersonalizada'],
  filasRec,
  `"Nombre" = EXCLUDED."Nombre",
    "Descripcion" = EXCLUDED."Descripcion",
    "Categoria" = EXCLUDED."Categoria",
    "TiempoMin" = EXCLUDED."TiempoMin",
    "Dificultad" = EXCLUDED."Dificultad",
    "Porciones" = EXCLUDED."Porciones",
    "Emoji" = EXCLUDED."Emoji",
    "Consejo" = EXCLUDED."Consejo",
    "ImagenUrl" = CASE WHEN "Recetas"."BusquedaImagen" IS DISTINCT FROM EXCLUDED."BusquedaImagen" THEN NULL ELSE "Recetas"."ImagenUrl" END,
    "BusquedaImagen" = EXCLUDED."BusquedaImagen",
    "EsPersonalizada" = false`));

pg.push('-- 7) Ingredientes de cada receta');
pg.push(insertar('RecetaIngredientes', ['RecetaId', 'IngredienteId', 'Cantidad', 'UnidadId', 'Tamanio', 'Nota', 'EsOpcional', 'Orden'], filasRI));

pg.push('-- 8) Pasos de cada receta, con fuego y tapa');
pg.push(insertar('RecetaPasos', ['RecetaId', 'Numero', 'Titulo', 'Descripcion', 'Minutos', 'Fuego', 'Tapa'], filasPasos, 100));

pg.push(`-- 9) Contadores de Id: lo que se cree desde la app arranca en 1000
SELECT setval(pg_get_serial_sequence('"CategoriasIngrediente"', 'Id'), (SELECT GREATEST(MAX("Id"), 1) FROM "CategoriasIngrediente"));
SELECT setval(pg_get_serial_sequence('"Unidades"', 'Id'), (SELECT GREATEST(MAX("Id"), 1) FROM "Unidades"));
SELECT setval(pg_get_serial_sequence('"Ingredientes"', 'Id'), (SELECT GREATEST(MAX("Id"), 999) FROM "Ingredientes"));
SELECT setval(pg_get_serial_sequence('"Recetas"', 'Id'), (SELECT GREATEST(MAX("Id"), 999) FROM "Recetas"));
SELECT setval(pg_get_serial_sequence('"RecetaIngredientes"', 'Id'), (SELECT GREATEST(MAX("Id"), 1) FROM "RecetaIngredientes"));
SELECT setval(pg_get_serial_sequence('"RecetaPasos"', 'Id'), (SELECT GREATEST(MAX("Id"), 1) FROM "RecetaPasos"));

COMMIT;

-- Resumen
SELECT
  (SELECT COUNT(*) FROM "Ingredientes") AS ingredientes,
  (SELECT COUNT(*) FROM "Ingredientes" WHERE "ImagenUrl" IS NOT NULL) AS ingredientes_con_foto,
  (SELECT COUNT(*) FROM "Recetas") AS recetas,
  (SELECT COUNT(*) FROM "RecetaPasos") AS pasos,
  (SELECT COUNT(*) FROM "RecetaPasos" WHERE "Fuego" IS NOT NULL) AS pasos_con_fuego;
`);

const destino = path.join(__dirname, '..', '02_datos.sql');
fs.writeFileSync(destino, pg.join('\n'), 'utf8');
console.log(`OK: ${destino}`);
console.log(`${ingredientes.length} ingredientes (${Object.values(fotos).filter(Boolean).length} con foto verificada), ${recetas.length} recetas, ${filasRI.length} ingredientes de recetas, ${filasPasos.length} pasos (${conFuego} con fuego/tapa, ${textosCompletados} textos completados)`);
