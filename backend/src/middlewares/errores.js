class ErrorHttp extends Error {
  constructor(status, mensaje, extra = {}) {
    super(mensaje);
    this.status = status;
    this.extra = extra;
  }
}

// Envuelve controladores async para que los errores lleguen al manejador
const async_ = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function noEncontrado(req, res) {
  res.status(404).json({ error: `No existe la ruta ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function manejarErrores(err, req, res, next) {
  if (err instanceof ErrorHttp) {
    return res.status(err.status).json({ error: err.message, ...err.extra });
  }
  if (err.name?.startsWith('SequelizeConnection') || err.name === 'SequelizeHostNotFoundError') {
    console.error('[DB] No se pudo conectar a Supabase:', err.message);
    return res.status(503).json({ error: 'No se pudo conectar a la base de datos. Revisá DATABASE_URL y que el proyecto de Supabase no esté pausado.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
}

module.exports = { ErrorHttp, async_, noEncontrado, manejarErrores };
