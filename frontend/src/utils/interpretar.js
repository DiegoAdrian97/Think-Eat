/*
 * Interpreta lo que escribe la persona en la carga rápida.
 *   "2 papas medianas"          -> Papa, 2 unidades, mediano
 *   "medio kilo de carne picada" -> Carne picada, 0,5 kg
 *   "una docena de huevos"      -> Huevo, 1 docena
 *   "leche 1 litro"             -> Leche, 1 l
 */
import { normalizar, singular, formas } from './texto'

const NUMEROS = {
  un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10,
  once: 11, doce: 12, quince: 15, veinte: 20, medio: 0.5, media: 0.5, cuarto: 0.25,
}

// palabra -> abreviatura de la unidad en la base
const UNIDADES = {
  g: 'g', gr: 'g', grs: 'g', gramo: 'g', gramos: 'g',
  kg: 'kg', kgs: 'kg', kilo: 'kg', kilos: 'kg', kilogramo: 'kg', kilogramos: 'kg',
  ml: 'ml', cc: 'ml', mililitro: 'ml', mililitros: 'ml',
  l: 'l', lt: 'l', lts: 'l', litro: 'l', litros: 'l',
  taza: 'taza', tazas: 'taza',
  cda: 'cda', cdas: 'cda', cucharada: 'cda', cucharadas: 'cda',
  cdta: 'cdta', cdtas: 'cdta', cucharadita: 'cdta', cucharaditas: 'cdta',
  u: 'u', un: null, unidad: 'u', unidades: 'u',
  docena: 'docena', docenas: 'docena',
  diente: 'diente', dientes: 'diente',
  atado: 'atado', atados: 'atado',
  feta: 'feta', fetas: 'feta',
  paquete: 'paquete', paquetes: 'paquete',
  caja: 'caja', cajas: 'caja',
  lata: 'lata', latas: 'lata',
  pizca: 'pizca', pizcas: 'pizca',
}

const TAMANIOS = {
  chico: 'chico', chica: 'chico', chicos: 'chico', chicas: 'chico', pequeno: 'chico', pequena: 'chico', pequenos: 'chico', pequenas: 'chico',
  mediano: 'mediano', mediana: 'mediano', medianos: 'mediano', medianas: 'mediano',
  grande: 'grande', grandes: 'grande',
}

const RELLENO = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'con', 'y', 'tengo', 'hay', 'aprox', 'aproximadamente', 'mas', 'o', 'menos'])

function buscarIngrediente(texto, ingredientes) {
  const t = normalizar(texto)
  if (!t) return null
  const ts = t.split(' ').map(singular).join(' ')
  // 1) Coincidencia exacta con nombre, plural o sinónimo
  for (const ing of ingredientes) {
    const f = formas(ing)
    if (f.has(t) || f.has(ts)) return ing
  }
  // 2) La forma más larga contenida en el texto ("carne picada especial" -> Carne picada)
  let mejor = null
  let largo = 0
  for (const ing of ingredientes) {
    for (const f of formas(ing)) {
      if (f.length > largo && f.length >= 3 && (` ${ts} `.includes(` ${f} `) || ` ${t} `.includes(` ${f} `))) {
        mejor = ing
        largo = f.length
      }
    }
  }
  if (mejor) return mejor
  // 3) Una forma que empiece con lo escrito ("zapalli" -> Zapallito)
  if (t.length >= 3) {
    return ingredientes.find((ing) => [...formas(ing)].some((f) => f.startsWith(t))) ?? null
  }
  return null
}

export function interpretar(texto, ingredientes, unidades) {
  const limpio = normalizar(texto).replace(/(\d),(\d)/g, '$1.$2')
  if (!limpio) return null
  const tokens = limpio.match(/\d+\/\d+|\d+(?:\.\d+)?|[a-zñ]+/g) ?? []

  let cantidad = null
  let abrev = null
  let tamanio = null
  const resto = []

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    if (/^\d+\/\d+$/.test(tok)) {
      const [a, b] = tok.split('/').map(Number)
      if (b) cantidad = (cantidad ?? 0) + a / b
      continue
    }
    if (/^\d/.test(tok)) {
      // "1 1/2" suma; si no, reemplaza
      cantidad = cantidad !== null && cantidad >= 1 && Number(tok) < 1 ? cantidad + Number(tok) : Number(tok)
      continue
    }
    // "medio kilo", "kilo y medio", "dos y media"
    if (tok in NUMEROS) {
      const esMedio = tok === 'medio' || tok === 'media'
      if (esMedio && tokens[i - 1] === 'y') cantidad = (cantidad ?? 1) + 0.5
      else if (cantidad === null) cantidad = NUMEROS[tok]
      continue
    }
    if (tok in UNIDADES && UNIDADES[tok] && !abrev) {
      // "l" o "u" sueltas solo cuentan si vienen después de un número
      if ((tok === 'l' || tok === 'u' || tok === 'g') && cantidad === null) {
        resto.push(tok)
        continue
      }
      abrev = UNIDADES[tok]
      continue
    }
    if (tok in TAMANIOS && !tamanio) {
      tamanio = TAMANIOS[tok]
      continue
    }
    if (!RELLENO.has(tok)) resto.push(tok)
  }

  const ingrediente = buscarIngrediente(resto.join(' '), ingredientes)
  const unidad = abrev
    ? unidades.find((u) => u.abreviatura === abrev)
    : unidades.find((u) => u.id === ingrediente?.unidadDefaultId)

  // Sin número: "kilo de papa" es 1 kg y "cebolla" es 1 unidad,
  // pero "queso rallado" a secas no tiene una cantidad razonable para adivinar
  let cantidadFinal = cantidad
  if (cantidadFinal === null && (abrev || unidad?.tipo === 'conteo')) cantidadFinal = 1

  return {
    ingrediente,
    textoIngrediente: resto.join(' '),
    cantidad: cantidadFinal,
    unidad: unidad ?? null,
    tamanio: ingrediente?.tieneTamanio && unidad?.tipo === 'conteo' ? (tamanio ?? 'mediano') : null,
  }
}
