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
  { key: 'pastas', nombre: 'Pastas frescas', emoji: '🥟' },
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

// ===========================================================================
// AMPLIACIÓN (noviembre 2026). Siempre agregar AL FINAL: el orden define los Id.
// ===========================================================================

// Verduras
i('coliflor', 'Coliflor', 'Coliflores', 'verduras', '🥦', 'u', 800, { tam: true, img: 'Coliflor' });
i('repollo', 'Repollo', 'Repollos', 'verduras', '🥬', 'u', 1200, { tam: true, sin: 'repollo blanco,col,repollo colorado', img: 'Repollo' });
i('remolacha', 'Remolacha', 'Remolachas', 'verduras', '🟣', 'u', 150, { tam: true, sin: 'betarraga,remolachas', img: 'Beta vulgaris' });
i('pepino', 'Pepino', 'Pepinos', 'verduras', '🥒', 'u', 250, { tam: true, img: 'Cucumis sativus' });
i('rucula', 'Rúcula', 'Rúcula', 'verduras', '🥬', 'atado', 100, { sin: 'rucula,rúcula,arugula', img: 'Eruca vesicaria' });
i('jengibre', 'Jengibre', 'Jengibre', 'verduras', '🫚', 'g', 30, { sin: 'kion,gengibre,jengibre fresco', img: 'Zingiber officinale' });
i('cilantro', 'Cilantro', 'Cilantro', 'verduras', '🌿', 'atado', 40, { sin: 'coriandro,culantro', img: 'Coriandrum sativum' });
i('romero', 'Romero', 'Romero', 'verduras', '🌿', 'atado', 20, { sin: 'romero fresco', img: 'Salvia rosmarinus' });
i('tomillo', 'Tomillo', 'Tomillo', 'verduras', '🌿', 'atado', 15, { sin: 'tomillo fresco', img: 'Thymus vulgaris' });
i('rabanito', 'Rabanito', 'Rabanitos', 'verduras', '🔴', 'u', 15, { sin: 'rabanitos,rábano,rabano', img: 'Raphanus sativus' });
i('chaucha', 'Chauchas', 'Chauchas', 'verduras', '🫛', 'g', null, { sin: 'chaucha,judías verdes,porotos verdes,vainitas', img: 'Judía verde' });
i('aji_picante', 'Ají picante', 'Ajíes picantes', 'verduras', '🌶️', 'u', 15, { sin: 'jalapeño,jalapeños,ají picante,chile fresco,ají putaparió,aji picante', img: 'Jalapeño' });
i('mandioca', 'Mandioca', 'Mandiocas', 'verduras', '🥔', 'u', 400, { tam: true, sin: 'yuca', img: 'Manihot esculenta' });
i('esparragos', 'Espárragos', 'Espárragos', 'verduras', '🌱', 'atado', 250, { sin: 'esparragos,espárrago', img: 'Asparagus officinalis' });
i('tomate_cherry', 'Tomates cherry', 'Tomates cherry', 'verduras', '🍅', 'g', 15, { sin: 'cherry,tomate cherry,tomatitos', img: 'Tomate cherry' });
i('brotes_soja', 'Brotes de soja', 'Brotes de soja', 'verduras', '🌱', 'g', null, { sin: 'brotes,germinados,brotes de soya', img: 'Brote de soja' });
i('hongos_secos', 'Hongos secos', 'Hongos secos', 'verduras', '🍄', 'g', null, { sin: 'hongos de pino,hongos deshidratados,funghi secos', img: 'Suillus luteus' });
i('radicheta', 'Radicheta', 'Radicheta', 'verduras', '🥬', 'atado', 200, { sin: 'achicoria,radicha', img: 'Cichorium intybus' });
i('ciboulette', 'Ciboulette', 'Ciboulette', 'verduras', '🌱', 'atado', 20, { sin: 'cebollín,cebollino,ciboulet', img: 'Allium schoenoprasum' });
i('portobellos', 'Hongos portobello', 'Hongos portobello', 'verduras', '🍄', 'g', 80, { sin: 'portobello,portobellos,hongos de cultivo', img: 'Portobello (hongo)' });
i('echalote', 'Echalote', 'Echalotes', 'verduras', '🧅', 'u', 30, { sin: 'chalota,échalote,escalonia', img: 'Allium ascalonicum' });

// Frutas
i('palta', 'Palta', 'Paltas', 'frutas', '🥑', 'u', 200, { tam: true, sin: 'aguacate,paltas', img: 'Persea americana' });
i('manzana', 'Manzana', 'Manzanas', 'frutas', '🍎', 'u', 180, { tam: true, sin: 'manzana verde,manzana roja', img: 'Manzana' });
i('naranja', 'Naranja', 'Naranjas', 'frutas', '🍊', 'u', 200, { tam: true, sin: 'jugo de naranja', img: 'Naranja (fruta)' });
i('lima', 'Lima', 'Limas', 'frutas', '🍋', 'u', 80, { sin: 'limas,lima ácida', img: 'Citrus × aurantiifolia' });
i('pasas_uva', 'Pasas de uva', 'Pasas de uva', 'frutas', '🍇', 'g', null, { sin: 'pasas,pasas rubias,pasas negras', img: 'Pasa (fruta)' });
i('ciruelas_pasas', 'Ciruelas pasas', 'Ciruelas pasas', 'frutas', '🫐', 'g', null, { sin: 'ciruelas,ciruela pasa,ciruelas secas', img: 'Ciruela pasa' });
i('anana_lata', 'Ananá en almíbar', 'Ananá en almíbar', 'frutas', '🍍', 'lata', 820, { sin: 'ananá,anana,piña,ananá en lata', img: 'Ananas comosus' });

// Carnes
i('vacio', 'Vacío', 'Vacío', 'carnes', '🥩', 'g', null, { sin: 'vacio,vacío de novillo', img: 'Vacío (corte de carne)' });
i('asado', 'Asado de tira', 'Asado de tira', 'carnes', '🍖', 'g', null, { sin: 'asado,tira de asado,costilla,costillas de vaca', img: 'Asado de tira' });
i('entrana', 'Entraña', 'Entraña', 'carnes', '🥩', 'g', null, { sin: 'entrana,entraña fina', img: 'Entraña' });
i('colita_cuadril', 'Colita de cuadril', 'Colita de cuadril', 'carnes', '🥩', 'g', 1000, { sin: 'colita,colita de cuadril', img: 'Colita de cuadril' });
i('lomo', 'Lomo', 'Lomo', 'carnes', '🥩', 'g', null, { sin: 'lomo vacuno,solomillo,medallones de lomo', img: 'Solomillo' });
i('bondiola', 'Bondiola de cerdo', 'Bondiola de cerdo', 'carnes', '🐖', 'g', null, { sin: 'bondiola,cuello de cerdo', img: 'Bondiola' });
i('carre_cerdo', 'Bife de cerdo', 'Bifes de cerdo', 'carnes', '🐖', 'u', 200, { sin: 'chuleta de cerdo,chuletas,carré de cerdo,carre de cerdo,costeleta de cerdo,bifes de cerdo', img: 'Chuleta de cerdo' });
i('costillitas', 'Costillitas de cerdo', 'Costillitas de cerdo', 'carnes', '🍖', 'g', null, { sin: 'costillas de cerdo,pechito de cerdo,ribs,costillitas', img: 'Costillas de cerdo' });
i('higado', 'Hígado', 'Hígado', 'carnes', '🥩', 'g', null, { sin: 'higado,hígado vacuno,higado de vaca', img: 'Hígado (alimento)' });
i('mondongo', 'Mondongo', 'Mondongo', 'carnes', '🥩', 'g', null, { sin: 'callos,tripa', img: 'Mondongo' });
i('morcilla', 'Morcilla', 'Morcillas', 'carnes', '🌭', 'u', 150, { sin: 'morcillas,morcilla vasca', img: 'Morcilla' });
i('matambrito', 'Matambrito de cerdo', 'Matambritos de cerdo', 'carnes', '🐖', 'g', 600, { sin: 'matambrito,matambre de cerdo', img: 'Matambre' });
i('lengua', 'Lengua vacuna', 'Lenguas vacunas', 'carnes', '👅', 'u', 1200, { sin: 'lengua,lengua de vaca', img: 'Lengua (alimento)' });
i('cordero', 'Cordero', 'Cordero', 'carnes', '🐑', 'g', null, { sin: 'pierna de cordero,carne de cordero,costillar de cordero,chivito', img: 'Carne de cordero' });

// Pollo
i('alitas', 'Alitas de pollo', 'Alitas de pollo', 'aves', '🍗', 'u', 90, { sin: 'alitas,alas de pollo,alas', img: 'Alitas de pollo' });

// Pescados y mariscos
i('salmon', 'Salmón', 'Salmón', 'pescados', '🐟', 'g', 200, { sin: 'salmon,filet de salmón,salmón rosado', img: 'Salmón (alimento)' });
i('langostinos', 'Langostinos', 'Langostinos', 'pescados', '🦐', 'g', 25, { sin: 'camarones,gambas,langostino,camarón', img: 'Pleoticus muelleri' });
i('calamar', 'Calamar', 'Calamares', 'pescados', '🦑', 'g', null, { sin: 'calamares,rabas,anillos de calamar', img: 'Calamar (alimento)' });
i('mejillones', 'Mejillones', 'Mejillones', 'pescados', '🦪', 'g', null, { sin: 'mejillón,cholgas', img: 'Mytilus' });
i('sardinas', 'Sardinas en lata', 'Latas de sardinas', 'pescados', '🐟', 'lata', 125, { sin: 'sardinas,sardina', img: 'Sardina (alimento)' });
i('caballa', 'Caballa en lata', 'Latas de caballa', 'pescados', '🐟', 'lata', 170, { sin: 'caballa,jurel', img: 'Scomber scombrus' });
i('pejerrey', 'Pejerrey', 'Pejerreyes', 'pescados', '🐟', 'g', 150, { sin: 'filet de pejerrey,pejerreyes', img: 'Odontesthes bonariensis' });
i('trucha', 'Trucha', 'Truchas', 'pescados', '🐟', 'g', 300, { sin: 'filet de trucha,trucha arcoíris', img: 'Oncorhynchus mykiss' });

// Fiambres y embutidos
i('salchichas', 'Salchichas', 'Salchichas', 'fiambres', '🌭', 'u', 50, { sin: 'salchicha,panchos,salchichas viena,salchichas de viena', img: 'Salchicha de Viena' });
i('jamon_crudo', 'Jamón crudo', 'Jamón crudo', 'fiambres', '🥓', 'g', 15, { sin: 'jamon crudo,prosciutto,serrano', img: 'Jamón serrano' });
i('salame', 'Salame', 'Salame', 'fiambres', '🥓', 'g', null, { sin: 'salamín,salamin,salami', img: 'Salami' });

// Lácteos
i('yogur', 'Yogur natural', 'Yogur natural', 'lacteos', '🥛', 'g', 190, { sin: 'yogur,yogurt,yoghurt,yogur griego', img: 'Yogur' });
i('queso_azul', 'Queso azul', 'Queso azul', 'lacteos', '🧀', 'g', null, { sin: 'roquefort,queso roquefort,gorgonzola', img: 'Queso azul' });
i('queso_crema', 'Queso crema', 'Queso crema', 'lacteos', '🧀', 'g', 290, { sin: 'queso untable,philadelphia,casancrem,mendicrim', img: 'Queso crema' });

// Legumbres
i('porotos_negros', 'Porotos negros', 'Porotos negros', 'legumbres', '🫘', 'g', null, { sin: 'frijoles negros,porotos negros', img: 'Frijol negro' });
i('porotos_colorados', 'Porotos colorados', 'Porotos colorados', 'legumbres', '🫘', 'g', null, { sin: 'porotos rojos,frijoles rojos,porotos aduki', img: 'Frijol rojo' });
i('arvejas_secas', 'Arvejas secas partidas', 'Arvejas secas partidas', 'legumbres', '🫛', 'g', null, { sin: 'arvejas partidas,arveja partida,arvejas secas', img: 'Guisante partido' });

// Harinas, cereales y pastas
i('arroz_yamani', 'Arroz yamaní', 'Arroz yamaní', 'harinas', '🍚', 'g', 1000, { sin: 'arroz integral,yamani,yamaní', img: 'Arroz integral' });
i('arroz_arborio', 'Arroz arborio', 'Arroz arborio', 'harinas', '🍚', 'g', 1000, { sin: 'arroz carnaroli,arroz para risotto,arborio,carnaroli', img: 'Arroz arborio' });
i('quinoa', 'Quinoa', 'Quinoa', 'harinas', '🌾', 'g', null, { sin: 'quínoa,quinua', img: 'Chenopodium quinoa' });
i('cuscus', 'Cuscús', 'Cuscús', 'harinas', '🌾', 'g', null, { sin: 'cous cous,couscous,cuscus', img: 'Cuscús' });
i('avena', 'Avena', 'Avena', 'harinas', '🌾', 'g', null, { sin: 'avena arrollada,copos de avena,avena instantánea', img: 'Copos de avena' });
i('harina_integral', 'Harina integral', 'Harina integral', 'harinas', '🌾', 'g', 1000, { sin: 'harina de trigo integral', img: 'Harina integral' });
i('harina_garbanzo', 'Harina de garbanzo', 'Harina de garbanzo', 'harinas', '🌾', 'g', 500, { sin: 'harina de garbanzos', img: 'Harina de garbanzo' });

// Pastas frescas
i('ravioles', 'Ravioles', 'Ravioles', 'pastas', '🥟', 'g', 500, { sin: 'raviol,ravioles de verdura,ravioles de ricota', img: 'Ravioli' });
i('sorrentinos', 'Sorrentinos', 'Sorrentinos', 'pastas', '🥟', 'g', 500, { sin: 'sorrentino', img: 'Sorrentinos' });
i('noquis_frescos', 'Ñoquis frescos', 'Ñoquis frescos', 'pastas', '🥔', 'g', 500, { sin: 'ñoquis,noquis,ñoquis de papa comprados,gnocchi', img: 'Ñoquis' });
i('lasania', 'Láminas de lasaña', 'Láminas de lasaña', 'pastas', '🍝', 'g', 400, { sin: 'lasagna,lasaña,tapas de lasaña,placas de lasaña', img: 'Lasaña' });
i('tallarines_frescos', 'Tallarines frescos', 'Tallarines frescos', 'pastas', '🍝', 'g', 500, { sin: 'fideos frescos,cintas,tallarines al huevo,spaghetti frescos', img: 'Tagliatelle' });

// Panes y masas
i('prepizza', 'Prepizza', 'Prepizzas', 'panificados', '🍕', 'u', 300, { sin: 'prepizzas,base de pizza,pizzeta,pizzetas', img: 'Pizza' });
i('tortillas_trigo', 'Tortillas de trigo', 'Tortillas de trigo', 'panificados', '🫓', 'u', 40, { sin: 'tortillas,rapiditas,wraps,tortillas mexicanas,fajitas', img: 'Tortilla de trigo' });
i('pan_arabe', 'Pan árabe', 'Panes árabes', 'panificados', '🫓', 'u', 60, { sin: 'pan pita,pita,pan de pita', img: 'Pan de pita' });

