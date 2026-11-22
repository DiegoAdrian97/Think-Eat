// Cliente de la API de Think&Eat. En desarrollo Vite redirige /api al backend.
const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

async function pedir(ruta, opciones = {}) {
  let res
  try {
    res = await fetch(`${BASE}${ruta}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
      body: opciones.body ? JSON.stringify(opciones.body) : undefined,
    })
  } catch {
    throw new Error('No hay conexión con el servidor. Revisá que el backend esté corriendo.')
  }
  const datos = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(datos.error || `Error ${res.status}`)
    error.status = res.status
    error.datos = datos
    throw error
  }
  return datos
}

export const api = {
  ingredientes: () => pedir('/ingredientes'),
  crearIngrediente: (datos) => pedir('/ingredientes', { method: 'POST', body: datos }),
  unidades: () => pedir('/unidades'),
  categorias: () => pedir('/categorias'),
  sugerencias: (items, excluir = []) => pedir('/sugerencias', { method: 'POST', body: { items, excluir, limite: 5 } }),
  receta: (id) => pedir(`/recetas/${id}`),
  imagen: (tipo, id) => pedir(`/imagenes/${tipo}/${id}`),
}
