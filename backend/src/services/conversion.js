/*
 * Convierte cantidades a una medida comparable.
 * Todo lo que se puede pasar a gramos se pasa a gramos (los ml se toman como
 * gramos: es una aproximación suficiente para saber si "alcanza").
 * Lo que solo se puede contar (y no tiene peso por unidad) queda en unidades.
 */
const FACTOR_TAMANIO = { chico: 0.7, mediano: 1, grande: 1.4 };

function aComparable({ cantidad, unidad, ingrediente, tamanio }) {
  if (!unidad || unidad.tipo === 'libre' || cantidad === null || cantidad === undefined) return null;
  const cant = Number(cantidad);
  if (!Number.isFinite(cant) || cant <= 0) return null;
  const factor = Number(unidad.factorBase) || 1;

  if (unidad.tipo === 'conteo') {
    const tam = ingrediente?.tieneTamanio ? (FACTOR_TAMANIO[tamanio] ?? 1) : 1;
    const peso = ingrediente?.pesoUnidadGr ? Number(ingrediente.pesoUnidadGr) : null;
    if (peso) return { valor: cant * factor * peso * tam, medida: 'g' };
    return { valor: cant * factor * tam, medida: 'u' };
  }
  // masa y volumen
  return { valor: cant * factor, medida: 'g' };
}

module.exports = { aComparable, FACTOR_TAMANIO };
