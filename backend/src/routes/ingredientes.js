const router = require('express').Router();
const { Ingrediente, Categoria, Unidad } = require('../models');
const { async_, ErrorHttp } = require('../middlewares/errores');
const { normalizar, formasDeIngrediente } = require('../services/texto');
const { limpiarCache } = require('../services/sugerencias');

const include = [
  { model: Categoria, as: 'categoria' },
  { model: Unidad, as: 'unidadDefault' },
];

const ATRIBUTOS = ['id', 'nombre', 'nombrePlural', 'categoriaId', 'emoji', 'unidadDefaultId', 'pesoUnidadGr',
  'tieneTamanio', 'esBasico', 'sinonimos', 'imagenUrl', 'esPersonalizado', 'equivaleAId'];

// Lista completa, agrupable por categoría en el frontend
router.get('/', async_(async (req, res) => {
  const ingredientes = await Ingrediente.findAll({
    attributes: ATRIBUTOS,
    include,
    order: [[{ model: Categoria, as: 'categoria' }, 'orden', 'ASC'], ['nombre', 'ASC']],
  });
  res.json(ingredientes);
}));

// Alta de un ingrediente que no viene por defecto
router.post('/', async_(async (req, res) => {
  const { nombre, categoriaId, unidadDefaultId, emoji, tieneTamanio, pesoUnidadGr, equivaleAId } = req.body ?? {};
  const limpio = String(nombre ?? '').trim().replace(/\s+/g, ' ');

  if (limpio.length < 2 || limpio.length > 100) {
    throw new ErrorHttp(400, 'El nombre tiene que tener entre 2 y 100 caracteres.');
  }
  const [categoria, unidad] = await Promise.all([
    Categoria.findByPk(categoriaId),
    Unidad.findByPk(unidadDefaultId),
  ]);
  if (!categoria) throw new ErrorHttp(400, 'Elegí una categoría válida.');
  if (!unidad || unidad.tipo === 'libre') throw new ErrorHttp(400, 'Elegí una unidad válida.');

  // ¿Ya existe con ese nombre, su plural o un sinónimo?
  const buscado = normalizar(limpio);
  const todos = await Ingrediente.findAll({ attributes: ATRIBUTOS, include });
  const existente = todos.find((ing) => formasDeIngrediente(ing).has(buscado));
  if (existente) {
    throw new ErrorHttp(409, `"${existente.nombre}" ya está en la lista.`, { ingrediente: existente });
  }

  // Equivalencia: "Papa negra" cuenta como "Papa" en las sugerencias
  let equivalente = null;
  if (equivaleAId) {
    equivalente = await Ingrediente.findByPk(equivaleAId);
    if (!equivalente) throw new ErrorHttp(400, 'El ingrediente equivalente no existe.');
    if (equivalente.equivaleAId) equivalente = await Ingrediente.findByPk(equivalente.equivaleAId);
  }

  const peso = Number(pesoUnidadGr);
  const nuevo = await Ingrediente.create({
    nombre: limpio.charAt(0).toUpperCase() + limpio.slice(1),
    nombrePlural: null,
    categoriaId: categoria.id,
    unidadDefaultId: unidad.id,
    emoji: emoji ? String(emoji).slice(0, 16) : (equivalente?.emoji ?? categoria.emoji),
    pesoUnidadGr: Number.isFinite(peso) && peso > 0 ? peso : null,
    tieneTamanio: Boolean(tieneTamanio),
    esBasico: false,
    busquedaImagen: limpio,
    // si equivale a uno base, usamos su foto hasta que haya una propia
    imagenUrl: equivalente?.imagenUrl ?? null,
    esPersonalizado: true,
    equivaleAId: equivalente?.id ?? null,
  });
  limpiarCache();

  const completo = await Ingrediente.findByPk(nuevo.id, { attributes: ATRIBUTOS, include });
  res.status(201).json(completo);
}));

// Cambiar a qué ingrediente equivale uno cargado por la gente
router.patch('/:id', async_(async (req, res) => {
  const ing = await Ingrediente.findByPk(req.params.id);
  if (!ing) throw new ErrorHttp(404, 'No existe ese ingrediente.');
  if (!ing.esPersonalizado) throw new ErrorHttp(400, 'Solo se pueden modificar los ingredientes agregados desde la app.');
  const { equivaleAId } = req.body ?? {};
  let equivalente = null;
  if (equivaleAId) {
    equivalente = await Ingrediente.findByPk(equivaleAId);
    if (!equivalente || equivalente.id === ing.id) throw new ErrorHttp(400, 'Elegí un ingrediente válido.');
    if (equivalente.equivaleAId) equivalente = await Ingrediente.findByPk(equivalente.equivaleAId);
  }
  ing.equivaleAId = equivalente?.id ?? null;
  await ing.save({ fields: ['equivaleAId'] });
  limpiarCache();
  res.json(await Ingrediente.findByPk(ing.id, { attributes: ATRIBUTOS, include }));
}));

module.exports = router;
