const { Sequelize } = require('sequelize');
require('dotenv').config({ quiet: true });

/*
 * Conexión a Supabase (PostgreSQL).
 * DATABASE_URL: Supabase > tu proyecto > botón "Connect" > "Transaction pooler" (puerto 6543).
 */
const { DATABASE_URL, DB_SSL = 'true', DB_LOGGING = 'false', VERCEL } = process.env;

if (!DATABASE_URL) {
  console.error('Falta DATABASE_URL en el archivo .env (o en las variables de entorno de Vercel). Ver README.');
}

const sequelize = new Sequelize(DATABASE_URL || 'postgres://localhost/sin-configurar', {
  dialect: 'postgres',
  // Se importa explícito para que Vercel incluya el driver en el paquete
  dialectModule: require('pg'),
  dialectOptions: DB_SSL === 'false' ? {} : { ssl: { require: true, rejectUnauthorized: false } },
  logging: DB_LOGGING === 'true' ? console.log : false,
  define: { timestamps: false, freezeTableName: true },
  // En Vercel cada función abre sus propias conexiones: mejor pocas
  pool: { max: VERCEL ? 2 : 10, min: 0, idle: 10000, acquire: 20000 },
});

module.exports = sequelize;
