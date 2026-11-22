import { AnimatePresence, motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import TarjetaReceta from './TarjetaReceta'
import { colores } from '../theme'

const contenedor = {
  oculta: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  saliendo: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const grilla = {
  display: 'grid',
  gap: { xs: 2, sm: 1.5 },
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
  '& > :first-of-type': { gridColumn: { sm: '1 / -1' } },
}

function Esqueletos() {
  return (
    <Box sx={grilla} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} sx={{ p: 1.25 }}>
          <Skeleton variant="rounded" sx={{ borderRadius: '16px', aspectRatio: i === 0 ? '16 / 7' : '4 / 3', height: 'auto' }} />
          <Skeleton width="70%" sx={{ mt: 1.5, fontSize: '1.3rem' }} />
          <Skeleton width="40%" />
        </Box>
      ))}
    </Box>
  )
}

function Inicial() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: 2, textAlign: 'center', color: 'text.secondary' }}>
      {/* platos vacíos */}
      <Box aria-hidden sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        {[64, 88, 64].map((t, i) => (
          <Box key={i} sx={{ width: t, height: t, borderRadius: '50%', border: `2px dashed ${colores.salvia}`, display: 'grid', placeItems: 'center' }}>
            <Box sx={{ width: t * 0.55, height: t * 0.55, borderRadius: '50%', bgcolor: colores.salviaClara }} />
          </Box>
        ))}
      </Box>
      <Typography variant="h4" component="p" color="text.primary" sx={{ mb: 1 }}>Acá van a aparecer tus ideas</Typography>
      <Typography variant="body1" sx={{ maxWidth: '40ch', mx: 'auto' }}>
        Cargá lo que tenés y tocá “¿Qué cocino?”. Te mostramos 5 almuerzos o cenas, ordenados por lo que mejor aprovecha tu heladera.
      </Typography>
    </Box>
  )
}

export default function Sugerencias({ estado, resultado, pagina, desactualizado, error, onMas, onReiniciar, onActualizar, onAbrir }) {
  const sugerencias = resultado?.sugerencias ?? []
  const vistas = (pagina - 1) * 5 + sugerencias.length

  return (
    <Box component="section" aria-labelledby="titulo-ideas" aria-live="polite" aria-busy={estado === 'cargando'}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 2, px: { sm: 1 } }}>
        <Typography id="titulo-ideas" variant="h3" component="h2">
          {estado === 'listo' && sugerencias.length ? `${sugerencias.length} ideas para hoy` : 'Ideas para cocinar'}
        </Typography>
        {estado === 'listo' && resultado?.total > 0 && (
          <Typography variant="body2" color="text.secondary">
            {vistas} de {resultado.total} recetas posibles
          </Typography>
        )}
      </Box>

      <Collapse in={desactualizado && estado === 'listo'}>
        <Alert
          severity="info"
          variant="outlined"
          sx={{ mb: 2, borderRadius: '14px', bgcolor: colores.superficie, borderColor: colores.linea, '& .MuiAlert-icon': { color: colores.albahaca } }}
          action={<Button size="small" onClick={onActualizar}>Actualizar ideas</Button>}
        >
          Cambiaste lo que hay en la heladera.
        </Alert>
      </Collapse>

      {estado === 'inicial' && <Inicial />}
      {estado === 'cargando' && <Esqueletos />}
      {estado === 'error' && (
        <Alert severity="error" variant="outlined" sx={{ borderRadius: '14px' }} action={<Button color="inherit" size="small" onClick={onActualizar}>Reintentar</Button>}>
          {error}
        </Alert>
      )}

      {estado === 'listo' && sugerencias.length === 0 && (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="p" sx={{ mb: 1 }}>No encontramos recetas con eso</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '42ch', mx: 'auto' }}>
            Probá sumar algún básico como cebolla, huevos, papas, arroz o fideos: aparecen en la mayoría de las recetas.
          </Typography>
        </Box>
      )}

      <AnimatePresence mode="wait">
        {estado === 'listo' && sugerencias.length > 0 && (
          <motion.div key={pagina + ':' + sugerencias.map((s) => s.id).join(',')} variants={contenedor} initial="oculta" animate="visible" exit="saliendo">
            <Box sx={grilla}>
              {sugerencias.map((r, i) => (
                <TarjetaReceta key={r.id} receta={r} destacada={i === 0} onAbrir={onAbrir} />
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {estado === 'listo' && sugerencias.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          {resultado.restantes > 0 ? (
            <>
              <Button variant="outlined" size="large" startIcon={<AutorenewRoundedIcon />} onClick={onMas} sx={{ borderColor: colores.salvia, bgcolor: colores.superficie, '&:hover': { borderColor: colores.albahaca, bgcolor: colores.superficie } }}>
                Mostrar más alternativas
              </Button>
              <Typography variant="caption" color="text.secondary">
                {resultado.restantes === 1 ? 'Queda 1 idea más' : `Quedan ${resultado.restantes} ideas más`}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">Ya viste todas las ideas con estos ingredientes.</Typography>
              <Button startIcon={<ReplayRoundedIcon />} onClick={onReiniciar}>Volver a las primeras</Button>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
