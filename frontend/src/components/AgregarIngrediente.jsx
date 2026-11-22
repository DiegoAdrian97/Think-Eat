import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputAdornment from '@mui/material/InputAdornment'
import Collapse from '@mui/material/Collapse'
import Link from '@mui/material/Link'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import SelectorIngrediente from './SelectorIngrediente'
import DialogoNuevoIngrediente from './DialogoNuevoIngrediente'
import { interpretar } from '../utils/interpretar'
import { colores } from '../theme'

const PASO = { g: 50, ml: 50, kg: 0.5, l: 0.5, taza: 0.5, cda: 1, cdta: 1 }
const TAMANIOS = [
  ['chico', 'Chico'],
  ['mediano', 'Mediano'],
  ['grande', 'Grande'],
]

const vacio = { ingrediente: null, cantidad: '1', unidadId: '', tamanio: 'mediano' }

export default function AgregarIngrediente({ catalogo, edicion, onAgregar, onGuardarEdicion, onCancelarEdicion, onNotificar }) {
  const { ingredientes, unidades, categorias, porId, crearIngrediente } = catalogo
  const [texto, setTexto] = useState('')
  const [form, setForm] = useState(vacio)
  const [noEncontrado, setNoEncontrado] = useState('')
  const [errores, setErrores] = useState({})
  const [dialogo, setDialogo] = useState({ abierto: false, nombre: '' })
  const textoRef = useRef(null)
  const angosto = useMediaQuery('(max-width:600px)')
  const cantidadRef = useRef(null)

  const unidadesElegibles = useMemo(() => unidades.filter((u) => u.tipo !== 'libre'), [unidades])
  const unidad = unidades.find((u) => u.id === form.unidadId)
  const muestraTamanio = Boolean(form.ingrediente?.tieneTamanio && unidad?.tipo === 'conteo')

  // Al editar un item de la heladera, se carga en el formulario
  useEffect(() => {
    if (!edicion) return
    setForm({
      ingrediente: porId.get(edicion.ingredienteId) ?? null,
      cantidad: String(edicion.cantidad),
      unidadId: edicion.unidadId,
      tamanio: edicion.tamanio ?? 'mediano',
    })
    setTexto('')
    setErrores({})
    setTimeout(() => cantidadRef.current?.focus(), 50)
  }, [edicion, porId])

  const elegirIngrediente = (ing) => {
    setErrores((e) => ({ ...e, ingrediente: null }))
    setNoEncontrado('')
    setForm((f) => ({ ...f, ingrediente: ing, unidadId: ing ? ing.unidadDefaultId : '', tamanio: 'mediano' }))
    if (ing) setTimeout(() => cantidadRef.current?.select(), 30)
  }

  // Carga rápida: "2 papas medianas" completa el formulario solo
  const alEscribir = (valor) => {
    setTexto(valor)
    const r = interpretar(valor, ingredientes, unidades)
    if (!r || !valor.trim()) {
      setNoEncontrado('')
      return
    }
    if (r.ingrediente) {
      setNoEncontrado('')
      setErrores({})
      setForm({
        ingrediente: r.ingrediente,
        cantidad: r.cantidad === null ? '' : String(r.cantidad),
        unidadId: r.unidad?.id ?? r.ingrediente.unidadDefaultId,
        tamanio: r.tamanio ?? 'mediano',
      })
    } else {
      setNoEncontrado(r.textoIngrediente)
    }
  }

  const cambiarCantidad = (delta) => {
    const paso = PASO[unidad?.abreviatura] ?? 1
    const actual = Number(form.cantidad) || 0
    const nuevo = Math.max(paso, Math.round((actual + delta * paso) * 100) / 100)
    setForm((f) => ({ ...f, cantidad: String(nuevo) }))
    setErrores((e) => ({ ...e, cantidad: null }))
  }

  const reiniciar = () => {
    setForm(vacio)
    setTexto('')
    setNoEncontrado('')
    setErrores({})
  }

  const enviar = (e) => {
    e?.preventDefault()
    const cantidad = Number(String(form.cantidad).replace(',', '.'))
    const errs = {}
    if (!form.ingrediente) errs.ingrediente = 'Elegí un ingrediente de la lista.'
    if (!Number.isFinite(cantidad) || cantidad <= 0) errs.cantidad = 'Poné cuánto tenés.'
    if (!form.unidadId) errs.unidad = 'Elegí la unidad.'
    setErrores(errs)
    if (Object.keys(errs).length) {
      if (errs.cantidad && !errs.ingrediente) cantidadRef.current?.focus()
      return
    }
    const item = {
      ingredienteId: form.ingrediente.id,
      cantidad,
      unidadId: form.unidadId,
      tamanio: muestraTamanio ? form.tamanio : null,
    }
    if (edicion) {
      onGuardarEdicion(edicion.uid, item)
      onNotificar(`Actualizaste ${form.ingrediente.nombre.toLowerCase()}`)
    } else {
      const res = onAgregar(item)
      onNotificar(res === 'sumado' ? `Sumaste más ${form.ingrediente.nombre.toLowerCase()}` : `${form.ingrediente.nombre} está en tu heladera`)
    }
    reiniciar()
    textoRef.current?.focus()
  }

  const crear = async (datos) => {
    const { ingrediente, existia } = await crearIngrediente(datos)
    setDialogo({ abierto: false, nombre: '' })
    // Si venía de la carga rápida ("300 g de quinoa"), conservamos cantidad y unidad
    const r = texto.trim() ? interpretar(texto, [ingrediente], unidades) : null
    if (r?.ingrediente) {
      setNoEncontrado('')
      setForm({
        ingrediente,
        cantidad: r.cantidad === null ? '' : String(r.cantidad),
        unidadId: r.unidad?.id ?? ingrediente.unidadDefaultId,
        tamanio: r.tamanio ?? 'mediano',
      })
    } else {
      elegirIngrediente(ingrediente)
    }
    onNotificar(existia ? `${ingrediente.nombre} ya estaba en la lista` : `Guardaste ${ingrediente.nombre} como ingrediente nuevo`)
  }

  return (
    <Paper
      component="form"
      onSubmit={enviar}
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: '24px', border: `1px solid ${colores.linea}`, boxShadow: '0 1px 0 rgba(34,48,43,0.04), 0 24px 60px -30px rgba(46,94,78,0.35)' }}
    >
      {/* Carga rápida */}
      <TextField
        fullWidth
        inputRef={textoRef}
        value={texto}
        onChange={(e) => alEscribir(e.target.value)}
        placeholder={angosto ? 'Ej: 2 papas medianas' : 'Escribilo como te salga: 2 papas medianas, medio kilo de carne picada…'}
        autoComplete="off"
        slotProps={{
          htmlInput: { 'aria-label': 'Carga rápida de ingrediente' },
          input: {
            sx: { fontSize: { xs: '1rem', sm: '1.12rem' }, py: 0.5, borderRadius: '16px', bgcolor: colores.escarcha },
            startAdornment: (
              <InputAdornment position="start">
                <BoltRoundedIcon sx={{ color: colores.albahaca }} />
              </InputAdornment>
            ),
            endAdornment: texto && (
              <InputAdornment position="end" sx={{ display: { xs: 'none', sm: 'flex' }, color: 'text.secondary', gap: 0.5 }}>
                <Typography variant="caption">Enter para agregar</Typography>
                <KeyboardReturnRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Collapse in={Boolean(noEncontrado)}>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 1 }}>
          No tenemos “{noEncontrado}” en la lista.{' '}
          <Link component="button" type="button" onClick={() => setDialogo({ abierto: true, nombre: noEncontrado })} sx={{ fontWeight: 600, verticalAlign: 'baseline' }}>
            Agregarlo como ingrediente nuevo
          </Link>
        </Typography>
      </Collapse>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, mb: 1.5, ml: 0.5 }}>
        {edicion ? 'Editando un ingrediente de tu heladera' : 'O elegilo de la lista'}
      </Typography>

      {/* Formulario detallado */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'flex-start' }}>
        <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
          <SelectorIngrediente
            ingredientes={ingredientes}
            valor={form.ingrediente}
            onCambiar={elegirIngrediente}
            onCrearNuevo={(nombre) => setDialogo({ abierto: true, nombre })}
            error={errores.ingrediente}
          />
        </Box>

        <TextField
          label="Cantidad"
          value={form.cantidad}
          inputRef={cantidadRef}
          onChange={(e) => {
            setForm((f) => ({ ...f, cantidad: e.target.value.replace(/[^\d.,]/g, '') }))
            setErrores((x) => ({ ...x, cantidad: null }))
          }}
          error={Boolean(errores.cantidad)}
          helperText={errores.cantidad || ' '}
          sx={{ width: { xs: 'calc(50% - 6px)', sm: 158 } }}
          slotProps={{
            htmlInput: { inputMode: 'decimal', style: { textAlign: 'center' }, 'aria-label': 'Cantidad' },
            input: {
              sx: { px: 0.5 },
              startAdornment: (
                <IconButton size="small" aria-label="Restar" onClick={() => cambiarCantidad(-1)} edge="start">
                  <RemoveRoundedIcon fontSize="small" />
                </IconButton>
              ),
              endAdornment: (
                <IconButton size="small" aria-label="Sumar" onClick={() => cambiarCantidad(1)} edge="end">
                  <AddRoundedIcon fontSize="small" />
                </IconButton>
              ),
            },
          }}
        />

        <TextField
          select
          label="Unidad"
          value={form.unidadId}
          onChange={(e) => setForm((f) => ({ ...f, unidadId: e.target.value }))}
          error={Boolean(errores.unidad)}
          helperText={errores.unidad || ' '}
          sx={{ width: { xs: 'calc(50% - 6px)', sm: 170 } }}
        >
          {unidadesElegibles.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {['g', 'kg', 'ml', 'l'].includes(u.abreviatura) ? `${u.nombrePlural} (${u.abreviatura})` : u.nombrePlural}
            </MenuItem>
          ))}
        </TextField>

        <Collapse in={muestraTamanio} orientation="horizontal" unmountOnExit>
          <Box sx={{ pt: { xs: 0, sm: '1px' } }}>
            <ToggleButtonGroup
              exclusive
              value={form.tamanio}
              onChange={(_, v) => v && setForm((f) => ({ ...f, tamanio: v }))}
              aria-label="Tamaño"
              sx={{ height: 56, bgcolor: 'background.paper' }}
            >
              {TAMANIOS.map(([v, t]) => (
                <ToggleButton key={v} value={v} aria-label={t}>{t}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Collapse>

        <Box sx={{ display: 'flex', gap: 1, flex: { xs: '1 1 100%', md: '0 0 auto' } }}>
          {edicion && (
            <Button size="large" color="inherit" onClick={() => { reiniciar(); onCancelarEdicion() }} sx={{ height: 56 }}>
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" size="large" startIcon={edicion ? null : <AddRoundedIcon />} sx={{ height: 56, flex: { xs: 1, md: '0 0 auto' } }}>
            {edicion ? 'Guardar cambios' : 'Agregar'}
          </Button>
        </Box>
      </Box>

      <DialogoNuevoIngrediente
        abierto={dialogo.abierto}
        nombreInicial={dialogo.nombre}
        categorias={categorias}
        unidades={unidades}
        onCerrar={() => setDialogo({ abierto: false, nombre: '' })}
        onCrear={crear}
      />
    </Paper>
  )
}
