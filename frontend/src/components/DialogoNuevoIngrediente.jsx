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
import Transicion from './Transicion'

// Unidades que tienen sentido como "unidad habitual" de un ingrediente nuevo
const HABITUALES = ['u', 'g', 'ml', 'atado', 'paquete', 'lata', 'caja', 'feta', 'diente']

export default function DialogoNuevoIngrediente({ abierto, nombreInicial, categorias, unidades, onCerrar, onCrear }) {
  const [nombre, setNombre] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [unidadId, setUnidadId] = useState('')
  const [tieneTamanio, setTieneTamanio] = useState(false)
  const [peso, setPeso] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

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
  }, [abierto, nombreInicial, categorias, unidades])

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
          <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus required slotProps={{ htmlInput: { maxLength: 100 } }} />
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