// Almacén
i('salsa_soja', 'Salsa de soja', 'Salsa de soja', 'almacen', '🫙', 'ml', null, { sin: 'soja,salsa de soya,shoyu,soy sauce', img: 'Salsa de soja' });
i('miel', 'Miel', 'Miel', 'almacen', '🍯', 'g', null, { img: 'Miel' });
i('ketchup', 'Kétchup', 'Kétchup', 'almacen', '🥫', 'g', null, { sin: 'ketchup,catsup,salsa ketchup', img: 'Kétchup' });
i('alcaparras', 'Alcaparras', 'Alcaparras', 'almacen', '🫒', 'g', null, { sin: 'alcaparra', img: 'Alcaparra' });
i('extracto_tomate', 'Extracto de tomate', 'Extracto de tomate', 'almacen', '🥫', 'g', 140, { sin: 'pasta de tomate,concentrado de tomate,tomate concentrado', img: 'Concentrado de tomate' });
i('nueces', 'Nueces', 'Nueces', 'almacen', '🌰', 'g', null, { sin: 'nuez', img: 'Juglans regia' });
i('mani', 'Maní', 'Maní', 'almacen', '🥜', 'g', null, { sin: 'mani,cacahuate,cacahuete', img: 'Arachis hypogaea' });
i('sesamo', 'Semillas de sésamo', 'Semillas de sésamo', 'almacen', '🌰', 'g', null, { sin: 'sésamo,sesamo,ajonjolí', img: 'Sesamum indicum' });
i('palmitos', 'Palmitos', 'Palmitos', 'almacen', '🥫', 'lata', 400, { sin: 'palmito', img: 'Palmito' });
i('cerveza', 'Cerveza', 'Cerveza', 'almacen', '🍺', 'ml', 1000, { sin: 'birra,cerveza rubia,cerveza negra', img: 'Cerveza' });
i('salsa_bbq', 'Salsa barbacoa', 'Salsa barbacoa', 'almacen', '🥫', 'g', null, { sin: 'barbacoa,bbq,salsa bbq', img: 'Salsa barbacoa' });
i('pesto', 'Pesto', 'Pesto', 'almacen', '🫙', 'g', null, { sin: 'salsa pesto,pesto de albahaca', img: 'Pesto' });
i('leche_coco', 'Leche de coco', 'Leche de coco', 'almacen', '🥥', 'ml', 400, { sin: 'crema de coco', img: 'Leche de coco' });
i('tomates_secos', 'Tomates secos', 'Tomates secos', 'almacen', '🍅', 'g', null, { sin: 'tomate seco,tomates deshidratados', img: 'Tomate seco' });
i('pepinillos', 'Pepinillos', 'Pepinillos', 'almacen', '🥒', 'g', null, { sin: 'pickles,pepinillos en vinagre,encurtidos', img: 'Pepinillo' });
i('salsa_picante', 'Salsa picante', 'Salsa picante', 'almacen', '🌶️', 'ml', null, { sin: 'tabasco,salsa tabasco,picante', img: 'Salsa picante' });

// Condimentos y especias
i('curry', 'Curry', 'Curry', 'condimentos', '🟡', 'g', null, { sin: 'curry en polvo', img: 'Curry en polvo' });
i('curcuma', 'Cúrcuma', 'Cúrcuma', 'condimentos', '🟠', 'g', null, { sin: 'curcuma,turmeric', img: 'Curcuma longa' });
i('provenzal', 'Provenzal', 'Provenzal', 'condimentos', '🌿', 'g', null, { sin: 'ajo y perejil', img: 'Persillade' });
i('ajo_polvo', 'Ajo en polvo', 'Ajo en polvo', 'condimentos', '🧄', 'g', null, { sin: 'ajo deshidratado,ajo granulado', img: 'Ajo en polvo' });
i('azafran', 'Azafrán', 'Azafrán', 'condimentos', '🟠', 'g', null, { sin: 'azafran,colorante,colorante para paella', img: 'Crocus sativus' });

// ---------------------------------------------------------------------------
// Recetas nuevas
// ---------------------------------------------------------------------------
const S = [['sal', null, 'cn'], ['pimienta', null, 'cn']];
const SA = [...S, ['aceite', null, 'cn']];

r({ key: 'vacio_horno', nombre: 'Vacío al horno con papas', desc: 'Vacío tierno y dorado, cocinado lento con papas que se impregnan de su jugo.', cat: 'Carnes', min: 150, dif: 'Fácil', porc: 4, emoji: '🥩', img: 'Vacío (corte de carne)',
  tip: 'Cocinalo con la grasa hacia arriba y tapado la primera parte: queda tierno por dentro y crocante por fuera.',
  ing: [['vacio', 1.5, 'kg'], ['papa', 6, 'u', { t: 'mediano' }], ['ajo', 3, 'diente'], ['romero', 1, 'atado', O], ['chimichurri', null, 'cn', opt('para servir')], ['sal', null, 'cn', nota('gruesa')], ...SA.slice(1)],
  pasos: [['Condimentar', 'Sacá el vacío de la heladera 30 minutos antes. Salalo con sal gruesa de ambos lados y untalo con ajo picado.', 30],
    ['Primera cocción tapado', 'Ponelo en una asadera con la grasa hacia arriba, cubrí con papel aluminio y horneá a 170 °C durante 1 hora y 15 minutos.', 75],
    ['Sumar las papas', 'Destapá, agregá las papas en gajos con aceite, sal y romero alrededor de la carne y subí el horno a 200 °C.'],
    ['Dorar', 'Cociná 40 minutos más, dando vuelta las papas a mitad de camino, hasta que el vacío esté dorado y las papas crocantes.', 40],
    ['Reposar y servir', 'Dejá reposar la carne 10 minutos antes de cortarla en tiras contra la fibra. Serví con chimichurri.', 10]] });

r({ key: 'asado_horno', nombre: 'Asado de tira al horno', desc: 'Para cuando no hay parrilla: tiras de asado jugosas y doradas en el horno de casa.', cat: 'Carnes', min: 100, dif: 'Fácil', porc: 4, emoji: '🍖', img: 'Asado de tira',
  tip: 'Pedí el asado de tira finito (3 o 4 cm): se cocina parejo y queda más tierno en el horno.',
  ing: [['asado', 1.5, 'kg'], ['ajo', 2, 'diente', O], ['limon', 1, 'u', O], ['chimichurri', null, 'cn', O], ['lechuga', 1, 'u', opt('para la ensalada')], ['tomate', 2, 'u', O], ['sal', null, 'cn', nota('gruesa')]],
  pasos: [['Preparar', 'Precalentá el horno a 200 °C. Salá el asado con sal gruesa de ambos lados.'],
    ['Hueso abajo', 'Acomodá las tiras en una asadera con el hueso hacia abajo y horneá 40 minutos sin abrir el horno.', 40],
    ['Dar vuelta', 'Girá las tiras y cociná 30 a 40 minutos más, hasta que la grasa esté dorada y crocante.', 35],
    ['Servir', 'Cortá entre los huesos y serví con chimichurri, unas gotas de limón y una ensalada de lechuga y tomate.']] });

r({ key: 'entrana_papas', nombre: 'Entraña con papas rústicas', desc: 'Entraña a la plancha bien sellada con papas al horno con provenzal.', cat: 'Carnes', min: 50, dif: 'Fácil', porc: 2, emoji: '🥩', img: 'Entraña',
  tip: 'La entraña se cocina rápido y a fuego fuerte: si se pasa, se pone dura.',
  ing: [['entrana', 600, 'g'], ['papa', 4, 'u'], ['provenzal', 1, 'cda', opt('o ajo y perejil picados')], ['chimichurri', null, 'cn', O], ...SA],
  pasos: [['Papas', 'Cortá las papas con cáscara en gajos, mezclalas con aceite, sal y provenzal y horneá a 220 °C unos 35 minutos, moviéndolas a mitad de cocción.', 35],
    ['Limpiar la entraña', 'Si tiene la membrana blanca, retirala con un cuchillo. Secala bien con papel.'],
    ['Sellar', 'Calentá muy bien una plancha o sartén de hierro. Cociná la entraña 4 minutos por lado sin moverla. Salá al final.', 8],
    ['Servir', 'Dejala reposar 3 minutos, cortala en tiras contra la fibra y serví con las papas y chimichurri.']] });

