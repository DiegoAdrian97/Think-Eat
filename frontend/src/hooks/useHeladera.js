import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'thinkeat.heladera.v1'

function leer() {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE))
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

const nuevoId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()))

/**
 * Lo que la persona tiene en la heladera.
 * Cada item: { uid, ingredienteId, cantidad, unidadId, tamanio }
 * Se guarda en el navegador para no tener que cargarlo de nuevo.
 */
export function useHeladera() {
  const [items, setItems] = useState(leer)
  const [version, setVersion] = useState(0) // cambia cada vez que se modifica la heladera

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // modo incógnito o sin espacio: seguimos en memoria
    }
  }, [items])

  const cambiar = useCallback((fn) => {
    setItems(fn)
    setVersion((v) => v + 1)
  }, [])

  /** Agrega; si ya hay del mismo ingrediente con la misma unidad y tamaño, suma. Devuelve 'agregado' o 'sumado' */
  const agregar = useCallback((item) => {
    const mismo = (x) => x.ingredienteId === item.ingredienteId && x.unidadId === item.unidadId && (x.tamanio ?? null) === (item.tamanio ?? null)
    const yaEstaba = items.some(mismo)
    cambiar((prev) => {
      if (prev.some(mismo)) {
        return prev.map((x) => (mismo(x) ? { ...x, cantidad: Math.round((x.cantidad + item.cantidad) * 100) / 100 } : x))
      }
      return [{ ...item, uid: nuevoId() }, ...prev]
    })
    return yaEstaba ? 'sumado' : 'agregado'
  }, [items, cambiar])

  const actualizar = useCallback((uid, datos) => cambiar((prev) => prev.map((x) => (x.uid === uid ? { ...x, ...datos } : x))), [cambiar])
  const quitar = useCallback((uid) => cambiar((prev) => prev.filter((x) => x.uid !== uid)), [cambiar])
  const vaciar = useCallback(() => cambiar(() => []), [cambiar])
  const restaurar = useCallback((lista) => cambiar(() => lista), [cambiar])
  const depurar = useCallback((idsValidos) => setItems((prev) => prev.filter((x) => idsValidos.has(x.ingredienteId))), [])

  return { items, version, agregar, actualizar, quitar, vaciar, restaurar, depurar }
}
