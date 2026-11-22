import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import ImagenAlimento from './ImagenAlimento'
import Transicion from './Transicion'
import { api } from '../api'
import { cantidadLegible } from '../utils/formato'
import { colores } from '../theme'

const duracion = (min) => (min < 60 ? `${min} min` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ''}`)

function Dato({ icono, children }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
      {icono}
      <Typography variant="body2">{children}</Typography>
    </Box>
  )
}

function FilaIngrediente({ ri, tengo }) {
  const ing = ri.ingrediente
  const basico = ing.esBasico
  return (
    <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, borderBottom: `1px solid ${colores.linea}`, '&:last-of-type': { borderBottom: 'none' } }}>
      <Box
        aria-hidden
        sx={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          bgcolor: tengo ? colores.albahaca : 'transparent',
          border: tengo ? 'none' : `1.5px solid ${basico ? colores.salvia : colores.falta}`,
          color: '#fff',
        }}
      >
        {tengo && <CheckRoundedIcon sx={{ fontSize: 15 }} />}
      </Box>
      <ImagenAlimento tipo="ingrediente" id={ing.id} url={ing.imagenUrl} emoji={ing.emoji} radio={8} sx={{ width: 34, height: 34 }} tamanioEmoji="1rem" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {ing.nombre}
          <Box component="span" className="visually-hidden" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            {tengo ? ' (lo tenés)' : basico ? ' (básico)' : ' (te falta)'}
          </Box>
        </Typography>
        {(ri.nota || basico) && (
          <Typography variant="caption" color="text.secondary" component="p">
            {[ri.nota, basico && !tengo ? 'básico de alacena' : null].filter(Boolean).join(', ')}
          </Typography>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', flexShrink: 0, maxWidth: '45%' }}>
        {cantidadLegible(ri.cantidad, ri.unidad, ri.tamanio, ing.nombre)}
      </Typography>
    </Box>
  )
}

function Paso({ paso, hecho, onAlternar }) {
  return (
    <Box component="li" sx={{ listStyle: 'none' }}>
      <ButtonBase
        onClick={onAlternar}
        aria-pressed={hecho}
        sx={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          p: 1.5,
          mx: -1.5,
          borderRadius: '16px',
          transition: 'background-color .2s, opacity .3s',
          opacity: hecho ? 0.5 : 1,
          '&:hover': { bgcolor: colores.escarcha },
          '&.Mui-focusVisible': { outline: `2px solid ${colores.albahaca}` },
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            fontFamily: '"Bricolage Grotesque Variable", sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            bgcolor: hecho ? colores.albahaca : colores.salviaClara,
            color: hecho ? '#fff' : colores.albahacaOscura,
            transition: 'background-color .25s, color .25s',
          }}
        >
          {hecho ? <CheckRoundedIcon sx={{ fontSize: 18 }} /> : paso.numero}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.25 }}>
            <Typography variant="h5" component="h4" sx={{ textDecoration: hecho ? 'line-through' : 'none' }}>{paso.titulo}</Typography>
            {paso.minutos ? (
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: 0.9, py: 0.1, borderRadius: 999, bgcolor: colores.yemaClara }}>
                <TimerOutlinedIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{duracion(paso.minutos)}</Typography>
              </Box>
            ) : null}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '62ch' }}>{paso.descripcion}</Typography>
        </Box>
      </ButtonBase>
    </Box>
  )
}

/** Receta completa: ingredientes (marcando lo que tenés) y preparación paso a paso */
export default function DetalleReceta({ resumen, idsEnHeladera, onCerrar }) {
  const abierto = Boolean(resumen)
  const celular = useMediaQuery('(max-width:600px)')
  const [receta, setReceta] = useState(null)
  const [error, setError] = useState(null)
  const [hechos, setHechos] = useState(() => new Set())
  // Guardamos la última receta para que no desaparezca el contenido durante la animación de cierre
  const [ultimo, setUltimo] = useState(null)
  useEffect(() => {
    if (resumen) setUltimo(resumen)
  }, [resumen])

  useEffect(() => {
    if (!resumen) return undefined
    let vivo = true
    setReceta(null)
    setError(null)
    setHechos(new Set())
    api.receta(resumen.id)
      .then((r) => vivo && setReceta(r))
      .catch((e) => vivo && setError(e.message))
    return () => {
      vivo = false
    }
  }, [resumen])

  const { principales, opcionales, cantidadQueTenes, totalPrincipales } = useMemo(() => {
    const lista = receta?.ingredientes ?? []
    const p = lista.filter((x) => !x.esOpcional)
    const o = lista.filter((x) => x.esOpcional)
    const contables = p.filter((x) => !x.ingrediente.esBasico)
    return {
      principales: p,
      opcionales: o,
      cantidadQueTenes: contables.filter((x) => idsEnHeladera.has(x.ingredienteId)).length,
      totalPrincipales: contables.length,
    }
  }, [receta, idsEnHeladera])

  const datos = receta ?? ultimo
  const pasos = receta?.pasos ?? []

  const alternar = (n) =>
    setHechos((prev) => {
      const s = new Set(prev)
      if (s.has(n)) s.delete(n)
      else s.add(n)
      return s
    })

  return (
    <Dialog
      open={abierto}
      onClose={onCerrar}
      fullScreen={celular}
      maxWidth="lg"
      fullWidth
      scroll="body"
      slots={{ transition: Transicion }}
      slotProps={{
        paper: { sx: { borderRadius: celular ? 0 : '28px', overflow: 'hidden', m: { sm: 2, md: 4 }, maxWidth: 1040 } },
        backdrop: { sx: { bgcolor: 'rgba(34,48,43,0.45)', backdropFilter: 'blur(4px)' } },
      }}
      aria-labelledby="titulo-receta"
    >
      {datos && (
        <Box>
          <Box sx={{ position: 'relative' }}>
            <ImagenAlimento
              tipo="receta"
              id={datos.id}
              url={datos.imagenUrl}
              emoji={datos.emoji}
              alt={datos.nombre}
              radio={0}
              tamanioEmoji="4.5rem"
              sx={{ width: '100%', aspectRatio: { xs: '4 / 3', sm: '21 / 8' } }}
            />
            <IconButton
              onClick={onCerrar}
              aria-label="Cerrar receta"
              sx={{ position: 'absolute', top: 14, right: 14, bgcolor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', '&:hover': { bgcolor: '#fff' } }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box sx={{ px: { xs: 2.5, sm: 5 }, pt: { xs: 3, sm: 4 }, pb: { xs: 4, sm: 5 } }}>
            <Typography variant="body2" sx={{ color: colores.albahaca, fontWeight: 600, mb: 0.5 }}>{datos.categoria}</Typography>
            <Typography id="titulo-receta" variant="h2" component="h2" sx={{ mb: 1.25 }}>{datos.nombre}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '60ch', mb: 2 }}>{datos.descripcion}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 3 }}>
              <Dato icono={<ScheduleRoundedIcon fontSize="small" />}>{duracion(datos.tiempoMin)}</Dato>
              <Dato icono={<PeopleAltRoundedIcon fontSize="small" />}>{datos.porciones} porciones</Dato>
              <Dato icono={<SignalCellularAltRoundedIcon fontSize="small" />}>{datos.dificultad}</Dato>
            </Box>

            {ultimo?.porcionesPosibles && (
              <Alert severity="info" variant="outlined" sx={{ mb: 3, borderRadius: '14px', borderColor: colores.linea, '& .MuiAlert-icon': { color: colores.albahaca } }}>
                {ultimo.porcionesPosibles === 1
                  ? 'Con lo que tenés te alcanza para una porción.'
                  : `Con lo que tenés te alcanza para unas ${ultimo.porcionesPosibles} porciones.`}{' '}
                Podés hacer menos cantidad o completar lo que falta.
              </Alert>
            )}

            {error && <Alert severity="error" variant="outlined">{error}</Alert>}

            <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, alignItems: 'start' }}>
              {/* Ingredientes */}
              <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h4" component="h3">Ingredientes</Typography>
                  {receta && (
                    <Typography variant="body2" color="text.secondary">
                      Tenés {cantidadQueTenes} de {totalPrincipales}
                    </Typography>
                  )}
                </Box>
                {!receta && !error ? (
                  [0, 1, 2, 3, 4].map((i) => <Skeleton key={i} height={48} />)
                ) : (
                  <>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {principales.map((ri) => (
                        <FilaIngrediente key={ri.id} ri={ri} tengo={idsEnHeladera.has(ri.ingredienteId)} />
                      ))}
                    </Box>
                    {opcionales.length > 0 && (
                      <>
                        <Typography variant="h5" component="h4" sx={{ mt: 3, mb: 0.5 }}>Si tenés, suma</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                          {opcionales.map((ri) => (
                            <FilaIngrediente key={ri.id} ri={ri} tengo={idsEnHeladera.has(ri.ingredienteId)} />
                          ))}
                        </Box>
                      </>
                    )}
                  </>
                )}
              </Box>

              {/* Preparación */}
              <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h4" component="h3">Preparación</Typography>
                  {pasos.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      {hechos.size === 0 ? 'Tocá un paso para marcarlo' : `${hechos.size} de ${pasos.length} listos`}
                    </Typography>
                  )}
                </Box>
                {!receta && !error ? (
                  [0, 1, 2, 3].map((i) => <Skeleton key={i} height={90} />)
                ) : (
                  <Box component="ol" sx={{ p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {pasos.map((p) => (
                      <Paso key={p.id} paso={p} hecho={hechos.has(p.numero)} onAlternar={() => alternar(p.numero)} />
                    ))}
                  </Box>
                )}

                {receta?.consejo && (
                  <Box sx={{ mt: 3, p: 2.5, borderRadius: '18px', bgcolor: colores.yemaClara, display: 'flex', gap: 1.5 }}>
                    <LightbulbOutlinedIcon sx={{ color: '#9A7A1E', mt: 0.25 }} />
                    <Box>
                      <Typography variant="h5" component="h4" sx={{ mb: 0.25 }}>Consejo</Typography>
                      <Typography variant="body2" sx={{ color: colores.grafito }}>{receta.consejo}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  )
}
