const router = require('express').Router();
const { Categoria, Unidad } = require('../models');
const { async_ } = require('../middlewares/errores');

router.get('/categorias', async_(async (req, res) => {
  res.json(await Categoria.findAll({ order: [['orden', 'ASC']] }));
}));

router.get('/unidades', async_(async (req, res) => {
  res.json(await Unidad.findAll({ order: [['orden', 'ASC']] }));
}));

module.exports = router;
