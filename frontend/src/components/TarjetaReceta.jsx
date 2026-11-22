import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ImagenAlimento from './ImagenAlimento'
import { colores } from '../theme'

const MotionDiv = motion.div

export const variantesTarjeta = {
  oculta: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 26 } },
  saliendo: { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.2 } },
}

function Faltantes({ receta, destacada }) {
  const { faltan, tenes, faltanMenores = [] } = receta
  const total = tenes.length + faltan.length + faltanMenores.length
  if (faltan.length === 0) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: colores.albahaca }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {faltanMenores.length ? 'Tenés todo lo principal' : 'Tenés todo'}
        </Typography>
      </Box>
    )
  }
  const max = destacada ? 4 : 2
  const lista = faltan.slice(0, max).join(', ')
    + (faltan.length > max ? ` y ${faltan.length - max} más` : '')
    + (faltanMenores.length && faltan.length <= max ? ', y algún condimento' : '')
  return (
    <Typography variant="caption" color="text.secondary" component="p" sx={{ lineHeight: 1.45 }}>
      Tenés {tenes.length} de {total}. <Box component="span" sx={{ color: colores.falta }}>Te falta: {lista}</Box>
    </Typography>
  )
}

/** Tarjeta de una idea de comida. La destacada (mejor coincidencia) es más grande y horizontal */
export default function TarjetaReceta({ receta, destacada = false, onAbrir }) {
  return (
    <MotionDiv variants={variantesTarjeta} style={{ height: '100%' }}>
      <ButtonBase
        onClick={() => onAbrir(receta)}
        aria-label={`Ver receta: ${receta.nombre}`}
        sx={{
          width: '100%',
          height: '100%',
          textAlign: 'left',
          display: 'flex',
          flexDirection: destacada ? { xs: 'column', sm: 'row' } : 'column',
          alignItems: 'stretch',
          gap: destacada ? { xs: 1.75, sm: 3 } : 1.5,
          p: destacada ? { xs: 1.25, sm: 1.5 } : 1.25,
          borderRadius: destacada ? '26px' : '20px',
          bgcolor: destacada ? colores.superficie : 'transparent',
          border: `1px solid ${destacada ? colores.linea : 'transparent'}`,
          transition: 'background-color .25s, border-color .25s, box-shadow .3s',
          '&:hover': {
            bgcolor: colores.superficie,
            borderColor: colores.linea,
            boxShadow: '0 20px 40px -28px rgba(34,48,43,0.45)',
          },
          '&:hover .foto': { transform: 'scale(1.045)' },
          '&.Mui-focusVisible': { outline: `2px solid ${colores.albahaca}`, outlineOffset: 2 },
        }}
      >
        <Box sx={{ position: 'relative', flex: destacada ? { sm: '0 0 52%' } : 'none' }}>
          <ImagenAlimento
            tipo="receta"
            id={receta.id}
            url={receta.imagenUrl}
            emoji={receta.emoji}
            alt={receta.nombre}
            radio={destacada ? 18 : 14}
            tamanioEmoji={destacada ? '3.4rem' : '2.4rem'}
            sx={{ width: '100%', aspectRatio: destacada ? { xs: '4 / 3', sm: '5 / 4' } : '4 / 3', height: destacada ? { sm: '100%' } : 'auto' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              px: 1,
              py: 0.25,
              borderRadius: 999,
              bgcolor: receta.compatibilidad >= 85 ? colores.yema : 'rgba(255,255,255,0.92)',
              color: colores.grafito,
              backdropFilter: 'blur(6px)',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{receta.compatibilidad}% con tu heladera</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: destacada ? 1.25 : 0.75, py: destacada ? { sm: 1.5 } : 0, pr: destacada ? { sm: 1.5 } : 0, px: destacada ? { xs: 0.5, sm: 0 } : 0.5, pb: 0.5, minWidth: 0 }}>
          {destacada && (
            <Typography variant="body2" sx={{ color: colores.albahaca, fontWeight: 600 }}>La que mejor aprovecha lo que tenés</Typography>
          )}
          <Typography variant={destacada ? 'h2' : 'h5'} component="h3" sx={destacada ? { fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)' } : undefined}>{receta.nombre}</Typography>
          {destacada && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '46ch' }}>{receta.descripcion}</Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              <ScheduleRoundedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">{receta.tiempoMin < 60 ? `${receta.tiempoMin} min` : `${Math.floor(receta.tiempoMin / 60)} h${receta.tiempoMin % 60 ? ` ${receta.tiempoMin % 60} min` : ''}`}</Typography>
            </Box>
            <Typography variant="caption">{receta.dificultad}</Typography>
            <Typography variant="caption">{receta.porciones} porciones</Typography>
          </Box>
          <Faltantes receta={receta} destacada={destacada} />
          {destacada && (
            <Typography variant="button" sx={{ mt: 'auto', pt: 1, color: colores.albahaca }}>Ver la receta paso a paso</Typography>
          )}
        </Box>
      </ButtonBase>
    </MotionDiv>
  )
}
