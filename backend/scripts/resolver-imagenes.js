/*
 * Busca de una vez las imágenes de todos los ingredientes y recetas que todavía
 * no tienen ImagenUrl y las guarda en la base. Es opcional: la app también las
 * busca sola la primera vez que se muestran.
 *   npm run imagenes
 */
require('dotenv').config({ quiet: true });
const { Op } = require('sequelize');
const { sequelize, Ingrediente, Receta } = require('../src/models');
const { imagenDe } = require('../src/services/imagenes');

(async () => {
  await sequelize.authenticate();
  for (const [nombre, Modelo] of [['ingredientes', Ingrediente], ['recetas', Receta]]) {
    const pendientes = await Modelo.findAll({
      where: { [Op.or]: [{ imagenUrl: null }, { imagenUrl: '' }] },
      attributes: ['id', 'nombre', 'busquedaImagen', 'imagenUrl'],
    });
    console.log(`\n${pendientes.length} ${nombre} sin imagen`);
    let ok = 0;
    for (const item of pendientes) {
      const url = await imagenDe(item);
      if (url) ok++;
      console.log(`${url ? '✔' : '✘'} ${item.nombre}`);
    }
    console.log(`${ok}/${pendientes.length} ${nombre} con imagen`);
  }
  await sequelize.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
