import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import { colores } from '../theme'

function Marca() {
  return (
    <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden>
      <rect x="10" y="4" width="44" height="56" rx="12" fill={colores.albahaca} />
      <rect x="10" y="24" width="44" height="3" fill={colores.escarcha} />
      <rect x="44" y="10" width="4" height="9" rx="2" fill={colores.yema} />
      <rect x="44" y="32" width="4" height="14" rx="2" fill={colores.yema} />
    </svg>
  )
}

export default function Encabezado({ onAgregarComida }) {
  return (
    <Box component="header" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: { xs: 2.5, md: 3.5 } }}>
      <Marca />
      <Typography sx={{ fontFamily: '"Bricolage Grotesque Variable", sans-serif', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.03em', color: colores.grafito }}>
        Think&amp;Eat
      </Typography>
      <Button
        variant="outlined"
        startIcon={<PostAddRoundedIcon />}
        onClick={onAgregarComida}
        sx={{ ml: 'auto', borderColor: colores.salvia, bgcolor: colores.superficie, '&:hover': { borderColor: colores.albahaca, bgcolor: colores.superficie } }}
      >
        Agregar comida
      </Button>
    </Box>
  )
}
