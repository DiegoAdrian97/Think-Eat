const router = require('express').Router();
const { sequelize, Receta, RecetaIngrediente, RecetaPaso, Ingrediente, Unidad } = require('../models');
const { async_, ErrorHttp } = require('../middlewares/errores');
const { sugerir, limpiarCache } = require('../services/sugerencias');

const DIFICULTADES = ['Fácil', 'Media', 'Difícil'];
const TAMANIOS = ['chico', 'mediano', 'grande'];
const FUEGOS = ['Fuego fuerte', 'Fuego medio-fuerte', 'Fuego medio', 'Fuego medio-bajo', 'Fuego bajo', 'Fuego mínimo', 'Fuerte, después medio', 'Medio, después fuerte', 'Fuera del fuego'];
const TAPAS = ['Tapado', 'Destapado', 'Semitapado'];
const texto = (v, max) => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);

// Sugerencias según lo que hay en la heladera
// body: { items: [{ ingredienteId, cantidad, unidadId, tamanio }], excluir: [recetaId], limite }
router.post('/sugerencias', async_(async (req, res) => {
  const { items, excluir = [], limite = 5 } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    throw new ErrorHttp(400, 'Agregá al menos un ingrediente para buscar ideas.');
  }
  if (items.length > 200) throw new ErrorHttp(400, 'Demasiados ingredientes.');
  const n = Math.min(Math.max(Number(limite) || 5, 1), 10);
  res.json(await sugerir({ items, excluir: Array.isArray(excluir) ? excluir : [], limite: n }));
}));

// Categorías de recetas que ya existen (para el formulario)
router.get('/recetas/categorias', async_(async (req, res) => {
  const filas = await Receta.findAll({ attributes: ['categoria'], group: ['categoria'], order: [['categoria', 'ASC']], raw: true });
  res.json(filas.map((f) => f.categoria));
}));

// Receta completa con ingredientes y pasos
router.get('/recetas/:id', async_(async (req, res) => {
  const receta = await Receta.findByPk(req.params.id, {
    include: [
      {
        model: RecetaIngrediente,
        as: 'ingredientes',
        include: [
          { model: Ingrediente, as: 'ingrediente', attributes: ['id', 'nombre', 'nombrePlural', 'emoji', 'imagenUrl', 'esBasico', 'tieneTamanio', 'pesoUnidadGr', 'equivaleAId'] },
          { model: Unidad, as: 'unidad' },
        ],
      },
      { model: RecetaPaso, as: 'pasos' },
    ],
    order: [
      [{ model: RecetaIngrediente, as: 'ingredientes' }, 'orden', 'ASC'],
      [{ model: RecetaPaso, as: 'pasos' }, 'numero', 'ASC'],
    ],
  });
  if (!receta) throw new ErrorHttp(404, 'No encontramos esa receta.');
  res.json(receta);
}));

/*
 * Alta de una comida nueva desde la app.
 * body: { nombre, descripcion, categoria, tiempoMin, dificultad, porciones, consejo, imagenUrl, emoji,
 *         ingredientes: [{ ingredienteId, cantidad, unidadId, tamanio, nota, esOpcional }],
 *         pasos: [{ titulo, descripcion, minutos, fuego, tapa }] }
 */
