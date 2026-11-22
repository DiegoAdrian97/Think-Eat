export function normalizar(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function singular(palabra) {
  const p = normalizar(palabra)
  if (p.length > 4 && /(ones|ores|anes|enes|ines)$/.test(p)) return p.slice(0, -2)
  if (p.length > 3 && p.endsWith('es') && !/[aeiou]es$/.test(p)) return p.slice(0, -2)
  if (p.length > 3 && p.endsWith('s')) return p.slice(0, -1)
  return p
}

const singularFrase = (f) => normalizar(f).split(' ').map(singular).join(' ')

/** Formas de nombrar un ingrediente: nombre, plural, sinónimos y sus singulares */
export function formas(ing) {
  if (ing._formas) return ing._formas
  const set = new Set()
  ;[ing.nombre, ing.nombrePlural, ...(ing.sinonimos ? ing.sinonimos.split(',') : [])]
    .filter(Boolean)
    .forEach((f) => {
      set.add(normalizar(f))
      set.add(singularFrase(f))
    })
  Object.defineProperty(ing, '_formas', { value: set, enumerable: false })
  return set
}

/** Filtro del buscador: ignora acentos, mayúsculas, plurales y busca en sinónimos */
export function coincide(ing, consulta) {
  const q = normalizar(consulta)
  if (!q) return true
  const qs = singularFrase(q)
  for (const f of formas(ing)) {
    if (f.includes(q) || f.includes(qs)) return true
  }
  return false
}

/** Ordena para que primero aparezcan los que empiezan con lo buscado */
export function relevancia(ing, consulta) {
  const q = normalizar(consulta)
  const n = normalizar(ing.nombre)
  if (n === q) return 0
  if (n.startsWith(q)) return 1
  if ([...formas(ing)].some((f) => f.startsWith(q))) return 2
  return 3
}
