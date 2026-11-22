require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { noEncontrado, manejarErrores } = require('./middlewares/errores');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// FRONTEND_URL: una o varias URLs separadas por coma, o * para permitir cualquiera
const origenes = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map((s) => s.trim().replace(/\/$/, ''));
app.use(cors({ origin: origenes.includes('*') ? true : origenes }));
app.use(express.json({ limit: '200kb' }));

app.get('/', (req, res) => res.json({ app: 'Think&Eat API', salud: '/api/salud' }));

app.get('/api/salud', async (req, res) => {
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
