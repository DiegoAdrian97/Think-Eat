const router = require('express').Router();
const { Ingrediente, Receta } = require('../models');
const { async_, ErrorHttp } = require('../middlewares/errores');
const { imagenDe } = require('../services/imagenes');

const MODELOS = { ingrediente: Ingrediente, receta: Receta };

// GET /api/imagenes/ingrediente/12  ->  { url: "https://upload.wikimedia.org/..." | null }
router.get('/:tipo/:id', async_(async (req, res) => {
  const Modelo = MODELOS[req.params.tipo];
  if (!Modelo) throw new ErrorHttp(400, 'Tipo de imagen inválido.');
  const instancia = await Modelo.findByPk(req.params.id, { attributes: ['id', 'nombre', 'busquedaImagen', 'imagenUrl'] });
  if (!instancia) throw new ErrorHttp(404, 'No existe.');
  const url = await imagenDe(instancia);
  res.set('Cache-Control', url ? 'public, max-age=86400' : 'no-store');
  res.json({ url });
}));

module.exports = router;
