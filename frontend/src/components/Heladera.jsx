import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import ImagenAlimento from './ImagenAlimento'
import { cantidadLegible } from '../utils/formato'
import { colores } from '../theme'

const MotionBox = motion.create(Box)

/** Puerta abierta de la heladera: los ingredientes ordenados en estantes por categoría */
export default function Heladera({ items, catalogo, editandoUid, onEditar, onQuitar, onVaciar, onBuscar, buscando }) {
  const { porId, unidadPorId, categorias } = catalogo

  const estantes = useMemo(() => {
    const grupos = new Map()
    for (const item of items) {
      const ing = porId.get(item.ingredienteId)
      if (!ing) continue
      const cat = ing.categoriaId
      if (!grupos.has(cat)) grupos.set(cat, [])
      grupos.get(cat).push({ item, ing })
    }
    return categorias.filter((c) => grupos.has(c.id)).map((c) => ({ categoria: c, filas: grupos.get(c.id) }))
  }, [items, porId, categorias])

  const cantidad = items.length

  return (
    <Box
      component="section"
      aria-labelledby="titulo-heladera"
      sx={{
        position: 'relative',
        borderRadius: '28px',
        bgcolor: colores.superficie,
        border: `1px solid ${colores.linea}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { md: 520 },
        // la luz de la heladera
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInline: 0,
          top: 0,
          height: 120,
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${colores.yemaClara} 0%, rgba(251,241,214,0) 75%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', px: 3, pt: 3, pb: 1.5, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Typography id="titulo-heladera" variant="h3" component="h2">Tu heladera</Typography>
        <Typography variant="body2" color="text.secondary">
          {cantidad === 0 ? 'Vacía' : cantidad === 1 ? '1 ingrediente' : `${cantidad} ingredientes`}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', flex: 1, px: 1.5, pb: 1, overflowY: { md: 'auto' }, maxHeight: { md: 560 } }}>
        {cantidad === 0 ? (
          <Box sx={{ px: 1.5, py: 5, textAlign: 'center' }}>
            <Box aria-hidden sx={{ fontSize: '2.4rem', mb: 1.5, opacity: 0.85 }}>🧊</Box>
            <Typography variant="h5" component="p" sx={{ mb: 0.5 }}>Todavía no cargaste nada</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, mx: 'auto' }}>
              Agregá lo que tengas a mano. Con dos o tres ingredientes ya aparecen ideas.
            </Typography>
          </Box>
        ) : (
          <AnimatePresence initial={false}>
            {estantes.map(({ categoria, filas }) => (
              <MotionBox
                key={categoria.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{
                  px: 1.5,
                  pt: 1.5,
                  pb: 1,
                  // estante de vidrio
                  borderBottom: `2px solid ${colores.salviaClara}`,
                  boxShadow: `0 6px 8px -8px ${colores.salvia}`,
                  '&:last-of-type': { borderBottom: 'none', boxShadow: 'none' },
                }}
              >
                <Typography variant="caption" color="text.secondary" component="h3" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                  {categoria.nombre}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  <AnimatePresence initial={false}>
                    {filas.map(({ item, ing }) => {
                      const unidad = unidadPorId.get(item.unidadId)
                      const editando = item.uid === editandoUid
                      return (
                        <MotionBox
                          component="li"
                          key={item.uid}
                          layout
                          initial={{ opacity: 0, x: -14, scale: 0.98 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 0.75,
                            px: 1,
                            mx: -1,
                            borderRadius: '12px',
                            bgcolor: editando ? colores.yemaClara : 'transparent',
                            transition: 'background-color .2s',
                            '&:hover': { bgcolor: editando ? colores.yemaClara : colores.escarcha },
                            '&:hover .acciones, &:focus-within .acciones': { opacity: 1 },
                          }}
                        >
                          <ImagenAlimento tipo="ingrediente" id={ing.id} url={ing.imagenUrl} emoji={ing.emoji} alt="" radio={10} sx={{ width: 42, height: 42 }} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>{ing.nombre}</Typography>
                            <Typography variant="caption" color="text.secondary" noWrap component="p">
                              {cantidadLegible(item.cantidad, unidad, item.tamanio, ing.nombre)}
                            </Typography>
                          </Box>
                          <Box className="acciones" sx={{ display: 'flex', opacity: { xs: 1, md: 0.35 }, transition: 'opacity .2s' }}>
                            <Tooltip title="Editar cantidad">
                              <IconButton size="small" onClick={() => onEditar(item)} aria-label={`Editar ${ing.nombre}`}>
                                <EditRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sacar de la heladera">
                              <IconButton size="small" onClick={() => onQuitar(item)} aria-label={`Sacar ${ing.nombre}`}>
                                <CloseRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </MotionBox>
                      )
                    })}
                  </AnimatePresence>
                </Box>
              </MotionBox>
            ))}
          </AnimatePresence>
        )}
      </Box>

      <Box sx={{ position: 'relative', p: 2, pt: 1.5, borderTop: `1px solid ${colores.linea}`, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<RestaurantRoundedIcon />}
          disabled={cantidad === 0 || buscando}
          onClick={onBuscar}
        >
          {buscando ? 'Buscando ideas…' : '¿Qué cocino?'}
        </Button>
        {cantidad > 0 && (
          <Button size="small" color="inherit" onClick={onVaciar} sx={{ color: 'text.secondary', alignSelf: 'center' }}>
            Vaciar heladera
          </Button>
        )}
      </Box>
    </Box>
  )
}
