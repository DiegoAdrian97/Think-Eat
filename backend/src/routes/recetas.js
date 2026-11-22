const router = require('express').Router();
const { Receta, RecetaIngrediente, RecetaPaso, Ingrediente, Unidad } = require('../models');
const { async_, ErrorHttp } = require('../middlewares/errores');
const { sugerir } = require('../services/sugerencias');

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

// Receta completa con ingredientes y pasos
router.get('/recetas/:id', async_(async (req, res) => {
  const receta = await Receta.findByPk(req.params.id, {
    include: [
      {
        model: RecetaIngrediente,
        as: 'ingredientes',
        include: [
          { model: Ingrediente, as: 'ingrediente', attributes: ['id', 'nombre', 'nombrePlural', 'emoji', 'imagenUrl', 'esBasico', 'tieneTamanio', 'pesoUnidadGr'] },
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

module.exports = router;
