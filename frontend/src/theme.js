import { createTheme, alpha } from '@mui/material/styles'

// Paleta "heladera": fondo frío como la luz de adentro, verde albahaca y un toque de yema
export const colores = {
  escarcha: '#EEF3F0',
  superficie: '#FFFFFF',
  albahaca: '#2E5E4E',
  albahacaOscura: '#234A3D',
  salvia: '#A9C4B5',
  salviaClara: '#DCE8E1',
  yema: '#E9C46A',
  yemaClara: '#FBF1D6',
  grafito: '#22302B',
  gris: '#5E6E67',
  linea: '#D5E0DA',
  falta: '#B4654A',
}

const display = '"Bricolage Grotesque Variable", "Figtree Variable", system-ui, sans-serif'
const cuerpo = '"Figtree Variable", system-ui, -apple-system, "Segoe UI", sans-serif'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colores.albahaca, dark: colores.albahacaOscura, light: colores.salvia, contrastText: '#fff' },
    secondary: { main: colores.yema, contrastText: colores.grafito },
    error: { main: colores.falta },
    background: { default: colores.escarcha, paper: colores.superficie },
    text: { primary: colores.grafito, secondary: colores.gris },
    divider: colores.linea,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: cuerpo,
    // Escala modular 1.25 sobre 16 px
    h1: { fontFamily: display, fontWeight: 700, fontSize: 'clamp(2.4rem, 5.5vw, 3.9rem)', lineHeight: 1.02, letterSpacing: '-0.035em', fontVariationSettings: '"wdth" 85' },
    h2: { fontFamily: display, fontWeight: 650, fontSize: 'clamp(1.75rem, 3.2vw, 2.45rem)', lineHeight: 1.1, letterSpacing: '-0.025em' },
    h3: { fontFamily: display, fontWeight: 650, fontSize: '1.56rem', lineHeight: 1.15, letterSpacing: '-0.02em' },
    h4: { fontFamily: display, fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.01em' },
    h5: { fontFamily: display, fontWeight: 600, fontSize: '1.06rem', lineHeight: 1.3 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.92rem', lineHeight: 1.55 },
    caption: { fontSize: '0.8rem', lineHeight: 1.4 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  transitions: {
    easing: { easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colores.escarcha, WebkitFontSmoothing: 'antialiased' },
        '::selection': { background: colores.yemaClara },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': { animationDuration: '0.01ms !important', transitionDuration: '0.01ms !important' },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          transition: 'background-color .2s, box-shadow .2s, transform .15s cubic-bezier(0.22,1,0.36,1)',
          '&:active': { transform: 'scale(0.97)' },
        },
        sizeLarge: { paddingBlock: 12, paddingInline: 28, fontSize: '1rem' },
        containedPrimary: {
          '&:hover': { backgroundColor: colores.albahacaOscura, boxShadow: `0 8px 22px ${alpha(colores.albahaca, 0.28)}` },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colores.superficie,
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colores.linea, transition: 'border-color .2s' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colores.salvia },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colores.albahaca, borderWidth: 1.5 },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: colores.grafito, fontSize: '0.8rem', borderRadius: 8 } },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderColor: colores.linea,
          color: colores.gris,
          paddingInline: 14,
          '&.Mui-selected': { backgroundColor: colores.salviaClara, color: colores.albahacaOscura, fontWeight: 600 },
          '&.Mui-selected:hover': { backgroundColor: colores.salviaClara },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    MuiAutocomplete: {
      styleOverrides: {
        paper: { borderRadius: 14, boxShadow: '0 18px 50px rgba(34,48,43,0.14)', border: `1px solid ${colores.linea}` },
        listbox: { padding: 6 },
        option: { borderRadius: 10, margin: '1px 0' },
        groupLabel: {
          fontFamily: display,
          fontSize: '0.82rem',
          fontWeight: 600,
          color: colores.gris,
          lineHeight: '34px',
          backgroundColor: colores.superficie,
        },
      },
    },
  },
})

export default theme
