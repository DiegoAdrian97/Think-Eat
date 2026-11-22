import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import SelectorIngrediente from './SelectorIngrediente'
import DialogoNuevoIngrediente from './DialogoNuevoIngrediente'
import { api } from '../api'
import { colores } from '../theme'

const MotionBox = motion.create(Box)

const FUEGOS = ['Fuego fuerte', 'Fuego medio-fuerte', 'Fuego medio', 'Fuego medio-bajo', 'Fuego bajo', 'Fuego mínimo', 'Fuerte, después medio', 'Fuera del fuego']
const TAPAS = ['Tapado', 'Destapado', 'Semitapado']
const TAMANIOS = [['chico', 'Chico'], ['mediano', 'Mediano'], ['grande', 'Grande']]
const CATEGORIAS_BASE = ['Carnes', 'Pollo', 'Pescados', 'Pastas', 'Guisos y sopas', 'Tartas y empanadas', 'Pizzas', 'Minutas', 'Vegetariano', 'Ensaladas']

let contador = 0
const nuevoId = () => `f${++contador}`
const filaIngrediente = () => ({ uid: nuevoId(), ingrediente: null, cantidad: '', unidadId: '', tamanio: 'mediano', esOpcional: false, nota: '' })
const filaPaso = () => ({ uid: nuevoId(), titulo: '', descripcion: '', minutos: '', fuego: '', horno: '', tapa: '' })

const vacio = () => ({
  nombre: '',
  descripcion: '',
  categoria: '',
  tiempoMin: '',
  porciones: '4',
  dificultad: 'Fácil',
  imagenUrl: '',
  consejo: '',
  ingredientes: [filaIngrediente(), filaIngrediente()],
  pasos: [filaPaso()],
})

function Seccion({ titulo, ayuda, children }) {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h4" component="h3" sx={{ mb: 0.5 }}>{titulo}</Typography>
      {ayuda && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ayuda}</Typography>}
      {children}
    </Box>
  )
}

