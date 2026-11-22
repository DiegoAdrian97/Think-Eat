import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Encabezado from './components/Encabezado'
import AgregarIngrediente from './components/AgregarIngrediente'
import Heladera from './components/Heladera'
import Sugerencias from './components/Sugerencias'
import DetalleReceta from './components/DetalleReceta'
import { useCatalogo } from './hooks/useCatalogo'
import { useHeladera } from './hooks/useHeladera'
import { api } from './api'
import { colores } from './theme'

export default function App() {
  const catalogo = useCatalogo()
  const heladera = useHeladera()
  const [editando, setEditando] = useState(null)
  const [aviso, setAviso] = useState(null) // { texto, deshacer? }
  const [busqueda, setBusqueda] = useState({ estado: 'inicial', resultado: null, pagina: 1, vistas: [], version: -1, error: null })
  const [recetaAbierta, setRecetaAbierta] = useState(null)
  const ideasRef = useRef(null)

  // Si se borró un ingrediente de la base, lo sacamos de la heladera guardada
  const { estado: estadoCatalogo, ingredientes } = catalogo
  const { depurar } = heladera
  useEffect(() => {
    if (estadoCatalogo === 'listo') depurar(new Set(ingredientes.map((i) => i.id)))
  }, [estadoCatalogo, ingredientes, depurar])

  const notificar = useCallback((texto, deshacer) => setAviso({ texto, deshacer, clave: Date.now() }), [])

  const items = useMemo(
    () => heladera.items.map(({ ingredienteId, cantidad, unidadId, tamanio }) => ({ ingredienteId, cantidad, unidadId, tamanio })),
    [heladera.items],
  )
  const idsEnHeladera = useMemo(() => new Set(heladera.items.map((x) => x.ingredienteId)), [heladera.items])

  const buscar = useCallback(async ({ excluir = [], pagina = 1 } = {}) => {
    if (items.length === 0) return
    setBusqueda((b) => ({ ...b, estado: 'cargando', error: null }))
    if (window.matchMedia('(max-width: 899px)').matches) {
      ideasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    try {
      const resultado = await api.sugerencias(items, excluir)
      setBusqueda({
        estado: 'listo',
        resultado,
        pagina,
        vistas: [...excluir, ...resultado.sugerencias.map((s) => s.id)],
        version: heladera.version,
        error: null,
      })
    } catch (e) {
      setBusqueda((b) => ({ ...b, estado: 'error', error: e.message }))
    }
  }, [items, heladera.version])

  const masAlternativas = () => {
    buscar({ excluir: busqueda.vistas, pagina: busqueda.pagina + 1 })
    ideasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const quitar = (item) => {
    const antes = heladera.items
    const nombre = catalogo.porId.get(item.ingredienteId)?.nombre ?? 'Ingrediente'
    heladera.quitar(item.uid)
    if (editando?.uid === item.uid) setEditando(null)
    notificar(`Sacaste ${nombre.toLowerCase()}`, () => heladera.restaurar(antes))
  }

  const vaciar = () => {
    const antes = heladera.items
    heladera.vaciar()
    setEditando(null)
    notificar('Vaciaste la heladera', () => heladera.restaurar(antes))
  }

  if (catalogo.estado !== 'listo') {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        {catalogo.estado === 'cargando' ? (
          <Box sx={{ color: colores.albahaca }}>
            <CircularProgress color="inherit" size={28} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Abriendo la heladera…</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h3" component="h1" sx={{ mb: 1 }}>No pudimos conectar con el servidor</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>{catalogo.error} Fijate que el backend esté corriendo y que el proyecto de Supabase no esté pausado.</Typography>
            <Button variant="contained" onClick={catalogo.recargar}>Reintentar</Button>
          </Box>
        )}
      </Container>
    )
  }

  const desactualizado = busqueda.estado === 'listo' && busqueda.version !== heladera.version && items.length > 0

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="lg">
        <Encabezado />

        {/* Hero: la carga de ingredientes es la portada */}
        <Box component="main">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            sx={{ mt: { xs: 1, md: 3 }, mb: { xs: 3, md: 4 }, maxWidth: 760 }}
          >
            <Typography variant="h1" sx={{ mb: 2 }}>¿Qué hay en tu heladera?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { sm: '1.12rem' }, maxWidth: '52ch' }}>
              Contanos qué tenés y te damos ideas de almuerzos y cenas caseras, con la receta paso a paso. No hace falta usar todo.
            </Typography>
          </Box>

          <Box component={motion.div} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <AgregarIngrediente
              catalogo={catalogo}
              edicion={editando}
              onAgregar={heladera.agregar}
              onGuardarEdicion={(uid, datos) => {
                heladera.actualizar(uid, datos)
                setEditando(null)
              }}
              onCancelarEdicion={() => setEditando(null)}
              onNotificar={notificar}
            />
          </Box>

          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              display: 'grid',
              gap: { xs: 4, md: 4 },
              gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
              alignItems: 'start',
            }}
          >
            <Box component={motion.div} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }} sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
              <Heladera
                items={heladera.items}
                catalogo={catalogo}
                editandoUid={editando?.uid}
                onEditar={(item) => {
                  setEditando(item)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                onQuitar={quitar}
                onVaciar={vaciar}
                onBuscar={() => buscar()}
                buscando={busqueda.estado === 'cargando'}
              />
            </Box>
            <Box ref={ideasRef} sx={{ scrollMarginTop: 16, minWidth: 0 }}>
              <Sugerencias
                estado={busqueda.estado}
                resultado={busqueda.resultado}
                pagina={busqueda.pagina}
                error={busqueda.error}
                desactualizado={desactualizado}
                onMas={masAlternativas}
                onReiniciar={() => buscar()}
                onActualizar={() => buscar()}
                onAbrir={setRecetaAbierta}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      <DetalleReceta resumen={recetaAbierta} idsEnHeladera={idsEnHeladera} onCerrar={() => setRecetaAbierta(null)} />

      <Snackbar
        key={aviso?.clave}
        open={Boolean(aviso)}
        autoHideDuration={aviso?.deshacer ? 5000 : 2600}
        onClose={(_, motivo) => motivo !== 'clickaway' && setAviso(null)}
        message={aviso?.texto}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{ content: { sx: { bgcolor: colores.grafito, borderRadius: '14px', fontWeight: 500 } } }}
        action={
          aviso?.deshacer ? (
            <Button
              size="small"
              sx={{ color: colores.yema }}
              onClick={() => {
                aviso.deshacer()
                setAviso(null)
              }}
            >
              Deshacer
            </Button>
          ) : null
        }
      />
    </Box>
  )
}