router.post('/recetas', async_(async (req, res) => {
  const b = req.body ?? {};
  const errores = {};

  const nombre = texto(b.nombre, 120);
  if (nombre.length < 3) errores.nombre = 'Poné un nombre de al menos 3 letras.';
  const categoria = texto(b.categoria, 50) || 'Otras';
  const tiempoMin = Math.round(Number(b.tiempoMin));
  if (!(tiempoMin >= 1 && tiempoMin <= 1440)) errores.tiempoMin = 'Indicá cuántos minutos lleva (entre 1 y 1440).';
  const porciones = Math.round(Number(b.porciones));
  if (!(porciones >= 1 && porciones <= 50)) errores.porciones = 'Indicá para cuántas porciones es (1 a 50).';
  const dificultad = DIFICULTADES.includes(b.dificultad) ? b.dificultad : 'Fácil';
  const imagenUrl = /^https?:\/\/\S+$/i.test(String(b.imagenUrl ?? '').trim()) ? String(b.imagenUrl).trim().slice(0, 600) : null;

  // Ingredientes
  const ingIn = Array.isArray(b.ingredientes) ? b.ingredientes.slice(0, 60) : [];
  const ingIds = [...new Set(ingIn.map((x) => Number(x.ingredienteId)).filter(Boolean))];
  const uniIds = [...new Set(ingIn.map((x) => Number(x.unidadId)).filter(Boolean))];
  const [ings, unis] = await Promise.all([
    Ingrediente.findAll({ where: { id: ingIds } }),
    Unidad.findAll({ where: { id: uniIds } }),
  ]);
  const ingPorId = new Map(ings.map((i) => [i.id, i]));
  const uniPorId = new Map(unis.map((u) => [u.id, u]));
  const vistos = new Set();
  const filasIng = [];
  ingIn.forEach((x, k) => {
    const ing = ingPorId.get(Number(x.ingredienteId));
    const uni = uniPorId.get(Number(x.unidadId));
    if (!ing || !uni) {
      errores[`ingredientes.${k}`] = 'Elegí el ingrediente y la unidad.';
      return;
    }
    if (vistos.has(ing.id)) {
      errores[`ingredientes.${k}`] = `${ing.nombre} está repetido.`;
      return;
    }
    vistos.add(ing.id);
    const cantidad = uni.tipo === 'libre' ? null : Number(String(x.cantidad ?? '').replace(',', '.'));
    if (uni.tipo !== 'libre' && !(cantidad > 0)) {
      errores[`ingredientes.${k}`] = `Poné la cantidad de ${ing.nombre.toLowerCase()}.`;
      return;
    }
    filasIng.push({
      ingredienteId: ing.id,
      cantidad,
      unidadId: uni.id,
      tamanio: ing.tieneTamanio && uni.tipo === 'conteo' && TAMANIOS.includes(x.tamanio) ? x.tamanio : null,
      nota: texto(x.nota, 150) || null,
      esOpcional: Boolean(x.esOpcional),
      orden: filasIng.length + 1,
      esBasico: ing.esBasico,
    });
  });
  if (!filasIng.some((x) => !x.esOpcional && !x.esBasico)) {
    errores.ingredientes = 'Agregá al menos un ingrediente principal (que no sea sal, pimienta o aceite).';
  }

  // Pasos
  const pasosIn = Array.isArray(b.pasos) ? b.pasos.slice(0, 40) : [];
  const filasPasos = [];
  pasosIn.forEach((p, k) => {
    const titulo = texto(p.titulo, 100);
    const descripcion = String(p.descripcion ?? '').trim().slice(0, 4000);
    if (!descripcion) {
      errores[`pasos.${k}`] = 'Explicá qué hay que hacer en este paso.';
      return;
    }
    const fuego = texto(p.fuego, 30);
    const minutos = Number(p.minutos);
    filasPasos.push({
      numero: filasPasos.length + 1,
      titulo: titulo || `Paso ${filasPasos.length + 1}`,
      descripcion,
      minutos: minutos > 0 && minutos <= 1440 ? Math.round(minutos) : null,
      fuego: FUEGOS.includes(fuego) || /^Horno \d{2,3} °C$/.test(fuego) ? fuego : null,
      tapa: TAPAS.includes(p.tapa) ? p.tapa : null,
    });
  });
  if (filasPasos.length === 0) errores.pasos = 'Agregá al menos un paso de la preparación.';

  if (!errores.nombre) {
    const existe = await Receta.findOne({ where: sequelize.where(sequelize.fn('lower', sequelize.col('Nombre')), nombre.toLowerCase()) });
    if (existe) errores.nombre = `Ya hay una comida llamada "${existe.nombre}".`;
  }

  if (Object.keys(errores).length) {
    throw new ErrorHttp(400, 'Revisá los datos marcados.', { errores });
  }

  const receta = await sequelize.transaction(async (t) => {
    const nueva = await Receta.create({
      nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
      descripcion: texto(b.descripcion, 400) || null,
      categoria,
      tiempoMin,
      dificultad,
      porciones,
      emoji: texto(b.emoji, 16) || '🍽️',
      consejo: texto(b.consejo, 600) || null,
      busquedaImagen: imagenUrl ? null : nombre,
      imagenUrl,
      esPersonalizada: true,
    }, { transaction: t });
    await RecetaIngrediente.bulkCreate(filasIng.map(({ esBasico, ...x }) => ({ ...x, recetaId: nueva.id })), { transaction: t });
    await RecetaPaso.bulkCreate(filasPasos.map((x) => ({ ...x, recetaId: nueva.id })), { transaction: t });
    return nueva;
  });

  limpiarCache();
  res.status(201).json({ id: receta.id, nombre: receta.nombre });
}));

// Solo se pueden borrar las comidas creadas desde la app
router.delete('/recetas/:id', async_(async (req, res) => {
  const receta = await Receta.findByPk(req.params.id);
  if (!receta) throw new ErrorHttp(404, 'No encontramos esa receta.');
  if (!receta.esPersonalizada) throw new ErrorHttp(403, 'Las recetas que vienen con la app no se pueden borrar.');
  await sequelize.transaction(async (t) => {
    await RecetaPaso.destroy({ where: { recetaId: receta.id }, transaction: t });
    await RecetaIngrediente.destroy({ where: { recetaId: receta.id }, transaction: t });
    await receta.destroy({ transaction: t });
  });
  limpiarCache();
  res.status(204).end();
}));

module.exports = router;
