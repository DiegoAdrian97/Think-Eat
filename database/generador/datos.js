/*
 * Datos base de Think&Eat.
 * Este archivo es la fuente de verdad: el generador (generar.js) lo lee y
 * escribe el script de datos para Supabase (database/02_datos.sql).
 * Si querés sumar recetas, agregalas acá y volvé a correr: node generar.js
 */

// ---------------------------------------------------------------------------
// Categorías de ingredientes
// ---------------------------------------------------------------------------
const categorias = [
  { key: 'verduras', nombre: 'Verduras y hortalizas', emoji: '🥕' },
  { key: 'frutas', nombre: 'Frutas', emoji: '🍋' },
  { key: 'carnes', nombre: 'Carnes', emoji: '🥩' },
  { key: 'aves', nombre: 'Pollo', emoji: '🍗' },
  { key: 'pescados', nombre: 'Pescados', emoji: '🐟' },
  { key: 'fiambres', nombre: 'Fiambres y embutidos', emoji: '🥓' },
  { key: 'lacteos', nombre: 'Lácteos y huevos', emoji: '🧀' },
  { key: 'legumbres', nombre: 'Legumbres', emoji: '🫘' },
  { key: 'harinas', nombre: 'Harinas, cereales y pastas', emoji: '🌾' },
  { key: 'panificados', nombre: 'Panes y masas', emoji: '🥖' },
  { key: 'almacen', nombre: 'Almacén', emoji: '🫙' },
  { key: 'condimentos', nombre: 'Condimentos y especias', emoji: '🧂' },
];

// ---------------------------------------------------------------------------
// Unidades
// tipo: conteo (se cuenta), masa (gramos), volumen (ml), libre (a gusto)
// factor: cuánto vale 1 de esta unidad en la unidad base de su tipo
//   conteo -> unidades, masa -> gramos, volumen -> mililitros
// ---------------------------------------------------------------------------
const unidades = [
  { abrev: 'u', nombre: 'unidad', plural: 'unidades', tipo: 'conteo', factor: 1 },
  { abrev: 'docena', nombre: 'docena', plural: 'docenas', tipo: 'conteo', factor: 12 },
  { abrev: 'diente', nombre: 'diente', plural: 'dientes', tipo: 'conteo', factor: 1 },
  { abrev: 'atado', nombre: 'atado', plural: 'atados', tipo: 'conteo', factor: 1 },
  { abrev: 'feta', nombre: 'feta', plural: 'fetas', tipo: 'conteo', factor: 1 },
  { abrev: 'paquete', nombre: 'paquete', plural: 'paquetes', tipo: 'conteo', factor: 1 },
  { abrev: 'caja', nombre: 'caja', plural: 'cajas', tipo: 'conteo', factor: 1 },
  { abrev: 'lata', nombre: 'lata', plural: 'latas', tipo: 'conteo', factor: 1 },
  { abrev: 'g', nombre: 'gramo', plural: 'gramos', tipo: 'masa', factor: 1 },
  { abrev: 'kg', nombre: 'kilo', plural: 'kilos', tipo: 'masa', factor: 1000 },
  { abrev: 'ml', nombre: 'mililitro', plural: 'mililitros', tipo: 'volumen', factor: 1 },
  { abrev: 'l', nombre: 'litro', plural: 'litros', tipo: 'volumen', factor: 1000 },
  { abrev: 'taza', nombre: 'taza', plural: 'tazas', tipo: 'volumen', factor: 240 },
  { abrev: 'cda', nombre: 'cucharada', plural: 'cucharadas', tipo: 'volumen', factor: 15 },
  { abrev: 'cdta', nombre: 'cucharadita', plural: 'cucharaditas', tipo: 'volumen', factor: 5 },
  { abrev: 'pizca', nombre: 'pizca', plural: 'pizcas', tipo: 'masa', factor: 0.5 },
  { abrev: 'cn', nombre: 'a gusto', plural: 'a gusto', tipo: 'libre', factor: 1 },
];

// ---------------------------------------------------------------------------
// Ingredientes
// i(key, nombre, plural, categoria, emoji, unidadDefault, pesoUnidadGr, opciones)
//   pesoUnidadGr: peso aproximado de 1 unidad mediana (o de 1 paquete / lata / atado)
//   opciones: { tam: tiene tamaño chico/mediano/grande, basico: se asume que
//               siempre hay (sal, aceite...), sin: sinónimos, img: búsqueda
//               de imagen en Wikipedia }
// ---------------------------------------------------------------------------
const ingredientes = [];
function i(key, nombre, plural, cat, emoji, unidad, peso, o = {}) {
  ingredientes.push({ key, nombre, plural, cat, emoji, unidad, peso, ...o });
}

// Verduras
i('papa', 'Papa', 'Papas', 'verduras', '🥔', 'u', 170, { tam: true, sin: 'patata,patatas', img: 'Solanum tuberosum' });
i('batata', 'Batata', 'Batatas', 'verduras', '🍠', 'u', 250, { tam: true, sin: 'boniato,camote', img: 'Ipomoea batatas' });
i('cebolla', 'Cebolla', 'Cebollas', 'verduras', '🧅', 'u', 150, { tam: true, sin: 'cebolla blanca,cebolla morada', img: 'Allium cepa' });
i('verdeo', 'Cebolla de verdeo', 'Cebollas de verdeo', 'verduras', '🌱', 'u', 30, { sin: 'verdeo,cebollita de verdeo,cebolleta', img: 'Allium fistulosum' });
i('ajo', 'Ajo', 'Ajos', 'verduras', '🧄', 'diente', 5, { sin: 'diente de ajo,dientes de ajo,cabeza de ajo', img: 'Allium sativum' });
i('tomate', 'Tomate', 'Tomates', 'verduras', '🍅', 'u', 150, { tam: true, sin: 'tomate perita,tomate redondo', img: 'Solanum lycopersicum' });
i('zanahoria', 'Zanahoria', 'Zanahorias', 'verduras', '🥕', 'u', 100, { tam: true, img: 'Daucus carota' });
i('zapallo', 'Zapallo', 'Zapallos', 'verduras', '🎃', 'g', 1200, { tam: true, sin: 'calabaza,anco,zapallo anco,zapallo plomo,calabacita', img: 'Cucurbita moschata' });
i('zapallito', 'Zapallito', 'Zapallitos', 'verduras', '🟢', 'u', 200, { tam: true, sin: 'zapallito redondo,zapallito verde,zapallito de tronco', img: 'Zapallito' });
i('zucchini', 'Zucchini', 'Zucchinis', 'verduras', '🥒', 'u', 250, { tam: true, sin: 'zuquini,zuchini,calabacin,calabacín', img: 'Calabacín' });
i('morron_rojo', 'Morrón rojo', 'Morrones rojos', 'verduras', '🫑', 'u', 200, { tam: true, sin: 'morron,morrón,pimiento rojo,aji morron,ají morrón,pimiento', img: 'Capsicum annuum' });
i('morron_verde', 'Morrón verde', 'Morrones verdes', 'verduras', '🫑', 'u', 180, { tam: true, sin: 'pimiento verde,aji verde,ají verde', img: 'Pimiento verde' });
i('lechuga', 'Lechuga', 'Lechugas', 'verduras', '🥬', 'u', 400, { sin: 'lechuga criolla,lechuga mantecosa', img: 'Lactuca sativa' });
i('acelga', 'Acelga', 'Acelgas', 'verduras', '🥬', 'atado', 600, { img: 'Beta vulgaris var. cicla' });
i('espinaca', 'Espinaca', 'Espinacas', 'verduras', '🥬', 'atado', 400, { img: 'Spinacia oleracea' });
i('choclo', 'Choclo', 'Choclos', 'verduras', '🌽', 'u', 250, { tam: true, sin: 'maiz,maíz,mazorca,choclo en lata,choclo amarillo', img: 'Zea mays' });
i('berenjena', 'Berenjena', 'Berenjenas', 'verduras', '🍆', 'u', 300, { tam: true, img: 'Solanum melongena' });
i('puerro', 'Puerro', 'Puerros', 'verduras', '🌿', 'u', 200, { img: 'Allium ampeloprasum' });
i('apio', 'Apio', 'Apios', 'verduras', '🌿', 'u', 50, { sin: 'rama de apio,ramas de apio', img: 'Apium graveolens' });
i('perejil', 'Perejil', 'Perejil', 'verduras', '🌿', 'atado', 50, { sin: 'perejil fresco', img: 'Petroselinum crispum' });
i('albahaca', 'Albahaca', 'Albahaca', 'verduras', '🌿', 'atado', 30, { sin: 'albahaca fresca', img: 'Ocimum basilicum' });
i('champinones', 'Champiñones', 'Champiñones', 'verduras', '🍄', 'g', 20, { sin: 'champignones,champiñon,champignon,hongos,hongos frescos', img: 'Agaricus bisporus' });
i('brocoli', 'Brócoli', 'Brócolis', 'verduras', '🥦', 'u', 400, { sin: 'brocoli,brócoli', img: 'Brócoli' });

// Frutas
i('limon', 'Limón', 'Limones', 'frutas', '🍋', 'u', 120, { tam: true, sin: 'limon,limones,jugo de limon', img: 'Limón' });
i('duraznos_almibar', 'Duraznos en almíbar', 'Duraznos en almíbar', 'frutas', '🍑', 'lata', 820, { sin: 'durazno,duraznos,durazno en lata', img: 'Prunus persica' });

// Carnes
i('carne_picada', 'Carne picada', 'Carne picada', 'carnes', '🥩', 'g', null, { sin: 'picada,carne molida,molida,carne picada especial', img: 'Carne picada' });
i('nalga', 'Carne para milanesas', 'Carne para milanesas', 'carnes', '🥩', 'g', 150, { sin: 'nalga,peceto,bola de lomo,cuadrada,milanesas,carne de milanesa', img: 'Milanesa' });
i('carne_guiso', 'Carne para guiso', 'Carne para guiso', 'carnes', '🥩', 'g', null, { sin: 'roast beef,paleta,aguja,carne para estofado,tapa de asado,cubos de carne', img: 'Estofado' });
i('bife', 'Bife', 'Bifes', 'carnes', '🥩', 'u', 250, { tam: true, sin: 'bife de chorizo,cuadril,bife ancho,bifes,churrasco,churrascos', img: 'Bife de chorizo' });
i('falda', 'Carne para puchero', 'Carne para puchero', 'carnes', '🍖', 'g', null, { sin: 'falda,osobuco,ossobuco,carne con hueso,pecho', img: 'Puchero' });
i('matambre', 'Matambre', 'Matambres', 'carnes', '🥩', 'g', 1200, { sin: 'matambre vacuno', img: 'Matambre' });

// Pollo
i('pollo', 'Pollo en presas', 'Presas de pollo', 'aves', '🍗', 'u', 250, { sin: 'pollo,pollo entero,muslos,muslo,patas,pata muslo,presas de pollo,cuartos de pollo', img: 'Carne de pollo' });
i('pechuga', 'Pechuga de pollo', 'Pechugas de pollo', 'aves', '🍗', 'u', 300, { tam: true, sin: 'suprema,supremas,pechugas,filet de pollo', img: 'Pechuga' });

// Pescados
i('merluza', 'Filet de merluza', 'Filets de merluza', 'pescados', '🐟', 'u', 150, { sin: 'merluza,pescado,filet de pescado,filet,pescado blanco,abadejo', img: 'Merluccius hubbsi' });
i('atun', 'Atún en lata', 'Latas de atún', 'pescados', '🐟', 'lata', 170, { sin: 'atun,atún,lomitos de atún', img: 'Atún' });

// Fiambres y embutidos
i('chorizo', 'Chorizo', 'Chorizos', 'fiambres', '🌭', 'u', 120, { sin: 'chorizo parrillero,chorizo colorado,choripan', img: 'Chorizo' });
i('panceta', 'Panceta', 'Panceta', 'fiambres', '🥓', 'g', 15, { sin: 'bacon,beicon,tocino,panceta ahumada', img: 'Panceta' });
i('jamon', 'Jamón cocido', 'Jamón cocido', 'fiambres', '🍖', 'g', 20, { sin: 'jamon,jamón,jamon cocido,fetas de jamon', img: 'Jamón cocido' });

// Lácteos y huevos
i('huevo', 'Huevo', 'Huevos', 'lacteos', '🥚', 'u', 50, { tam: true, sin: 'huevos', img: 'Huevo (alimento)' });
i('leche', 'Leche', 'Leche', 'lacteos', '🥛', 'ml', null, { sin: 'leche entera,leche descremada', img: 'Leche' });
i('manteca', 'Manteca', 'Manteca', 'lacteos', '🧈', 'g', 200, { sin: 'mantequilla', img: 'Mantequilla' });
i('crema', 'Crema de leche', 'Crema de leche', 'lacteos', '🥛', 'ml', 200, { sin: 'crema,nata,crema para cocinar', img: 'Nata (lácteo)' });
i('queso_rallado', 'Queso rallado', 'Queso rallado', 'lacteos', '🧀', 'g', null, { sin: 'reggianito,parmesano,queso sardo,sardo,queso duro', img: 'Queso Reggianito' });
i('queso_cremoso', 'Queso cremoso', 'Queso cremoso', 'lacteos', '🧀', 'g', 20, { sin: 'cremoso,queso fresco,port salut,queso de maquina,queso de máquina,queso tybo,tybo,queso en fetas', img: 'Queso cremoso' });
i('muzzarella', 'Muzzarella', 'Muzzarella', 'lacteos', '🧀', 'g', null, { sin: 'mozzarella,mozarella,muzarela,muzza', img: 'Mozzarella' });
i('provolone', 'Queso provolone', 'Queso provolone', 'lacteos', '🧀', 'g', 200, { sin: 'provoleta,provolone', img: 'Provolone' });
i('ricota', 'Ricota', 'Ricota', 'lacteos', '🥣', 'g', null, { sin: 'ricotta,requesón', img: 'Ricota' });