/** Panel lateral para cargar una comida nueva con sus ingredientes y pasos */
export default function PanelNuevaComida({ abierto, onCerrar, catalogo, onGuardada }) {
  const { ingredientes, unidades, categorias, crearIngrediente } = catalogo
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [categoriasRecetas, setCategoriasRecetas] = useState(CATEGORIAS_BASE)
  const [dialogo, setDialogo] = useState({ abierto: false, nombre: '', uid: null })

  useEffect(() => {
    if (!abierto) return
    api.categoriasRecetas()
      .then((c) => setCategoriasRecetas([...new Set([...CATEGORIAS_BASE, ...c])]))
      .catch(() => {})
  }, [abierto])

  const unidadesElegibles = useMemo(() => unidades, [unidades])
  const unidadDe = (id) => unidades.find((u) => u.id === id)

  const set = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrores((e) => ({ ...e, [campo]: null }))
  }
  const setIng = (uid, datos) => setForm((f) => ({ ...f, ingredientes: f.ingredientes.map((x) => (x.uid === uid ? { ...x, ...datos } : x)) }))
  const setPaso = (uid, datos) => setForm((f) => ({ ...f, pasos: f.pasos.map((x) => (x.uid === uid ? { ...x, ...datos } : x)) }))
  const quitar = (lista, uid) => setForm((f) => ({ ...f, [lista]: f[lista].filter((x) => x.uid !== uid) }))
  const mover = (uid, delta) => setForm((f) => {
    const i = f.pasos.findIndex((x) => x.uid === uid)
    const j = i + delta
    if (j < 0 || j >= f.pasos.length) return f
    const pasos = [...f.pasos]
    ;[pasos[i], pasos[j]] = [pasos[j], pasos[i]]
    return { ...f, pasos }
  })

  // Sal, pimienta y aceite van "a gusto" por defecto
  const elegirIngrediente = (uid, ing) => setIng(uid, {
    ingrediente: ing,
    unidadId: ing ? (ing.esBasico ? unidades.find((u) => u.tipo === 'libre')?.id ?? ing.unidadDefaultId : ing.unidadDefaultId) : '',
    cantidad: '',
  })

  const crear = async (datos) => {
    const { ingrediente } = await crearIngrediente(datos)
    elegirIngrediente(dialogo.uid, ingrediente)
    setDialogo({ abierto: false, nombre: '', uid: null })
  }

  const cerrar = () => {
    if (!guardando) onCerrar()
  }

  const guardar = async (e) => {
    e.preventDefault()
    setErrorGeneral(null)
    const ingredientesValidos = form.ingredientes.filter((x) => x.ingrediente)
    const pasosValidos = form.pasos.filter((x) => x.descripcion.trim() || x.titulo.trim())
    const cuerpo = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria: form.categoria,
      tiempoMin: Number(form.tiempoMin),
      porciones: Number(form.porciones),
      dificultad: form.dificultad,
      imagenUrl: form.imagenUrl,
      consejo: form.consejo,
      emoji: form.ingredientes.find((x) => x.ingrediente)?.ingrediente.categoria?.emoji,
      ingredientes: ingredientesValidos.map((x) => ({
        ingredienteId: x.ingrediente.id,
        cantidad: x.cantidad,
        unidadId: x.unidadId,
        tamanio: x.tamanio,
        esOpcional: x.esOpcional,
        nota: x.nota,
      })),
      pasos: pasosValidos.map((x) => ({
        titulo: x.titulo,
        descripcion: x.descripcion,
        minutos: x.minutos,
        fuego: x.fuego === 'Horno' ? (x.horno ? `Horno ${x.horno} °C` : '') : x.fuego,
        tapa: x.tapa,
      })),
    }
    setGuardando(true)
    try {
      const r = await api.crearReceta(cuerpo)
      setForm(vacio())
      setErrores({})
      onGuardada(r)
    } catch (err) {
      const errs = err.datos?.errores ?? {}
      // los errores por fila vienen con el índice de la lista filtrada: los pasamos al uid
      const porUid = {}
      for (const [k, v] of Object.entries(errs)) {
        const m = k.match(/^(ingredientes|pasos)\.(\d+)$/)
        if (m) {
          const lista = m[1] === 'ingredientes' ? ingredientesValidos : pasosValidos
          const fila = lista[Number(m[2])]
          if (fila) porUid[fila.uid] = v
        } else porUid[k] = v
      }
      setErrores(porUid)
      setErrorGeneral(Object.keys(errs).length ? 'Revisá los datos marcados en rojo.' : err.message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={abierto}
      onClose={cerrar}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 600 }, bgcolor: colores.superficie } } }}
    >
      <Box component="form" onSubmit={guardar} noValidate sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Encabezado */}
        <Box sx={{ px: 3, py: 2.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${colores.linea}` }}>
          <Box>
            <Typography variant="h3" component="h2">Agregar una comida</Typography>
            <Typography variant="body2" color="text.secondary">Va a aparecer en las ideas cuando tengas sus ingredientes.</Typography>
          </Box>
          <IconButton onClick={cerrar} aria-label="Cerrar panel"><CloseRoundedIcon /></IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, pt: 3 }}>
          <Seccion titulo="La comida">
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              <TextField
                label="Nombre"
                required
                value={form.nombre}
                onChange={(e) => set('nombre', e.target.value)}
                error={Boolean(errores.nombre)}
                helperText={errores.nombre}
                placeholder="Ej: Guiso de lentejas de la abuela"
                sx={{ gridColumn: '1 / -1' }}
                slotProps={{ htmlInput: { maxLength: 120 } }}
              />
              <TextField
                label="Descripción corta"
                value={form.descripcion}
                onChange={(e) => set('descripcion', e.target.value)}
                multiline
                minRows={2}
                sx={{ gridColumn: '1 / -1' }}
                slotProps={{ htmlInput: { maxLength: 400 } }}
              />
              <Autocomplete
                freeSolo
                options={categoriasRecetas}
                value={form.categoria}
                onInputChange={(_, v) => set('categoria', v)}
                renderInput={(params) => <TextField {...params} label="Categoría" placeholder="Ej: Pastas" />}
              />
              <Box>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={form.dificultad}
                  onChange={(_, v) => v && set('dificultad', v)}
                  aria-label="Dificultad"
                  sx={{ height: 56 }}
                >
                  {['Fácil', 'Media', 'Difícil'].map((d) => <ToggleButton key={d} value={d}>{d}</ToggleButton>)}
                </ToggleButtonGroup>
              </Box>
              <TextField
                label="Tiempo total (minutos)"
                required
                value={form.tiempoMin}
                onChange={(e) => set('tiempoMin', e.target.value.replace(/\D/g, ''))}
                error={Boolean(errores.tiempoMin)}
                helperText={errores.tiempoMin}
                slotProps={{ htmlInput: { inputMode: 'numeric' } }}
              />
              <TextField
                label="Porciones"
                required
                value={form.porciones}
                onChange={(e) => set('porciones', e.target.value.replace(/\D/g, ''))}
                error={Boolean(errores.porciones)}
                helperText={errores.porciones}
                slotProps={{ htmlInput: { inputMode: 'numeric' } }}
              />
              <TextField
                label="Foto (URL, opcional)"
                value={form.imagenUrl}
                onChange={(e) => set('imagenUrl', e.target.value)}
                placeholder="https://…"
                helperText="Si no ponés una, la app busca una foto por el nombre."
                sx={{ gridColumn: '1 / -1' }}
              />
            </Box>
          </Seccion>

          <Seccion titulo="Ingredientes" ayuda="Sal, pimienta y aceite se dan por hechos: si los agregás, no cuentan para las sugerencias.">
            {errores.ingredientes && <Alert severity="error" variant="outlined" sx={{ mb: 2, borderRadius: '12px' }}>{errores.ingredientes}</Alert>}
            <AnimatePresence initial={false}>
              {form.ingredientes.map((x) => {
                const unidad = unidadDe(x.unidadId)
                const muestraTamanio = Boolean(x.ingrediente?.tieneTamanio && unidad?.tipo === 'conteo')
                const libre = unidad?.tipo === 'libre'
                return (
                  <MotionBox
                    key={x.uid}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30, transition: { duration: 0.15 } }}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: '16px',
                      border: `1px solid ${errores[x.uid] ? colores.falta : colores.linea}`,
                      bgcolor: x.esOpcional ? colores.escarcha : colores.superficie,
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <SelectorIngrediente
                          ingredientes={ingredientes}
                          valor={x.ingrediente}
                          onCambiar={(ing) => elegirIngrediente(x.uid, ing)}
                          onCrearNuevo={(nombre) => setDialogo({ abierto: true, nombre, uid: x.uid })}
                          error={errores[x.uid]}
                        />
                      </Box>
                      <Tooltip title="Quitar">
                        <IconButton onClick={() => quitar('ingredientes', x.uid)} aria-label="Quitar ingrediente" sx={{ mt: 1 }}>
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <TextField
                        size="small"
                        label="Cantidad"
                        value={libre ? '' : x.cantidad}
                        disabled={libre}
                        onChange={(e) => setIng(x.uid, { cantidad: e.target.value.replace(/[^\d.,]/g, '') })}
                        sx={{ width: 110 }}
                        slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                      />
                      <TextField
                        select
                        size="small"
                        label="Unidad"
                        value={x.unidadId}
                        onChange={(e) => setIng(x.uid, { unidadId: e.target.value })}
                        sx={{ width: 160 }}
                      >
                        {unidadesElegibles.map((u) => (
                          <MenuItem key={u.id} value={u.id}>{u.tipo === 'libre' ? 'a gusto' : u.nombrePlural}</MenuItem>
                        ))}
                      </TextField>
                      {muestraTamanio && (
                        <ToggleButtonGroup size="small" exclusive value={x.tamanio} onChange={(_, v) => v && setIng(x.uid, { tamanio: v })} aria-label="Tamaño">
                          {TAMANIOS.map(([v, t]) => <ToggleButton key={v} value={v}>{t}</ToggleButton>)}
                        </ToggleButtonGroup>
                      )}
                      <FormControlLabel
                        control={<Checkbox size="small" checked={x.esOpcional} onChange={(e) => setIng(x.uid, { esOpcional: e.target.checked })} />}
                        label={<Typography variant="body2">Opcional</Typography>}
                        sx={{ ml: 0 }}
                      />
                      <TextField
                        size="small"
                        label="Nota (ej: picada)"
                        value={x.nota}
                        onChange={(e) => setIng(x.uid, { nota: e.target.value })}
                        sx={{ flex: '1 1 160px' }}
                        slotProps={{ htmlInput: { maxLength: 150 } }}
                      />
                    </Box>
                  </MotionBox>
                )
              })}
            </AnimatePresence>
            <Button startIcon={<AddRoundedIcon />} onClick={() => setForm((f) => ({ ...f, ingredientes: [...f.ingredientes, filaIngrediente()] }))}>
              Agregar ingrediente
            </Button>
          </Seccion>

          <Seccion titulo="Preparación" ayuda="Un paso por cada tarea. Indicá el fuego y si la olla va tapada: es lo que más ayuda al cocinar.">
            {errores.pasos && <Alert severity="error" variant="outlined" sx={{ mb: 2, borderRadius: '12px' }}>{errores.pasos}</Alert>}
            <AnimatePresence initial={false}>
              {form.pasos.map((p, i) => (
                <MotionBox
                  key={p.uid}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.15 } }}
                  sx={{ p: 1.5, mb: 1.5, borderRadius: '16px', border: `1px solid ${errores[p.uid] ? colores.falta : colores.linea}` }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: colores.salviaClara, color: colores.albahacaOscura, fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </Box>
                    <TextField
                      size="small"
                      label="Título del paso"
                      placeholder="Ej: Rehogar la cebolla"
                      value={p.titulo}
                      onChange={(e) => setPaso(p.uid, { titulo: e.target.value })}
                      sx={{ flex: 1 }}
                      slotProps={{ htmlInput: { maxLength: 100 } }}
                    />
                    <IconButton size="small" onClick={() => mover(p.uid, -1)} disabled={i === 0} aria-label="Subir paso"><ArrowUpwardRoundedIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => mover(p.uid, 1)} disabled={i === form.pasos.length - 1} aria-label="Bajar paso"><ArrowDownwardRoundedIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => quitar('pasos', p.uid)} aria-label="Quitar paso"><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label="Qué hay que hacer"
                    value={p.descripcion}
                    onChange={(e) => setPaso(p.uid, { descripcion: e.target.value })}
                    error={Boolean(errores[p.uid])}
                    helperText={errores[p.uid]}
                    sx={{ mb: 1.5 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      select
                      size="small"
                      label="Fuego"
                      value={p.fuego}
                      onChange={(e) => setPaso(p.uid, { fuego: e.target.value })}
                      sx={{ width: 190 }}
                    >
                      <MenuItem value=""><em>Sin fuego</em></MenuItem>
                      {FUEGOS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                      <MenuItem value="Horno">Horno</MenuItem>
                    </TextField>
                    {p.fuego === 'Horno' && (
                      <TextField
                        size="small"
                        label="Temperatura °C"
                        value={p.horno}
                        onChange={(e) => setPaso(p.uid, { horno: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        sx={{ width: 140 }}
                        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                      />
                    )}
                    <TextField
                      select
                      size="small"
                      label="Olla"
                      value={p.tapa}
                      onChange={(e) => setPaso(p.uid, { tapa: e.target.value })}
                      sx={{ width: 150 }}
                    >
                      <MenuItem value=""><em>No aplica</em></MenuItem>
                      {TAPAS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </TextField>
                    <TextField
                      size="small"
                      label="Minutos"
                      value={p.minutos}
                      onChange={(e) => setPaso(p.uid, { minutos: e.target.value.replace(/\D/g, '') })}
                      sx={{ width: 100 }}
                      slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                    />
                  </Box>
                </MotionBox>
              ))}
            </AnimatePresence>
            <Button startIcon={<AddRoundedIcon />} onClick={() => setForm((f) => ({ ...f, pasos: [...f.pasos, filaPaso()] }))}>
              Agregar paso
            </Button>
          </Seccion>

          <Seccion titulo="Consejo (opcional)">
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder="Ese secreto que hace la diferencia"
              value={form.consejo}
              onChange={(e) => set('consejo', e.target.value)}
              slotProps={{ htmlInput: { maxLength: 600 } }}
            />
          </Seccion>
        </Box>

        {/* Pie fijo */}
        <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colores.linea}`, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: colores.superficie }}>
          {errorGeneral && <Typography variant="body2" sx={{ color: colores.falta, flex: 1 }}>{errorGeneral}</Typography>}
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={cerrar}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={guardando}>{guardando ? 'Guardando…' : 'Guardar comida'}</Button>
          </Box>
        </Box>
      </Box>

      <DialogoNuevoIngrediente
        abierto={dialogo.abierto}
        nombreInicial={dialogo.nombre}
        categorias={categorias}
        unidades={unidades}
        ingredientes={ingredientes}
        onCerrar={() => setDialogo({ abierto: false, nombre: '', uid: null })}
        onCrear={crear}
      />
    </Drawer>
  )
}
