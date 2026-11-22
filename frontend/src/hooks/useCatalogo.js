import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api'

/** Carga ingredientes, unidades y categorías desde la API */
export function useCatalogo() {
  const [ingredientes, setIngredientes] = useState([])
  const [unidades, setUnidades] = useState([])
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | listo | error
  const [error, setError] = useState(null)

  const cargar = useCallback(async () => {
    setEstado('cargando')
    try {
      const [ing, uni, cat] = await Promise.all([api.ingredientes(), api.unidades(), api.categorias()])
      setIngredientes(ing)
      setUnidades(uni)
      setCategorias(cat)
      setEstado('listo')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  const porId = useMemo(() => new Map(ingredientes.map((i) => [i.id, i])), [ingredientes])
  const unidadPorId = useMemo(() => new Map(unidades.map((u) => [u.id, u])), [unidades])

  // Ordenado por categoría para que el buscador agrupe bien
  const ordenados = useMemo(() => {
    const orden = new Map(categorias.map((c) => [c.id, c.orden]))
    return [...ingredientes].sort(
      (a, b) => (orden.get(a.categoriaId) ?? 99) - (orden.get(b.categoriaId) ?? 99) || a.nombre.localeCompare(b.nombre, 'es'),
    )
  }, [ingredientes, categorias])

  const crearIngrediente = useCallback(async (datos) => {
    try {
      const nuevo = await api.crearIngrediente(datos)
      setIngredientes((prev) => [...prev, nuevo])
      return { ingrediente: nuevo, existia: false }
    } catch (e) {
      if (e.status === 409 && e.datos?.ingrediente) return { ingrediente: e.datos.ingrediente, existia: true }
      throw e
    }
  }, [])

  return { ingredientes: ordenados, unidades, categorias, porId, unidadPorId, estado, error, recargar: cargar, crearIngrediente }
}
