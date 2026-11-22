const FRACCIONES = { 0.25: '¼', 0.5: '½', 0.75: '¾' }

/** 1.5 -> "1 ½", 0.25 -> "¼", 2 -> "2", 1.33 -> "1,3" */
export function numero(n) {
  if (n === null || n === undefined) return ''
  const entero = Math.floor(n)
  const resto = Math.round((n - entero) * 100) / 100
  if (resto === 0) return String(entero)
  if (FRACCIONES[resto]) return entero ? `${entero} ${FRACCIONES[resto]}` : FRACCIONES[resto]
  return n.toLocaleString('es-AR', { maximumFractionDigits: 2 })
}

const TAMANIOS = {
  chico: ['chico', 'chicos'],
  mediano: ['mediano', 'medianos'],
  grande: ['grande', 'grandes'],
}

// Los ingredientes femeninos llevan "chica/mediana" (papa, cebolla, batata...)
const esFemenino = (nombre = '') => /a$|cion$|ión$/i.test(nombre.split(' ')[0])

export function textoTamanio(tamanio, cantidad = 1, nombre = '') {
  if (!tamanio) return ''
  let [sing, plur] = TAMANIOS[tamanio] ?? [tamanio, tamanio]
  if (esFemenino(nombre) && tamanio !== 'grande') {
    sing = sing.replace(/o$/, 'a')
    plur = plur.replace(/os$/, 'as')
  }
  return cantidad === 1 ? sing : plur
}

/**
 * Texto legible de una cantidad.
 *   (2, unidad, mediano, Papa)  -> "2 unidades medianas"
 *   (500, gramo)               -> "500 g"
 *   (null, a gusto)            -> "a gusto"
 */
export function cantidadLegible(cantidad, unidad, tamanio, nombre) {
  if (!unidad) return numero(cantidad)
  if (unidad.tipo === 'libre' || cantidad === null || cantidad === undefined) return 'a gusto'
  const abreviables = ['g', 'kg', 'ml', 'l']
  const n = numero(cantidad)
  let base
  if (abreviables.includes(unidad.abreviatura)) base = `${n} ${unidad.abreviatura}`
  else base = `${n} ${cantidad <= 1 ? unidad.nombre : unidad.nombrePlural}`
  const tam = textoTamanio(tamanio, cantidad, nombre)
  return tam ? `${base} ${tam}` : base
}

/**
 * Escala una cantidad de receta a otra cantidad de porciones y la redondea
 * a algo que se pueda medir en la cocina.
 */
export function escalar(cantidad, unidad, factor) {
  if (cantidad === null || cantidad === undefined || !unidad || unidad.tipo === 'libre' || factor === 1) return cantidad
  const v = cantidad * factor
  const redondear = (paso) => Math.max(paso, Math.round(v / paso) * paso)
  switch (unidad.abreviatura) {
    case 'g':
    case 'ml':
      if (v < 20) return redondear(1)
      if (v < 100) return redondear(5)
      if (v < 500) return redondear(10)
      return redondear(50)
    case 'kg':
    case 'l':
    case 'taza':
    case 'cda':
    case 'cdta':
      return redondear(0.25)
    case 'pizca':
      return Math.max(1, Math.round(v))
    default:
      // unidades que se cuentan: de a media
      return redondear(0.5)
  }
}
