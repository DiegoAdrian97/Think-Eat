import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { api } from '../api'
import { colores } from '../theme'

// Cache compartido: cada imagen se pide una sola vez por sesión
const cache = new Map()
function obtener(tipo, id) {
  const clave = `${tipo}:${id}`
  if (!cache.has(clave)) {
    cache.set(clave, api.imagen(tipo, id).then((r) => r.url).catch(() => null))
  }
  return cache.get(clave)
}

/**
 * Foto de un ingrediente o receta. Mientras carga (o si no hay foto) muestra el emoji.
 * La URL se busca recién cuando la imagen entra en pantalla.
 */
export default function ImagenAlimento({ tipo, id, url: urlInicial, emoji, alt = '', radio = 12, tamanioEmoji = '1.4rem', sx }) {
  const [url, setUrl] = useState(urlInicial || null)
  const [cargada, setCargada] = useState(false)
  const [fallo, setFallo] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setUrl(urlInicial || null)
    setCargada(false)
    setFallo(false)
  }, [urlInicial, id])

  useEffect(() => {
    if (url || !id || !ref.current) return undefined
    let vivo = true
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          obtener(tipo, id).then((u) => vivo && u && setUrl(u))
        }
      },
      { rootMargin: '150px' },
    )
    obs.observe(ref.current)
    return () => {
      vivo = false
      obs.disconnect()
    }
  }, [tipo, id, url])

  const mostrarFoto = url && !fallo

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: `${radio}px`,
        bgcolor: colores.salviaClara,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        ...sx,
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{ fontSize: tamanioEmoji, lineHeight: 1, transition: 'opacity .3s', opacity: mostrarFoto && cargada ? 0 : 1 }}
      >
        {emoji || '🍽️'}
      </Box>
      {mostrarFoto && (
        <Box
          component="img"
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setCargada(true)}
          onError={() => setFallo(true)}
          className="foto"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: cargada ? 1 : 0,
            transition: 'opacity .45s ease, transform .6s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      )}
    </Box>
  )
}