// Legumbres
i('lentejas', 'Lentejas', 'Lentejas', 'legumbres', '🫘', 'g', null, { sin: 'lenteja,lentejas secas', img: 'Lens culinaris' });
i('garbanzos', 'Garbanzos', 'Garbanzos', 'legumbres', '🫘', 'g', null, { sin: 'garbanzo', img: 'Cicer arietinum' });
i('porotos', 'Porotos blancos', 'Porotos blancos', 'legumbres', '🫘', 'g', null, { sin: 'porotos,poroto,alubias,porotos alubia,frijoles,porotos pallares', img: 'Phaseolus vulgaris' });
i('arvejas', 'Arvejas', 'Arvejas', 'legumbres', '🫛', 'lata', 300, { sin: 'arveja,arvejas en lata,guisantes,chícharos,arvejas congeladas', img: 'Pisum sativum' });
i('maiz_partido', 'Maíz blanco partido', 'Maíz blanco partido', 'legumbres', '🌽', 'g', null, { sin: 'maiz blanco,maíz blanco,maiz para locro,maíz pisado,maiz pisado', img: 'Locro' });

// Harinas, cereales y pastas
i('arroz', 'Arroz', 'Arroz', 'harinas', '🍚', 'g', 1000, { sin: 'arroz largo fino,arroz doble carolina,arroz blanco', img: 'Arroz' });
i('fideos', 'Fideos secos', 'Fideos secos', 'harinas', '🍝', 'g', 500, { sin: 'fideos,spaghetti,espaguetis,tallarines,mostachol,tirabuzon,tirabuzón,moñitos,pasta,pasta seca,codito,coditos,municiones,cabello de angel', img: 'Espaguetis' });
i('harina', 'Harina 0000', 'Harina 0000', 'harinas', '🌾', 'g', 1000, { sin: 'harina,harina comun,harina común,harina 000,harina de trigo', img: 'Harina de trigo' });
i('harina_leudante', 'Harina leudante', 'Harina leudante', 'harinas', '🌾', 'g', 1000, { sin: 'leudante,harina con polvo', img: 'Harina leudante' });
i('polenta', 'Polenta', 'Polenta', 'harinas', '🌽', 'g', 500, { sin: 'harina de maiz,harina de maíz,polenta instantánea', img: 'Polenta' });
i('pan_rallado', 'Pan rallado', 'Pan rallado', 'harinas', '🍞', 'g', 500, { sin: 'rebozador,pan molido', img: 'Pan rallado' });
i('fecula', 'Fécula de maíz', 'Fécula de maíz', 'harinas', '🌽', 'g', null, { sin: 'maicena,almidon de maiz,almidón de maíz,fecula', img: 'Almidón de maíz' });
i('levadura', 'Levadura fresca', 'Levadura fresca', 'harinas', '🧫', 'g', 50, { sin: 'levadura,levadura seca', img: 'Levadura' });

// Panes y masas
i('tapas_empanada', 'Tapas de empanada', 'Tapas de empanada', 'panificados', '🥟', 'docena', 30, { sin: 'tapas,discos de empanada,masa de empanadas,tapitas', img: 'Empanada' });
i('tapas_tarta', 'Tapas de tarta', 'Tapas de tarta', 'panificados', '🥧', 'u', 200, { sin: 'masa de tarta,discos de tarta,tapas de pascualina,masa para tarta,pascualina', img: 'Tarta' });
i('pan', 'Pan francés', 'Panes franceses', 'panificados', '🥖', 'u', 80, { tam: true, sin: 'pan,flauta,miñon,miñón,pan de mesa,felipe,mignon', img: 'Pan francés' });
i('pan_hamburguesa', 'Pan de hamburguesa', 'Panes de hamburguesa', 'panificados', '🍔', 'u', 70, { sin: 'pan para hamburguesa,pan de pancho', img: 'Hamburguesa' });

// Almacén
i('aceite', 'Aceite', 'Aceite', 'almacen', '🫗', 'ml', null, { basico: true, sin: 'aceite de girasol,aceite de maiz,aceite mezcla', img: 'Aceite de girasol' });
i('aceite_oliva', 'Aceite de oliva', 'Aceite de oliva', 'almacen', '🫒', 'ml', null, { sin: 'oliva', img: 'Aceite de oliva' });
i('pure_tomate', 'Puré de tomate', 'Puré de tomate', 'almacen', '🥫', 'caja', 520, { sin: 'pure de tomate,salsa de tomate,passata,tomate en caja,pulpa de tomate', img: 'Salsa de tomate' });
i('tomate_lata', 'Tomate triturado', 'Tomate triturado', 'almacen', '🥫', 'lata', 400, { sin: 'tomates en lata,tomate perita en lata,tomate al natural', img: 'Tomate enlatado' });
i('caldo', 'Caldo en cubo', 'Caldos en cubo', 'almacen', '🧊', 'u', 10, { sin: 'caldo,caldito,caldo de verdura,caldo de carne,caldo de gallina,cubo de caldo', img: 'Cubo de caldo' });
i('vinagre', 'Vinagre', 'Vinagre', 'almacen', '🫙', 'ml', null, { sin: 'aceto,vinagre de alcohol,vinagre de manzana', img: 'Vinagre' });
i('mayonesa', 'Mayonesa', 'Mayonesa', 'almacen', '🫙', 'g', null, { sin: 'mayo', img: 'Mayonesa' });
i('aceitunas', 'Aceitunas', 'Aceitunas', 'almacen', '🫒', 'g', 4, { sin: 'aceituna,aceitunas verdes,aceitunas negras', img: 'Aceituna' });
i('azucar', 'Azúcar', 'Azúcar', 'almacen', '🍬', 'g', null, { sin: 'azucar', img: 'Azúcar' });
i('polvo_hornear', 'Polvo de hornear', 'Polvo de hornear', 'almacen', '🫙', 'g', null, { sin: 'polvo leudante,royal', img: 'Polvo de hornear' });
i('vino_tinto', 'Vino tinto', 'Vino tinto', 'almacen', '🍷', 'ml', 750, { sin: 'vino,malbec', img: 'Vino tinto' });
i('vino_blanco', 'Vino blanco', 'Vino blanco', 'almacen', '🥂', 'ml', 750, { sin: 'vino blanco seco', img: 'Vino blanco' });
i('mostaza', 'Mostaza', 'Mostaza', 'almacen', '🫙', 'g', null, { img: 'Mostaza (condimento)' });

// Condimentos y especias
i('sal', 'Sal', 'Sal', 'condimentos', '🧂', 'g', null, { basico: true, sin: 'sal fina,sal gruesa', img: 'Sal de mesa' });
i('pimienta', 'Pimienta', 'Pimienta', 'condimentos', '🌶️', 'g', null, { basico: true, sin: 'pimienta negra,pimienta blanca', img: 'Piper nigrum' });
i('oregano', 'Orégano', 'Orégano', 'condimentos', '🌿', 'g', null, { sin: 'oregano', img: 'Origanum vulgare' });
i('pimenton', 'Pimentón', 'Pimentón', 'condimentos', '🌶️', 'g', null, { sin: 'pimenton,pimentón dulce,paprika', img: 'Pimentón' });
i('comino', 'Comino', 'Comino', 'condimentos', '🌰', 'g', null, { img: 'Cuminum cyminum' });
i('aji_molido', 'Ají molido', 'Ají molido', 'condimentos', '🌶️', 'g', null, { sin: 'aji molido,ají,chile en escamas,peperoncino', img: 'Ají molido' });
i('laurel', 'Laurel', 'Hojas de laurel', 'condimentos', '🍃', 'u', 0.2, { sin: 'hoja de laurel,hojas de laurel', img: 'Laurus nobilis' });
i('nuez_moscada', 'Nuez moscada', 'Nuez moscada', 'condimentos', '🌰', 'g', null, { sin: 'nuez moscada', img: 'Nuez moscada' });
i('chimichurri', 'Chimichurri', 'Chimichurri', 'condimentos', '🌿', 'g', null, { sin: 'chimi', img: 'Chimichurri' });

// ---------------------------------------------------------------------------
// Recetas (solo almuerzos y cenas)
// ing: [ingrediente, cantidad, unidad, { t: tamaño, n: nota, o: opcional }]
// pasos: [título, explicación, minutos (opcional)]
// ---------------------------------------------------------------------------
const recetas = [];
function r(o) { recetas.push(o); }
const O = { o: true };
const opt = (n) => ({ o: true, n });
const nota = (n) => ({ n });

r({
  key: 'milanesas_pure',
  nombre: 'Milanesas con puré de papas',
  desc: 'El clásico de todas las casas: milanesas doradas al horno con un puré bien cremoso.',
  cat: 'Carnes', min: 60, dif: 'Fácil', porc: 4, emoji: '🍽️', img: 'Milanesa',
  tip: 'Si las freís, el aceite está listo cuando tirás una miga de pan y burbujea enseguida (unos 170 °C).',
  ing: [
    ['nalga', 800, 'g', nota('en bifes finos')], ['huevo', 3, 'u', { t: 'mediano' }], ['pan_rallado', 300, 'g'],
    ['ajo', 2, 'diente', nota('picados')], ['perejil', null, 'cn', opt('picado')],
    ['papa', 6, 'u', { t: 'mediano' }], ['manteca', 30, 'g'], ['leche', 150, 'ml', nota('tibia')],
    ['nuez_moscada', 1, 'pizca', O], ['limon', 1, 'u', opt('para servir')],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Preparar la carne', 'Si la carne no viene cortada, cortala en bifes de medio centímetro, siempre en contra de la fibra. Ponelos dentro de una bolsa y golpealos suavemente con un palo de amasar para emparejar el grosor: así se cocinan parejo y quedan tiernos.'],
    ['Hacer el batido', 'En un bowl batí los huevos con el ajo bien picado, el perejil, sal y pimienta. Pasá cada bife por el batido y dejalos reposar unos 15 minutos para que tomen sabor (si tenés tiempo, toda la noche en la heladera es mejor).', 15],
    ['Empanar', 'Pasá cada milanesa por pan rallado y presioná con la palma de la mano de los dos lados para que se adhiera bien. Si te gustan con más cobertura, repetí huevo y pan rallado una vez más.'],
    ['Cocinar las milanesas', 'Precalentá el horno a 200 °C. Aceitá una placa, acomodá las milanesas sin encimarlas y rociá un hilo de aceite por arriba. Horneá 10 minutos, dalas vuelta y cociná 8 a 10 minutos más, hasta que estén doradas de ambos lados.', 20],
    ['Hervir las papas', 'Mientras tanto, pelá las papas, cortalas en cubos parejos y ponelas en una olla con agua fría y sal. Cuando rompa el hervor, cociná 15 a 20 minutos, hasta que un cuchillo entre sin resistencia.', 20],
    ['Hacer el puré', 'Escurrí muy bien y pisá las papas en caliente. Agregá la manteca, la leche tibia de a poco, sal y una pizca de nuez moscada. Mezclá con cuchara de madera hasta que esté cremoso; evitá la minipimer porque el puré queda gomoso.'],
    ['Servir', 'Serví las milanesas recién salidas del horno junto al puré. Unas gotas de limón por arriba le dan el toque final.'],
  ],
});

r({
  key: 'napolitana',
  nombre: 'Milanesa a la napolitana',
  desc: 'Milanesa con salsa de tomate, jamón y muzzarella gratinada. Un clásico de bodegón.',
  cat: 'Carnes', min: 50, dif: 'Fácil', porc: 4, emoji: '🍕', img: 'Milanesa a la napolitana',
  tip: 'Cociná la milanesa primero y recién después agregale la cobertura: si va cruda con la salsa, el empanado se humedece.',
  ing: [
    ['nalga', 600, 'g', nota('4 bifes grandes')], ['huevo', 2, 'u'], ['pan_rallado', 200, 'g'], ['ajo', 1, 'diente'],
    ['pure_tomate', 200, 'g'], ['jamon', 150, 'g'], ['muzzarella', 250, 'g'], ['oregano', null, 'cn'],
    ['tomate', 1, 'u', opt('en rodajas')], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Empanar', 'Batí los huevos con el ajo picado, sal y pimienta. Pasá los bifes por el huevo y después por pan rallado, presionando bien con la mano.'],
    ['Cocinar la milanesa', 'Horneá las milanesas en una placa aceitada a 200 °C durante 10 minutos por lado, o freílas en aceite caliente 2 a 3 minutos por lado. Escurrilas sobre papel absorbente si las freíste.', 20],
    ['Preparar la salsa', 'Calentá el puré de tomate en una sartén con una pizca de sal, orégano y un chorrito de aceite. Cociná 5 minutos a fuego bajo hasta que espese un poco.', 5],
    ['Armar', 'Sobre cada milanesa poné dos cucharadas de salsa, una feta de jamón, rodajas de tomate si tenés y abundante muzzarella en fetas o rallada. Terminá con orégano.'],
    ['Gratinar', 'Llevá al horno fuerte (220 °C) unos 8 minutos, hasta que el queso se derrita y empiece a dorarse en los bordes.', 8],
    ['Servir', 'Servila caliente. Va perfecta con papas fritas, puré o una ensalada mixta.'],
  ],
});

