import { forwardRef } from 'react'
import Grow from '@mui/material/Grow'
import Slide from '@mui/material/Slide'
import useMediaQuery from '@mui/material/useMediaQuery'

/** Apertura de diálogos: crece desde el centro en escritorio, sube desde abajo en el celular */
const Transicion = forwardRef(function Transicion(props, ref) {
  const celular = useMediaQuery('(max-width:600px)')
  if (celular) return <Slide direction="up" ref={ref} timeout={{ enter: 380, exit: 240 }} {...props} />
  return <Grow ref={ref} timeout={{ enter: 340, exit: 200 }} {...props} />
})

export default Transicion
