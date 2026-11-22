const { Sequelize } = require('sequelize');
require('dotenv').config({ quiet: true });

/*
 * Conexión a Supabase (PostgreSQL).
 * DATABASE_URL: Supabase > tu proyecto > botón "Connect" > "Transaction pooler" (puerto 6543).
 */
const { DB_SSL = 'true', DB_LOGGING = 'false', VERCEL } = process.env;

/**
 * Limpia errores comunes al cargar la variable (sobre todo en Vercel):
 * espacios, comillas alrededor, "DATABASE_URL=" pegado adelante y
 * contraseñas con símbolos (# @ / ?) sin codificar.
 */
function limpiarUrl(valor) {
  if (!valor) return { error: 'Falta DATABASE_URL (en backend/.env o en las variables de entorno de Vercel).' };
  let url = String(valor).trim();
  url = url.replace(/^DATABASE_URL\s*=\s*/i, '').trim();
  url = url.replace(/^(['"])(.*)\1$/, '$2').trim();

  if (!/^postgres(ql)?:\/\//i.test(url)) {
    return { error: 'DATABASE_URL tiene que empezar con postgresql:// (copiala de Supabase > Connect > Transaction pooler).' };
  }
  if (url.includes('[YOUR-PASSWORD]')) {
    return { error: 'En DATABASE_URL falta reemplazar [YOUR-PASSWORD] por la contraseña de la base.' };
  }

  // postgresql://usuario:contraseña@host:puerto/base -> codifica la contraseña
  const m = url.match(/^(postgres(?:ql)?:\/\/)([^:/@]+):(.*)@([^@/]+)(\/.*)?$/i);
  if (m) {
    const [, protocolo, usuario, clave, host, resto = '/postgres'] = m;
    let claveCruda = clave;
    try {
      claveCruda = decodeURIComponent(clave);
    } catch {
      // tenía un % suelto: la usamos tal cual
    }
    url = `${protocolo}${usuario}:${encodeURIComponent(claveCruda)}@${host}${resto}`;
  }

  try {
    new URL(url);
  } catch {
    return { error: 'DATABASE_URL no es una URL válida. Volvé a copiarla de Supabase.' };
  }
  return { url };
}

const { url, error } = limpiarUrl(process.env.DATABASE_URL);
if (error) console.error(`[DB] ${error}`);

const sequelize = new Sequelize(url || 'postgres://sin-configurar@localhost:5432/postgres', {
  dialect: 'postgres',
  // Se importa explícito para que Vercel incluya el driver en el paquete
  dialectModule: require('pg'),
  dialectOptions: DB_SSL === 'false' ? {} : { ssl: { require: true, rejectUnauthorized: false } },
  logging: DB_LOGGING === 'true' ? console.log : false,
  define: { timestamps: false, freezeTableName: true },
  // En Vercel cada función abre sus propias conexiones: mejor pocas
  pool: { max: VERCEL ? 2 : 10, min: 0, idle: 10000, acquire: 20000 },
});

// Si la configuración está mal, lo informamos en /api/salud en lugar de caernos
sequelize.errorConfiguracion = error || null;

module.exports = sequelize;