r({
  key: 'empanadas_carne',
  nombre: 'Empanadas de carne al horno',
  desc: 'Jugosas, con cebolla, huevo duro y aceituna, como se hacen en cada provincia.',
  cat: 'Tartas y empanadas', min: 90, dif: 'Media', porc: 4, emoji: '🥟', img: 'Empanada argentina',
  tip: 'El relleno tiene que estar frío antes de armar: si está caliente, la masa se rompe y las empanadas se abren en el horno.',
  ing: [
    ['tapas_empanada', 1, 'docena'], ['carne_picada', 500, 'g', nota('o carne cortada a cuchillo')],
    ['cebolla', 3, 'u', { t: 'mediano' }], ['verdeo', 2, 'u', O], ['morron_rojo', 1, 'u', O],
    ['huevo', 3, 'u', nota('2 duros y 1 para pintar')], ['aceitunas', 50, 'g', O],
    ['comino', 1, 'cdta'], ['pimenton', 1, 'cda'], ['aji_molido', 1, 'cdta', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hervir los huevos', 'Poné 2 huevos en agua fría y, cuando rompa el hervor, contá 10 minutos. Pasalos a agua fría, pelalos y cortalos en cubitos.', 10],
    ['Rehogar la cebolla', 'Picá la cebolla, el morrón y la parte blanca del verdeo. Cocinalos en una sartén grande con un chorro de aceite a fuego medio unos 10 minutos, hasta que estén transparentes y blandos.', 10],
    ['Cocinar la carne', 'Subí el fuego, agregá la carne y desarmala con una cuchara. Cociná hasta que pierda el color rosado, unos 8 minutos. Condimentá con sal, pimienta, comino, pimentón y ají molido.', 8],
    ['Enfriar el relleno', 'Sumá el verde del verdeo picado, mezclá y pasá el relleno a una fuente. Dejalo enfriar por completo; idealmente 1 hora en la heladera, así la grasa se solidifica y las empanadas quedan jugosas.', 60],
    ['Armar', 'Sobre cada tapa poné una cucharada generosa de relleno, un poco de huevo duro y media aceituna. Humedecé el borde con agua, cerrá en forma de media luna y hacé el repulgue o apretá el borde con un tenedor.'],
    ['Hornear', 'Precalentá el horno a 220 °C. Acomodá las empanadas en una placa enmantecada o con papel manteca y pintalas con el huevo batido. Horneá 15 a 18 minutos, hasta que estén bien doradas.', 18],
  ],
});

r({
  key: 'tarta_jyq',
  nombre: 'Tarta de jamón y queso',
  desc: 'Rápida, rendidora y siempre bienvenida. Ideal para una cena sin vueltas.',
  cat: 'Tartas y empanadas', min: 50, dif: 'Fácil', porc: 4, emoji: '🥧', img: 'Quiche',
  tip: 'Pinchá la masa de abajo con un tenedor antes de rellenar para que no se infle y quede crocante.',
  ing: [
    ['tapas_tarta', 2, 'u'], ['jamon', 200, 'g'], ['queso_cremoso', 250, 'g'], ['huevo', 4, 'u'],
    ['crema', 200, 'ml', opt('o leche')], ['cebolla', 1, 'u', O], ['nuez_moscada', 1, 'pizca', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'],
  ],
  pasos: [
    ['Preparar el molde', 'Precalentá el horno a 200 °C. Enmantecá o aceitá una tartera de unos 26 cm y forrala con una de las tapas, dejando que sobresalga un poco del borde. Pinchá la base con un tenedor.'],
    ['Opcional: rehogar cebolla', 'Si usás cebolla, picala fina y rehogala en una sartén con un poco de aceite 8 minutos, hasta que esté transparente. Dejala entibiar.', 8],
    ['Preparar el relleno', 'Cortá el jamón y el queso en cubitos. En un bowl batí los huevos con la crema, sal, pimienta y nuez moscada. Sumá el jamón, el queso y la cebolla.'],
    ['Rellenar y tapar', 'Volcá el relleno sobre la masa. Cubrí con la segunda tapa, uní los bordes doblándolos hacia adentro y hacé un pequeño corte en el centro para que salga el vapor.'],
    ['Hornear', 'Horneá 30 a 35 minutos, hasta que la tapa esté dorada. Dejala reposar 10 minutos antes de cortar para que el relleno se asiente.', 35],
  ],
});

r({
  key: 'tarta_acelga',
  nombre: 'Tarta de acelga',
  desc: 'La tarta de verdura de siempre, con queso y un toque de nuez moscada.',
  cat: 'Tartas y empanadas', min: 60, dif: 'Fácil', porc: 4, emoji: '🥬', img: 'Tarta de acelga',
  tip: 'Escurrí muy bien la acelga cocida apretándola con las manos: el exceso de agua es lo que arruina una tarta de verdura.',
  ing: [
    ['tapas_tarta', 2, 'u'], ['acelga', 1, 'atado'], ['cebolla', 2, 'u'], ['huevo', 3, 'u'],
    ['queso_rallado', 50, 'g'], ['queso_cremoso', 150, 'g', O], ['ajo', 1, 'diente', O],
    ['nuez_moscada', 1, 'pizca'], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Limpiar la acelga', 'Separá las hojas de los tallos gruesos (podés guardar los tallos para una sopa). Lavá bien las hojas en abundante agua.'],
    ['Cocinar la acelga', 'Hervila 3 minutos en agua con sal o cocinala tapada en una sartén solo con el agua que le queda del lavado. Escurrila, apretala con las manos para sacarle todo el líquido y picala.', 5],
    ['Rehogar', 'Picá la cebolla y el ajo y rehogalos con aceite a fuego medio 10 minutos. Agregá la acelga picada, mezclá 2 minutos y apagá el fuego.', 12],
    ['Mezclar el relleno', 'Cuando esté tibio, agregá los huevos batidos, el queso rallado, el cremoso en cubos, sal, pimienta y nuez moscada.'],
    ['Armar y hornear', 'Forrá una tartera aceitada con una tapa, rellená, cubrí con la otra tapa y cerrá los bordes. Pinchá la superficie y horneá a 200 °C de 35 a 40 minutos, hasta que esté dorada.', 40],
  ],
});

r({
  key: 'pascualina',
  nombre: 'Pascualina de espinaca',
  desc: 'Tarta de espinaca y ricota con huevos enteros escondidos adentro.',
  cat: 'Tartas y empanadas', min: 70, dif: 'Media', porc: 6, emoji: '🥚', img: 'Torta pascualina',
  tip: 'Hacé los huecos para los huevos con el dorso de una cuchara; así quedan enteros y se ven al cortar.',
  ing: [
    ['tapas_tarta', 2, 'u'], ['espinaca', 2, 'atado'], ['ricota', 250, 'g'], ['huevo', 6, 'u', nota('2 para la mezcla y 4 enteros')],
    ['cebolla', 1, 'u'], ['queso_rallado', 80, 'g'], ['nuez_moscada', 1, 'pizca'],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Cocinar la espinaca', 'Lavá la espinaca, cocinala 2 minutos en una olla tapada con apenas agua, escurrila muy bien apretándola y picala.', 5],
    ['Rehogar la cebolla', 'Picá la cebolla y rehogala con aceite 8 minutos. Sumá la espinaca, salpimentá y dejá entibiar.', 8],
    ['Mezclar con ricota', 'Uní la espinaca con la ricota, 2 huevos batidos, el queso rallado y la nuez moscada. Probá y ajustá la sal.'],
    ['Armar', 'Forrá una tartera aceitada con una tapa y volcá el relleno. Hacé 4 huecos con el dorso de una cuchara y rompé un huevo entero dentro de cada uno. Salpimentá los huevos.'],
    ['Tapar y hornear', 'Cubrí con la segunda tapa, cerrá los bordes con un repulgue y pinchá la superficie sin llegar a los huevos. Horneá a 200 °C unos 40 minutos, hasta que esté dorada.', 40],
  ],
});

r({
  key: 'guiso_lentejas',
  nombre: 'Guiso de lentejas',
  desc: 'Bien argentino, con chorizo, panceta y verduras. Ideal para los días fríos.',
  cat: 'Guisos y sopas', min: 75, dif: 'Fácil', porc: 6, emoji: '🍲', img: 'Guiso de lentejas',
  tip: 'Como todo guiso, es más rico al día siguiente: los sabores se asientan.',
  ing: [
    ['lentejas', 400, 'g'], ['chorizo', 2, 'u'], ['panceta', 150, 'g', O], ['carne_guiso', 300, 'g', O],
    ['cebolla', 1, 'u', { t: 'grande' }], ['morron_rojo', 1, 'u'], ['zanahoria', 2, 'u'], ['papa', 2, 'u'],
    ['zapallo', 300, 'g', O], ['ajo', 2, 'diente'], ['pure_tomate', 200, 'g'], ['pimenton', 1, 'cda'],
    ['comino', 1, 'cdta'], ['laurel', 2, 'u'], ['caldo', 1, 'u'], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Remojar las lentejas', 'Si tenés tiempo, dejá las lentejas en remojo 2 horas (no es obligatorio, pero se cocinan más rápido y caen mejor). Enjuagalas antes de usar.', 120],
    ['Dorar las carnes', 'En una olla grande con un chorrito de aceite dorá el chorizo en rodajas, la panceta y la carne en cubos, unos 8 minutos. Retirá y reservá.', 8],
    ['Hacer el sofrito', 'En la misma olla rehogá la cebolla, el morrón y el ajo picados durante 8 minutos. Agregá la zanahoria en rodajas y el pimentón, y revolvé un minuto sin que se queme.', 9],
    ['Sumar las lentejas', 'Volvé a poner las carnes, agregá las lentejas, el puré de tomate, el laurel, el comino y el caldo disuelto en 1,5 litros de agua caliente.'],
    ['Cocinar', 'Cuando hierva, bajá a fuego mínimo y cociná tapado 25 minutos. Sumá la papa y el zapallo en cubos y seguí 20 minutos más, revolviendo de vez en cuando. Si se seca, agregá agua caliente.', 45],
    ['Ajustar y servir', 'Probá de sal, retirá las hojas de laurel y dejá reposar 10 minutos con el fuego apagado. Serví bien caliente.'],
  ],
});

r({
  key: 'locro',
  nombre: 'Locro criollo',
  desc: 'El plato patrio: maíz, porotos, zapallo y carnes, cocinado despacio, con su salsita picante.',
  cat: 'Guisos y sopas', min: 210, dif: 'Media', porc: 8, emoji: '🇦🇷', img: 'Locro',
  tip: 'Revolvé seguido con cuchara de madera y raspá el fondo: el locro se pega fácil.',
  ing: [
    ['maiz_partido', 500, 'g'], ['porotos', 250, 'g'], ['zapallo', 1, 'kg'], ['carne_guiso', 500, 'g', nota('falda o pecho')],
    ['chorizo', 2, 'u'], ['panceta', 200, 'g'], ['cebolla', 2, 'u'], ['verdeo', 3, 'u', nota('para la salsita')],
    ['pimenton', 2, 'cda'], ['comino', 1, 'cdta'], ['aji_molido', 1, 'cdta'], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Remojar la noche anterior', 'Poné el maíz y los porotos en remojo por separado, cubiertos con abundante agua, durante toda la noche (al menos 12 horas).', 720],
    ['Primer hervor', 'Escurrí, poné el maíz y los porotos en una olla grande con 4 litros de agua y llevá a hervor. Cociná 1 hora a fuego bajo, sacando la espuma que se forma arriba.', 60],
    ['Sumar las carnes', 'Agregá la carne en cubos, el chorizo en rodajas y la panceta en cubitos. Seguí cocinando a fuego bajo, revolviendo seguido.', 30],
    ['Agregar el zapallo y la cebolla', 'Sumá el zapallo pelado en cubos y la cebolla picada. Condimentá con sal, comino y 1 cucharada de pimentón. Cociná 1 hora y media más, hasta que el zapallo se deshaga y el locro espese. Si hace falta, agregá agua caliente.', 90],
    ['Preparar la salsita', 'En una sartén calentá 6 cucharadas de aceite, apagá el fuego y agregá el pimentón restante, el ají molido y el verdeo picado. Mezclá: tiene que quedar una salsa roja y brillante.'],
    ['Servir', 'Serví el locro en cazuelas bien caliente con una cucharada de salsita por encima.'],
  ],
});

r({
  key: 'carbonada',
  nombre: 'Carbonada criolla',
  desc: 'Guiso de carne con zapallo, choclo, batata y duraznos que le dan un toque dulce.',
  cat: 'Guisos y sopas', min: 90, dif: 'Media', porc: 6, emoji: '🎃', img: 'Carbonada',
  tip: 'Tradicionalmente se sirve dentro de un zapallo horneado. Si querés lucirte, probalo.',
  ing: [
    ['carne_guiso', 600, 'g'], ['zapallo', 500, 'g'], ['papa', 2, 'u'], ['batata', 2, 'u'], ['choclo', 2, 'u'],
    ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['tomate', 2, 'u'], ['duraznos_almibar', 1, 'lata', O],
    ['arroz', 100, 'g', O], ['caldo', 1, 'u'], ['pimenton', 1, 'cdta'], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Sellar la carne', 'Cortá la carne en cubos de 2 cm y dorala en una olla grande con aceite a fuego fuerte, en tandas para que no hierva en su jugo. Reservá.', 10],
    ['Sofrito', 'En la misma olla rehogá la cebolla y el morrón picados 8 minutos. Sumá el tomate picado y el pimentón y cociná 5 minutos más.', 13],
    ['Cocinar la carne', 'Volvé a poner la carne, cubrí con 1 litro de caldo caliente y cociná tapado a fuego bajo 30 minutos.', 30],
    ['Agregar las verduras', 'Sumá la papa, la batata y el zapallo en cubos y los choclos cortados en rodajas. Si usás arroz, agregalo ahora. Cociná 25 minutos más, hasta que todo esté tierno.', 25],
    ['Los duraznos', 'Cortá los duraznos en cubos y agregalos en los últimos 5 minutos, junto con un poco de su almíbar si te gusta más dulce. Ajustá la sal y serví.', 5],
  ],
});

r({
  key: 'pastel_papa',
  nombre: 'Pastel de papa',
  desc: 'Carne picada bien condimentada debajo de un colchón de puré gratinado.',
  cat: 'Carnes', min: 70, dif: 'Fácil', porc: 6, emoji: '🥔', img: 'Pastel de papa',
  tip: 'Espolvoreá un poco de azúcar sobre el puré antes de gratinar: queda una costra dorada típica de los bodegones.',
  ing: [
    ['carne_picada', 600, 'g'], ['papa', 8, 'u', { t: 'mediano' }], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u', O],
    ['huevo', 2, 'u', nota('1 para el puré y 1 duro')], ['aceitunas', 50, 'g', O], ['manteca', 40, 'g'], ['leche', 150, 'ml'],
    ['queso_rallado', 40, 'g', O], ['comino', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['azucar', 1, 'cda', O],
    ['nuez_moscada', 1, 'pizca', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hacer el puré', 'Hervé las papas peladas y en cubos en agua con sal 20 minutos. Escurrí, pisalas con la manteca, la leche, sal y nuez moscada. Cuando esté tibio, sumá un huevo batido.', 25],
    ['Preparar la carne', 'Rehogá la cebolla y el morrón picados en aceite 8 minutos. Agregá la carne, desgranándola, y cociná hasta que pierda el color. Condimentá con sal, pimienta, comino y pimentón.', 15],
    ['Agregar los extras', 'Si querés, sumá el huevo duro picado y las aceitunas en rodajas al relleno. Mezclá y apagá.'],
    ['Armar', 'En una fuente para horno aceitada distribuí la carne y cubrila con el puré, alisando con una espátula. Marcá la superficie con un tenedor y espolvoreá queso rallado y, si te gusta, azúcar.'],
    ['Gratinar', 'Horneá a 200 °C unos 20 minutos, hasta que la superficie esté dorada. Dejá reposar 5 minutos antes de servir.', 20],
  ],
});

r({
  key: 'tortilla_papa',
  nombre: 'Tortilla de papas',
  desc: 'Jugosa por dentro y dorada por fuera. Con o sin cebolla, según la grieta de cada casa.',
  cat: 'Minutas', min: 45, dif: 'Media', porc: 4, emoji: '🍳', img: 'Tortilla de patatas',
  tip: 'Para darla vuelta, apoyá un plato más grande que la sartén encima, invertí con un movimiento firme y deslizala de nuevo.',
  ing: [
    ['papa', 5, 'u', { t: 'mediano' }], ['huevo', 6, 'u'], ['cebolla', 1, 'u', O],
    ['sal', null, 'cn'], ['aceite', null, 'cn', nota('abundante para freír')],
  ],
  pasos: [
    ['Cortar las papas', 'Pelá las papas y cortalas en láminas finas o en cubitos pequeños. Si usás cebolla, cortala en pluma fina. Salá todo.'],
    ['Confitar', 'Calentá abundante aceite en una sartén a fuego medio y cociná las papas (y la cebolla) unos 15 minutos, moviéndolas, hasta que estén tiernas pero sin dorarse mucho. Escurrilas bien en un colador.', 15],
    ['Mezclar con el huevo', 'Batí los huevos con sal en un bowl grande, agregá las papas calientes y dejá reposar 5 minutos para que se integren.', 5],
    ['Cuajar el primer lado', 'En una sartén antiadherente de 24 cm con una cucharada de aceite bien caliente, volcá la mezcla. Bajá el fuego y cociná 5 minutos, despegando los bordes con una espátula.', 5],
    ['Dar vuelta', 'Tapá con un plato, invertí la tortilla y deslizala de nuevo en la sartén. Cociná 2 a 3 minutos más si la querés jugosa, o 5 si la preferís bien cocida.', 4],
  ],
});

r({
  key: 'revuelto_gramajo',
  nombre: 'Revuelto gramajo',
  desc: 'Papas pay, huevo y jamón revueltos en sartén. Una minuta porteña de pura cepa.',
  cat: 'Minutas', min: 30, dif: 'Fácil', porc: 2, emoji: '🍳', img: 'Revuelto gramajo',
  tip: 'Sacalo del fuego cuando el huevo todavía esté un poco húmedo: termina de cocinarse con el calor residual.',
  ing: [
    ['papa', 3, 'u', { t: 'grande' }], ['huevo', 5, 'u'], ['jamon', 150, 'g'], ['cebolla', 1, 'u', O],
    ['arvejas', 1, 'lata', O], ['perejil', null, 'cn', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Cortar las papas pay', 'Pelá las papas y cortalas en bastones muy finos (tipo fósforo). Lavalas en agua fría y secalas muy bien con un repasador.'],
    ['Freír', 'Freílas en aceite bien caliente, en tandas, hasta que estén doradas y crocantes. Escurrí sobre papel absorbente y salá.', 10],
    ['Saltear', 'En una sartén grande con un poco de aceite rehogá la cebolla en pluma 5 minutos. Sumá el jamón en tiritas y las arvejas escurridas, y salteá 2 minutos.', 7],
    ['Revolver con huevo', 'Agregá las papas, bajá el fuego y volcá los huevos batidos con sal y pimienta. Revolvé suavemente hasta que el huevo esté cremoso.', 3],
    ['Servir', 'Serví enseguida con perejil picado por encima.'],
  ],
});

r({
  key: 'fideos_tuco',
  nombre: 'Fideos con tuco',
  desc: 'La salsa de tomate de la abuela, cocinada despacio, sobre unos buenos fideos.',
  cat: 'Pastas', min: 45, dif: 'Fácil', porc: 4, emoji: '🍝', img: 'Espaguetis con salsa de tomate',
  tip: 'Una pizca de azúcar corrige la acidez del tomate. Y guardá un poco del agua de cocción por si la salsa queda espesa.',
  ing: [
    ['fideos', 500, 'g'], ['pure_tomate', 1, 'caja'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u', O],
    ['zanahoria', 1, 'u', opt('rallada')], ['ajo', 2, 'diente'], ['oregano', 1, 'cdta'], ['laurel', 1, 'u'],
    ['albahaca', null, 'cn', O], ['azucar', 1, 'pizca'], ['queso_rallado', null, 'cn', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Sofrito', 'En una cacerola con aceite rehogá a fuego medio la cebolla, el morrón y el ajo bien picados durante 10 minutos. Si usás zanahoria rallada, sumala a mitad de camino.', 10],
    ['Cocinar el tuco', 'Agregá el puré de tomate, medio vaso de agua, el laurel, el orégano, la pizca de azúcar, sal y pimienta. Cociná tapado a fuego mínimo 20 minutos, revolviendo cada tanto.', 20],
    ['Hervir los fideos', 'En una olla grande llevá a hervor abundante agua (1 litro cada 100 g de fideos) con sal. Cociná los fideos el tiempo que indica el paquete, probando un minuto antes para que queden al dente.', 10],
    ['Unir', 'Escurrí los fideos, mezclalos con parte del tuco en la olla y serví con más salsa por encima, hojas de albahaca y queso rallado.'],
  ],
});

r({
  key: 'noquis',
  nombre: 'Ñoquis de papa',
  desc: 'Caseros y livianos, como los del 29. Con tuco o con manteca y queso.',
  cat: 'Pastas', min: 80, dif: 'Media', porc: 4, emoji: '🥔', img: 'Ñoquis',
  tip: 'Usá papas viejas o de cáscara colorada, que tienen menos agua, y no amases de más: con la harina justa quedan livianos.',
  ing: [
    ['papa', 6, 'u', { t: 'grande' }], ['harina', 300, 'g'], ['huevo', 1, 'u'], ['queso_rallado', 30, 'g', O],
    ['nuez_moscada', 1, 'pizca'], ['pure_tomate', 1, 'caja', opt('para la salsa')], ['ajo', 1, 'diente', O],
    ['manteca', 30, 'g', O], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hervir las papas con cáscara', 'Lavá las papas y hervilas enteras, con cáscara, unos 30 minutos hasta que estén tiernas. Con cáscara absorben menos agua.', 30],
    ['Hacer el puré', 'Pelalas todavía calientes y pisalas o pasalas por un pisapapas hasta que no queden grumos. Extendé el puré en la mesada para que largue el vapor y se entibie.', 10],
    ['Formar la masa', 'Agregá el huevo, sal, nuez moscada, el queso rallado y la harina de a poco. Uní con las manos sin amasar demasiado, solo hasta que la masa no se pegue.'],
    ['Cortar', 'Hacé cilindros de 2 cm de grosor sobre la mesada enharinada y cortalos en trozos de 2 cm. Si querés la forma clásica, pasá cada ñoqui por un tenedor.'],
    ['Preparar la salsa', 'Rehogá el ajo picado en aceite 1 minuto, sumá el puré de tomate y sal, y cociná 15 minutos a fuego bajo. Si preferís, derretí manteca para servirlos con queso.', 15],
    ['Hervir', 'Cociná los ñoquis en abundante agua hirviendo con sal, en tandas. Cuando suben a la superficie están listos: retiralos con espumadera directo a la salsa.', 3],
  ],
});

r({
  key: 'arroz_pollo',
  nombre: 'Arroz con pollo',
  desc: 'Todo en una olla: pollo dorado, verduras y arroz que absorbe todo el sabor.',
  cat: 'Pollo', min: 60, dif: 'Fácil', porc: 4, emoji: '🍗', img: 'Arroz con pollo',
  tip: 'Una vez que agregás el caldo, no revuelvas el arroz: solo tapá y dejá que se cocine.',
  ing: [
    ['pollo', 6, 'u'], ['arroz', 400, 'g'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u', O],
    ['ajo', 2, 'diente'], ['tomate', 2, 'u', O], ['arvejas', 1, 'lata', O], ['caldo', 1, 'u'], ['pimenton', 1, 'cdta'],
    ['vino_blanco', 100, 'ml', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar el pollo', 'Salpimentá las presas y dorálas en una olla grande con aceite a fuego fuerte, unos 5 minutos por lado. Retiralas y reservá.', 10],
    ['Sofrito', 'En la misma olla rehogá la cebolla, los morrones y el ajo picados 8 minutos. Sumá el tomate picado y el pimentón. Si usás vino, agregalo y dejá que se evapore el alcohol 2 minutos.', 10],
    ['Cocinar el pollo', 'Volvé el pollo a la olla, cubrí con 1 litro de caldo caliente y cociná tapado a fuego bajo 20 minutos.', 20],
    ['Agregar el arroz', 'Sumá el arroz, mezclá una sola vez y agregá más caldo si hace falta (tiene que haber el doble de líquido que de arroz). Cociná tapado a fuego bajo 18 minutos sin revolver.', 18],
    ['Terminar', 'Agregá las arvejas escurridas, apagá el fuego y dejá reposar tapado 5 minutos antes de servir.', 5],
  ],
});

r({
  key: 'pollo_horno_papas',
  nombre: 'Pollo al horno con papas',
  desc: 'Presas doradas con ajo y limón, sobre una cama de papas que se cocinan en el jugo.',
  cat: 'Pollo', min: 75, dif: 'Fácil', porc: 4, emoji: '🍗', img: 'Pollo asado',
  tip: 'Dejá el pollo marinando aunque sea 30 minutos con el limón y el ajo: la diferencia se nota.',
  ing: [
    ['pollo', 6, 'u'], ['papa', 6, 'u'], ['cebolla', 2, 'u'], ['ajo', 4, 'diente'], ['limon', 1, 'u'],
    ['batata', 2, 'u', O], ['oregano', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['vino_blanco', 100, 'ml', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Marinar', 'En un bowl mezclá el jugo del limón, el ajo picado, orégano, pimentón, sal, pimienta y 3 cucharadas de aceite. Untá bien las presas y dejalas reposar al menos 30 minutos.', 30],
    ['Preparar las verduras', 'Precalentá el horno a 200 °C. Pelá las papas (y las batatas) y cortalas en gajos. Cortá la cebolla en aros gruesos. Acomodá todo en una asadera aceitada y salá.'],
    ['Hornear', 'Poné las presas encima de las verduras, con la piel hacia arriba, y rociá con el resto de la marinada y el vino si usás. Horneá 30 minutos.', 30],
    ['Dar vuelta y dorar', 'Girá las presas y mové las papas. Horneá 25 a 30 minutos más, hasta que el pollo esté dorado y al pincharlo salga jugo transparente.', 30],
    ['Servir', 'Dejá reposar 5 minutos y serví con el jugo de la asadera por encima.'],
  ],
});

r({
  key: 'supremas',
  nombre: 'Supremas de pollo empanadas',
  desc: 'Pechuga de pollo crocante por fuera y tierna por dentro. Más liviana que la milanesa de carne.',
  cat: 'Pollo', min: 40, dif: 'Fácil', porc: 4, emoji: '🍗', img: 'Milanesa de pollo',
  tip: 'Abrí las pechugas en mariposa y aplastalas: si quedan gruesas, se secan por fuera antes de cocinarse por dentro.',
  ing: [
    ['pechuga', 2, 'u', { t: 'grande' }], ['huevo', 2, 'u'], ['pan_rallado', 200, 'g'], ['ajo', 1, 'diente'],
    ['perejil', null, 'cn', O], ['limon', 1, 'u', O], ['mostaza', 1, 'cda', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Preparar las pechugas', 'Cortá cada pechuga a la mitad para obtener 4 supremas y abrilas en mariposa. Aplastalas entre dos films hasta que tengan 1 cm de grosor parejo.'],
    ['Batido', 'Batí los huevos con ajo y perejil picados, la mostaza si usás, sal y pimienta. Pasá las supremas y dejalas 10 minutos.', 10],
    ['Empanar', 'Pasalas por pan rallado presionando bien de los dos lados.'],
    ['Cocinar', 'Horneá en placa aceitada a 200 °C 12 minutos por lado, o freílas en aceite caliente 3 a 4 minutos por lado, hasta que estén doradas y cocidas en el centro.', 24],
    ['Servir', 'Serví con gajos de limón y la guarnición que tengas: puré, ensalada o arroz.'],
  ],
});

r({
  key: 'matambre_pizza',
  nombre: 'Matambre a la pizza',
  desc: 'Matambre tiernizado en leche y cubierto con salsa, muzzarella y orégano.',
  cat: 'Carnes', min: 120, dif: 'Media', porc: 4, emoji: '🍕', img: 'Matambre a la pizza',
  tip: 'La cocción en leche es lo que lo deja tiernísimo; no te saltees ese paso.',
  ing: [
    ['matambre', 1.2, 'kg'], ['leche', 1, 'l'], ['pure_tomate', 300, 'g'], ['muzzarella', 300, 'g'],
    ['ajo', 2, 'diente'], ['oregano', null, 'cn'], ['morron_rojo', 1, 'u', opt('en tiras')], ['aceitunas', 50, 'g', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'],
  ],
  pasos: [
    ['Limpiar', 'Sacale al matambre el exceso de grasa, salpimentalo de ambos lados y untalo con el ajo picado.'],
    ['Tiernizar en leche', 'Ponelo en una asadera con la grasa hacia abajo, cubrí con la leche y tapá con papel aluminio. Horneá a 180 °C durante 1 hora y media, hasta que al pincharlo esté muy tierno.', 90],
    ['Dorar', 'Descartá la leche, dalo vuelta y subí el horno a 220 °C. Dorá 10 minutos.', 10],
    ['Cubrir', 'Cubrí con el puré de tomate condimentado con sal y orégano, la muzzarella, las tiras de morrón y las aceitunas.'],
    ['Gratinar', 'Volvé al horno 10 minutos hasta que el queso se derrita. Cortá en porciones y serví.', 10],
  ],
});

r({
  key: 'bifes_criolla',
  nombre: 'Bifes a la criolla',
  desc: 'Bifes cocidos en capas con papa, cebolla, morrón y tomate, en su propio jugo.',
  cat: 'Carnes', min: 60, dif: 'Fácil', porc: 4, emoji: '🥩', img: 'Bife a la criolla',
  tip: 'No revuelvas: la gracia es que cada capa se cocine con el vapor y los jugos de la anterior.',
  ing: [
    ['bife', 4, 'u'], ['papa', 4, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u', O],
    ['tomate', 3, 'u'], ['ajo', 2, 'diente'], ['caldo', 1, 'u', O], ['oregano', 1, 'cdta'], ['pimenton', 1, 'cdta'],
    ['laurel', 1, 'u'], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Cortar todo', 'Cortá las papas en rodajas de medio centímetro, la cebolla en aros, los morrones en tiras y los tomates en rodajas. Picá el ajo.'],
    ['Primera capa', 'En una olla o cacerola amplia con un chorro de aceite, poné una capa de cebolla, arriba los bifes salpimentados y encima la mitad de los morrones y del tomate.'],
    ['Segunda capa', 'Agregá una capa de papas, el resto de las verduras, el ajo, el laurel, el orégano y el pimentón. Salá cada capa.'],
    ['Cocinar', 'Agregá medio vaso de caldo o agua, tapá y cociná a fuego bajo 40 minutos sin revolver, hasta que las papas estén tiernas.', 40],
    ['Servir', 'Serví directamente de la olla, con el jugo de la cocción por encima.'],
  ],
});

r({
  key: 'estofado',
  nombre: 'Estofado de carne con papas',
  desc: 'Carne tierna en salsa de tomate y vino, con papas que se deshacen en la boca.',
  cat: 'Guisos y sopas', min: 120, dif: 'Fácil', porc: 6, emoji: '🍲', img: 'Estofado',
  tip: 'Pasá la carne por un poco de harina antes de dorarla: la salsa queda más espesa y untuosa.',
  ing: [
    ['carne_guiso', 1, 'kg'], ['papa', 4, 'u'], ['cebolla', 2, 'u'], ['zanahoria', 2, 'u'], ['morron_rojo', 1, 'u'],
    ['ajo', 3, 'diente'], ['pure_tomate', 1, 'caja'], ['vino_tinto', 200, 'ml', O], ['champinones', 200, 'g', O],
    ['laurel', 2, 'u'], ['oregano', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['caldo', 1, 'u'], ['harina', 2, 'cda', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar la carne', 'Cortá la carne en cubos de 3 cm, salpimentala, pasala por harina y dorala en tandas en una olla con aceite a fuego fuerte. Reservá.', 12],
    ['Sofrito', 'En la misma olla rehogá la cebolla, el morrón y el ajo picados 8 minutos. Sumá la zanahoria en rodajas y los champiñones fileteados.', 10],
    ['Desglasar', 'Agregá el vino y raspá el fondo con cuchara de madera para despegar lo dorado. Dejá evaporar 3 minutos.', 3],
    ['Cocinar a fuego lento', 'Volvé la carne, sumá el puré de tomate, el laurel, el orégano, el pimentón y el caldo disuelto en 500 ml de agua. Tapá y cociná a fuego bajo 1 hora.', 60],
    ['Agregar las papas', 'Sumá las papas en cubos grandes y cociná 25 minutos más, hasta que estén tiernas y la salsa espesa. Ajustá la sal y serví.', 25],
  ],
});

r({
  key: 'albondigas',
  nombre: 'Albóndigas con salsa',
  desc: 'Albóndigas caseras bien tiernas, cocinadas en salsa de tomate. Van con arroz, puré o fideos.',
  cat: 'Carnes', min: 60, dif: 'Fácil', porc: 4, emoji: '🧆', img: 'Albóndiga',
  tip: 'Mojate las manos con agua para darles forma: así no se pegan y quedan lisas.',
  ing: [
    ['carne_picada', 600, 'g'], ['pan', 1, 'u', nota('la miga, remojada en leche')], ['leche', 100, 'ml'], ['huevo', 1, 'u'],
    ['ajo', 2, 'diente'], ['perejil', null, 'cn', O], ['queso_rallado', 30, 'g', O], ['cebolla', 1, 'u'],
    ['pure_tomate', 1, 'caja'], ['oregano', 1, 'cdta'], ['harina', 50, 'g', opt('para rebozar')],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hacer la mezcla', 'Remojá la miga de pan en la leche y escurrila. En un bowl uní la carne con la miga, el huevo, un diente de ajo y perejil picados, el queso, sal y pimienta. Amasá hasta integrar.'],
    ['Formar', 'Con las manos húmedas formá bolitas del tamaño de una nuez grande. Si querés, pasalas por harina.'],
    ['Dorar', 'Dorálas en una sartén con aceite a fuego medio, girándolas, unos 6 minutos. Reservá.', 6],
    ['Salsa', 'En una cacerola rehogá la cebolla y el ajo restante picados 8 minutos. Sumá el puré de tomate, medio vaso de agua, orégano y sal.', 8],
    ['Cocinar juntas', 'Agregá las albóndigas a la salsa, tapá y cociná a fuego bajo 20 minutos, moviendo la olla de vez en cuando para que no se peguen.', 20],
  ],
});

r({
  key: 'hamburguesas',
  nombre: 'Hamburguesas caseras',
  desc: 'Medallones jugosos de carne picada, a la plancha, en pan con lo que tengas.',
  cat: 'Carnes', min: 30, dif: 'Fácil', porc: 4, emoji: '🍔', img: 'Hamburguesa',
  tip: 'Hacé un hueco con el pulgar en el centro de cada medallón: así no se inflan al cocinarse y quedan planas.',
  ing: [
    ['carne_picada', 800, 'g'], ['pan_hamburguesa', 4, 'u'], ['cebolla', 1, 'u', opt('rallada')], ['ajo', 1, 'diente', O],
    ['huevo', 1, 'u', O], ['queso_cremoso', 4, 'feta', O], ['lechuga', 1, 'u', O], ['tomate', 1, 'u', O],
    ['panceta', 100, 'g', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Preparar la carne', 'Mezclá la carne con la cebolla rallada y el ajo picado (y el huevo si querés que ligue más). No la amases de más; solo integrá.'],
    ['Formar los medallones', 'Dividí en 4 bolas iguales y aplastalas hasta tener medallones de 1,5 cm un poco más anchos que el pan. Hacé un hueco con el pulgar en el centro.'],
    ['Cocinar', 'Calentá bien una plancha o sartén con unas gotas de aceite. Salá los medallones justo antes de cocinarlos y hacelos 4 minutos por lado. En el último minuto poné el queso encima y tapá para que se derrita.', 8],
    ['Armar', 'Tostá el pan en la misma plancha. Armá con lechuga, tomate, la hamburguesa y panceta crocante si tenés.'],
  ],
});

r({
  key: 'choripan',
  nombre: 'Choripán con salsa criolla',
  desc: 'El sándwich de la cancha y del asado, con chorizo a la parrilla o a la plancha.',
  cat: 'Carnes', min: 35, dif: 'Fácil', porc: 4, emoji: '🌭', img: 'Choripán',
  tip: 'Abrí los chorizos en mariposa: se cocinan más rápido y parejo.',
  ing: [
    ['chorizo', 4, 'u'], ['pan', 4, 'u'], ['tomate', 2, 'u'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u', O],
    ['vinagre', 3, 'cda'], ['oregano', 1, 'cdta'], ['chimichurri', null, 'cn', O], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Salsa criolla', 'Picá tomate, cebolla y morrón en cubitos chicos. Mezclalos con el vinagre, 4 cucharadas de aceite, orégano y sal. Dejala reposar mientras cocinás los chorizos.', 15],
    ['Cocinar los chorizos', 'Abrilos a lo largo sin separarlos del todo. Cocinalos en parrilla o en una plancha bien caliente unos 6 minutos de cada lado, empezando del lado de la piel.', 12],
    ['Tostar el pan', 'Abrí los panes y tostalos del lado de adentro un minuto en la plancha.', 1],
    ['Armar', 'Poné un chorizo en cada pan y coronalo con salsa criolla o chimichurri.'],
  ],
});

r({
  key: 'provoleta',
  nombre: 'Provoleta con tomates',
  desc: 'Queso provolone dorado por fuera y fundido por dentro, con orégano y ají.',
  cat: 'Vegetariano', min: 20, dif: 'Fácil', porc: 2, emoji: '🧀', img: 'Provoleta',
  tip: 'Metela 30 minutos al freezer antes de cocinarla: se dora por fuera sin desarmarse.',
  ing: [
    ['provolone', 400, 'g', nota('2 rodajas de 2 cm')], ['oregano', 1, 'cdta'], ['aji_molido', 1, 'pizca'],
    ['aceite_oliva', 2, 'cda'], ['tomate', 2, 'u', O], ['pan', 2, 'u', opt('para acompañar')],
  ],
  pasos: [
    ['Enfriar', 'Espolvoreá las rodajas de provolone con orégano y llevalas al freezer 30 minutos.', 30],
    ['Primer lado', 'Calentá muy bien una sartén de hierro o una parrilla. Apoyá el queso y cociná 3 a 4 minutos sin tocarlo, hasta que se forme una costra dorada.', 4],
    ['Dar vuelta', 'Girala con una espátula ancha y cociná 2 minutos más, hasta que el centro esté blando.', 2],
    ['Servir', 'Serví al instante con rodajas de tomate, aceite de oliva, ají molido y pan para acompañar.'],
  ],
});

r({
  key: 'pizza_muzza',
  nombre: 'Pizza casera de muzzarella',
  desc: 'Masa casera esponjosa, salsa de tomate y mucha muzzarella. Estilo pizzería porteña.',
  cat: 'Pizzas', min: 110, dif: 'Media', porc: 4, emoji: '🍕', img: 'Pizza',
  tip: 'Prehorneá la masa con la salsa antes de poner el queso: así la base queda cocida y el queso no se quema.',
  ing: [
    ['harina', 500, 'g'], ['levadura', 25, 'g'], ['azucar', 1, 'cdta'], ['pure_tomate', 300, 'g'],
    ['muzzarella', 400, 'g'], ['oregano', null, 'cn'], ['aceitunas', 50, 'g', O], ['ajo', 1, 'diente', O],
    ['sal', 10, 'g'], ['aceite', 3, 'cda'],
  ],
  pasos: [
    ['Activar la levadura', 'Disolvé la levadura y el azúcar en 300 ml de agua tibia. Dejá reposar 10 minutos hasta que espume.', 10],
    ['Amasar', 'En un bowl mezclá la harina con la sal, hacé un hueco y volcá la levadura y el aceite. Uní y amasá 10 minutos sobre la mesada hasta lograr una masa lisa y elástica.', 10],
    ['Leudar', 'Poné la masa en un bowl aceitado, tapala con film y dejala en un lugar cálido 1 hora, hasta que duplique su volumen.', 60],
    ['Estirar', 'Desgasificá la masa, dividila en 2 y estirala en pizzeras aceitadas. Dejala levar 15 minutos más.', 15],
    ['Prehornear', 'Mezclá el puré de tomate con sal, orégano y el ajo picado. Cubrí la masa con la salsa y horneá a 220 °C unos 12 minutos.', 12],
    ['Gratinar', 'Agregá la muzzarella en cubos, volvé al horno 8 minutos hasta que se derrita, y terminá con orégano, un hilo de aceite y aceitunas.', 8],
  ],
});

r({
  key: 'fugazzeta',
  nombre: 'Fugazzeta rellena',
  desc: 'Doble masa, muzzarella en el medio y una montaña de cebolla dorada arriba.',
  cat: 'Pizzas', min: 120, dif: 'Media', porc: 4, emoji: '🧅', img: 'Fugazzeta',
  tip: 'Cortá la cebolla bien fina y dejala con sal 15 minutos: larga agua y se dora mejor en el horno.',
  ing: [
    ['harina', 500, 'g'], ['levadura', 25, 'g'], ['azucar', 1, 'cdta'], ['muzzarella', 500, 'g'],
    ['cebolla', 4, 'u'], ['queso_rallado', 30, 'g', O], ['oregano', null, 'cn'], ['sal', 10, 'g'], ['aceite', 4, 'cda'],
  ],
  pasos: [
    ['Masa', 'Disolvé la levadura y el azúcar en 300 ml de agua tibia. Uní con la harina, la sal y 3 cucharadas de aceite y amasá 10 minutos. Dejá levar tapada 1 hora.', 70],
    ['Cebolla', 'Cortá la cebolla en pluma muy fina, salala y dejala 15 minutos. Escurrí el líquido que larga.', 15],
    ['Armar la base', 'Dividí la masa en 2 partes, una un poco más grande. Estirá la grande en una pizzera aceitada y cubrila con la muzzarella en fetas.'],
    ['Cerrar', 'Estirá la otra parte, tapá la muzzarella y cerrá los bordes pellizcándolos. Distribuí la cebolla arriba, rociá con aceite y espolvoreá orégano y queso rallado.'],
    ['Hornear', 'Horneá a 220 °C entre 25 y 30 minutos, hasta que la cebolla esté dorada y la masa cocida por debajo.', 30],
  ],
});

r({
  key: 'sopa_verduras',
  nombre: 'Sopa de verduras',
  desc: 'Reconfortante y liviana, para aprovechar las verduras que quedan en la heladera.',
  cat: 'Guisos y sopas', min: 45, dif: 'Fácil', porc: 4, emoji: '🥣', img: 'Sopa de verduras',
  tip: 'Si la licuás al final, se transforma en una crema de verduras.',
  ing: [
    ['zanahoria', 2, 'u'], ['papa', 2, 'u'], ['zapallo', 300, 'g'], ['cebolla', 1, 'u'], ['puerro', 1, 'u', O],
    ['apio', 1, 'u', O], ['zapallito', 1, 'u', O], ['caldo', 1, 'u'], ['fideos', 100, 'g', opt('municiones o cabello de ángel')],
    ['queso_rallado', null, 'cn', O], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Cortar las verduras', 'Pelá y cortá todas las verduras en cubitos chicos y parejos para que se cocinen al mismo tiempo.'],
    ['Rehogar', 'En una olla con un poco de aceite rehogá la cebolla, el puerro y el apio 5 minutos.', 5],
    ['Hervir', 'Agregá el resto de las verduras, el caldo y 1,5 litros de agua. Cociná a fuego medio 25 minutos.', 25],
    ['Fideos', 'Sumá los fideos y cociná el tiempo que indique el paquete (unos 5 minutos). Ajustá la sal.', 5],
    ['Servir', 'Serví bien caliente con queso rallado por encima.'],
  ],
});

r({
  key: 'puchero',
  nombre: 'Puchero',
  desc: 'Carne y verduras hervidas juntas: un caldo de primera y un plato abundante.',
  cat: 'Guisos y sopas', min: 150, dif: 'Fácil', porc: 6, emoji: '🍖', img: 'Puchero',
  tip: 'Agregá las verduras según su dureza: primero las más duras (choclo, zanahoria), al final las más tiernas (zapallo).',
  ing: [
    ['falda', 1, 'kg'], ['chorizo', 2, 'u', O], ['pollo', 2, 'u', O], ['choclo', 2, 'u'], ['papa', 3, 'u'],
    ['batata', 2, 'u'], ['zapallo', 400, 'g'], ['zanahoria', 2, 'u'], ['cebolla', 1, 'u'], ['puerro', 1, 'u', O],
    ['apio', 1, 'u', O], ['laurel', 2, 'u'], ['sal', null, 'cn'], ['aceite_oliva', null, 'cn', opt('para servir')],
  ],
  pasos: [
    ['Hervir la carne', 'Poné la carne en una olla grande con 4 litros de agua fría, sal y laurel. Cuando hierva, retirá la espuma con una espumadera y cociná a fuego bajo 1 hora.', 60],
    ['Primeras verduras', 'Sumá la cebolla entera, el puerro, el apio, las zanahorias y los choclos en trozos. Si usás pollo y chorizo, agregalos ahora. Cociná 30 minutos.', 30],
    ['Últimas verduras', 'Agregá la papa, la batata y el zapallo en trozos grandes. Cociná 25 minutos más, hasta que todo esté tierno.', 25],
    ['Servir', 'Serví el caldo aparte como primer plato (podés hervir unos fideos en él) y después la carne con las verduras, con un chorrito de aceite de oliva y sal.'],
  ],
});

r({
  key: 'ensalada_rusa',
  nombre: 'Ensalada rusa',
  desc: 'Papa, zanahoria, arvejas y huevo con mayonesa. Infaltable como acompañamiento.',
  cat: 'Ensaladas', min: 40, dif: 'Fácil', porc: 4, emoji: '🥗', img: 'Ensalada rusa',
  tip: 'Cortá papa y zanahoria en cubitos antes de hervir: quedan parejos y se cocinan en la mitad de tiempo.',
  ing: [
    ['papa', 4, 'u'], ['zanahoria', 3, 'u'], ['arvejas', 1, 'lata'], ['huevo', 3, 'u'], ['mayonesa', 150, 'g'],
    ['limon', 1, 'u', O], ['sal', null, 'cn'],
  ],
  pasos: [
    ['Cortar', 'Pelá las papas y las zanahorias y cortalas en cubitos de 1 cm.'],
    ['Hervir', 'Ponelas en agua fría con sal y cociná 10 a 12 minutos desde que hierve, hasta que estén tiernas pero firmes. Escurrí y enfriá.', 12],
    ['Huevos duros', 'Hervé los huevos 10 minutos, enfrialos en agua fría, pelalos y picalos.', 10],
    ['Mezclar', 'Uní papa, zanahoria, arvejas escurridas y huevo. Agregá la mayonesa, unas gotas de limón y sal, y mezclá con suavidad. Enfriá en la heladera antes de servir.'],
  ],
});

r({
  key: 'ensalada_mixta',
  nombre: 'Ensalada mixta',
  desc: 'Lechuga, tomate y cebolla: la ensalada de todos los días para acompañar cualquier plato.',
  cat: 'Ensaladas', min: 10, dif: 'Fácil', porc: 2, emoji: '🥗', img: 'Ensalada mixta',
  tip: 'Condimentá justo antes de servir para que la lechuga no se marchite.',
  ing: [
    ['lechuga', 1, 'u'], ['tomate', 2, 'u'], ['cebolla', 1, 'u', { t: 'chico' }], ['zanahoria', 1, 'u', opt('rallada')],
    ['huevo', 2, 'u', opt('duros')], ['vinagre', 2, 'cda'], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Lavar', 'Lavá muy bien la lechuga hoja por hoja y secala con un repasador o centrifugador.'],
    ['Cortar', 'Cortá la lechuga con las manos, el tomate en gajos y la cebolla en pluma fina. Si la cebolla es fuerte, dejala 5 minutos en agua fría.', 5],
    ['Condimentar', 'En un bowl mezclá todo, sumá zanahoria rallada y huevo duro si tenés, y condimentá con sal, aceite y vinagre al momento de servir.'],
  ],
});

r({
  key: 'zapallitos_rellenos',
  nombre: 'Zapallitos rellenos',
  desc: 'Zapallitos gratinados rellenos con su pulpa, cebolla y queso. Con o sin carne.',
  cat: 'Vegetariano', min: 55, dif: 'Fácil', porc: 4, emoji: '🟢', img: 'Zapallito relleno',
  tip: 'Para una versión más contundente, sumale al relleno carne picada salteada.',
  ing: [
    ['zapallito', 6, 'u'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u', O], ['huevo', 1, 'u'], ['queso_rallado', 50, 'g'],
    ['queso_cremoso', 100, 'g', O], ['pan_rallado', 3, 'cda'], ['carne_picada', 300, 'g', O], ['nuez_moscada', 1, 'pizca', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hervir', 'Hervé los zapallitos enteros 8 minutos en agua con sal. Escurrilos y dejalos enfriar.', 8],
    ['Vaciar', 'Cortalos a la mitad y retirá la pulpa con una cuchara, dejando un borde de medio centímetro. Picá la pulpa.'],
    ['Relleno', 'Rehogá la cebolla y el morrón picados 8 minutos (si usás carne, sumala y cociná hasta que cambie de color). Agregá la pulpa y cociná 5 minutos más. Fuera del fuego sumá el huevo, el queso rallado, el cremoso en cubitos, sal, pimienta y nuez moscada.', 13],
    ['Rellenar y gratinar', 'Rellená las mitades, espolvoreá pan rallado y queso, rociá con aceite y horneá a 200 °C 20 minutos hasta que estén dorados.', 20],
  ],
});

r({
  key: 'budin_zapallitos',
  nombre: 'Budín de zapallitos',
  desc: 'Una especie de tortilla al horno, esponjosa y liviana, ideal para la cena.',
  cat: 'Vegetariano', min: 50, dif: 'Fácil', porc: 4, emoji: '🥒', img: 'Budín de zapallitos',
  tip: 'También sale con zucchini o mezclando los dos.',
  ing: [
    ['zapallito', 4, 'u'], ['cebolla', 1, 'u'], ['huevo', 4, 'u'], ['queso_rallado', 50, 'g'], ['harina', 3, 'cda'],
    ['leche', 100, 'ml', O], ['queso_cremoso', 100, 'g', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Rallar', 'Rallá los zapallitos con cáscara, salalos y dejalos 10 minutos en un colador. Apretalos para sacarles el agua.', 10],
    ['Rehogar', 'Rehogá la cebolla picada en aceite 8 minutos. Agregá los zapallitos y cociná 5 minutos más.', 13],
    ['Mezclar', 'En un bowl batí los huevos con la leche, la harina, el queso rallado, sal y pimienta. Sumá las verduras y el cremoso en cubos.'],
    ['Hornear', 'Volcá en una fuente aceitada y horneá a 180 °C unos 30 minutos, hasta que esté firme y dorado.', 30],
  ],
});

r({
  key: 'polenta_tuco',
  nombre: 'Polenta con tuco y queso',
  desc: 'Polenta cremosa con manteca y queso, bañada en un tuco con o sin carne.',
  cat: 'Vegetariano', min: 40, dif: 'Fácil', porc: 4, emoji: '🌽', img: 'Polenta',
  tip: 'Echá la polenta en lluvia batiendo con batidor para que no se formen grumos.',
  ing: [
    ['polenta', 300, 'g'], ['leche', 500, 'ml', O], ['manteca', 30, 'g'], ['queso_rallado', 50, 'g'],
    ['queso_cremoso', 150, 'g', O], ['pure_tomate', 1, 'caja'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'],
    ['carne_picada', 300, 'g', opt('para un tuco con carne')], ['oregano', 1, 'cdta'], ['laurel', 1, 'u'],
    ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Tuco', 'Rehogá la cebolla y el ajo picados en aceite 8 minutos. Si usás carne, agregala y cociná hasta que cambie de color. Sumá el puré de tomate, laurel, orégano y sal, y cociná 20 minutos a fuego bajo.', 28],
    ['Hervir el líquido', 'En una olla llevá a hervor 1 litro de líquido (agua, o mitad agua y mitad leche para que quede más cremosa) con sal.'],
    ['Polenta', 'Bajá el fuego y echá la polenta en forma de lluvia mientras batís. Cociná revolviendo el tiempo que indique el paquete (de 1 a 5 minutos si es instantánea).', 5],
    ['Terminar', 'Fuera del fuego, sumá la manteca, el queso rallado y el cremoso en cubos. Serví enseguida con el tuco por encima.'],
  ],
});

r({
  key: 'guiso_arroz',
  nombre: 'Guiso de arroz',
  desc: 'Arroz cocinado en un caldo de tomate con carne y verduras. Rendidor y económico.',
  cat: 'Guisos y sopas', min: 50, dif: 'Fácil', porc: 4, emoji: '🍚', img: 'Guiso',
  tip: 'Tiene que quedar caldoso: si se seca mucho, agregá agua caliente de a poco.',
  ing: [
    ['arroz', 300, 'g'], ['carne_guiso', 400, 'g', O], ['chorizo', 1, 'u', O], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'],
    ['zanahoria', 1, 'u'], ['papa', 2, 'u'], ['pure_tomate', 300, 'g'], ['caldo', 1, 'u'], ['pimenton', 1, 'cdta'],
    ['arvejas', 1, 'lata', O], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar la carne', 'Si usás carne y chorizo, cortalos en cubos y rodajas y dorálos en una olla con aceite 8 minutos.', 8],
    ['Sofrito', 'Agregá la cebolla y el morrón picados y rehogá 8 minutos. Sumá la zanahoria en rodajas y el pimentón.', 8],
    ['Caldo', 'Incorporá el puré de tomate, el caldo y 1 litro de agua caliente. Cociná 15 minutos.', 15],
    ['Arroz y papa', 'Agregá la papa en cubos y el arroz. Cociná 18 minutos revolviendo de vez en cuando. Al final sumá las arvejas y ajustá la sal.', 18],
  ],
});

r({
  key: 'fideos_manteca',
  nombre: 'Fideos con manteca y queso',
  desc: 'La solución más rápida cuando no hay nada. Simple, pero hecha bien es una caricia.',
  cat: 'Pastas', min: 15, dif: 'Fácil', porc: 2, emoji: '🍝', img: 'Pasta al burro',
  tip: 'Agregá un cucharón del agua de cocción con la manteca y el queso: se forma una salsa cremosa que se adhiere a los fideos.',
  ing: [
    ['fideos', 250, 'g'], ['manteca', 40, 'g'], ['queso_rallado', 50, 'g'], ['ajo', 1, 'diente', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'],
  ],
  pasos: [
    ['Hervir', 'Cociná los fideos en abundante agua hirviendo con sal el tiempo que indica el paquete. Antes de escurrir, guardá una taza del agua de cocción.', 10],
    ['Manteca', 'En la misma olla derretí la manteca a fuego bajo (con el ajo picado si te gusta, 1 minuto).', 1],
    ['Unir', 'Volvé los fideos, sumá el queso rallado y medio cucharón del agua de cocción. Revolvé enérgicamente hasta que se forme una salsa cremosa. Terminá con pimienta.'],
  ],
});

r({
  key: 'fideos_crema',
  nombre: 'Fideos con crema, jamón y champiñones',
  desc: 'Una salsa blanca rápida con jamón y hongos salteados.',
  cat: 'Pastas', min: 25, dif: 'Fácil', porc: 4, emoji: '🍄', img: 'Pasta con champiñones',
  tip: 'No dejes hervir la crema a fuego fuerte: con un hervor suave alcanza para que espese.',
  ing: [
    ['fideos', 500, 'g'], ['crema', 300, 'ml'], ['jamon', 150, 'g'], ['champinones', 200, 'g', O], ['cebolla', 1, 'u', O],
    ['manteca', 20, 'g'], ['queso_rallado', 30, 'g'], ['nuez_moscada', 1, 'pizca', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'],
  ],
  pasos: [
    ['Hervir los fideos', 'Cociná los fideos en abundante agua con sal según el paquete.', 10],
    ['Saltear', 'En una sartén con la manteca rehogá la cebolla picada 5 minutos. Sumá los champiñones fileteados y cociná hasta que se doren. Agregá el jamón en tiras.', 8],
    ['Salsa', 'Incorporá la crema, sal, pimienta y nuez moscada. Cociná a fuego bajo 3 minutos, hasta que espese levemente.', 3],
    ['Unir', 'Mezclá los fideos escurridos con la salsa y serví con queso rallado.'],
  ],
});

r({
  key: 'canelones',
  nombre: 'Canelones de verdura',
  desc: 'Panqueques rellenos de acelga y ricota, con salsa blanca y tuco gratinados.',
  cat: 'Pastas', min: 90, dif: 'Media', porc: 4, emoji: '🌯', img: 'Canelones',
  tip: 'Podés usar espinaca en lugar de acelga, o mitad y mitad.',
  ing: [
    ['harina', 190, 'g', nota('150 g para los panqueques y 40 g para la salsa')], ['leche', 850, 'ml'], ['huevo', 3, 'u'],
    ['manteca', 60, 'g'], ['acelga', 1, 'atado'], ['ricota', 250, 'g'], ['cebolla', 1, 'u'], ['queso_rallado', 60, 'g'],
    ['pure_tomate', 300, 'g', O], ['nuez_moscada', 1, 'pizca'], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Panqueques', 'Licuá 150 g de harina, 350 ml de leche, 2 huevos, 20 g de manteca derretida y una pizca de sal. Dejá reposar 15 minutos y cociná panqueques finos en una sartén antiadherente enmantecada, 1 minuto por lado. Salen unos 10.', 30],
    ['Relleno', 'Cociná la acelga, escurrila muy bien y picala. Rehogá la cebolla picada 8 minutos, sumá la acelga, y fuera del fuego mezclá con la ricota, 1 huevo, la mitad del queso, sal, pimienta y nuez moscada.', 15],
    ['Salsa blanca', 'Derretí 40 g de manteca, agregá 40 g de harina y revolvé 1 minuto. Sumá 500 ml de leche de a poco batiendo y cociná hasta que espese. Condimentá con sal y nuez moscada.', 8],
    ['Armar', 'Rellená cada panqueque, enrollalo y acomodalo en una fuente con un poco de tuco o salsa blanca en la base.'],
    ['Gratinar', 'Cubrí con la salsa blanca, unas cucharadas de tuco y el resto del queso. Horneá a 200 °C 20 minutos hasta que estén dorados.', 20],
  ],
});

r({
  key: 'humita',
  nombre: 'Humita en olla',
  desc: 'Crema de choclo rallado con cebolla, morrón y zapallo. Plato norteño por excelencia.',
  cat: 'Vegetariano', min: 50, dif: 'Fácil', porc: 4, emoji: '🌽', img: 'Humita',
  tip: 'Rallá los choclos con el rallador grueso sobre un bowl para aprovechar toda la leche del grano.',
  ing: [
    ['choclo', 6, 'u'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['leche', 250, 'ml'], ['manteca', 30, 'g'],
    ['zapallo', 300, 'g', O], ['queso_cremoso', 150, 'g', O], ['azucar', 1, 'cdta'], ['pimenton', 1, 'cdta', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Rallar los choclos', 'Rallá los choclos con el rallador grueso sobre un bowl.'],
    ['Sofrito', 'En una olla con manteca y aceite rehogá la cebolla y el morrón picados 10 minutos. Si usás zapallo, rallalo o cortalo en cubitos chicos y sumalo.', 10],
    ['Cocinar el choclo', 'Agregá el choclo rallado, la leche, el azúcar, el pimentón, sal y pimienta. Cociná a fuego bajo revolviendo seguido 20 minutos, hasta que espese y esté cremoso.', 20],
    ['Servir', 'Serví en cazuelas con cubos de queso cremoso por encima para que se derritan.'],
  ],
});

r({
  key: 'guiso_garbanzos',
  nombre: 'Guiso de garbanzos',
  desc: 'Garbanzos con chorizo, tomate y pimentón. Simple, sabroso y lleno de proteína.',
  cat: 'Guisos y sopas', min: 70, dif: 'Fácil', porc: 4, emoji: '🫘', img: 'Potaje de garbanzos',
  tip: 'Si usás garbanzos secos, remojalos la noche anterior. Los de frasco se suman al final y se cocinan 10 minutos.',
  ing: [
    ['garbanzos', 300, 'g'], ['chorizo', 1, 'u', O], ['panceta', 100, 'g', O], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'],
    ['ajo', 2, 'diente'], ['tomate_lata', 1, 'lata'], ['papa', 2, 'u'], ['espinaca', 1, 'atado', O], ['pimenton', 1, 'cda'],
    ['comino', 1, 'cdta'], ['caldo', 1, 'u'], ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Remojar y hervir', 'Remojá los garbanzos 12 horas. Escurrilos y hervilos en agua sin sal 1 hora, hasta que estén tiernos.', 60],
    ['Sofrito', 'En otra olla dorá el chorizo y la panceta. Sumá la cebolla, el morrón y el ajo picados y rehogá 8 minutos. Agregá pimentón y comino.', 12],
    ['Guisar', 'Incorporá el tomate triturado, la papa en cubos, los garbanzos escurridos y el caldo con 500 ml de agua. Cociná 20 minutos.', 20],
    ['Espinaca', 'Si usás espinaca, sumala picada en los últimos 3 minutos. Ajustá la sal y serví.', 3],
  ],
});

r({
  key: 'bunuelos_acelga',
  nombre: 'Buñuelos de acelga',
  desc: 'Bocados fritos, crocantes por fuera y tiernos por dentro. Buena forma de que todos coman verdura.',
  cat: 'Vegetariano', min: 35, dif: 'Fácil', porc: 4, emoji: '🥬', img: 'Buñuelo',
  tip: 'Freílos con el aceite a temperatura media: si está muy caliente se doran afuera y quedan crudos adentro.',
  ing: [
    ['acelga', 1, 'atado'], ['huevo', 2, 'u'], ['harina_leudante', 150, 'g'], ['leche', 100, 'ml'], ['ajo', 1, 'diente'],
    ['queso_rallado', 30, 'g', O], ['cebolla', 1, 'u', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn', nota('para freír')],
  ],
  pasos: [
    ['Acelga', 'Cociná la acelga 3 minutos, escurrila muy bien y picala fina.', 3],
    ['Pasta', 'En un bowl batí los huevos con la leche, el ajo picado, el queso, sal y pimienta. Sumá la harina leudante y mezclá hasta lograr una pasta espesa. Incorporá la acelga (y la cebolla picada si usás).'],
    ['Freír', 'Con dos cucharas tomá porciones y freílas en aceite caliente a fuego medio, 2 minutos por lado, hasta que estén doradas.', 10],
    ['Escurrir', 'Escurrilos sobre papel absorbente y serví calientes, con ensalada o solos.'],
  ],
});

r({
  key: 'bife_caballo',
  nombre: 'Bife a caballo con papas fritas',
  desc: 'Bife jugoso con huevo frito encima y papas fritas caseras. Minuta de bodegón.',
  cat: 'Minutas', min: 35, dif: 'Fácil', porc: 2, emoji: '🍳', img: 'Bife a caballo',
  tip: 'Secá bien los bastones de papa antes de freír para que queden crocantes.',
  ing: [
    ['bife', 2, 'u'], ['huevo', 2, 'u'], ['papa', 3, 'u', { t: 'grande' }], ['sal', null, 'cn'], ['pimienta', null, 'cn'],
    ['aceite', null, 'cn', nota('para freír')],
  ],
  pasos: [
    ['Papas', 'Pelá las papas, cortalas en bastones, lavalas y secalas muy bien. Freílas en aceite a fuego medio 8 minutos, retiralas, subí el fuego y freílas de nuevo 3 minutos hasta que estén doradas.', 11],
    ['Bife', 'Calentá bien una plancha o sartén. Cociná los bifes 3 a 4 minutos por lado según el punto que te guste y salalos al final.', 8],
    ['Huevo frito', 'Freí los huevos en aceite caliente, bañando la clara con el aceite con una cuchara, hasta que la clara esté cocida y la yema líquida.', 2],
    ['Servir', 'Poné el huevo sobre el bife y acompañá con las papas fritas.'],
  ],
});

r({
  key: 'pan_carne',
  nombre: 'Pan de carne relleno',
  desc: 'Arrollado de carne picada relleno de jamón y queso, horneado hasta dorar.',
  cat: 'Carnes', min: 70, dif: 'Media', porc: 6, emoji: '🍖', img: 'Pastel de carne',
  tip: 'Arrollalo usando un papel manteca o film como base, igual que un arrollado dulce.',
  ing: [
    ['carne_picada', 800, 'g'], ['huevo', 2, 'u'], ['pan_rallado', 80, 'g'], ['leche', 50, 'ml', O], ['cebolla', 1, 'u'],
    ['ajo', 1, 'diente'], ['jamon', 100, 'g'], ['queso_cremoso', 150, 'g'], ['morron_rojo', 1, 'u', O],
    ['nuez_moscada', 1, 'pizca', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Mezcla', 'Mezclá la carne con los huevos, el pan rallado, la leche, la cebolla rallada, el ajo picado, sal, pimienta y nuez moscada.'],
    ['Estirar', 'Sobre un papel manteca extendé la carne formando un rectángulo de 1,5 cm de espesor.'],
    ['Rellenar', 'Cubrí con las fetas de jamón, el queso y tiras de morrón si tenés, dejando un borde libre.'],
    ['Arrollar', 'Ayudándote con el papel, enrollá desde el lado más corto y cerrá bien los extremos.'],
    ['Hornear', 'Pasalo a una asadera aceitada y horneá a 190 °C durante 45 minutos. Dejá reposar 10 minutos antes de cortar en rodajas.', 45],
  ],
});

r({
  key: 'calabaza_rellena',
  nombre: 'Zapallo relleno gratinado',
  desc: 'Medio zapallo asado y relleno de choclo cremoso con queso.',
  cat: 'Vegetariano', min: 70, dif: 'Fácil', porc: 2, emoji: '🎃', img: 'Cucurbita moschata',
  tip: 'Usá zapallo anco: es dulce y tiene la forma ideal para rellenar.',
  ing: [
    ['zapallo', 1, 'u'], ['cebolla', 1, 'u'], ['choclo', 1, 'u', opt('o 1 lata de choclo en granos')], ['queso_cremoso', 150, 'g'],
    ['crema', 100, 'ml', O], ['queso_rallado', 30, 'g'], ['nuez_moscada', 1, 'pizca', O], ['sal', null, 'cn'],
    ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Asar el zapallo', 'Cortá el zapallo a lo largo, retirá las semillas, pincelalo con aceite y sal, y horneá boca abajo a 200 °C unos 40 minutos, hasta que esté tierno.', 40],
    ['Relleno', 'Rehogá la cebolla picada 8 minutos, sumá los granos de choclo y la crema y cociná 5 minutos. Condimentá con sal, pimienta y nuez moscada.', 13],
    ['Rellenar', 'Retirá parte de la pulpa del zapallo con una cuchara, pisala y mezclala con el relleno y el cremoso en cubos. Rellená las mitades.'],
    ['Gratinar', 'Cubrí con queso rallado y gratiná 10 minutos a horno fuerte.', 10],
  ],
});

r({
  key: 'merluza_romana',
  nombre: 'Filet de merluza a la romana',
  desc: 'Pescado rebozado en una masa liviana y crocante, con limón.',
  cat: 'Pescados', min: 30, dif: 'Fácil', porc: 4, emoji: '🐟', img: 'Merluccius hubbsi',
  tip: 'Si la masa queda fría (podés usar agua con gas helada en lugar de leche) el rebozado sale más crocante.',
  ing: [
    ['merluza', 4, 'u'], ['harina', 150, 'g'], ['huevo', 2, 'u'], ['leche', 150, 'ml'], ['polvo_hornear', 1, 'cdta'],
    ['limon', 1, 'u'], ['perejil', null, 'cn', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn', nota('para freír')],
  ],
  pasos: [
    ['Preparar el pescado', 'Secá los filets con papel, quitales espinas si tienen, salpimentalos y rociá con unas gotas de limón.'],
    ['Masa', 'Batí los huevos con la leche, sumá la harina, el polvo de hornear y una pizca de sal hasta lograr una masa lisa, como de panqueque espeso.'],
    ['Rebozar y freír', 'Pasá cada filet por harina, después por la masa, y freílo en aceite caliente 3 minutos por lado hasta que esté dorado.', 6],
    ['Servir', 'Escurrí sobre papel y serví con gajos de limón, perejil picado y ensalada o puré.'],
  ],
});

r({
  key: 'ensalada_arroz_atun',
  nombre: 'Ensalada de arroz con atún',
  desc: 'Plato frío completo para los días de calor: arroz, atún, huevo y verduras.',
  cat: 'Ensaladas', min: 30, dif: 'Fácil', porc: 4, emoji: '🥗', img: 'Ensalada de arroz',
  tip: 'Enjuagá el arroz cocido con agua fría para cortar la cocción y que los granos queden sueltos.',
  ing: [
    ['arroz', 250, 'g'], ['atun', 1, 'lata'], ['huevo', 2, 'u'], ['tomate', 1, 'u'], ['choclo', 1, 'u', opt('o en lata')],
    ['arvejas', 1, 'lata', O], ['morron_rojo', 1, 'u', O], ['mayonesa', 3, 'cda', O], ['limon', 1, 'u', O],
    ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Arroz', 'Hervé el arroz en abundante agua con sal 15 minutos. Escurrilo y pasalo por agua fría.', 15],
    ['Huevos', 'Hervé los huevos 10 minutos, enfrialos y picalos.', 10],
    ['Mezclar', 'En un bowl grande uní el arroz con el atún desmenuzado, el tomate y el morrón en cubitos, los granos de choclo, las arvejas y el huevo.'],
    ['Condimentar', 'Condimentá con aceite, limón y sal, o con mayonesa si la preferís más cremosa. Enfriá antes de servir.'],
  ],
});

r({
  key: 'pollo_verdeo',
  nombre: 'Pollo al verdeo',
  desc: 'Pechuga en cubos con una salsa de crema y cebolla de verdeo. Va con arroz o puré.',
  cat: 'Pollo', min: 30, dif: 'Fácil', porc: 4, emoji: '🌱', img: 'Pollo al verdeo',
  tip: 'Separá la parte blanca del verdeo (para rehogar) de la verde (para el final): así conservás el color y el sabor fresco.',
  ing: [
    ['pechuga', 2, 'u'], ['verdeo', 4, 'u'], ['crema', 300, 'ml'], ['manteca', 20, 'g'], ['caldo', 1, 'u', O],
    ['queso_rallado', 30, 'g', O], ['arroz', 250, 'g', opt('para acompañar')], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar el pollo', 'Cortá las pechugas en cubos, salpimentalas y dorálas en una sartén con aceite a fuego fuerte 6 minutos. Retirá.', 6],
    ['Verdeo', 'En la misma sartén derretí la manteca y rehogá la parte blanca del verdeo picada 4 minutos.', 4],
    ['Salsa', 'Agregá la crema (y medio cubo de caldo desgranado si querés más sabor) y cociná 3 minutos a fuego bajo.', 3],
    ['Unir', 'Volvé el pollo, sumá la parte verde del verdeo y cociná 3 minutos más. Serví con arroz blanco o puré y queso rallado por encima.', 3],
  ],
});

r({
  key: 'revuelto_zapallitos',
  nombre: 'Revuelto de zapallitos',
  desc: 'Zapallitos salteados con cebolla y huevo. Listo en 20 minutos.',
  cat: 'Vegetariano', min: 20, dif: 'Fácil', porc: 2, emoji: '🥚', img: 'Revuelto',
  tip: 'Cortá los zapallitos en cubitos chicos para que se doren y no larguen tanta agua.',
  ing: [
    ['zapallito', 4, 'u'], ['cebolla', 1, 'u'], ['huevo', 3, 'u'], ['queso_rallado', 30, 'g', O], ['ajo', 1, 'diente', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Rehogar', 'Rehogá la cebolla en pluma (y el ajo) en una sartén con aceite 5 minutos.', 5],
    ['Zapallitos', 'Sumá los zapallitos en cubitos, salá y cociná a fuego medio-fuerte 8 minutos, hasta que estén tiernos y un poco dorados.', 8],
    ['Huevo', 'Bajá el fuego, agregá los huevos batidos con el queso, sal y pimienta, y revolvé hasta que cuajen pero sigan húmedos.', 2],
  ],
});

r({
  key: 'guiso_fideos',
  nombre: 'Guiso de fideos',
  desc: 'Mostacholes o tirabuzones cocinados en un caldo espeso de tomate y carne.',
  cat: 'Guisos y sopas', min: 50, dif: 'Fácil', porc: 4, emoji: '🍲', img: 'Guiso de fideos',
  tip: 'Usá fideos cortos y gruesos, que aguantan la cocción en el guiso sin pasarse.',
  ing: [
    ['fideos', 300, 'g'], ['carne_guiso', 400, 'g', O], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['zanahoria', 1, 'u'],
    ['papa', 2, 'u'], ['pure_tomate', 300, 'g'], ['caldo', 1, 'u'], ['pimenton', 1, 'cdta'], ['laurel', 1, 'u'],
    ['sal', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar', 'Si usás carne, cortala en cubos chicos y dorala en una olla con aceite 8 minutos.', 8],
    ['Sofrito', 'Sumá la cebolla y el morrón picados y rehogá 8 minutos. Agregá la zanahoria en rodajas, el pimentón y el laurel.', 8],
    ['Caldo', 'Incorporá el puré de tomate, el caldo y 1,2 litros de agua caliente. Cociná 15 minutos.', 15],
    ['Fideos', 'Sumá la papa en cubos y los fideos y cociná revolviendo seguido hasta que estén al dente, unos 12 minutos. Si se espesa demasiado, agregá agua caliente.', 12],
  ],
});

r({
  key: 'tarta_choclo',
  nombre: 'Tarta de choclo',
  desc: 'Relleno cremoso de choclo con salsa blanca y queso, dentro de una masa dorada.',
  cat: 'Tartas y empanadas', min: 60, dif: 'Fácil', porc: 4, emoji: '🌽', img: 'Tarta de choclo',
  tip: 'Con choclo en lata sale igual de rica y te ahorrás el paso de desgranar.',
  ing: [
    ['tapas_tarta', 2, 'u'], ['choclo', 3, 'u'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u', O], ['leche', 300, 'ml'],
    ['manteca', 30, 'g'], ['harina', 30, 'g'], ['huevo', 2, 'u'], ['queso_cremoso', 150, 'g'], ['nuez_moscada', 1, 'pizca'],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Choclo', 'Desgraná los choclos (o escurrí el de lata). Si son frescos, hervilos 8 minutos antes.', 8],
    ['Sofrito', 'Rehogá la cebolla y el morrón picados en aceite 8 minutos. Sumá el choclo.', 8],
    ['Salsa blanca', 'En otra olla derretí la manteca, sumá la harina, revolvé 1 minuto y agregá la leche de a poco batiendo hasta que espese. Condimentá con sal, pimienta y nuez moscada.', 6],
    ['Relleno', 'Uní el choclo con la salsa blanca. Cuando esté tibio, agregá los huevos batidos y el queso en cubos.'],
    ['Hornear', 'Forrá una tartera con una tapa, rellená, cubrí con la otra y cerrá. Horneá a 200 °C 35 minutos.', 35],
  ],
});

r({
  key: 'milanesas_berenjena',
  nombre: 'Milanesas de berenjena',
  desc: 'Rodajas de berenjena empanadas y horneadas. Se pueden hacer a la napolitana.',
  cat: 'Vegetariano', min: 50, dif: 'Fácil', porc: 4, emoji: '🍆', img: 'Solanum melongena',
  tip: 'Salá las rodajas y dejalas 20 minutos para que larguen el amargor; después secalas con papel.',
  ing: [
    ['berenjena', 3, 'u'], ['huevo', 2, 'u'], ['pan_rallado', 200, 'g'], ['ajo', 1, 'diente'], ['queso_rallado', 30, 'g', O],
    ['pure_tomate', 200, 'g', opt('para hacerlas a la napolitana')], ['muzzarella', 200, 'g', O], ['oregano', null, 'cn'],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Desamargar', 'Cortá las berenjenas en rodajas de 1 cm, salalas y dejalas en un colador 20 minutos. Secalas bien con papel.', 20],
    ['Empanar', 'Batí los huevos con ajo picado, queso rallado, sal y pimienta. Pasá cada rodaja por el huevo y por pan rallado.'],
    ['Hornear', 'Acomodalas en una placa aceitada, rociá con aceite y horneá a 200 °C 12 minutos por lado.', 24],
    ['Opcional: napolitana', 'Cubrilas con salsa de tomate, muzzarella y orégano, y gratiná 5 minutos más.', 5],
  ],
});

r({
  key: 'pollo_portuguesa',
  nombre: 'Pollo a la portuguesa',
  desc: 'Presas de pollo cocinadas en una salsa de tomate, cebolla y morrones.',
  cat: 'Pollo', min: 60, dif: 'Fácil', porc: 4, emoji: '🍅', img: 'Pollo guisado',
  tip: 'Queda ideal con arroz blanco o papas al natural para mojar en la salsa.',
  ing: [
    ['pollo', 6, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u'], ['tomate', 3, 'u'],
    ['ajo', 2, 'diente'], ['pure_tomate', 200, 'g'], ['vino_blanco', 100, 'ml', O], ['aceitunas', 50, 'g', O],
    ['laurel', 1, 'u'], ['pimenton', 1, 'cdta'], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Dorar', 'Salpimentá las presas y dorálas en una cacerola con aceite 5 minutos por lado. Retirá.', 10],
    ['Verduras', 'Rehogá la cebolla en pluma, los morrones en tiras y el ajo 10 minutos. Sumá los tomates en cubos y el pimentón.', 10],
    ['Guisar', 'Agregá el vino y dejá evaporar 2 minutos. Volvé el pollo, sumá el puré de tomate, el laurel y medio vaso de agua. Tapá y cociná a fuego bajo 30 minutos.', 32],
    ['Terminar', 'Agregá las aceitunas, ajustá la sal y cociná 5 minutos destapado para que espese la salsa.', 5],
  ],
});

r({
  key: 'hamburguesas_lentejas',
  nombre: 'Hamburguesas de lentejas',
  desc: 'Medallones vegetarianos de lentejas y verduras, dorados en sartén o al horno.',
  cat: 'Vegetariano', min: 60, dif: 'Media', porc: 4, emoji: '🫘', img: 'Hamburguesa vegetariana',
  tip: 'Si la mezcla queda muy húmeda, sumá pan rallado de a cucharadas hasta poder formar los medallones.',
  ing: [
    ['lentejas', 250, 'g'], ['cebolla', 1, 'u'], ['zanahoria', 1, 'u'], ['ajo', 1, 'diente'], ['huevo', 1, 'u'],
    ['pan_rallado', 80, 'g'], ['comino', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['perejil', null, 'cn', O],
    ['pan_hamburguesa', 4, 'u', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Cocinar las lentejas', 'Hervé las lentejas en agua sin sal 25 minutos, hasta que estén tiernas. Escurrilas muy bien.', 25],
    ['Sofrito', 'Rehogá la cebolla picada, la zanahoria rallada y el ajo en aceite 8 minutos.', 8],
    ['Procesar', 'Pisá las lentejas con un tenedor o procesalas brevemente (que queden algunas enteras). Mezclá con el sofrito, el huevo, el pan rallado, comino, pimentón, perejil, sal y pimienta.'],
    ['Formar y cocinar', 'Formá 6 medallones y cocinalos en una sartén con aceite 4 minutos por lado, o al horno a 200 °C 15 minutos por lado.', 8],
  ],
});

r({
  key: 'salpicon_pollo',
  nombre: 'Salpicón de pollo',
  desc: 'Ensalada fría de pollo, papa, huevo y verduras. Una cena fresca de verano.',
  cat: 'Ensaladas', min: 45, dif: 'Fácil', porc: 4, emoji: '🥗', img: 'Salpicón',
  tip: 'Aprovechá el caldo de hervir el pollo para una sopa al día siguiente.',
  ing: [
    ['pechuga', 2, 'u'], ['papa', 3, 'u'], ['huevo', 3, 'u'], ['tomate', 2, 'u'], ['morron_rojo', 1, 'u'], ['cebolla', 1, 'u', { t: 'chico' }],
    ['choclo', 1, 'u', O], ['lechuga', 1, 'u', O], ['mayonesa', 3, 'cda', O], ['limon', 1, 'u', O],
    ['sal', null, 'cn'], ['aceite', null, 'cn'], ['vinagre', null, 'cn'],
  ],
  pasos: [
    ['Hervir el pollo', 'Hervé las pechugas en agua con sal 20 minutos. Dejalas enfriar y desmenuzalas.', 20],
    ['Papas y huevos', 'Hervé las papas en cubos 12 minutos y los huevos 10 minutos. Enfriá y picá los huevos.', 12],
    ['Cortar', 'Cortá el tomate, el morrón y la cebolla en cubitos.'],
    ['Mezclar', 'Uní todo en una fuente, condimentá con aceite, vinagre o limón y sal (o con mayonesa). Serví frío sobre hojas de lechuga.'],
  ],
});

r({
  key: 'pure_calabaza_bife',
  nombre: 'Bife con puré de calabaza',
  desc: 'Bife a la plancha con un puré de zapallo suave y dulzón. Cena rápida y completa.',
  cat: 'Carnes', min: 35, dif: 'Fácil', porc: 2, emoji: '🥩', img: 'Puré de calabaza',
  tip: 'Dejá reposar el bife 3 minutos antes de cortarlo para que no pierda los jugos.',
  ing: [
    ['bife', 2, 'u'], ['zapallo', 600, 'g'], ['manteca', 20, 'g'], ['nuez_moscada', 1, 'pizca'], ['leche', 50, 'ml', O],
    ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Hervir el zapallo', 'Pelá el zapallo, cortalo en cubos y hervilo 15 minutos (o cocinalo al vapor), hasta que esté tierno.', 15],
    ['Puré', 'Escurrilo muy bien y pisalo con la manteca, sal, pimienta y nuez moscada. Si queda espeso, agregá un chorrito de leche.'],
    ['Bife', 'Cociná los bifes en una plancha bien caliente con unas gotas de aceite, 3 a 4 minutos por lado. Salá al final y dejalos reposar 3 minutos.', 8],
  ],
});

r({
  key: 'tarta_zapallitos',
  nombre: 'Tarta de zapallitos',
  desc: 'Zapallitos rallados con cebolla, huevo y queso. Una tarta liviana y económica.',
  cat: 'Tartas y empanadas', min: 60, dif: 'Fácil', porc: 4, emoji: '🥧', img: 'Tarta de zapallitos',
  tip: 'Hacela con una sola tapa y la superficie descubierta: se gratina el queso y queda muy linda.',
  ing: [
    ['tapas_tarta', 1, 'u'], ['zapallito', 4, 'u'], ['cebolla', 2, 'u'], ['huevo', 3, 'u'], ['queso_rallado', 50, 'g'],
    ['queso_cremoso', 150, 'g', O], ['crema', 100, 'ml', O], ['sal', null, 'cn'], ['pimienta', null, 'cn'], ['aceite', null, 'cn'],
  ],
  pasos: [
    ['Zapallitos', 'Rallá los zapallitos, salalos y dejalos 10 minutos en un colador. Apretalos para sacar el agua.', 10],
    ['Rehogar', 'Rehogá la cebolla picada 8 minutos, sumá los zapallitos y cociná 5 minutos más. Dejá entibiar.', 13],
    ['Relleno', 'Batí los huevos con la crema, sal y pimienta. Sumá la verdura y el cremoso en cubos.'],
    ['Hornear', 'Forrá una tartera con la tapa, rellená, cubrí con queso rallado y horneá a 200 °C 30 minutos, hasta que esté firme y dorada.', 30],
  ],
});

module.exports = { categorias, unidades, ingredientes, recetas };
