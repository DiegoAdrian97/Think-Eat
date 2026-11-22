const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// PostgreSQL devuelve los DECIMAL como texto: los pasamos a número
const decimal = (campo, atributo) => ({
  type: DataTypes.DECIMAL(10, 2),
  field: campo,
  allowNull: true,
  get() {
    const v = this.getDataValue(atributo);
    return v === null || v === undefined ? null : Number(v);
  },
});

const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  nombre: { type: DataTypes.STRING(80), allowNull: false, field: 'Nombre' },
  emoji: { type: DataTypes.STRING(16), field: 'Emoji' },
  orden: { type: DataTypes.INTEGER, field: 'Orden', defaultValue: 0 },
}, { tableName: 'CategoriasIngrediente' });

const Unidad = sequelize.define('Unidad', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  nombre: { type: DataTypes.STRING(40), allowNull: false, field: 'Nombre' },
  nombrePlural: { type: DataTypes.STRING(40), allowNull: false, field: 'NombrePlural' },
  abreviatura: { type: DataTypes.STRING(20), allowNull: false, field: 'Abreviatura' },
  tipo: { type: DataTypes.STRING(10), allowNull: false, field: 'Tipo' },
  factorBase: {
    type: DataTypes.DECIMAL(12, 4),
    field: 'FactorBase',
    get() { return Number(this.getDataValue('factorBase')); },
  },
  orden: { type: DataTypes.INTEGER, field: 'Orden', defaultValue: 0 },
}, { tableName: 'Unidades' });

const Ingrediente = sequelize.define('Ingrediente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  nombre: { type: DataTypes.STRING(100), allowNull: false, field: 'Nombre' },
  nombrePlural: { type: DataTypes.STRING(100), field: 'NombrePlural' },
  categoriaId: { type: DataTypes.INTEGER, allowNull: false, field: 'CategoriaId' },
  emoji: { type: DataTypes.STRING(16), field: 'Emoji' },
  unidadDefaultId: { type: DataTypes.INTEGER, allowNull: false, field: 'UnidadDefaultId' },
  pesoUnidadGr: decimal('PesoUnidadGr', 'pesoUnidadGr'),
  tieneTamanio: { type: DataTypes.BOOLEAN, field: 'TieneTamanio', defaultValue: false },
  esBasico: { type: DataTypes.BOOLEAN, field: 'EsBasico', defaultValue: false },
  sinonimos: { type: DataTypes.STRING(500), field: 'Sinonimos' },
  busquedaImagen: { type: DataTypes.STRING(150), field: 'BusquedaImagen' },
  imagenUrl: { type: DataTypes.STRING(600), field: 'ImagenUrl' },
  esPersonalizado: { type: DataTypes.BOOLEAN, field: 'EsPersonalizado', defaultValue: false },
  // Ingrediente base al que equivale (ej: "Papa negra" -> "Papa")
  equivaleAId: { type: DataTypes.INTEGER, field: 'EquivaleAId', allowNull: true },
  fechaAlta: { type: DataTypes.DATE, field: 'FechaAlta', defaultValue: DataTypes.NOW },
}, { tableName: 'Ingredientes' });

const Receta = sequelize.define('Receta', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  nombre: { type: DataTypes.STRING(120), allowNull: false, field: 'Nombre' },
  descripcion: { type: DataTypes.STRING(400), field: 'Descripcion' },
  categoria: { type: DataTypes.STRING(50), allowNull: false, field: 'Categoria' },
  tiempoMin: { type: DataTypes.INTEGER, allowNull: false, field: 'TiempoMin' },
  dificultad: { type: DataTypes.STRING(20), allowNull: false, field: 'Dificultad' },
  porciones: { type: DataTypes.INTEGER, allowNull: false, field: 'Porciones' },
  emoji: { type: DataTypes.STRING(16), field: 'Emoji' },
  consejo: { type: DataTypes.STRING(600), field: 'Consejo' },
  busquedaImagen: { type: DataTypes.STRING(150), field: 'BusquedaImagen' },
  imagenUrl: { type: DataTypes.STRING(600), field: 'ImagenUrl' },
  esPersonalizada: { type: DataTypes.BOOLEAN, field: 'EsPersonalizada', defaultValue: false },
  fechaAlta: { type: DataTypes.DATE, field: 'FechaAlta', defaultValue: DataTypes.NOW },
}, { tableName: 'Recetas' });

const RecetaIngrediente = sequelize.define('RecetaIngrediente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  recetaId: { type: DataTypes.INTEGER, allowNull: false, field: 'RecetaId' },
  ingredienteId: { type: DataTypes.INTEGER, allowNull: false, field: 'IngredienteId' },
  cantidad: decimal('Cantidad', 'cantidad'),
  unidadId: { type: DataTypes.INTEGER, allowNull: false, field: 'UnidadId' },
  tamanio: { type: DataTypes.STRING(10), field: 'Tamanio' },
  nota: { type: DataTypes.STRING(150), field: 'Nota' },
  esOpcional: { type: DataTypes.BOOLEAN, field: 'EsOpcional', defaultValue: false },
  orden: { type: DataTypes.INTEGER, field: 'Orden', defaultValue: 0 },
}, { tableName: 'RecetaIngredientes' });

const RecetaPaso = sequelize.define('RecetaPaso', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
  recetaId: { type: DataTypes.INTEGER, allowNull: false, field: 'RecetaId' },
  numero: { type: DataTypes.INTEGER, allowNull: false, field: 'Numero' },
  titulo: { type: DataTypes.STRING(100), allowNull: false, field: 'Titulo' },
  descripcion: { type: DataTypes.TEXT, allowNull: false, field: 'Descripcion' },
  minutos: { type: DataTypes.INTEGER, field: 'Minutos' },
  // "Fuego medio", "Horno 200 °C", "Fuera del fuego"...
  fuego: { type: DataTypes.STRING(30), field: 'Fuego' },
  // "Tapado", "Destapado" o "Semitapado"
  tapa: { type: DataTypes.STRING(20), field: 'Tapa' },
}, { tableName: 'RecetaPasos' });

// Relaciones
Categoria.hasMany(Ingrediente, { as: 'ingredientes', foreignKey: 'categoriaId' });
Ingrediente.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoriaId' });
Ingrediente.belongsTo(Unidad, { as: 'unidadDefault', foreignKey: 'unidadDefaultId' });
Ingrediente.belongsTo(Ingrediente, { as: 'equivaleA', foreignKey: 'equivaleAId' });

Receta.hasMany(RecetaIngrediente, { as: 'ingredientes', foreignKey: 'recetaId' });
RecetaIngrediente.belongsTo(Receta, { as: 'receta', foreignKey: 'recetaId' });
RecetaIngrediente.belongsTo(Ingrediente, { as: 'ingrediente', foreignKey: 'ingredienteId' });
RecetaIngrediente.belongsTo(Unidad, { as: 'unidad', foreignKey: 'unidadId' });

Receta.hasMany(RecetaPaso, { as: 'pasos', foreignKey: 'recetaId' });
RecetaPaso.belongsTo(Receta, { as: 'receta', foreignKey: 'recetaId' });

module.exports = { sequelize, Categoria, Unidad, Ingrediente, Receta, RecetaIngrediente, RecetaPaso };
