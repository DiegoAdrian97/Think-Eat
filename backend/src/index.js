require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { noEncontrado, manejarErrores } = require('./middlewares/errores');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// FRONTEND_URL: una o varias URLs separadas por coma, o * para permitir cualquiera
// (tolera comillas, "FRONTEND_URL=" pegado adelante, espacios y barra final)
const origenes = String(process.env.FRONTEND_URL || 'http://localhost:5173')
  .trim()
  .replace(/^FRONTEND_URL\s*=\s*/i, '')
  .replace(/^(['"])(.*)\1$/, '$2')
  .split(',')
  .map((s) => s.trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/, '').toLowerCase())
  .filter(Boolean);
const todos = origenes.includes('*');
app.use(cors({
  origin(origen, listo) {
    // sin Origin: pedidos desde el navegador directo, curl, etc.
    if (!origen || todos || origenes.includes(origen.toLowerCase())) return listo(null, true);
    console.warn(`[CORS] Origen rechazado: ${origen}. Permitidos: ${origenes.join(', ')}`);
    return listo(null, false);
  },
}));
app.use(express.json({ limit: '200kb' }));

app.get('/', (req, res) => res.json({ app: 'Think&Eat API', salud: '/api/salud' }));

app.get('/api/salud', async (req, res) => {
  if (sequelize.errorConfiguracion) {
    return res.status(500).json({ ok: false, base: 'mal configurada', detalle: sequelize.errorConfiguracion });
  }
  try {
    await sequelize.authenticate();
    res.json({ ok: true, base: 'conectada' });
  } catch (e) {
    res.status(503).json({ ok: false, base: 'sin conexión', detalle: e.message });
  }
});

app.use('/api', require('./routes/catalogo'));
app.use('/api/ingredientes', require('./routes/ingredientes'));
app.use('/api', require('./routes/recetas'));
app.use('/api/imagenes', require('./routes/imagenes'));

app.use(noEncontrado);
app.use(manejarErrores);

if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Think&Eat API escuchando en http://localhost:${PORT}`);
    try {
      await sequelize.authenticate();
      console.log('Conectado a Supabase.');
    } catch (e) {
      console.error('No se pudo conectar a Supabase:', e.message);
      console.error('Revisá el archivo .env (ver README).');
    }
  });
}

module.exports = app;
