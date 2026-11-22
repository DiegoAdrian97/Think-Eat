import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Transicion from './Transicion'
import ImagenAlimento from './ImagenAlimento'
import { detectarEquivalente } from '../utils/texto'
import { colores } from '../theme'

// Unidades que tienen sentido como "unidad habitual" de un ingrediente nuevo
const HABITUALES = ['u', 'g', 'ml', 'atado', 'paquete', 'lata', 'caja', 'feta', 'diente']

export default function DialogoNuevoIngrediente({ abierto, nombreInicial, categorias, unidades, ingredientes = [], onCerrar, onCrear }) {
  const [nombre, setNombre] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [unidadId, setUnidadId] = useState('')
  const [tieneTamanio, setTieneTamanio] = useState(false)
  const [peso, setPeso] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)
  const [equivalente, setEquivalente] = useState(null)
  const [equivalenteTocado, setEquivalenteTocado] = useState(false)
  const base = ingredientes.filter((i) => !i.esPersonalizado)

  // Al elegir a qué equivale, copiamos su categoría y su forma de medirlo
  const aplicarEquivalente = (ing) => {
    setEquivalente(ing)
    if (!ing) return
    setCategoriaId(ing.categoriaId)
    setUnidadId(ing.unidadDefaultId)
    setTieneTamanio(Boolean(ing.tieneTamanio))
    setPeso(ing.pesoUnidadGr ? String(ing.pesoUnidadGr) : '')
  }

  const opcionesUnidad = unidades.filter((u) => HABITUALES.includes(u.abreviatura))
  const unidad = unidades.find((u) => u.id === unidadId)
  const esConteo = unidad?.tipo === 'conteo'

  useEffect(() => {
    if (!abierto) return
    const t = nombreInicial?.trim() ?? ''
    setNombre(t ? t.charAt(0).toUpperCase() + t.slice(1) : '')
    setCategoriaId(categorias.find((c) => c.nombre.startsWith('Almacén'))?.id ?? categorias[0]?.id ?? '')
    setUnidadId(unidades.find((u) => u.abreviatura === 'g')?.id ?? '')
    setTieneTamanio(false)
    setPeso('')
    setError(null)
    setEquivalenteTocado(false)
    const detectado = t ? detectarEquivalente(t, ingredientes) : null
    setEquivalente(null)
    if (detectado) aplicarEquivalente(detectado)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto, nombreInicial, categorias, unidades])

  const cambiarNombre = (valor) => {
    setNombre(valor)
    if (!equivalenteTocado) {
      const detectado = detectarEquivalente(valor, ingredientes)
      if (detectado?.id !== equivalente?.id) {
        if (detectado) aplicarEquivalente(detectado)
        else setEquivalente(null)
      }
    }
  }

  const guardar = async (e) => {
    e.preventDefault()
    if (nombre.trim().length < 2) {
      setError('Escribí el nombre del ingrediente.')
      return
    }
    setGuardando(true)
    setError(null)
    try {
      await onCrear({
        nombre: nombre.trim(),
        categoriaId,
        unidadDefaultId: unidadId,
        tieneTamanio: esConteo && tieneTamanio,
        pesoUnidadGr: esConteo && peso ? Number(peso) : null,
        equivaleAId: equivalente?.id ?? null,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Dialog
      open={abierto}
      onClose={onCerrar}
      fullWidth
      maxWidth="xs"
      slots={{ transition: Transicion }}
      slotProps={{ paper: { component: 'form', onSubmit: guardar, sx: { borderRadius: '20px' } } }}
    >
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography variant="h4" component="span">Nuevo ingrediente</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Queda guardado y lo vas a poder elegir la próxima vez.
        </Typography>
        <Stack spacing={2}>
          <TextField label="Nombre" value={nombre} onChange={(e) => cambiarNombre(e.target.value)} autoFocus required slotProps={{ htmlInput: { maxLength: 100 } }} />
          <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: equivalente ? colores.salviaClara : colores.escarcha, transition: 'background-color .2s' }}>
            <Autocomplete
              options={base}
              value={equivalente}
              onChange={(_, v) => {
                setEquivalenteTocado(true)
                aplicarEquivalente(v)
              }}
              getOptionLabel={(o) => o?.nombre ?? ''}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              groupBy={(o) => o.categoria?.nombre ?? ''}
              autoHighlight
              renderOption={(props, o) => {
                const { key, ...resto } = props
                return (
                  <Box component="li" key={key} {...resto} sx={{ gap: 1.25 }}>
                    <ImagenAlimento tipo="ingrediente" id={o.id} url={o.imagenUrl} emoji={o.emoji} radio={8} sx={{ width: 28, height: 28 }} tamanioEmoji="0.95rem" />
                    {o.nombre}
                  </Box>
                )
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" label="¿Es un tipo de…? (opcional)" placeholder="Ninguno" sx={{ bgcolor: colores.superficie, borderRadius: '12px' }} />
              )}
            />
            <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 1, mx: 0.5 }}>
              {equivalente
                ? `Las recetas que llevan ${equivalente.nombre.toLowerCase()} van a tener en cuenta este ingrediente.`
                : 'Si es una variedad de algo que ya está en la lista (por ejemplo "papa negra" es una papa), elegilo para que cuente en las ideas.'}
            </Typography>
          </Box>
          <TextField select label="Categoría" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            {categorias.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.emoji}  {c.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Cómo lo medís normalmente" value={unidadId} onChange={(e) => setUnidadId(e.target.value)}>
            {opcionesUnidad.map((u) => (
              <MenuItem key={u.id} value={u.id}>{u.abreviatura === 'g' || u.abreviatura === 'ml' ? `${u.nombrePlural} (${u.abreviatura})` : u.nombrePlural}</MenuItem>
            ))}
          </TextField>
          <Collapse in={esConteo} unmountOnExit>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={<Switch checked={tieneTamanio} onChange={(e) => setTieneTamanio(e.target.checked)} />}
                label="Viene en tamaños (chico, mediano, grande)"
              />
              <TextField
                label="Peso aproximado de una unidad (opcional)"
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                helperText="En gramos. Sirve para saber si te alcanza para una receta."
                slotProps={{ htmlInput: { min: 1, step: 1 } }}
              />
            </Stack>
          </Collapse>
          {error && <Alert severity="error" variant="outlined">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onCerrar} color="inherit">Cancelar</Button>
        <Button type="submit" variant="contained" disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar ingrediente'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