r({ key: 'colita_verduras', nombre: 'Colita de cuadril al horno con verduras', desc: 'Una pieza entera, jugosa, con calabaza, batata y cebolla asadas.', cat: 'Carnes', min: 90, dif: 'Fácil', porc: 4, emoji: '🥩', img: 'Colita de cuadril',
  tip: 'Sellá la colita en una sartén antes de hornearla: concentra los jugos.',
  ing: [['colita_cuadril', 1, 'kg'], ['zapallo', 500, 'g'], ['batata', 2, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u', O], ['ajo', 3, 'diente'], ['romero', 1, 'atado', O], ['vino_blanco', 100, 'ml', O], ...SA],
  pasos: [['Sellar', 'Salpimentá la colita y dorála en una sartén bien caliente con aceite, 3 minutos por cada lado.', 12],
    ['Verduras', 'Cortá el zapallo, las batatas, la cebolla y el morrón en trozos grandes. Acomodalos en una asadera con aceite, sal, ajo y romero.'],
    ['Hornear', 'Poné la carne encima, rociá con el vino y horneá a 200 °C entre 40 y 50 minutos, según el punto que te guste.', 45],
    ['Reposar', 'Dejá reposar la carne 10 minutos tapada con aluminio y cortala en rodajas finas. Serví con las verduras.', 10]] });

r({ key: 'lomo_champinon', nombre: 'Lomo al champiñón', desc: 'Medallones de lomo con una salsa cremosa de champiñones. Clásico de bodegón.', cat: 'Carnes', min: 35, dif: 'Media', porc: 2, emoji: '🍄', img: 'Solomillo',
  tip: 'Sellá los medallones a fuego muy fuerte y terminalos en la salsa solo un minuto, así quedan rosados.',
  ing: [['lomo', 500, 'g', nota('en medallones de 3 cm')], ['champinones', 250, 'g'], ['crema', 200, 'ml'], ['cebolla', 1, 'u', O], ['echalote', 2, 'u', opt('en lugar de la cebolla')], ['vino_blanco', 100, 'ml', O], ['manteca', 30, 'g'], ['papa', 3, 'u', opt('para acompañar')], ...SA],
  pasos: [['Sellar', 'Salpimentá los medallones y sellalos en una sartén muy caliente con aceite, 2 o 3 minutos por lado. Retirá y reservá.', 6],
    ['Champiñones', 'En la misma sartén derretí la manteca, rehogá la cebolla picada 4 minutos y sumá los champiñones fileteados hasta que se doren.', 8],
    ['Salsa', 'Agregá el vino y dejá evaporar 2 minutos. Incorporá la crema, sal y pimienta y cociná hasta que espese levemente.', 5],
    ['Terminar', 'Volvé los medallones a la salsa 1 minuto por lado. Serví con papas al natural o puré.', 2]] });

r({ key: 'bondiola_cerveza', nombre: 'Bondiola a la cerveza', desc: 'Bondiola de cerdo braseada en cerveza con cebollas, bien tierna y con salsa.', cat: 'Carnes', min: 150, dif: 'Fácil', porc: 4, emoji: '🍺', img: 'Bondiola',
  tip: 'Con unas ciruelas pasas en la salsa le das un toque dulce que combina muy bien con el cerdo.',
  ing: [['bondiola', 1.2, 'kg'], ['cerveza', 500, 'ml'], ['cebolla', 3, 'u'], ['mostaza', 2, 'cda'], ['miel', 1, 'cda', O], ['ciruelas_pasas', 80, 'g', O], ['batata', 3, 'u', opt('para acompañar')], ...SA],
  pasos: [['Dorar', 'Salpimentá la bondiola, untala con la mostaza y dorála de todos lados en una olla con aceite.', 10],
    ['Cebollas', 'Retirá la carne, rehogá las cebollas en pluma en la misma olla 10 minutos hasta que estén doradas.', 10],
    ['Brasear', 'Volvé la bondiola, agregá la cerveza, la miel y las ciruelas. Tapá y cociná a fuego bajo 2 horas, girándola cada tanto. También podés hacerlo en el horno a 170 °C.', 120],
    ['Salsa y servir', 'Retirá la carne, reducí la salsa 5 minutos a fuego fuerte y serví la bondiola en rodajas bañada con la salsa, con batatas al horno.', 5]] });

r({ key: 'cerdo_pure_manzana', nombre: 'Bifes de cerdo con puré de manzana', desc: 'Bifes de cerdo a la plancha con un puré de papa y manzana, dulce y salado.', cat: 'Carnes', min: 40, dif: 'Fácil', porc: 4, emoji: '🍎', img: 'Chuleta de cerdo',
  tip: 'El cerdo se seca rápido: retiralo apenas pierda el color rosado en el centro.',
  ing: [['carre_cerdo', 4, 'u'], ['manzana', 2, 'u'], ['papa', 4, 'u'], ['manteca', 30, 'g'], ['leche', 100, 'ml'], ['romero', 1, 'atado', O], ...SA],
  pasos: [['Puré', 'Hervé las papas y las manzanas peladas en cubos 20 minutos. Escurrí y pisá con la manteca, la leche y sal.', 20],
    ['Bifes', 'Salpimentá los bifes. Cocinalos en una sartén caliente con aceite y romero, 4 minutos por lado.', 8],
    ['Servir', 'Dejá reposar 2 minutos y serví con el puré.']] });

r({ key: 'costillitas_bbq', nombre: 'Costillitas de cerdo a la barbacoa', desc: 'Costillitas tiernas al horno, glaseadas con salsa barbacoa.', cat: 'Carnes', min: 150, dif: 'Fácil', porc: 4, emoji: '🍖', img: 'Costillas de cerdo',
  tip: 'Si no tenés salsa barbacoa, mezclá kétchup, miel, salsa de soja y pimentón.',
  ing: [['costillitas', 1.5, 'kg'], ['salsa_bbq', 200, 'g'], ['miel', 2, 'cda', O], ['ajo', 3, 'diente'], ['pimenton', 1, 'cda'], ['papa', 4, 'u', opt('para acompañar')], ...S],
  pasos: [['Condimentar', 'Frotá las costillitas con sal, pimienta, pimentón y ajo picado.'],
    ['Cocción lenta', 'Envolvelas en papel aluminio y horneá a 160 °C durante 1 hora y 45 minutos, hasta que la carne se separe del hueso.', 105],
    ['Glasear', 'Abrí el papel, pincelá con la salsa barbacoa mezclada con la miel y subí el horno a 220 °C.'],
    ['Dorar', 'Horneá 15 minutos más, pincelando una vez más a mitad de camino. Cortá entre los huesos y serví.', 15]] });

r({ key: 'matambrito_limon', nombre: 'Matambrito de cerdo al limón', desc: 'Matambrito tierno al horno con limón, ajo y papas.', cat: 'Carnes', min: 90, dif: 'Fácil', porc: 3, emoji: '🍋', img: 'Matambre',
  tip: 'Marinalo con el limón al menos 30 minutos: ablanda la carne y le da mucho sabor.',
  ing: [['matambrito', 1, 'kg'], ['limon', 2, 'u'], ['ajo', 3, 'diente'], ['papa', 4, 'u'], ['oregano', 1, 'cdta'], ...SA],
  pasos: [['Marinar', 'Mezclá el jugo de los limones con ajo picado, orégano, sal, pimienta y aceite. Cubrí el matambrito y dejalo 30 minutos.', 30],
    ['Hornear tapado', 'Ponelo en una asadera con la marinada, tapá con aluminio y horneá a 180 °C durante 40 minutos.', 40],
    ['Dorar', 'Destapá, sumá las papas en rodajas alrededor y horneá 30 minutos más a 200 °C hasta que todo esté dorado.', 30]] });

r({ key: 'higado_encebollado', nombre: 'Hígado encebollado con puré', desc: 'Bifes de hígado tiernos con mucha cebolla dorada. Rico en hierro y muy económico.', cat: 'Carnes', min: 40, dif: 'Fácil', porc: 4, emoji: '🧅', img: 'Hígado (alimento)',
  tip: 'Remojá el hígado en leche 30 minutos antes de cocinarlo: le saca el gusto fuerte.',
  ing: [['higado', 600, 'g'], ['cebolla', 3, 'u'], ['leche', 300, 'ml'], ['papa', 5, 'u'], ['manteca', 30, 'g'], ['harina', 2, 'cda', O], ...SA],
  pasos: [['Remojar', 'Cortá el hígado en bifes finos, retirá las partes duras y dejalo en leche 30 minutos (reservá 100 ml de leche para el puré).', 30],
    ['Puré', 'Hervé las papas 20 minutos, escurrí y pisá con manteca, leche y sal.', 20],
    ['Cebollas', 'Rehogá las cebollas en pluma con aceite a fuego medio 15 minutos, hasta que estén doradas. Retirá.', 15],
    ['Hígado', 'Secá los bifes, pasalos apenas por harina y cocinalos en la sartén caliente 2 minutos por lado. Salpimentá, volvé las cebollas y serví con el puré.', 4]] });

r({ key: 'mondongo_espanola', nombre: 'Mondongo a la española', desc: 'Mondongo tierno guisado con garbanzos, chorizo y pimentón.', cat: 'Guisos y sopas', min: 180, dif: 'Media', porc: 6, emoji: '🍲', img: 'Mondongo',
  tip: 'El secreto es hervir bien el mondongo antes: tiene que quedar muy tierno.',
  ing: [['mondongo', 1, 'kg'], ['garbanzos', 250, 'g', nota('remojados')], ['chorizo', 2, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['ajo', 3, 'diente'], ['pure_tomate', 1, 'caja'], ['pimenton', 1, 'cda'], ['laurel', 2, 'u'], ['papa', 2, 'u', O], ['limon', 1, 'u'], ...SA],
  pasos: [['Limpiar', 'Lavá el mondongo frotándolo con limón y sal. Enjuagalo varias veces.'],
    ['Hervir', 'Hervilo en abundante agua con laurel durante 1 hora y media, hasta que esté tierno. En otra olla cociná los garbanzos 1 hora.', 90],
    ['Sofrito', 'Cortá el mondongo en tiras. En una cacerola dorá el chorizo en rodajas, sumá cebolla, morrón y ajo picados y rehogá 8 minutos. Agregá el pimentón.', 12],
    ['Guisar', 'Incorporá el mondongo, los garbanzos, el puré de tomate y un vaso de agua. Cociná 40 minutos a fuego bajo (sumá las papas en cubos en los últimos 20).', 40]] });

r({ key: 'lengua_vinagreta', nombre: 'Lengua a la vinagreta', desc: 'Lengua hervida en fetas, con una vinagreta de morrón, cebolla y huevo. Se come fría.', cat: 'Carnes', min: 180, dif: 'Media', porc: 6, emoji: '👅', img: 'Lengua (alimento)',
  tip: 'Pelala en caliente, apenas sale de la olla: en frío la piel no sale.',
  ing: [['lengua', 1, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u', O], ['huevo', 3, 'u'], ['perejil', 1, 'atado'], ['ajo', 2, 'diente'], ['vinagre', 100, 'ml'], ['laurel', 2, 'u'], ['zanahoria', 1, 'u'], ['aceite', 150, 'ml'], ...S],
  pasos: [['Hervir', 'Poné la lengua en una olla con agua, una cebolla, la zanahoria, laurel y sal. Cociná 2 horas y media a fuego bajo, hasta que esté tierna.', 150],
    ['Pelar', 'Retirala y pelala enseguida, en caliente. Dejala enfriar y cortala en fetas finas.'],
    ['Vinagreta', 'Picá muy chico la otra cebolla, los morrones, el ajo, el perejil y los huevos duros. Mezclá con el aceite, el vinagre, sal y pimienta.'],
    ['Armar', 'Acomodá las fetas en una fuente, cubrí con la vinagreta y dejá en la heladera al menos 2 horas antes de servir.', 120]] });

r({ key: 'cordero_horno', nombre: 'Cordero al horno con papas', desc: 'Cordero patagónico al horno con romero, ajo y papas doradas.', cat: 'Carnes', min: 150, dif: 'Media', porc: 4, emoji: '🐑', img: 'Carne de cordero',
  tip: 'Pinchá la carne y metele dientes de ajo y ramitas de romero en los cortes.',
  ing: [['cordero', 1.5, 'kg'], ['papa', 6, 'u'], ['ajo', 6, 'diente'], ['romero', 1, 'atado'], ['vino_blanco', 200, 'ml'], ['limon', 1, 'u', O], ...SA],
  pasos: [['Preparar', 'Hacé cortes en la carne y metele ajo y romero. Untala con aceite, sal, pimienta y jugo de limón.'],
    ['Hornear tapado', 'Ponela en una asadera con el vino, tapá con aluminio y horneá a 170 °C durante 1 hora y 15 minutos.', 75],
    ['Papas', 'Destapá, agregá las papas en gajos con aceite y sal, y subí a 200 °C.'],
    ['Dorar', 'Cociná 45 minutos más, bañando la carne con sus jugos cada tanto, hasta que esté dorada.', 45]] });

r({ key: 'pastel_choclo', nombre: 'Pastel de choclo', desc: 'Carne picada bien condimentada cubierta con una crema de choclo gratinada.', cat: 'Carnes', min: 70, dif: 'Media', porc: 6, emoji: '🌽', img: 'Pastel de choclo',
  tip: 'Espolvoreá azúcar sobre la crema de choclo antes de gratinar para que se forme una costra dorada.',
  ing: [['carne_picada', 600, 'g'], ['choclo', 6, 'u'], ['cebolla', 2, 'u'], ['leche', 250, 'ml'], ['manteca', 30, 'g'], ['huevo', 2, 'u', nota('duros')], ['aceitunas', 50, 'g', O], ['pasas_uva', 30, 'g', O], ['comino', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['albahaca', null, 'cn', O], ['azucar', 1, 'cda'], ...SA],
  pasos: [['Relleno', 'Rehogá una cebolla picada, sumá la carne y cociná hasta que pierda el color. Condimentá con comino, pimentón, sal y pimienta.', 15],
    ['Crema de choclo', 'Rallá los choclos. Rehogá la otra cebolla en la manteca, agregá el choclo, la leche y albahaca, y cociná revolviendo 15 minutos hasta que espese.', 20],
    ['Armar', 'En una fuente poné la carne, distribuí el huevo duro picado, las aceitunas y las pasas, y cubrí con la crema de choclo.'],
    ['Gratinar', 'Espolvoreá azúcar y horneá a 200 °C unos 25 minutos, hasta que esté dorado.', 25]] });

r({ key: 'sandwich_milanesa', nombre: 'Sándwich de milanesa completo', desc: 'El sánguche de milanesa con lechuga, tomate, jamón, queso y huevo.', cat: 'Minutas', min: 40, dif: 'Fácil', porc: 2, emoji: '🥪', img: 'Sándwich de milanesa',
  tip: 'Tostá apenas el pan: aguanta mejor los jugos sin desarmarse.',
  ing: [['nalga', 300, 'g', nota('2 milanesas')], ['pan', 2, 'u', { t: 'grande', n: 'flauta o pan de sánguche' }], ['huevo', 3, 'u', nota('1 para el rebozado')], ['pan_rallado', 100, 'g'], ['lechuga', 1, 'u'], ['tomate', 1, 'u'], ['jamon', 60, 'g', O], ['queso_cremoso', 60, 'g', O], ['mayonesa', 2, 'cda'], ...SA],
  pasos: [['Milanesas', 'Pasá la carne por un huevo batido con sal y luego por pan rallado. Freílas o horneálas a 200 °C 10 minutos por lado.', 20],
    ['Huevos', 'Freí los otros dos huevos en una sartén con aceite.', 3],
    ['Armar', 'Abrí los panes, untá con mayonesa y armá con lechuga, tomate, la milanesa, jamón, queso y el huevo frito.']] });

r({ key: 'lomito', nombre: 'Lomito completo', desc: 'El clásico sándwich de lomo con jamón, queso, huevo, lechuga y tomate.', cat: 'Minutas', min: 25, dif: 'Fácil', porc: 2, emoji: '🥪', img: 'Lomito',
  tip: 'Golpeá los bifes de lomo para que queden finitos y se cocinen en un minuto.',
  ing: [['lomo', 300, 'g', nota('en bifes finos')], ['pan', 2, 'u', { t: 'grande' }], ['jamon', 80, 'g'], ['queso_cremoso', 80, 'g'], ['huevo', 2, 'u'], ['lechuga', 1, 'u'], ['tomate', 1, 'u'], ['mayonesa', 2, 'cda'], ...SA],
  pasos: [['Bifes', 'Aplaná los bifes de lomo y cocinalos en una plancha bien caliente 1 minuto por lado. Salpimentá.', 2],
    ['Queso', 'Poné el jamón y el queso sobre la carne en la plancha y tapá hasta que se derrita.', 2],
    ['Huevo', 'Freí los huevos a la plancha.', 3],
    ['Armar', 'Tostá el pan, untá con mayonesa y armá con lechuga, tomate, el lomo con jamón y queso y el huevo.']] });

r({ key: 'panchos', nombre: 'Panchos caseros', desc: 'Salchichas en pan con los aderezos de siempre. La cena más rápida.', cat: 'Minutas', min: 10, dif: 'Fácil', porc: 2, emoji: '🌭', img: 'Pancho (comida)',
  tip: 'Hervilas apenas: si el agua hierve fuerte, las salchichas se parten.',
  ing: [['salchichas', 6, 'u'], ['pan_hamburguesa', 6, 'u', nota('de pancho')], ['mostaza', null, 'cn'], ['ketchup', null, 'cn', O], ['mayonesa', null, 'cn', O], ['pepinillos', null, 'cn', O]],
  pasos: [['Calentar', 'Poné las salchichas en agua caliente sin que llegue a hervir fuerte, 5 minutos.', 5],
    ['Pan', 'Calentá los panes 1 minuto en el horno o en una sartén.', 1],
    ['Armar', 'Poné cada salchicha en un pan y sumá mostaza, kétchup, mayonesa o pepinillos picados.']] });

r({ key: 'morcipan', nombre: 'Morcipán', desc: 'Morcilla a la plancha en pan crocante, con salsa criolla.', cat: 'Minutas', min: 25, dif: 'Fácil', porc: 2, emoji: '🌭', img: 'Morcilla',
  tip: 'Cocinala a fuego medio y sin pincharla, así no se abre.',
  ing: [['morcilla', 2, 'u'], ['pan', 2, 'u'], ['tomate', 1, 'u', O], ['cebolla', 1, 'u', { t: 'chico', o: true }], ['vinagre', 1, 'cda', O], ['chimichurri', null, 'cn', O]],
  pasos: [['Salsa criolla', 'Si querés, picá tomate y cebolla y condimentá con vinagre, aceite y sal.'],
    ['Morcilla', 'Cociná las morcillas enteras en una plancha a fuego medio 8 minutos por lado.', 16],
    ['Armar', 'Abrí los panes, tostalos y armá con la morcilla y la salsa criolla o chimichurri.']] });

r({ key: 'salchichas_pure', nombre: 'Salchichas con puré', desc: 'Salchichas doradas con puré de papas. Simple, rápido y siempre bienvenido.', cat: 'Minutas', min: 30, dif: 'Fácil', porc: 2, emoji: '🌭', img: 'Salchicha de Viena',
  tip: 'Hacelas en sartén después de hervirlas para que queden doraditas.',
  ing: [['salchichas', 6, 'u'], ['papa', 4, 'u'], ['manteca', 30, 'g'], ['leche', 100, 'ml'], ['nuez_moscada', 1, 'pizca', O], ['mostaza', null, 'cn', O], ['sal', null, 'cn']],
  pasos: [['Puré', 'Hervé las papas en cubos 20 minutos, escurrí y pisá con manteca, leche, sal y nuez moscada.', 20],
    ['Salchichas', 'Calentá las salchichas en agua 4 minutos y después dorálas en una sartén con un poco de manteca.', 8],
    ['Servir', 'Serví con el puré y mostaza.']] });

r({ key: 'chili', nombre: 'Chili con carne', desc: 'Guiso picante de carne picada, porotos y tomate. Se sirve con arroz o tortillas.', cat: 'Guisos y sopas', min: 60, dif: 'Fácil', porc: 4, emoji: '🌶️', img: 'Chili con carne',
  tip: 'Ajustá el picante a gusto: siempre se puede sumar, pero no sacar.',
  ing: [['carne_picada', 500, 'g'], ['porotos_colorados', 250, 'g', nota('cocidos')], ['tomate_lata', 1, 'lata'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['ajo', 2, 'diente'], ['comino', 1, 'cdta'], ['pimenton', 1, 'cda'], ['aji_picante', 1, 'u', O], ['salsa_picante', null, 'cn', O], ['arroz', 200, 'g', opt('para acompañar')], ...SA],
  pasos: [['Sofrito', 'Rehogá la cebolla, el morrón, el ajo y el ají picados en aceite 8 minutos.', 8],
    ['Carne', 'Sumá la carne y cociná hasta que se dore. Agregá comino y pimentón.', 8],
    ['Guisar', 'Incorporá el tomate y los porotos cocidos. Cociná tapado a fuego bajo 30 minutos, revolviendo de vez en cuando.', 30],
    ['Servir', 'Ajustá sal y picante y serví con arroz blanco.']] });

r({ key: 'burritos', nombre: 'Burritos de carne y porotos', desc: 'Tortillas rellenas de carne picada, porotos, arroz y queso.', cat: 'Minutas', min: 40, dif: 'Fácil', porc: 4, emoji: '🌯', img: 'Burrito',
  tip: 'Calentá las tortillas antes de rellenarlas: se doblan sin romperse.',
  ing: [['tortillas_trigo', 8, 'u'], ['carne_picada', 400, 'g'], ['porotos_colorados', 200, 'g', nota('cocidos')], ['arroz', 150, 'g', O], ['cebolla', 1, 'u'], ['tomate', 2, 'u'], ['muzzarella', 150, 'g'], ['comino', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['palta', 1, 'u', O], ...SA],
  pasos: [['Relleno', 'Rehogá la cebolla picada, sumá la carne y cocinala con comino, pimentón y sal. Agregá los porotos y un tomate picado y cociná 10 minutos.', 20],
    ['Arroz', 'Si usás arroz, hervilo 15 minutos y escurrilo.', 15],
    ['Armar', 'Calentá las tortillas. Rellená con arroz, carne, queso rallado, tomate y palta. Doblá los costados y enrollá.'],
    ['Dorar', 'Dorálos en una sartén 2 minutos por lado para que el queso se derrita.', 4]] });

r({ key: 'empanadas_pollo', nombre: 'Empanadas de pollo', desc: 'Jugosas empanadas de pollo con cebolla, morrón y verdeo.', cat: 'Tartas y empanadas', min: 75, dif: 'Media', porc: 4, emoji: '🥟', img: 'Empanada',
  tip: 'Usá el caldo de hervir el pollo para humedecer un poco el relleno.',
  ing: [['tapas_empanada', 1, 'docena'], ['pechuga', 2, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['verdeo', 2, 'u', O], ['huevo', 2, 'u', nota('1 duro y 1 para pintar')], ['pimenton', 1, 'cda'], ['comino', 1, 'cdta'], ...SA],
  pasos: [['Pollo', 'Hervé las pechugas 20 minutos en agua con sal. Desmenuzalas.', 20],
    ['Relleno', 'Rehogá cebolla, morrón y verdeo picados 10 minutos. Sumá el pollo, pimentón, comino, sal y un chorrito de caldo. Dejá enfriar.', 10],
    ['Armar', 'Rellená las tapas, agregá huevo duro picado, cerrá con repulgue y pintá con huevo batido.'],
    ['Hornear', 'Horneá a 220 °C entre 15 y 18 minutos hasta que estén doradas.', 18]] });

r({ key: 'empanadas_jyq', nombre: 'Empanadas de jamón y queso', desc: 'Las más fáciles y rápidas: jamón y muzzarella que se derrite.', cat: 'Tartas y empanadas', min: 30, dif: 'Fácil', porc: 4, emoji: '🧀', img: 'Empanada',
  tip: 'Cerralas bien para que el queso no se escape en el horno.',
  ing: [['tapas_empanada', 1, 'docena'], ['jamon', 200, 'g'], ['muzzarella', 250, 'g'], ['oregano', null, 'cn', O], ['huevo', 1, 'u', nota('para pintar')]],
  pasos: [['Relleno', 'Cortá el jamón y la muzzarella en cubitos. Mezclá con orégano.'],
    ['Armar', 'Rellená las tapas, cerrá con repulgue o tenedor y pintá con huevo.'],
    ['Hornear', 'Horneá a 220 °C unos 12 minutos o freílas en aceite caliente.', 12]] });

r({ key: 'empanadas_humita', nombre: 'Empanadas de humita', desc: 'Relleno cremoso de choclo con salsa blanca y queso. Infaltables en una docena.', cat: 'Tartas y empanadas', min: 60, dif: 'Media', porc: 4, emoji: '🌽', img: 'Humita',
  tip: 'El relleno tiene que quedar espeso y frío, si no las empanadas se abren.',
  ing: [['tapas_empanada', 1, 'docena'], ['choclo', 3, 'u', opt('o 1 lata de choclo cremoso')], ['cebolla', 1, 'u'], ['leche', 250, 'ml'], ['manteca', 30, 'g'], ['harina', 2, 'cda'], ['queso_cremoso', 150, 'g'], ['nuez_moscada', 1, 'pizca'], ['azucar', 1, 'cdta', O], ['huevo', 1, 'u', nota('para pintar')], ...S],
  pasos: [['Choclo', 'Rallá o desgraná los choclos. Rehogá la cebolla en la manteca 5 minutos y sumá el choclo.', 10],
    ['Salsa', 'Agregá la harina, revolvé y sumá la leche de a poco hasta que espese. Condimentá con sal, nuez moscada y azúcar. Dejá enfriar.', 8],
    ['Armar', 'Rellená las tapas con la humita y un cubo de queso. Cerrá y pintá con huevo.'],
    ['Hornear', 'Horneá a 220 °C unos 15 minutos.', 15]] });

r({ key: 'empanadas_arabes', nombre: 'Empanadas árabes', desc: 'Triangulares, con carne, tomate, cebolla y mucho limón.', cat: 'Tartas y empanadas', min: 50, dif: 'Media', porc: 4, emoji: '🔺', img: 'Sfiha',
  tip: 'El relleno va crudo: la carne se cocina en el horno y queda muy jugosa.',
  ing: [['tapas_empanada', 1, 'docena'], ['carne_picada', 400, 'g'], ['tomate', 2, 'u'], ['cebolla', 1, 'u'], ['limon', 2, 'u'], ['perejil', null, 'cn', O], ['aji_molido', 1, 'pizca', O], ...SA],
  pasos: [['Relleno crudo', 'Mezclá la carne con el tomate y la cebolla picados muy chico, el jugo de los limones, perejil, sal, pimienta y ají. Dejá reposar 15 minutos y escurrí el líquido.', 15],
    ['Armar', 'Poné relleno en el centro de cada tapa y cerrá en forma de triángulo, pellizcando los tres bordes.'],
    ['Hornear', 'Horneá a 220 °C unos 18 minutos.', 18]] });

r({ key: 'tarta_pollo', nombre: 'Tarta de pollo', desc: 'Pollo desmenuzado con cebolla, morrón y crema. Ideal para aprovechar pollo cocido.', cat: 'Tartas y empanadas', min: 60, dif: 'Fácil', porc: 4, emoji: '🥧', img: 'Tarta',
  tip: 'Sirve para usar el pollo que sobró de otra comida.',
  ing: [['tapas_tarta', 2, 'u'], ['pechuga', 2, 'u'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['crema', 150, 'ml'], ['huevo', 3, 'u'], ['queso_rallado', 40, 'g'], ['pimenton', 1, 'cdta', O], ...SA],
  pasos: [['Pollo', 'Hervé o cociná a la plancha las pechugas y desmenuzalas.', 20],
    ['Relleno', 'Rehogá la cebolla y el morrón 10 minutos, sumá el pollo y condimentá. Fuera del fuego agregá la crema, los huevos y el queso.', 10],
    ['Hornear', 'Forrá una tartera con una tapa, rellená, tapá con la otra y horneá a 200 °C 35 minutos.', 35]] });

r({ key: 'tarta_atun', nombre: 'Tarta de atún', desc: 'Atún con cebolla, morrón, tomate y huevo. Una tarta rendidora con latas de la alacena.', cat: 'Tartas y empanadas', min: 50, dif: 'Fácil', porc: 4, emoji: '🐟', img: 'Tarta',
  tip: 'Escurrí bien el atún para que la tarta no quede aguada.',
  ing: [['tapas_tarta', 2, 'u'], ['atun', 2, 'lata'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['tomate', 1, 'u'], ['huevo', 3, 'u'], ['aceitunas', 50, 'g', O], ...SA],
  pasos: [['Sofrito', 'Rehogá la cebolla y el morrón picados 8 minutos. Sumá el tomate en cubos y cociná 5 minutos.', 13],
    ['Relleno', 'Fuera del fuego mezclá con el atún escurrido, las aceitunas y 2 huevos batidos.'],
    ['Hornear', 'Rellená la tartera forrada con una tapa, cubrí con la otra, pintá con el huevo restante y horneá a 200 °C 30 minutos.', 30]] });

r({ key: 'tarta_puerros', nombre: 'Tarta de puerros', desc: 'Puerros rehogados en manteca con crema y queso. Suave y elegante.', cat: 'Tartas y empanadas', min: 55, dif: 'Fácil', porc: 4, emoji: '🥧', img: 'Quiche',
  tip: 'Lavá muy bien los puerros: entre las capas suele quedar tierra.',
  ing: [['tapas_tarta', 1, 'u'], ['puerro', 4, 'u'], ['manteca', 30, 'g'], ['crema', 200, 'ml'], ['huevo', 3, 'u'], ['queso_rallado', 50, 'g'], ['queso_cremoso', 100, 'g', O], ['nuez_moscada', 1, 'pizca'], ...S],
  pasos: [['Puerros', 'Cortá los puerros en rodajas finas y rehogalos en la manteca a fuego bajo 12 minutos, hasta que estén tiernos.', 12],
    ['Relleno', 'Batí los huevos con la crema, sal, pimienta y nuez moscada. Sumá los puerros y los quesos.'],
    ['Hornear', 'Volcá sobre la masa en una tartera y horneá a 190 °C 30 minutos, hasta que esté firme y dorada.', 30]] });

r({ key: 'tarta_calabaza', nombre: 'Tarta de calabaza y queso', desc: 'Calabaza asada con cebolla y queso. Dulzona y muy rica.', cat: 'Tartas y empanadas', min: 70, dif: 'Fácil', porc: 4, emoji: '🎃', img: 'Cucurbita moschata',
  tip: 'Asá la calabaza en vez de hervirla: queda más sabrosa y con menos agua.',
  ing: [['tapas_tarta', 2, 'u'], ['zapallo', 800, 'g'], ['cebolla', 1, 'u'], ['queso_cremoso', 200, 'g'], ['huevo', 2, 'u'], ['queso_rallado', 30, 'g'], ['nuez_moscada', 1, 'pizca'], ...SA],
  pasos: [['Calabaza', 'Horneá la calabaza en cubos con aceite y sal a 200 °C 30 minutos. Pisala.', 30],
    ['Relleno', 'Rehogá la cebolla picada y mezclala con la calabaza, los huevos, el queso rallado, nuez moscada y el cremoso en cubos.', 8],
    ['Hornear', 'Rellená la tartera forrada, tapá con la otra masa y horneá a 200 °C 30 minutos.', 30]] });

r({ key: 'tarta_brocoli', nombre: 'Tarta de brócoli', desc: 'Brócoli con queso y crema en una tarta abierta.', cat: 'Tartas y empanadas', min: 50, dif: 'Fácil', porc: 4, emoji: '🥦', img: 'Brócoli',
  tip: 'Cociná el brócoli apenas 3 minutos para que conserve el color.',
  ing: [['tapas_tarta', 1, 'u'], ['brocoli', 1, 'u'], ['cebolla', 1, 'u'], ['crema', 150, 'ml'], ['huevo', 3, 'u'], ['muzzarella', 150, 'g'], ['queso_rallado', 30, 'g'], ...SA],
  pasos: [['Brócoli', 'Separá el brócoli en ramitos y hervilo 3 minutos. Escurrí.', 3],
    ['Relleno', 'Rehogá la cebolla picada y mezclala con el brócoli, los huevos batidos con la crema, sal y pimienta y la muzzarella en cubos.', 8],
    ['Hornear', 'Volcá sobre la masa en la tartera, espolvoreá queso rallado y horneá a 190 °C 30 minutos.', 30]] });

r({ key: 'pizza_napolitana', nombre: 'Pizza napolitana', desc: 'Muzzarella, rodajas de tomate, ajo y orégano. Con prepizza sale en 20 minutos.', cat: 'Pizzas', min: 25, dif: 'Fácil', porc: 2, emoji: '🍕', img: 'Pizza napolitana',
  tip: 'Rociá el ajo picado con aceite recién salida del horno: queda perfumado sin quemarse.',
  ing: [['prepizza', 1, 'u'], ['pure_tomate', 150, 'g'], ['muzzarella', 250, 'g'], ['tomate', 2, 'u'], ['ajo', 2, 'diente'], ['oregano', null, 'cn'], ['aceitunas', 30, 'g', O], ['aceite', null, 'cn']],
  pasos: [['Salsa', 'Cubrí la prepizza con el puré de tomate condimentado con sal y orégano y horneá a 220 °C 8 minutos.', 8],
    ['Queso', 'Agregá la muzzarella en cubos y las rodajas de tomate. Volvé al horno 8 minutos.', 8],
    ['Terminar', 'Sacala y cubrí con ajo picado mezclado con aceite, orégano y aceitunas.']] });

r({ key: 'pizza_jamon_morron', nombre: 'Pizza de jamón y morrones', desc: 'Un clásico de pizzería: muzzarella, jamón y tiras de morrón.', cat: 'Pizzas', min: 25, dif: 'Fácil', porc: 2, emoji: '🍕', img: 'Pizza',
  tip: 'Asá el morrón antes y pelalo: queda más dulce y suave.',
  ing: [['prepizza', 1, 'u'], ['pure_tomate', 150, 'g'], ['muzzarella', 250, 'g'], ['jamon', 100, 'g'], ['morron_rojo', 1, 'u'], ['oregano', null, 'cn'], ['aceitunas', 30, 'g', O]],
  pasos: [['Prehornear', 'Cubrí la prepizza con la salsa y horneá a 220 °C 8 minutos.', 8],
    ['Cubrir', 'Agregá la muzzarella, el jamón en tiras y el morrón en tiras finas.'],
    ['Gratinar', 'Horneá 8 a 10 minutos más y terminá con orégano y aceitunas.', 10]] });

r({ key: 'pizza_rucula', nombre: 'Pizza con rúcula y jamón crudo', desc: 'Muzzarella gratinada y, al salir del horno, rúcula fresca y jamón crudo.', cat: 'Pizzas', min: 25, dif: 'Fácil', porc: 2, emoji: '🍕', img: 'Pizza',
  tip: 'La rúcula y el crudo van después de hornear, así no se cocinan.',
  ing: [['prepizza', 1, 'u'], ['pure_tomate', 150, 'g'], ['muzzarella', 250, 'g'], ['rucula', 1, 'atado'], ['jamon_crudo', 100, 'g'], ['queso_rallado', 30, 'g', O], ['tomates_secos', 40, 'g', O], ['aceite_oliva', null, 'cn']],
  pasos: [['Base', 'Cubrí la prepizza con la salsa y horneá a 220 °C 8 minutos.', 8],
    ['Queso', 'Agregá la muzzarella y horneá 8 minutos más.', 8],
    ['Terminar', 'Cubrí con la rúcula, el jamón crudo, queso rallado y un hilo de aceite de oliva.']] });

r({ key: 'faina', nombre: 'Fainá', desc: 'Masa fina de harina de garbanzo, crocante por fuera. Para comer con pizza o sola.', cat: 'Pizzas', min: 40, dif: 'Fácil', porc: 4, emoji: '🟡', img: 'Fainá',
  tip: 'Dejá reposar la mezcla al menos 30 minutos: queda más suave y no se rompe.',
  ing: [['harina_garbanzo', 250, 'g'], ['aceite', 60, 'ml'], ['queso_rallado', 30, 'g', O], ['sal', null, 'cn'], ['pimienta', null, 'cn']],
  pasos: [['Mezcla', 'Batí la harina de garbanzo con 750 ml de agua, sal y pimienta hasta que no queden grumos. Dejá reposar 30 minutos.', 30],
    ['Pizzera caliente', 'Precalentá el horno a 250 °C con una pizzera con el aceite adentro durante 5 minutos.', 5],
    ['Hornear', 'Volcá la mezcla sobre el aceite caliente y horneá 20 a 25 minutos hasta que esté dorada. Si querés, espolvoreá queso rallado.', 25]] });

r({ key: 'pollo_cerveza', nombre: 'Pollo a la cerveza', desc: 'Presas de pollo cocinadas en cerveza con cebolla, morrón y papas.', cat: 'Pollo', min: 70, dif: 'Fácil', porc: 4, emoji: '🍺', img: 'Pollo guisado',
  tip: 'Usá cerveza rubia: la negra puede dejarlo amargo.',
  ing: [['pollo', 6, 'u'], ['cerveza', 500, 'ml'], ['cebolla', 2, 'u'], ['morron_rojo', 1, 'u'], ['papa', 4, 'u'], ['ajo', 2, 'diente'], ['pimenton', 1, 'cdta'], ['mostaza', 1, 'cda', O], ...SA],
  pasos: [['Dorar', 'Salpimentá las presas y dorálas en una cacerola con aceite. Retirá.', 10],
    ['Sofrito', 'Rehogá cebolla, morrón y ajo 8 minutos. Sumá pimentón y mostaza.', 8],
    ['Cocinar', 'Volvé el pollo, agregá la cerveza y las papas en cubos. Tapá y cociná a fuego bajo 40 minutos.', 40],
    ['Reducir', 'Destapá y cociná 10 minutos más para que espese la salsa.', 10]] });

r({ key: 'pollo_curry', nombre: 'Pollo al curry', desc: 'Pechuga en una salsa cremosa de curry. Con arroz blanco es una cena completa.', cat: 'Pollo', min: 35, dif: 'Fácil', porc: 4, emoji: '🍛', img: 'Pollo al curry',
  tip: 'Tostá el curry un minuto en el aceite antes de agregar el líquido: suelta todo su aroma.',
  ing: [['pechuga', 2, 'u'], ['curry', 2, 'cda'], ['leche_coco', 400, 'ml', opt('o crema de leche')], ['crema', 200, 'ml', O], ['cebolla', 1, 'u'], ['ajo', 2, 'diente'], ['jengibre', 10, 'g', O], ['yogur', 2, 'cda', O], ['arroz', 300, 'g'], ...SA],
  pasos: [['Arroz', 'Hervé el arroz en agua con sal 15 minutos y reservá.', 15],
    ['Base', 'Rehogá la cebolla, el ajo y el jengibre picados 6 minutos. Sumá el curry y revolvé 1 minuto.', 7],
    ['Pollo', 'Agregá la pechuga en cubos y cociná hasta que esté blanca por fuera.', 6],
    ['Salsa', 'Incorporá la leche de coco (o la crema), salá y cociná 10 minutos a fuego bajo. Serví con el arroz.', 10]] });

r({ key: 'wok_pollo', nombre: 'Wok de pollo y verduras', desc: 'Pollo salteado con verduras crocantes y salsa de soja, en 20 minutos.', cat: 'Pollo', min: 25, dif: 'Fácil', porc: 2, emoji: '🥢', img: 'Wok',
  tip: 'Todo a fuego máximo y moviendo siempre: las verduras tienen que quedar crocantes.',
  ing: [['pechuga', 1, 'u'], ['salsa_soja', 4, 'cda'], ['morron_rojo', 1, 'u'], ['zanahoria', 1, 'u'], ['cebolla', 1, 'u'], ['zucchini', 1, 'u', O], ['brocoli', 1, 'u', O], ['brotes_soja', 100, 'g', O], ['jengibre', 10, 'g', O], ['ajo', 1, 'diente'], ['sesamo', 1, 'cda', O], ['mani', 30, 'g', O], ['arroz', 200, 'g', opt('para acompañar')], ['aceite', null, 'cn']],
  pasos: [['Cortar', 'Cortá el pollo en tiras y todas las verduras en bastones finos.'],
    ['Pollo', 'Calentá el wok o una sartén grande con aceite a fuego fuerte y dorá el pollo 5 minutos. Retirá.', 5],
    ['Verduras', 'Salteá las verduras con ajo y jengibre 4 minutos, moviendo todo el tiempo.', 4],
    ['Unir', 'Volvé el pollo, agregá la salsa de soja y salteá 1 minuto. Terminá con sésamo o maní y serví con arroz.', 1]] });

r({ key: 'suprema_napolitana', nombre: 'Suprema a la napolitana', desc: 'Suprema de pollo empanada con salsa, jamón y muzzarella gratinada.', cat: 'Pollo', min: 45, dif: 'Fácil', porc: 4, emoji: '🍕', img: 'Milanesa a la napolitana',
  tip: 'Aplastá bien las supremas para que se cocinen parejas.',
  ing: [['pechuga', 2, 'u', { t: 'grande' }], ['huevo', 2, 'u'], ['pan_rallado', 200, 'g'], ['pure_tomate', 200, 'g'], ['jamon', 120, 'g'], ['muzzarella', 250, 'g'], ['oregano', null, 'cn'], ...SA],
  pasos: [['Empanar', 'Abrí las pechugas en supremas, pasalas por huevo batido con sal y por pan rallado.'],
    ['Cocinar', 'Horneá a 200 °C 12 minutos por lado.', 24],
    ['Cubrir', 'Poné salsa, jamón y muzzarella sobre cada suprema.'],
    ['Gratinar', 'Horneá a 220 °C 8 minutos hasta que el queso se derrita. Terminá con orégano.', 8]] });

r({ key: 'pollo_crema_hongos', nombre: 'Pollo a la crema con champiñones', desc: 'Pechuga en cubos con champiñones en una salsa cremosa.', cat: 'Pollo', min: 30, dif: 'Fácil', porc: 4, emoji: '🍄', img: 'Agaricus bisporus',
  tip: 'Dorá bien los champiñones sin moverlos mucho: así no largan agua.',
  ing: [['pechuga', 2, 'u'], ['champinones', 300, 'g'], ['crema', 300, 'ml'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'], ['manteca', 20, 'g'], ['vino_blanco', 100, 'ml', O], ['arroz', 250, 'g', opt('o puré para acompañar')], ...SA],
  pasos: [['Pollo', 'Dorá la pechuga en cubos en una sartén con aceite. Retirá.', 6],
    ['Champiñones', 'Derretí la manteca, rehogá la cebolla y el ajo y sumá los champiñones fileteados hasta que se doren.', 8],
    ['Salsa', 'Agregá el vino y dejá evaporar. Sumá la crema y el pollo y cociná 5 minutos. Serví con arroz o puré.', 7]] });

r({ key: 'alitas_bbq', nombre: 'Alitas de pollo a la barbacoa', desc: 'Alitas al horno, crocantes y glaseadas.', cat: 'Pollo', min: 55, dif: 'Fácil', porc: 4, emoji: '🍗', img: 'Alitas de pollo',
  tip: 'Secá muy bien las alitas antes de condimentarlas: quedan más crocantes.',
  ing: [['alitas', 16, 'u'], ['salsa_bbq', 150, 'g', opt('o miel con salsa de soja')], ['miel', 2, 'cda', O], ['salsa_soja', 2, 'cda', O], ['ajo_polvo', 1, 'cdta', O], ['pimenton', 1, 'cdta'], ['papa', 4, 'u', opt('para acompañar')], ...SA],
  pasos: [['Condimentar', 'Secá las alitas y mezclalas con aceite, sal, pimienta, pimentón y ajo en polvo.'],
    ['Hornear', 'Acomodalas en una placa y horneá a 220 °C 35 minutos, dándolas vuelta a mitad de cocción.', 35],
    ['Glasear', 'Pincelalas con la salsa barbacoa (o miel con soja) y horneá 8 minutos más.', 8]] });

r({ key: 'pollo_agridulce', nombre: 'Pollo agridulce con ananá', desc: 'Pollo salteado con morrones y ananá en salsa agridulce, con arroz.', cat: 'Pollo', min: 35, dif: 'Media', porc: 4, emoji: '🍍', img: 'Pollo agridulce',
  tip: 'Usá el almíbar del ananá para la salsa en lugar de azúcar.',
  ing: [['pechuga', 2, 'u'], ['anana_lata', 1, 'lata'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u', O], ['cebolla', 1, 'u'], ['salsa_soja', 3, 'cda'], ['vinagre', 3, 'cda'], ['ketchup', 2, 'cda'], ['fecula', 1, 'cda'], ['arroz', 300, 'g'], ['aceite', null, 'cn']],
  pasos: [['Arroz', 'Hervé el arroz 15 minutos y reservá.', 15],
    ['Salsa', 'Mezclá 150 ml del almíbar del ananá con la soja, el vinagre, el kétchup y la fécula.'],
    ['Saltear', 'Dorá la pechuga en cubos con aceite. Sumá la cebolla y los morrones en cubos y salteá 4 minutos.', 10],
    ['Terminar', 'Agregá el ananá en cubos y la salsa; cociná hasta que espese y brille. Serví con el arroz.', 3]] });

r({ key: 'fajitas_pollo', nombre: 'Fajitas de pollo', desc: 'Tiras de pollo con morrones y cebolla en tortillas de trigo, con palta.', cat: 'Pollo', min: 30, dif: 'Fácil', porc: 4, emoji: '🌮', img: 'Fajita',
  tip: 'Llevá todo a la mesa y que cada uno arme la suya.',
  ing: [['pechuga', 2, 'u'], ['tortillas_trigo', 8, 'u'], ['morron_rojo', 1, 'u'], ['morron_verde', 1, 'u'], ['cebolla', 1, 'u'], ['comino', 1, 'cdta'], ['pimenton', 1, 'cdta'], ['palta', 1, 'u', O], ['lima', 1, 'u', opt('o limón')], ['tomate', 1, 'u', O], ...SA],
  pasos: [['Condimentar', 'Cortá el pollo en tiras y condimentalo con comino, pimentón, sal y jugo de lima.'],
    ['Saltear', 'Dorá el pollo en una sartén bien caliente con aceite. Sumá los morrones y la cebolla en tiras y cociná 5 minutos.', 10],
    ['Servir', 'Calentá las tortillas y serví con el relleno, palta pisada y tomate picado.']] });

r({ key: 'pollo_ajillo', nombre: 'Pollo al ajillo', desc: 'Presas doradas con mucho ajo, vino blanco y perejil.', cat: 'Pollo', min: 50, dif: 'Fácil', porc: 4, emoji: '🧄', img: 'Pollo al ajillo',
  tip: 'Agregá el ajo cuando el pollo ya está dorado: si se quema, amarga.',
  ing: [['pollo', 6, 'u'], ['ajo', 8, 'diente'], ['vino_blanco', 200, 'ml'], ['perejil', null, 'cn'], ['papa', 4, 'u', opt('para acompañar')], ...SA],
  pasos: [['Dorar', 'Salpimentá las presas y dorálas en una sartén grande con aceite 10 minutos de cada lado.', 20],
    ['Ajo', 'Bajá el fuego y sumá los ajos laminados. Cociná 2 minutos sin que se quemen.', 2],
    ['Vino', 'Agregá el vino, tapá y cociná 20 minutos. Terminá con perejil picado.', 20]] });

r({ key: 'salmon_horno', nombre: 'Salmón al horno con verduras', desc: 'Filet de salmón con limón, zucchini y tomates cherry, todo en una fuente.', cat: 'Pescados', min: 30, dif: 'Fácil', porc: 2, emoji: '🐟', img: 'Salmón (alimento)',
  tip: 'El salmón está listo cuando se separa en láminas al presionarlo; no lo cocines de más.',
  ing: [['salmon', 400, 'g'], ['limon', 1, 'u'], ['zucchini', 1, 'u'], ['tomate_cherry', 200, 'g'], ['esparragos', 1, 'atado', O], ['ajo', 1, 'diente'], ['aceite_oliva', 2, 'cda'], ...S],
  pasos: [['Verduras', 'Cortá el zucchini en rodajas, mezclalo con los tomates cherry, ajo, aceite y sal, y horneá a 200 °C 10 minutos.', 10],
    ['Salmón', 'Apoyá el salmón sobre las verduras, salpimentalo y cubrilo con rodajas de limón.'],
    ['Hornear', 'Horneá 12 a 15 minutos, hasta que esté cocido pero jugoso.', 15]] });

r({ key: 'langostinos_ajillo', nombre: 'Langostinos al ajillo', desc: 'Langostinos salteados en aceite de oliva con ajo y un toque picante.', cat: 'Pescados', min: 15, dif: 'Fácil', porc: 2, emoji: '🦐', img: 'Pleoticus muelleri',
  tip: 'Se cocinan en 2 minutos: apenas se ponen rosados, están listos.',
  ing: [['langostinos', 400, 'g'], ['ajo', 4, 'diente'], ['aceite_oliva', 4, 'cda'], ['aji_molido', 1, 'pizca'], ['perejil', null, 'cn'], ['limon', 1, 'u', O], ['pan', 1, 'u', opt('para mojar')], ['sal', null, 'cn']],
  pasos: [['Ajo', 'Calentá el aceite de oliva a fuego medio con el ajo laminado y el ají, 1 minuto.', 1],
    ['Langostinos', 'Subí el fuego, agregá los langostinos pelados y salteá 2 o 3 minutos hasta que estén rosados.', 3],
    ['Servir', 'Salá, sumá perejil y limón y serví con pan para mojar en el aceite.']] });

r({ key: 'rabas', nombre: 'Rabas', desc: 'Anillos de calamar rebozados y fritos, con limón.', cat: 'Pescados', min: 30, dif: 'Fácil', porc: 2, emoji: '🦑', img: 'Rabas',
  tip: 'Freílas en tandas chicas y en aceite bien caliente para que no queden aceitosas.',
  ing: [['calamar', 500, 'g'], ['harina', 150, 'g'], ['leche', 100, 'ml', O], ['limon', 1, 'u'], ['sal', null, 'cn'], ['aceite', null, 'cn', nota('para freír')]],
  pasos: [['Preparar', 'Cortá los calamares en anillos, secalos y pasalos por leche (opcional, quedan más tiernos).'],
    ['Rebozar', 'Escurrilos y pasalos por harina con sal, sacudiendo el exceso.'],
    ['Freír', 'Freílos en aceite muy caliente 2 minutos, hasta que estén dorados. Escurrí y serví con limón.', 6]] });

r({ key: 'paella', nombre: 'Paella', desc: 'Arroz con mariscos, pollo y verduras, con azafrán. Para una cena especial.', cat: 'Pescados', min: 70, dif: 'Difícil', porc: 6, emoji: '🥘', img: 'Paella',
  tip: 'No revuelvas el arroz una vez que agregaste el caldo: así se forma el socarrat abajo.',
  ing: [['arroz', 400, 'g'], ['langostinos', 300, 'g'], ['mejillones', 400, 'g'], ['calamar', 300, 'g'], ['pollo', 4, 'u', O], ['morron_rojo', 1, 'u'], ['cebolla', 1, 'u'], ['ajo', 3, 'diente'], ['tomate', 2, 'u'], ['arvejas', 1, 'lata'], ['azafran', 1, 'pizca'], ['caldo', 2, 'u'], ['limon', 1, 'u'], ['pimenton', 1, 'cdta'], ...SA],
  pasos: [['Pollo', 'Dorá las presas de pollo en una paellera o sartén grande con aceite. Reservá.', 15],
    ['Sofrito', 'Rehogá cebolla, morrón y ajo picados 8 minutos. Sumá el tomate rallado, el pimentón y el calamar en anillos.', 12],
    ['Arroz', 'Agregá el arroz y revolvé 2 minutos. Volcá 1 litro de caldo caliente con el azafrán y acomodá el pollo.', 2],
    ['Cocinar', 'Cociná a fuego medio 12 minutos sin revolver. Sumá los langostinos, los mejillones y las arvejas y cociná 8 minutos más.', 20],
    ['Reposar', 'Apagá, tapá con un repasador 5 minutos y serví con gajos de limón.', 5]] });

r({ key: 'merluza_papas', nombre: 'Merluza al horno con papas', desc: 'Filet de merluza sobre papas y cebolla, con limón y vino blanco.', cat: 'Pescados', min: 50, dif: 'Fácil', porc: 4, emoji: '🐟', img: 'Merluccius hubbsi',
  tip: 'Las papas van primero: el pescado necesita mucho menos tiempo.',
  ing: [['merluza', 4, 'u'], ['papa', 4, 'u'], ['cebolla', 1, 'u'], ['limon', 1, 'u'], ['vino_blanco', 100, 'ml', O], ['ajo', 2, 'diente'], ['perejil', null, 'cn'], ['pimenton', 1, 'cdta', O], ...SA],
  pasos: [['Papas', 'Cortá las papas en rodajas finas y la cebolla en aros. Acomodalas en una fuente con aceite y sal y horneá a 200 °C 25 minutos.', 25],
    ['Pescado', 'Poné los filets encima, salpimentá, rociá con limón, vino, ajo picado y pimentón.'],
    ['Hornear', 'Horneá 12 minutos más y terminá con perejil.', 12]] });

r({ key: 'trucha_manteca', nombre: 'Trucha a la manteca con alcaparras', desc: 'Filet de trucha dorado en manteca, con limón y alcaparras.', cat: 'Pescados', min: 20, dif: 'Fácil', porc: 2, emoji: '🐟', img: 'Oncorhynchus mykiss',
  tip: 'Empezá con la piel hacia abajo y no la muevas: se pone crocante.',
  ing: [['trucha', 400, 'g'], ['manteca', 40, 'g'], ['limon', 1, 'u'], ['alcaparras', 1, 'cda', O], ['harina', 2, 'cda', O], ['papa', 3, 'u', opt('para acompañar')], ...S],
  pasos: [['Preparar', 'Secá la trucha, salpimentala y pasala apenas por harina.'],
    ['Dorar', 'Derretí la mitad de la manteca y cociná la trucha con la piel hacia abajo 4 minutos, dalo vuelta y cociná 2 minutos más.', 6],
    ['Salsa', 'Retirá, sumá el resto de la manteca, el jugo de limón y las alcaparras, y bañá el pescado.', 1]] });

r({ key: 'croquetas_atun', nombre: 'Croquetas de atún', desc: 'Croquetas de papa y atún, doradas por fuera y suaves por dentro.', cat: 'Pescados', min: 50, dif: 'Fácil', porc: 4, emoji: '🐟', img: 'Croqueta',
  tip: 'Enfriá la mezcla 30 minutos antes de formarlas: se manejan mucho mejor.',
  ing: [['atun', 2, 'lata'], ['papa', 4, 'u'], ['huevo', 2, 'u'], ['pan_rallado', 150, 'g'], ['cebolla', 1, 'u', { t: 'chico', o: true }], ['perejil', null, 'cn', O], ...SA],
  pasos: [['Puré', 'Hervé las papas 20 minutos, pisalas y dejalas entibiar.', 20],
    ['Mezcla', 'Uní el puré con el atún escurrido, un huevo, cebolla y perejil picados, sal y pimienta. Enfriá 30 minutos.', 30],
    ['Formar', 'Formá croquetas, pasalas por el otro huevo batido y por pan rallado.'],
    ['Cocinar', 'Freílas en aceite caliente o horneálas a 200 °C 20 minutos.', 20]] });

r({ key: 'mejillones_provenzal', nombre: 'Mejillones a la provenzal', desc: 'Mejillones abiertos al vapor con vino blanco, ajo y perejil.', cat: 'Pescados', min: 25, dif: 'Fácil', porc: 2, emoji: '🦪', img: 'Mytilus',
  tip: 'Descartá los mejillones que no se abran después de cocinarse.',
  ing: [['mejillones', 1, 'kg'], ['vino_blanco', 150, 'ml'], ['ajo', 3, 'diente'], ['perejil', 1, 'atado'], ['manteca', 30, 'g'], ['pan', 1, 'u', opt('para mojar')], ['limon', 1, 'u', O]],
  pasos: [['Limpiar', 'Lavá los mejillones con un cepillo y sacales las barbas.'],
    ['Base', 'Derretí la manteca en una olla grande con el ajo picado 1 minuto.', 1],
    ['Al vapor', 'Agregá los mejillones y el vino, tapá y cociná 5 minutos a fuego fuerte, sacudiendo la olla, hasta que se abran.', 5],
    ['Servir', 'Terminá con perejil picado y limón. Serví con el caldo y pan.']] });

r({ key: 'fideos_atun', nombre: 'Fideos con atún y tomate', desc: 'Una salsa de tomate con atún, ajo y aceitunas. Lista en lo que se cocinan los fideos.', cat: 'Pastas', min: 20, dif: 'Fácil', porc: 4, emoji: '🍝', img: 'Espaguetis',
  tip: 'Agregá el atún al final para que no se deshaga.',
  ing: [['fideos', 400, 'g'], ['atun', 2, 'lata'], ['tomate_lata', 1, 'lata'], ['ajo', 2, 'diente'], ['aceitunas', 50, 'g', O], ['alcaparras', 1, 'cda', O], ['aji_molido', 1, 'pizca', O], ['perejil', null, 'cn', O], ...SA],
  pasos: [['Fideos', 'Hervé los fideos en abundante agua con sal.', 10],
    ['Salsa', 'Rehogá el ajo en aceite 1 minuto, sumá el tomate y cociná 8 minutos. Agregá aceitunas, alcaparras y ají.', 9],
    ['Unir', 'Incorporá el atún escurrido, mezclá con los fideos y terminá con perejil.']] });

r({ key: 'ravioles_tuco', nombre: 'Ravioles con tuco', desc: 'Ravioles comprados con un tuco casero, como el domingo en familia.', cat: 'Pastas', min: 40, dif: 'Fácil', porc: 4, emoji: '🥟', img: 'Ravioli',
  tip: 'Hervilos a fuego medio: si el agua hierve fuerte, los ravioles se abren.',
  ing: [['ravioles', 1, 'kg'], ['pure_tomate', 1, 'caja'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'], ['carne_picada', 250, 'g', opt('para un tuco con carne')], ['laurel', 1, 'u'], ['oregano', 1, 'cdta'], ['queso_rallado', null, 'cn'], ...SA],
  pasos: [['Tuco', 'Rehogá la cebolla y el ajo 8 minutos (sumá la carne si usás). Agregá el puré, laurel, orégano y sal y cociná 20 minutos.', 28],
    ['Ravioles', 'Hervé los ravioles en abundante agua con sal el tiempo que indique el paquete.', 6],
    ['Servir', 'Escurrilos con cuidado y serví con el tuco y queso rallado.']] });

r({ key: 'sorrentinos_rosa', nombre: 'Sorrentinos con salsa rosa', desc: 'Sorrentinos con una salsa de tomate y crema, suave y cremosa.', cat: 'Pastas', min: 30, dif: 'Fácil', porc: 4, emoji: '🥟', img: 'Sorrentinos',
  tip: 'La salsa rosa es tuco con crema: no dejes hervir fuerte después de agregarla.',
  ing: [['sorrentinos', 1, 'kg'], ['pure_tomate', 1, 'caja'], ['crema', 200, 'ml'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'], ['queso_rallado', null, 'cn'], ...SA],
  pasos: [['Salsa', 'Rehogá la cebolla y el ajo 8 minutos, sumá el puré y cociná 15 minutos. Agregá la crema y calentá sin hervir.', 23],
    ['Sorrentinos', 'Hervilos en agua con sal según el paquete.', 7],
    ['Servir', 'Serví con la salsa y queso rallado.']] });

r({ key: 'lasania_carne', nombre: 'Lasaña de carne', desc: 'Capas de pasta, bolognesa, salsa blanca y muzzarella gratinada.', cat: 'Pastas', min: 100, dif: 'Media', porc: 6, emoji: '🍝', img: 'Lasaña',
  tip: 'Dejala reposar 10 minutos antes de cortar para que las capas no se desarmen.',
  ing: [['lasania', 400, 'g'], ['carne_picada', 500, 'g'], ['pure_tomate', 1, 'caja'], ['cebolla', 1, 'u'], ['zanahoria', 1, 'u', O], ['leche', 700, 'ml'], ['manteca', 50, 'g'], ['harina', 50, 'g'], ['muzzarella', 300, 'g'], ['queso_rallado', 50, 'g'], ['nuez_moscada', 1, 'pizca'], ...SA],
  pasos: [['Bolognesa', 'Rehogá cebolla y zanahoria picadas, sumá la carne y dorala. Agregá el puré y cociná 20 minutos.', 30],
    ['Salsa blanca', 'Derretí la manteca, sumá la harina, revolvé y agregá la leche de a poco hasta que espese. Condimentá con sal y nuez moscada.', 10],
    ['Armar', 'En una fuente alterná capas de bolognesa, láminas de pasta, salsa blanca y muzzarella. Terminá con salsa blanca y queso rallado.'],
    ['Hornear', 'Horneá a 180 °C 40 minutos (si las láminas son secas, revisá el paquete). Dejá reposar 10 minutos.', 40]] });

r({ key: 'lasania_verdura', nombre: 'Lasaña de verdura', desc: 'Acelga o espinaca con ricota, salsa blanca y queso.', cat: 'Pastas', min: 90, dif: 'Media', porc: 6, emoji: '🥬', img: 'Lasaña',
  tip: 'Escurrí muy bien la verdura: si no, la lasaña queda aguada.',
  ing: [['lasania', 400, 'g'], ['espinaca', 2, 'atado', opt('o acelga')], ['acelga', 1, 'atado', O], ['ricota', 400, 'g'], ['cebolla', 1, 'u'], ['huevo', 1, 'u'], ['leche', 700, 'ml'], ['manteca', 50, 'g'], ['harina', 50, 'g'], ['muzzarella', 250, 'g'], ['queso_rallado', 50, 'g'], ['pure_tomate', 300, 'g', O], ['nuez_moscada', 1, 'pizca'], ...SA],
  pasos: [['Verdura', 'Cociná la verdura, escurrila muy bien y picala. Rehogá la cebolla y mezclá con la verdura, la ricota, el huevo, sal y nuez moscada.', 15],
    ['Salsa blanca', 'Hacé una salsa blanca con la manteca, la harina y la leche.', 10],
    ['Armar', 'Alterná capas de pasta, relleno, salsa blanca y muzzarella. Si querés, sumá un poco de tuco entre capas.'],
    ['Hornear', 'Cubrí con salsa blanca y queso rallado y horneá a 180 °C 40 minutos.', 40]] });

r({ key: 'tallarines_pesto', nombre: 'Tallarines al pesto', desc: 'Pasta con pesto casero de albahaca, ajo, queso y nueces.', cat: 'Pastas', min: 20, dif: 'Fácil', porc: 4, emoji: '🌿', img: 'Pesto',
  tip: 'No calientes el pesto: mezclalo con la pasta recién escurrida y listo.',
  ing: [['tallarines_frescos', 500, 'g', opt('o fideos secos')], ['albahaca', 2, 'atado'], ['ajo', 1, 'diente'], ['queso_rallado', 60, 'g'], ['nueces', 40, 'g', O], ['aceite_oliva', 100, 'ml'], ['sal', null, 'cn']],
  pasos: [['Pesto', 'Procesá o picá muy fino las hojas de albahaca con el ajo, las nueces, el queso, el aceite y sal hasta lograr una pasta.'],
    ['Pasta', 'Hervé los tallarines en agua con sal. Reservá medio cucharón del agua.', 4],
    ['Unir', 'Mezclá la pasta con el pesto y un poco del agua de cocción para que quede cremoso.']] });

r({ key: 'fideos_bolognesa', nombre: 'Fideos a la bolognesa', desc: 'Salsa de carne picada y tomate, cocinada despacio.', cat: 'Pastas', min: 50, dif: 'Fácil', porc: 4, emoji: '🍝', img: 'Salsa boloñesa',
  tip: 'Cuanto más tiempo se cocina la salsa, mejor queda.',
  ing: [['fideos', 500, 'g'], ['carne_picada', 400, 'g'], ['pure_tomate', 1, 'caja'], ['cebolla', 1, 'u'], ['zanahoria', 1, 'u'], ['morron_rojo', 1, 'u', O], ['ajo', 2, 'diente'], ['vino_tinto', 100, 'ml', O], ['laurel', 1, 'u'], ['queso_rallado', null, 'cn'], ...SA],
  pasos: [['Sofrito', 'Rehogá cebolla, zanahoria, morrón y ajo picados 10 minutos.', 10],
    ['Carne', 'Sumá la carne y dorala. Agregá el vino y dejá evaporar.', 10],
    ['Salsa', 'Incorporá el puré y el laurel y cociná tapado a fuego bajo 30 minutos.', 30],
    ['Servir', 'Hervé los fideos y serví con la salsa y queso rallado.', 10]] });

r({ key: 'carbonara', nombre: 'Fideos a la carbonara', desc: 'Panceta dorada, huevo y queso: una salsa cremosa sin crema.', cat: 'Pastas', min: 20, dif: 'Media', porc: 4, emoji: '🥓', img: 'Spaghetti alla carbonara',
  tip: 'Mezclá el huevo fuera del fuego, con el calor de la pasta: si no, se hace revuelto.',
  ing: [['fideos', 400, 'g'], ['panceta', 150, 'g'], ['huevo', 3, 'u'], ['queso_rallado', 80, 'g'], ['ajo', 1, 'diente', O], ['pimienta', null, 'cn', nota('abundante')], ['sal', null, 'cn']],
  pasos: [['Fideos', 'Hervé los fideos en agua con sal. Reservá una taza del agua de cocción.', 10],
    ['Panceta', 'Dorá la panceta en cubos en una sartén sin aceite hasta que esté crocante.', 6],
    ['Crema de huevo', 'Batí los huevos con el queso rallado y mucha pimienta.'],
    ['Unir', 'Fuera del fuego mezclá los fideos con la panceta y la mezcla de huevo, sumando agua de cocción hasta que quede cremoso.']] });

r({ key: 'fideos_brocoli', nombre: 'Fideos con brócoli y ajo', desc: 'Brócoli salteado con ajo, aceite de oliva y un toque picante.', cat: 'Pastas', min: 20, dif: 'Fácil', porc: 4, emoji: '🥦', img: 'Brócoli',
  tip: 'Hervé el brócoli en la misma agua de los fideos: ahorrás tiempo y ollas.',
  ing: [['fideos', 400, 'g'], ['brocoli', 1, 'u'], ['ajo', 3, 'diente'], ['aceite_oliva', 4, 'cda'], ['aji_molido', 1, 'pizca', O], ['queso_rallado', 40, 'g'], ['sal', null, 'cn']],
  pasos: [['Hervir', 'Hervé los fideos y sumá el brócoli en ramitos en los últimos 3 minutos.', 10],
    ['Ajo', 'Dorá el ajo laminado en el aceite de oliva con el ají, a fuego bajo.', 2],
    ['Unir', 'Escurrí, mezclá con el aceite de ajo y terminá con queso rallado.']] });

r({ key: 'noquis_quesos', nombre: 'Ñoquis a los cuatro quesos', desc: 'Ñoquis con una salsa cremosa de queso azul, muzzarella y queso rallado.', cat: 'Pastas', min: 20, dif: 'Fácil', porc: 4, emoji: '🧀', img: 'Ñoquis',
  tip: 'Si el queso azul es fuerte para tu gusto, usá menos y más muzzarella.',
  ing: [['noquis_frescos', 1, 'kg'], ['crema', 300, 'ml'], ['queso_azul', 100, 'g'], ['muzzarella', 100, 'g'], ['queso_rallado', 50, 'g'], ['queso_cremoso', 100, 'g', O], ['nuez_moscada', 1, 'pizca'], ['pimienta', null, 'cn']],
  pasos: [['Salsa', 'Calentá la crema a fuego bajo y sumá los quesos en trozos, revolviendo hasta que se derritan. Condimentá con nuez moscada y pimienta.', 8],
    ['Ñoquis', 'Hervé los ñoquis en agua con sal; cuando suben, están listos.', 4],
    ['Servir', 'Escurrilos y mezclalos con la salsa.']] });

r({ key: 'fideos_hongos', nombre: 'Fideos con salsa de hongos', desc: 'Champiñones y hongos de pino en una salsa cremosa.', cat: 'Pastas', min: 30, dif: 'Fácil', porc: 4, emoji: '🍄', img: 'Agaricus bisporus',
  tip: 'Usá el agua de hidratar los hongos secos en la salsa: tiene muchísimo sabor.',
  ing: [['fideos', 400, 'g'], ['champinones', 300, 'g'], ['hongos_secos', 20, 'g', O], ['crema', 250, 'ml'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'], ['manteca', 20, 'g'], ['vino_blanco', 100, 'ml', O], ['queso_rallado', 40, 'g'], ...SA],
  pasos: [['Hidratar', 'Si usás hongos secos, remojalos en 200 ml de agua caliente 15 minutos.', 15],
    ['Salsa', 'Rehogá cebolla y ajo en manteca, sumá los champiñones fileteados y los hongos picados. Agregá el vino, el agua de los hongos y la crema; cociná 8 minutos.', 15],
    ['Servir', 'Mezclá con los fideos hervidos y queso rallado.', 10]] });

r({ key: 'risotto_hongos', nombre: 'Risotto de hongos', desc: 'Arroz cremoso con hongos, vino blanco y queso.', cat: 'Pastas', min: 40, dif: 'Media', porc: 4, emoji: '🍚', img: 'Risotto',
  tip: 'Agregá el caldo de a un cucharón y revolvé siempre: eso le da la cremosidad.',
  ing: [['arroz_arborio', 320, 'g', opt('o arroz doble carolina')], ['champinones', 250, 'g'], ['hongos_secos', 20, 'g', O], ['portobellos', 150, 'g', O], ['cebolla', 1, 'u'], ['vino_blanco', 100, 'ml'], ['caldo', 1, 'u'], ['manteca', 40, 'g'], ['queso_rallado', 60, 'g'], ...SA],
  pasos: [['Caldo', 'Disolvé el caldo en 1,2 litros de agua caliente (sumá el agua de los hongos secos hidratados).'],
    ['Base', 'Rehogá la cebolla en la mitad de la manteca, sumá los hongos y dorá 5 minutos. Agregá el arroz y nacaralo 2 minutos.', 7],
    ['Cocción', 'Agregá el vino y dejá evaporar. Sumá el caldo de a un cucharón, revolviendo, durante 18 minutos.', 18],
    ['Mantecar', 'Fuera del fuego agregá el resto de la manteca y el queso. Tapá 2 minutos y serví.', 2]] });

r({ key: 'risotto_zapallo', nombre: 'Risotto de calabaza', desc: 'Arroz cremoso con calabaza, queso y un toque de nuez moscada.', cat: 'Pastas', min: 40, dif: 'Media', porc: 4, emoji: '🎃', img: 'Risotto',
  tip: 'La calabaza en cubos chiquitos se deshace y le da color y cremosidad.',
  ing: [['arroz_arborio', 320, 'g', opt('o arroz doble carolina')], ['zapallo', 400, 'g'], ['cebolla', 1, 'u'], ['caldo', 1, 'u'], ['vino_blanco', 100, 'ml', O], ['manteca', 40, 'g'], ['queso_rallado', 60, 'g'], ['nuez_moscada', 1, 'pizca'], ...SA],
  pasos: [['Base', 'Rehogá la cebolla en manteca, sumá la calabaza en cubitos y cociná 5 minutos. Agregá el arroz y revolvé 2 minutos.', 7],
    ['Cocción', 'Agregá el vino y luego el caldo caliente de a un cucharón, revolviendo, durante 18 minutos.', 18],
    ['Mantecar', 'Fuera del fuego sumá manteca, queso y nuez moscada.']] });

r({ key: 'guiso_porotos', nombre: 'Guiso de porotos con chorizo', desc: 'Porotos blancos con chorizo, panceta y zapallo. Bien de invierno.', cat: 'Guisos y sopas', min: 90, dif: 'Fácil', porc: 6, emoji: '🫘', img: 'Phaseolus vulgaris',
  tip: 'Si usás porotos en lata, ahorrás el remojo y la primera cocción.',
  ing: [['porotos', 400, 'g', nota('remojados la noche anterior')], ['chorizo', 2, 'u'], ['panceta', 150, 'g'], ['zapallo', 400, 'g'], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['ajo', 2, 'diente'], ['pure_tomate', 200, 'g'], ['pimenton', 1, 'cda'], ['caldo', 1, 'u'], ['laurel', 2, 'u'], ...SA],
  pasos: [['Porotos', 'Hervé los porotos remojados 45 minutos.', 45],
    ['Sofrito', 'Dorá el chorizo y la panceta. Sumá cebolla, morrón y ajo y rehogá 8 minutos. Agregá el pimentón.', 15],
    ['Guisar', 'Incorporá los porotos, el zapallo en cubos, el puré, el caldo, el laurel y agua hasta cubrir. Cociná 30 minutos.', 30]] });

r({ key: 'crema_zapallo', nombre: 'Crema de calabaza', desc: 'Sopa crema de calabaza, suave y reconfortante.', cat: 'Guisos y sopas', min: 40, dif: 'Fácil', porc: 4, emoji: '🥣', img: 'Crema de calabaza',
  tip: 'Terminala con un hilo de crema y semillas tostadas.',
  ing: [['zapallo', 1, 'kg'], ['cebolla', 1, 'u'], ['papa', 1, 'u'], ['caldo', 1, 'u'], ['crema', 100, 'ml', O], ['jengibre', 5, 'g', O], ['nuez_moscada', 1, 'pizca'], ...SA],
  pasos: [['Rehogar', 'Rehogá la cebolla en aceite 5 minutos.', 5],
    ['Hervir', 'Sumá la calabaza y la papa en cubos, el jengibre y el caldo con 1 litro de agua. Cociná 25 minutos.', 25],
    ['Licuar', 'Licuá hasta que quede liso. Ajustá sal, nuez moscada y sumá la crema.']] });

r({ key: 'sopa_arvejas', nombre: 'Sopa de arvejas partidas', desc: 'Sopa espesa de arvejas con panceta y verduras.', cat: 'Guisos y sopas', min: 70, dif: 'Fácil', porc: 4, emoji: '🥣', img: 'Guisante partido',
  tip: 'No hace falta remojar las arvejas partidas, pero enjuagalas bien.',
  ing: [['arvejas_secas', 300, 'g'], ['panceta', 100, 'g', O], ['zanahoria', 2, 'u'], ['cebolla', 1, 'u'], ['papa', 1, 'u'], ['caldo', 1, 'u'], ['laurel', 1, 'u'], ...SA],
  pasos: [['Base', 'Dorá la panceta y sumá cebolla y zanahoria picadas 8 minutos.', 8],
    ['Cocinar', 'Agregá las arvejas, la papa, el laurel y el caldo con 1,5 litros de agua. Cociná 50 minutos, revolviendo cada tanto.', 50],
    ['Terminar', 'Pisá un poco o licuá la mitad para que espese. Ajustá la sal.']] });

r({ key: 'sopa_cebolla', nombre: 'Sopa de cebolla gratinada', desc: 'Cebollas caramelizadas en caldo, con pan y queso gratinado.', cat: 'Guisos y sopas', min: 60, dif: 'Media', porc: 4, emoji: '🧅', img: 'Sopa de cebolla',
  tip: 'La paciencia es la clave: las cebollas tienen que dorarse despacio.',
  ing: [['cebolla', 6, 'u'], ['manteca', 50, 'g'], ['caldo', 2, 'u'], ['pan', 2, 'u'], ['muzzarella', 150, 'g'], ['queso_rallado', 50, 'g'], ['vino_blanco', 100, 'ml', O], ['harina', 1, 'cda'], ...S],
  pasos: [['Caramelizar', 'Cociná las cebollas en pluma en la manteca a fuego bajo 30 minutos, revolviendo, hasta que estén bien doradas.', 30],
    ['Caldo', 'Sumá la harina, el vino y el caldo con 1,2 litros de agua. Cociná 15 minutos.', 15],
    ['Gratinar', 'Serví en cazuelas, cubrí con rodajas de pan tostado y queso, y gratiná en el horno fuerte 5 minutos.', 5]] });

r({ key: 'porotos_negros_arroz', nombre: 'Porotos negros con arroz', desc: 'Porotos negros guisados con panceta y chorizo, servidos con arroz blanco.', cat: 'Guisos y sopas', min: 100, dif: 'Fácil', porc: 4, emoji: '🫘', img: 'Frijol negro',
  tip: 'Remojalos la noche anterior y cambiales el agua antes de cocinar.',
  ing: [['porotos_negros', 300, 'g'], ['arroz', 250, 'g'], ['panceta', 100, 'g'], ['chorizo', 1, 'u', O], ['cebolla', 1, 'u'], ['ajo', 2, 'diente'], ['laurel', 2, 'u'], ['comino', 1, 'cdta', O], ['naranja', 1, 'u', opt('en gajos para servir')], ...SA],
  pasos: [['Porotos', 'Hervé los porotos remojados con laurel durante 1 hora.', 60],
    ['Sofrito', 'Dorá la panceta y el chorizo, sumá cebolla y ajo y rehogá. Agregá a los porotos con comino y cociná 20 minutos más.', 25],
    ['Arroz', 'Hervé el arroz 15 minutos y serví junto a los porotos, con gajos de naranja si te gusta.', 15]] });

r({ key: 'caldo_pollo', nombre: 'Caldo de pollo con fideos', desc: 'Sopa casera de pollo y verduras con fideos finos.', cat: 'Guisos y sopas', min: 60, dif: 'Fácil', porc: 4, emoji: '🥣', img: 'Sopa de pollo',
  tip: 'Sacá la espuma del principio con una espumadera: el caldo queda más limpio.',
  ing: [['pollo', 3, 'u'], ['zanahoria', 2, 'u'], ['cebolla', 1, 'u'], ['apio', 1, 'u', O], ['puerro', 1, 'u', O], ['fideos', 100, 'g', nota('cabello de ángel o municiones')], ['perejil', null, 'cn', O], ['sal', null, 'cn']],
  pasos: [['Caldo', 'Poné el pollo en 2 litros de agua fría con sal y llevá a hervor. Retirá la espuma.', 10],
    ['Verduras', 'Sumá las verduras en trozos y cociná 40 minutos a fuego bajo.', 40],
    ['Fideos', 'Retirá el pollo, desmenuzalo y volvelo a la olla. Agregá los fideos y cociná 5 minutos.', 5]] });

r({ key: 'coliflor_gratinada', nombre: 'Coliflor gratinada', desc: 'Coliflor con salsa blanca y queso gratinado al horno.', cat: 'Vegetariano', min: 45, dif: 'Fácil', porc: 4, emoji: '🥦', img: 'Coliflor',
  tip: 'Escurrí bien la coliflor antes de cubrirla con la salsa.',
  ing: [['coliflor', 1, 'u'], ['leche', 500, 'ml'], ['manteca', 40, 'g'], ['harina', 40, 'g'], ['queso_rallado', 60, 'g'], ['muzzarella', 100, 'g', O], ['nuez_moscada', 1, 'pizca'], ...S],
  pasos: [['Coliflor', 'Separá en ramitos y hervila 8 minutos. Escurrí.', 8],
    ['Salsa blanca', 'Derretí la manteca, sumá la harina y la leche de a poco hasta que espese. Condimentá.', 10],
    ['Gratinar', 'Poné la coliflor en una fuente, cubrí con la salsa y el queso y horneá a 220 °C 20 minutos.', 20]] });

r({ key: 'berenjenas_rellenas', nombre: 'Berenjenas rellenas', desc: 'Berenjenas rellenas con su pulpa, verduras y queso. Con o sin carne.', cat: 'Vegetariano', min: 60, dif: 'Fácil', porc: 4, emoji: '🍆', img: 'Solanum melongena',
  tip: 'Hacé cortes en la pulpa y salala antes de hornear para que se cocine pareja.',
  ing: [['berenjena', 2, 'u', { t: 'grande' }], ['cebolla', 1, 'u'], ['morron_rojo', 1, 'u'], ['tomate', 2, 'u'], ['carne_picada', 250, 'g', O], ['muzzarella', 150, 'g'], ['pan_rallado', 3, 'cda'], ['ajo', 1, 'diente'], ...SA],
  pasos: [['Asar', 'Cortá las berenjenas a lo largo, hacé cortes en la pulpa, salá, rociá con aceite y horneá a 200 °C 25 minutos.', 25],
    ['Relleno', 'Retirá la pulpa y picala. Rehogá cebolla, morrón, ajo y tomate, sumá la pulpa (y la carne si usás) y cociná 10 minutos.', 15],
    ['Gratinar', 'Rellená las berenjenas, cubrí con muzzarella y pan rallado y horneá 15 minutos.', 15]] });

r({ key: 'morrones_rellenos', nombre: 'Morrones rellenos', desc: 'Morrones asados rellenos de arroz, carne y queso.', cat: 'Carnes', min: 60, dif: 'Fácil', porc: 4, emoji: '🫑', img: 'Pimiento relleno',
  tip: 'Elegí morrones que se paren solos para que no se vuelquen en el horno.',
  ing: [['morron_rojo', 4, 'u', { t: 'grande' }], ['arroz', 150, 'g'], ['carne_picada', 300, 'g', O], ['cebolla', 1, 'u'], ['tomate', 1, 'u'], ['muzzarella', 150, 'g'], ['pimenton', 1, 'cdta'], ...SA],
  pasos: [['Arroz', 'Hervé el arroz 12 minutos y escurrilo.', 12],
    ['Relleno', 'Rehogá la cebolla y el tomate, sumá la carne y cociná. Mezclá con el arroz, pimentón y la mitad del queso.', 15],
    ['Hornear', 'Cortá la tapa de los morrones, retirá las semillas y rellenalos. Cubrí con queso y horneá a 190 °C 30 minutos.', 30]] });

r({ key: 'tomates_rellenos', nombre: 'Tomates rellenos de atún', desc: 'Tomates frescos rellenos de atún, arroz y mayonesa. Cena fresca de verano.', cat: 'Ensaladas', min: 30, dif: 'Fácil', porc: 4, emoji: '🍅', img: 'Tomate relleno',
  tip: 'Dejá los tomates boca abajo 10 minutos para que larguen el jugo.',
  ing: [['tomate', 4, 'u', { t: 'grande' }], ['atun', 1, 'lata'], ['arroz', 100, 'g', O], ['huevo', 2, 'u'], ['mayonesa', 3, 'cda'], ['choclo', 1, 'u', opt('o en lata')], ['perejil', null, 'cn', O], ['lechuga', 1, 'u', O], ['sal', null, 'cn']],
  pasos: [['Arroz y huevos', 'Hervé el arroz 15 minutos y los huevos 10 minutos. Enfriá.', 15],
    ['Vaciar', 'Cortá una tapa a cada tomate, vacialos con una cuchara y salá el interior.'],
    ['Relleno', 'Mezclá el atún, el arroz, el huevo picado, el choclo y la mayonesa.'],
    ['Servir', 'Rellená los tomates y serví fríos sobre hojas de lechuga.']] });

r({ key: 'papas_gratinadas', nombre: 'Papas gratinadas', desc: 'Papas en rodajas finas con crema y queso, gratinadas al horno.', cat: 'Vegetariano', min: 70, dif: 'Fácil', porc: 4, emoji: '🥔', img: 'Gratin dauphinois',
  tip: 'Cortá las papas bien finas y parejas, mejor con mandolina.',
  ing: [['papa', 6, 'u'], ['crema', 300, 'ml'], ['leche', 200, 'ml'], ['ajo', 1, 'diente'], ['queso_rallado', 60, 'g'], ['muzzarella', 100, 'g', O], ['ciboulette', null, 'cn', O], ['nuez_moscada', 1, 'pizca'], ...S],
  pasos: [['Cortar', 'Pelá las papas y cortalas en rodajas muy finas.'],
    ['Crema', 'Calentá la crema con la leche, el ajo, sal, pimienta y nuez moscada.', 5],
    ['Armar', 'En una fuente enmantecada acomodá las papas en capas y cubrí con la crema caliente y el queso.'],
    ['Hornear', 'Horneá a 180 °C 50 minutos, hasta que estén tiernas y doradas.', 50]] });

r({ key: 'arroz_salteado', nombre: 'Arroz salteado con huevo y verduras', desc: 'Arroz frito al estilo oriental con huevo, verduras y salsa de soja. Ideal para usar arroz del día anterior.', cat: 'Vegetariano', min: 25, dif: 'Fácil', porc: 2, emoji: '🍳', img: 'Arroz frito',
  tip: 'Usá arroz frío del día anterior: queda suelto y no se pega.',
  ing: [['arroz', 250, 'g', nota('cocido y frío')], ['huevo', 2, 'u'], ['zanahoria', 1, 'u'], ['arvejas', 1, 'lata', O], ['verdeo', 2, 'u'], ['salsa_soja', 3, 'cda'], ['jamon', 100, 'g', O], ['brotes_soja', 100, 'g', O], ['aceite', null, 'cn']],
  pasos: [['Huevo', 'Revolvé los huevos en un wok o sartén grande con aceite. Retirá.', 2],
    ['Verduras', 'Salteá la zanahoria en cubitos, el verdeo y las arvejas 3 minutos a fuego fuerte.', 3],
    ['Arroz', 'Sumá el arroz, el jamón y la salsa de soja y salteá 4 minutos. Volvé el huevo y mezclá.', 4]] });

r({ key: 'quinoa_verduras', nombre: 'Quinoa con verduras salteadas', desc: 'Quinoa con zucchini, morrón y zanahoria salteados. Liviana y completa.', cat: 'Vegetariano', min: 30, dif: 'Fácil', porc: 2, emoji: '🌾', img: 'Chenopodium quinoa',
  tip: 'Lavá bien la quinoa antes de cocinarla para sacarle el amargor.',
  ing: [['quinoa', 200, 'g'], ['zucchini', 1, 'u'], ['morron_rojo', 1, 'u'], ['zanahoria', 1, 'u'], ['cebolla', 1, 'u'], ['salsa_soja', 2, 'cda', O], ['huevo', 2, 'u', O], ...SA],
  pasos: [['Quinoa', 'Lavá la quinoa y hervila en el doble de agua con sal 15 minutos.', 15],
    ['Verduras', 'Salteá las verduras en cubos con aceite 8 minutos.', 8],
    ['Unir', 'Mezclá con la quinoa, condimentá con soja y, si querés, sumá un huevo revuelto.']] });

r({ key: 'cuscus_verduras', nombre: 'Cuscús con verduras y garbanzos', desc: 'Cuscús especiado con verduras salteadas y garbanzos.', cat: 'Vegetariano', min: 25, dif: 'Fácil', porc: 4, emoji: '🫘', img: 'Cuscús',
  tip: 'El cuscús no se hierve: se hidrata tapado con agua o caldo caliente.',
  ing: [['cuscus', 250, 'g'], ['garbanzos', 200, 'g', nota('cocidos')], ['zucchini', 1, 'u'], ['morron_rojo', 1, 'u'], ['cebolla', 1, 'u'], ['comino', 1, 'cdta'], ['curcuma', 1, 'cdta'], ['caldo', 1, 'u'], ['pasas_uva', 30, 'g', O], ...SA],
  pasos: [['Cuscús', 'Disolvé el caldo en 250 ml de agua hirviendo, volcalo sobre el cuscús, tapá 5 minutos y desgraná con un tenedor.', 5],
    ['Verduras', 'Salteá la cebolla, el zucchini y el morrón en cubos con comino y cúrcuma 8 minutos. Sumá los garbanzos.', 10],
    ['Unir', 'Mezclá con el cuscús y las pasas. Ajustá la sal.']] });

r({ key: 'revuelto_chauchas', nombre: 'Revuelto de chauchas', desc: 'Chauchas salteadas con cebolla, ajo y huevo.', cat: 'Vegetariano', min: 25, dif: 'Fácil', porc: 2, emoji: '🫛', img: 'Judía verde',
  tip: 'Cociná las chauchas al dente: tienen que seguir un poco crocantes.',
  ing: [['chaucha', 400, 'g'], ['huevo', 3, 'u'], ['cebolla', 1, 'u'], ['ajo', 1, 'diente'], ['queso_rallado', 30, 'g', O], ...SA],
  pasos: [['Chauchas', 'Cortales las puntas y hervilas 6 minutos. Escurrí.', 6],
    ['Saltear', 'Rehogá la cebolla y el ajo, sumá las chauchas y salteá 3 minutos.', 8],
    ['Huevo', 'Agregá los huevos batidos con queso y revolvé hasta que cuajen.', 2]] });

r({ key: 'omelette', nombre: 'Omelette de jamón y queso', desc: 'Omelette esponjoso relleno de jamón y queso. Cena en 10 minutos.', cat: 'Minutas', min: 10, dif: 'Fácil', porc: 1, emoji: '🍳', img: 'Omelette',
  tip: 'Fuego medio-bajo: el omelette tiene que quedar dorado apenas y húmedo por dentro.',
  ing: [['huevo', 3, 'u'], ['jamon', 50, 'g'], ['queso_cremoso', 50, 'g'], ['manteca', 10, 'g'], ['ciboulette', null, 'cn', O], ...S],
  pasos: [['Batir', 'Batí los huevos con sal y pimienta.'],
    ['Cocinar', 'Derretí la manteca en una sartén, volcá los huevos y mové los bordes hacia el centro hasta que estén casi cuajados.', 3],
    ['Rellenar', 'Poné el jamón y el queso en una mitad, doblá y cociná 1 minuto más.', 1]] });

r({ key: 'ensalada_remolacha', nombre: 'Ensalada de remolacha y huevo', desc: 'Remolacha hervida con huevo duro, cebolla y vinagreta.', cat: 'Ensaladas', min: 50, dif: 'Fácil', porc: 4, emoji: '🟣', img: 'Beta vulgaris',
  tip: 'Hervila con cáscara y pelala después: no pierde color.',
  ing: [['remolacha', 4, 'u'], ['huevo', 3, 'u'], ['cebolla', 1, 'u', { t: 'chico', o: true }], ['zanahoria', 1, 'u', opt('rallada')], ['vinagre', 2, 'cda'], ['sal', null, 'cn'], ['aceite', null, 'cn']],
  pasos: [['Hervir', 'Hervé las remolachas con cáscara 40 minutos y los huevos 10 minutos.', 40],
    ['Cortar', 'Pelá las remolachas y cortalas en cubos; picá los huevos y la cebolla.'],
    ['Condimentar', 'Mezclá todo con aceite, vinagre y sal.']] });

r({ key: 'ensalada_rucula', nombre: 'Ensalada de rúcula y parmesano', desc: 'Rúcula con tomates cherry, láminas de queso y aceite de oliva.', cat: 'Ensaladas', min: 10, dif: 'Fácil', porc: 2, emoji: '🥗', img: 'Eruca vesicaria',
  tip: 'Usá un pelapapas para sacar láminas finas del queso.',
  ing: [['rucula', 1, 'atado'], ['tomate_cherry', 200, 'g'], ['queso_rallado', 40, 'g', nota('en láminas')], ['radicheta', 1, 'atado', O], ['tomates_secos', 40, 'g', O], ['nueces', 30, 'g', O], ['aceite_oliva', 3, 'cda'], ['limon', 1, 'u', O], ['sal', null, 'cn']],
  pasos: [['Lavar', 'Lavá y secá bien la rúcula. Cortá los tomates cherry a la mitad.'],
    ['Armar', 'Mezclá la rúcula con los tomates, los tomates secos y las nueces.'],
    ['Condimentar', 'Condimentá con aceite de oliva, limón y sal y cubrí con láminas de queso.']] });

r({ key: 'ensalada_cesar', nombre: 'Ensalada César', desc: 'Lechuga, pollo grillado, croutons y aderezo cremoso.', cat: 'Ensaladas', min: 30, dif: 'Fácil', porc: 2, emoji: '🥗', img: 'Ensalada César',
  tip: 'Hacé los croutons con pan del día anterior.',
  ing: [['lechuga', 1, 'u'], ['pechuga', 1, 'u'], ['pan', 1, 'u'], ['queso_rallado', 40, 'g'], ['mayonesa', 3, 'cda'], ['mostaza', 1, 'cdta'], ['limon', 1, 'u'], ['ajo', 1, 'diente'], ...SA],
  pasos: [['Pollo', 'Cociná la pechuga a la plancha 6 minutos por lado y cortala en tiras.', 12],
    ['Croutons', 'Cortá el pan en cubos, mezclalo con aceite y ajo y tostalo en el horno 8 minutos.', 8],
    ['Aderezo', 'Mezclá la mayonesa con mostaza, jugo de limón, la mitad del queso y un chorrito de agua.'],
    ['Armar', 'Mezclá la lechuga con el aderezo y cubrí con el pollo, los croutons y el resto del queso.']] });

r({ key: 'ensalada_lentejas', nombre: 'Ensalada de lentejas', desc: 'Lentejas con tomate, cebolla, morrón y perejil. Fría y llena de proteína.', cat: 'Ensaladas', min: 35, dif: 'Fácil', porc: 4, emoji: '🫘', img: 'Lens culinaris',
  tip: 'Condimentalas tibias: absorben mejor el aderezo.',
  ing: [['lentejas', 250, 'g'], ['tomate', 2, 'u'], ['cebolla', 1, 'u', { t: 'chico' }], ['morron_rojo', 1, 'u'], ['perejil', null, 'cn'], ['limon', 1, 'u'], ['huevo', 2, 'u', opt('duros')], ['sal', null, 'cn'], ['aceite', null, 'cn']],
  pasos: [['Lentejas', 'Hervé las lentejas 20 minutos, que queden firmes. Escurrí.', 20],
    ['Picar', 'Picá el tomate, la cebolla, el morrón y el perejil.'],
    ['Mezclar', 'Uní todo con las lentejas tibias y condimentá con aceite, limón y sal. Sumá huevo duro si querés.']] });

r({ key: 'caprese', nombre: 'Ensalada caprese', desc: 'Tomate, muzzarella y albahaca con aceite de oliva. Simple y fresca.', cat: 'Ensaladas', min: 10, dif: 'Fácil', porc: 2, emoji: '🍅', img: 'Ensalada caprese',
  tip: 'Usá tomates bien maduros y a temperatura ambiente.',
  ing: [['tomate', 3, 'u'], ['muzzarella', 200, 'g'], ['albahaca', 1, 'atado'], ['aceite_oliva', 3, 'cda'], ['sal', null, 'cn'], ['pimienta', null, 'cn']],
  pasos: [['Cortar', 'Cortá los tomates y la muzzarella en rodajas.'],
    ['Armar', 'Alterná en una fuente rodajas de tomate, muzzarella y hojas de albahaca.'],
    ['Condimentar', 'Rociá con aceite de oliva, sal y pimienta.']] });

module.exports = { categorias, unidades, ingredientes, recetas };
