import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InputAdornment from '@mui/material/InputAdornment'
import ImagenAlimento from './ImagenAlimento'
import { coincide, relevancia, normalizar, formas } from '../utils/texto'
import { colores } from '../theme'

const NUEVO = '__nuevo__'

/** Buscador de ingredientes agrupado por categoría, con opción de crear uno nuevo */
export default function SelectorIngrediente({ ingredientes, valor, onCambiar, onCrearNuevo, error, inputRef }) {
  const filtrar = (opciones, { inputValue }) => {
    const q = inputValue.trim()
    if (!q) return opciones
    const orden = new Map()
    opciones.forEach((o, i) => orden.set(o.id, i))
    const encontrados = opciones
      .filter((o) => coincide(o, q))
      // mantenemos el orden por categoría (para los grupos) y dentro de cada una, lo más parecido primero
      .sort((a, b) => (a.categoria?.orden ?? 0) - (b.categoria?.orden ?? 0) || relevancia(a, q) - relevancia(b, q) || orden.get(a.id) - orden.get(b.id))
    const exacto = opciones.some((o) => formas(o).has(normalizar(q)))
    return exacto ? encontrados : [...encontrados, { id: NUEVO, nombre: q, nuevo: true }]
  }

  return (
    <Autocomplete
      options={ingredientes}
      value={valor}
      onChange={(_, opcion) => {
        if (opcion?.nuevo) onCrearNuevo(opcion.nombre)
        else onCambiar(opcion)
      }}
      filterOptions={filtrar}
      groupBy={(o) => (o.nuevo ? '¿No está en la lista?' : o.categoria?.nombre ?? 'Otros')}
      getOptionLabel={(o) => o?.nombre ?? ''}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      autoHighlight
      openOnFocus
      noOptionsText="Escribí para buscar"
      slotProps={{ listbox: { sx: { maxHeight: 380 } } }}
      renderOption={(props, o) => {
        const { key, ...resto } = props
        if (o.nuevo) {
          return (
            <Box component="li" key={key} {...resto} sx={{ gap: 1.5, py: 1 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: colores.yemaClara, color: colores.grafito }}>
                <AddRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Agregar “{o.nombre}”</Typography>
                <Typography variant="caption" color="text.secondary">Queda guardado para la próxima</Typography>
              </Box>
            </Box>
          )
        }
        return (
          <Box component="li" key={key} {...resto} sx={{ gap: 1.5, py: 0.75 }}>
            <ImagenAlimento tipo="ingrediente" id={o.id} url={o.imagenUrl} emoji={o.emoji} radio={10} sx={{ width: 36, height: 36 }} tamanioEmoji="1.1rem" />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>{o.nombre}</Typography>
              {o.esPersonalizado && <Typography variant="caption" color="text.secondary">Agregado por vos</Typography>}
            </Box>
          </Box>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          label="Ingrediente"
          placeholder="Buscá: papa, carne picada, arroz…"
          error={Boolean(error)}
          helperText={error || ' '}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: valor ? (
                <InputAdornment position="start" sx={{ ml: 0.5 }}>
                  <ImagenAlimento tipo="ingrediente" id={valor.id} url={valor.imagenUrl} emoji={valor.emoji} radio={8} sx={{ width: 28, height: 28 }} tamanioEmoji="0.95rem" />
                </InputAdornment>
              ) : (
                <InputAdornment position="start" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  )
}
