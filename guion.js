/* ===================================================================
   SOPLO · Anillos de cristal estirado a mano

   Guion unico del sitio. Sin librerias, sin compilacion.

   Indice:
     1. Marca y ajustes  (edita aqui el nombre, el telefono y los envios)
     2. Catalogo         (edita aqui los anillos)
     3. Dibujos de cristal
     4. Ayudantes
     5. Tarjetas y rejillas
     6. Filtros
     7. Ficha de producto
     8. Buscador
     9. Bolsa (se guarda en el navegador)
    10. Encabezado, menu y avisos
    11. Arranque
   =================================================================== */
(function () {
'use strict';

/* ============ 1. MARCA Y AJUSTES ============ */
/* El precio lo pone el tipo de pieza: los anillos a 420, los aretes a 400
   (ver TIPOS, mas abajo). Algunas formas cuestan otra cosa porque llevan
   mas trabajo, y esas van en PRECIO_FAMILIA. PRECIO es el respaldo, por si
   algun dia apareciera un tipo sin precio propio. Una pieza suelta puede
   llevar su campo precio y ese gana sobre todo lo demas. */
var PRECIO = 420;

/* Todas las piezas se hacen en estas medidas. Si alguna se sale de la regla
   (una ajustable, por ejemplo), se le pone su propio campo medidas. */
var MEDIDAS = ['5', '6', '7', '8', '9', '10'];

/* El taller hace anillos y aretes. Los aretes no llevan numero: se venden
   por par. Una pieza sin campo tipo es un anillo. */
var TIPOS = {
  anillo: { uno:'Anillo', varios:'Anillos', llevaMedida:true,  precio:420 },
  arete:  { uno:'Arete',  varios:'Aretes',  llevaMedida:false, precio:400, porPar:true }
};

var MARCA = {
  nombre:'Soplo',
  lema:'Anillos de cristal estirado a mano',
  whatsapp:'525643120421',      /* solo digitos, con lada del pais */
  instagram:'https://www.instagram.com/',
  envioGratis:1200,             /* pedidos desde este monto no pagan envio */
  moneda:'MXN'
};

/* ============ 2. CATALOGO ============
   Campos de cada anillo:
     id          identificador unico; va en la URL de la ficha
     nombre      como se muestra
     familia     aros | espirales | gotas | racimos | flores
     tipo        'arete' si es un par de aretes; sin campo, es un anillo
     precio      solo si esa pieza cuesta distinto a PRECIO
     cristal     color del vidrio ('transparente' para el cristal limpio)
     acento      segundo color: las gotitas, el centro de la flor
     medidas     solo si esa pieza no se hace en las MEDIDAS de siempre
     etiqueta    'nuevo' | '' (opcional)
     destacado   true para que salga en la portada
     texto       descripcion de la ficha
     foto        ruta de tu foto, ej. 'imagenes/aro-cielo.jpg'.
                 Si no la pones, se dibuja la pieza en SVG.
   ==================================== */
var CATALOGO = [
  /* Solo van las piezas fotografiadas en el taller. Si entra otra, se
     agrega aqui y sus fotos en imagenes/. */
  { id:'aro-cobalto', nombre:'Aro Oceano', familia:'aros',
    cristal:'#2a5ba8', acento:'#8fb6ee', etiqueta:'', destacado:true,
    texto:'Aro macizo de contorno triangular, con las esquinas redondeadas a mano. Al sol se le ve el recorrido completo del vidrio y las vetas mas claras por dentro.' },

  { id:'aro-rosa', nombre:'Aro Petalo', familia:'aros',
    cristal:'#e58fae', acento:'#ffd3e2', etiqueta:'', destacado:true,
    texto:'Macizo y redondo, con el grosor de un petalo grueso y el hueco chico. De los que se notan sin hacer ruido.' },

  { id:'aro-ambar', nombre:'Aro Frambuesa', familia:'aros',
    cristal:'#c4315e', acento:'#ffb0c6', etiqueta:'', destacado:true,
    texto:'Ovalo rojo frambuesa con el hueco alargado. El color se junta en los bordes y se aclara donde el vidrio adelgaza.' },

  { id:'esp-rubi', nombre:'Espiral Caracol', familia:'espirales',
    cristal:'#a81222', acento:'#ff8a8a', etiqueta:'', destacado:true,
    texto:'Vidrio enrollado sobre si mismo de un tiron, como un caracol. Contra la luz el color se abre en vetas mas claras hacia el centro. Es la forma que mas colores tiene hechos.' },

  { id:'rac-marino', nombre:'Racimo de Espuma', familia:'racimos',
    cristal:'transparente', acento:'#dbe9f0', etiqueta:'', destacado:true,
    texto:'Burbujas de vidrio pegadas una junto a otra hasta cubrir el aro entero. De frente parece espuma detenida sobre el dedo. Es el que mas colores tiene hechos.' },

  { id:'got-banda', nombre:'Aro de Gotas', familia:'gotas',
    cristal:'transparente', acento:'#8e8ccc', etiqueta:'nuevo', destacado:true,
    texto:'Aro delgado con gotas de cristal puestas una por una hasta darle la vuelta entera. La de la foto va en colores revueltos, sin repetir; tambien se hace de un solo color.' },

  { id:'flo-ambar', nombre:'Flor de Lumbre', familia:'flores',
    cristal:'#e8a24a', acento:'#a8321a', etiqueta:'', destacado:true,
    texto:'Cinco petalos soplados uno por uno, con una gota de color en el centro. En miel con vetas rojas es la mas calida del taller, pero se hace en todos los vidrios.' },

  { id:'rac-geoda', nombre:'Racimo de Geoda', familia:'racimos',
    cristal:'#7b42a8', acento:'#c9a0e8', etiqueta:'nuevo', destacado:true,
    texto:'Cristal dejado crecer a lo bruto, con las puntas sin pulir, como cuando se abre una geoda. Cada racimo sale con otra forma porque el vidrio se rompe donde quiere.' },

  { id:'got-azul', nombre:'Gotas de Anil', familia:'gotas',
    cristal:'transparente', acento:'#1f43c4', etiqueta:'', destacado:true,
    texto:'Decenas de gotitas apinadas sobre el aro, una por una, hasta taparlo entero. El color se ve mas hondo donde las gotas se encalan unas con otras.' },

  { id:'got-rosa', nombre:'Gotas de Espina', familia:'gotas',
    cristal:'#4f8fd0', acento:'#2a6bb0', etiqueta:'', destacado:false,
    texto:'Aro triangular erizado de espinas finisimas, estiradas una por una con la punta de la pinza. Pincha a la vista y no al tacto.' },

  /* --- aretes --- */
  { id:'are-uno', nombre:'Aretes Rocio', familia:'gotas', tipo:'arete',
    cristal:'transparente', acento:'#e4eef4', etiqueta:'nuevo', destacado:true,
    texto:'Argolla con gotitas alrededor de todo el contorno, colgada de un arillo de plata. Pesan poco, casi no se sienten.' },

  { id:'are-dos', nombre:'Aretes Uva', familia:'gotas', tipo:'arete',
    cristal:'#d9a8c4', acento:'#8a6f9e', etiqueta:'nuevo', destacado:true,
    texto:'Par disparejo a proposito: uno rosa uva y otro verde olivo, los dos con gotitas moradas alrededor. Se usan asi, uno de cada color.' },

  { id:'are-tres', nombre:'Aretes Cielo', familia:'aros', tipo:'arete',
    cristal:'#8fb4d8', acento:'#cfe2f2', etiqueta:'nuevo', destacado:false,
    texto:'Argolla maciza y lisa, colgada de un arillo de plata. La mas facil de traer diario.' },

  { id:'are-cuatro', nombre:'Aretes Erizo', familia:'gotas', tipo:'arete',
    cristal:'#1f43c4', acento:'#5f7fe0', etiqueta:'nuevo', destacado:true,
    texto:'Dona cubierta de gotitas por los dos lados, en arillo dorado. Es el par que mas se voltea a ver.' }
];

var NOMBRE_FAMILIA = {
  aros:'Aros',
  espirales:'Espirales',
  gotas:'Gotas',
  racimos:'Racimos',
  flores:'Flores'
};

var TEXTO_FAMILIA = {
  aros:'Macizos y organicos, doblados a mano en caliente.',
  espirales:'Vidrio enrollado sobre si mismo, de un tiron.',
  gotas:'Una cresta de gotitas puestas una por una.',
  racimos:'Piedras pulidas, estiradas y pegadas en caliente.',
  flores:'Petalos estirados hueco por hueco.'
};

/* ============ 3. DIBUJOS DE CRISTAL ============
   Los anillos se dibujan en SVG, no son fotos. Cada pieza arma sus
   propios degradados, por eso lleva un numero de serie que no se repite.
   Cuando tengas fotos del taller, cambia dibujo() por una etiqueta <img>.
   ============================================== */
var serie = 0;

/* El mismo color, mas oscuro. Sirve para el canto, donde el vidrio se cruza
   de lado y se ve mas denso. */
function masOscuro(color, cuanto) {
  if (!color || color.charAt(0) !== '#') return color;
  var n = parseInt(color.slice(1), 16);
  var r = Math.round(((n >> 16) & 255) * (1 - cuanto));
  var g = Math.round(((n >> 8) & 255) * (1 - cuanto));
  var b = Math.round((n & 255) * (1 - cuanto));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function tonos(anillo) {
  if (anillo.cristal === 'transparente') {
    return { claro:'#ffffff', medio:'#dcebf2', hondo:'#9fb9c6' };
  }
  return { claro:anillo.acento || '#ffffff',
           medio:anillo.cristal,
           hondo:masOscuro(anillo.cristal, 0.34) };
}

function degradados(anillo, n) {
  var t = tonos(anillo);
  var ac = anillo.acento || t.medio;
  return '<defs>' +
    /* el cuerpo del vidrio: claro arriba a la izquierda, hondo abajo */
    '<linearGradient id="v' + n + '" x1="16%" y1="2%" x2="78%" y2="100%">' +
      '<stop offset="0%"   stop-color="#ffffff" stop-opacity=".85"/>' +
      '<stop offset="16%"  stop-color="' + t.claro + '" stop-opacity=".95"/>' +
      '<stop offset="52%"  stop-color="' + t.medio + '" stop-opacity="1"/>' +
      '<stop offset="100%" stop-color="' + t.hondo + '" stop-opacity="1"/>' +
    '</linearGradient>' +
    /* el borde: donde el vidrio se ve mas denso porque lo cruzas de canto */
    '<linearGradient id="b' + n + '" x1="0%" y1="0%" x2="60%" y2="100%">' +
      '<stop offset="0%"   stop-color="' + t.hondo + '" stop-opacity=".8"/>' +
      '<stop offset="50%"  stop-color="' + t.medio + '" stop-opacity="1"/>' +
      '<stop offset="100%" stop-color="' + t.hondo + '" stop-opacity=".9"/>' +
    '</linearGradient>' +
    /* las gotitas, piedras y centros de flor */
    '<radialGradient id="g' + n + '" cx="33%" cy="26%" r="78%">' +
      '<stop offset="0%"   stop-color="#ffffff" stop-opacity=".88"/>' +
      '<stop offset="38%"  stop-color="' + ac + '" stop-opacity=".9"/>' +
      '<stop offset="100%" stop-color="' + masOscuro(ac, 0.22) + '" stop-opacity="1"/>' +
    '</radialGradient>' +
    '<filter id="s' + n + '" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="3" dy="7" stdDeviation="7" flood-color="#3a4a55" flood-opacity=".2"/>' +
    '</filter>' +
  '</defs>';
}

function brillo(cx, cy, rx, ry, giro, alfa) {
  return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
    '" fill="#ffffff" opacity="' + (alfa === undefined ? .7 : alfa) + '" transform="rotate(' +
    (giro === undefined ? -30 : giro) + ' ' + cx + ' ' + cy + ')"/>';
}

/* El aro macizo. El contorno va desparejo a proposito: se dobla a mano,
   no sale redondo. 'hueco' abre mas el centro, para los apilables. */
var ARO_FUERA = 'M148 40 C197 37 243 65 255 110 C267 155 250 203 213 231 ' +
                'C185 253 147 263 115 253 C71 239 41 199 39 151 ' +
                'C37 104 70 60 116 45 C126 41 137 40 148 40 Z';

function aroDentro(hueco) {
  return hueco
    ? 'M150 88 C191 85 220 116 219 153 C218 191 188 219 149 219 ' +
      'C111 219 82 190 83 152 C84 116 112 90 150 88 Z'
    : 'M157 107 C188 105 210 126 209 153 C208 184 185 205 156 207 ' +
      'C125 209 100 189 99 162 C98 135 122 111 150 108 C152 107.6 155 107 157 107 Z';
}

function aro(n, hueco) {
  var dentro = aroDentro(hueco);
  return '<g filter="url(#s' + n + ')">' +
    '<path d="' + ARO_FUERA + ' ' + dentro + '" fill-rule="evenodd" fill="url(#v' + n + ')"/>' +
    /* canto exterior e interior: el vidrio se ve mas denso de perfil */
    '<path d="' + ARO_FUERA + '" fill="none" stroke="url(#b' + n + ')" stroke-width="4"/>' +
    '<path d="' + dentro + '" fill="none" stroke="url(#b' + n + ')" stroke-width="3.4"/>' +
    /* filo iluminado por dentro y por fuera */
    '<path d="' + ARO_FUERA + '" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"/>' +
    '<path d="' + dentro + '" fill="none" stroke="#ffffff" stroke-opacity=".8" stroke-width="1.5"/>' +
  '</g>' +
    /* reflejos largos, como los que deja una ventana sobre el vidrio */
    brillo(86, 92, 34, 8, -44, .72) +
    brillo(70, 132, 15, 5, -70, .5) +
    brillo(214, 214, 19, 6, -40, .55);
}

/* Gotitas repartidas sobre la mitad de arriba del aro. */
function cresta(n) {
  var gotas = [
    [ 66, 130, 12], [ 74, 100, 14], [ 95,  78, 15], [122,  61, 16],
    [151,  52, 17], [180,  59, 16], [206,  75, 15], [227,  97, 14],
    [239, 125, 12], [ 91, 108, 11], [116,  89, 12], [147,  81, 13],
    [178,  87, 12], [206, 106, 11], [ 57, 155,  9], [247, 152,  9]
  ];
  return gotas.map(function (g) {
    return '<circle cx="' + g[0] + '" cy="' + g[1] + '" r="' + g[2] +
      '" fill="url(#g' + n + ')" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.3"/>' +
      brillo(g[0] - g[2] * .33, g[1] - g[2] * .37, g[2] * .33, g[2] * .19, -30, .85);
  }).join('');
}

/* Cinco petalos estirados alrededor del centro. */
function flor(n) {
  var partes = '';
  for (var i = 0; i < 5; i++) {
    var giro = i * 72;
    var rad = (giro - 90) * Math.PI / 180;
    var cx = (150 + Math.cos(rad) * 46).toFixed(1);
    var cy = (128 + Math.sin(rad) * 46).toFixed(1);
    var eje = 'transform="rotate(' + giro + ' ' + cx + ' ' + cy + ')"';
    partes +=
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="25" ry="45" ' + eje +
        ' fill="url(#v' + n + ')" stroke="#ffffff" stroke-opacity=".75" stroke-width="1.6"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="11" ry="27" ' + eje +
        ' fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.2"/>';
  }
  return '<g filter="url(#s' + n + ')">' + partes + '</g>' +
    '<circle cx="150" cy="128" r="19" fill="url(#g' + n + ')" ' +
    'stroke="#ffffff" stroke-opacity=".7" stroke-width="1.4"/>' +
    brillo(143, 121, 7, 4, -30, .85);
}

/* La espiral: el vidrio enrollado sobre si mismo, como un caracol. */
function espiral(n) {
  var puntos = [];
  for (var i = 0; i <= 120; i++) {
    var t = i / 120 * Math.PI * 3.6;          /* poco menos de dos vueltas */
    var r = 12 + t * 9.4;
    puntos.push((150 + Math.cos(t - Math.PI / 2) * r).toFixed(1) + ' ' +
                (146 + Math.sin(t - Math.PI / 2) * r).toFixed(1));
  }
  var trazo = 'M' + puntos.join(' L');

  return '<g filter="url(#s' + n + ')">' +
    '<path d="M150 42 C206 42 254 88 254 146 C254 204 206 250 150 250 ' +
      'C94 250 46 204 46 146 C46 88 94 42 150 42 Z" fill="url(#v' + n + ')"/>' +
    '<path d="' + trazo + '" fill="none" stroke="url(#b' + n + ')" stroke-width="27" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + trazo + '" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="150" cy="146" r="104" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="2"/>' +
  '</g>' +
    brillo(104, 92, 36, 12, -42, .6) +
    brillo(198, 212, 16, 6, -40, .45);
}

/* El racimo: piedras pulidas de distintos tamanos sobre el aro. */
function racimo(n) {
  var piedras = [
    [104, 150, 30, 27], [150, 127, 37, 34], [197, 148, 31, 28],
    [126, 191, 27, 24], [175, 191, 28, 25], [ 83, 195, 21, 19], [217, 193, 21, 19]
  ];
  return '<g filter="url(#s' + n + ')">' + piedras.map(function (pi, i) {
    var relleno = i % 2 ? 'url(#g' + n + ')' : 'url(#v' + n + ')';
    return '<ellipse cx="' + pi[0] + '" cy="' + pi[1] + '" rx="' + pi[2] + '" ry="' + pi[3] +
      '" fill="' + relleno + '" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"/>';
  }).join('') + '</g>' +
  piedras.map(function (pi) {
    return brillo(pi[0] - pi[2] * .34, pi[1] - pi[3] * .38, pi[2] * .3, pi[3] * .18, -30, .8);
  }).join('');
}

/* Dibujo de respaldo, para cuando la pieza todavia no tiene foto. */
/* El gancho del que cuelga un arete. */
function gancho(n) {
  return '<path d="M150 26 C126 26 113 41 113 59 C113 78 127 92 146 98 L150 130" ' +
    'fill="none" stroke="url(#b' + n + ')" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M150 26 C126 26 113 41 113 59 C113 78 127 92 146 98 L150 130" ' +
    'fill="none" stroke="#ffffff" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round"/>';
}

/* El cuerpo de la pieza, sin decidir todavia si va al dedo o a la oreja. */
function cuerpoDe(anillo, n) {
  if (anillo.familia === 'gotas')     return aro(n) + cresta(n);
  if (anillo.familia === 'espirales') return espiral(n);
  if (anillo.familia === 'racimos')
    return '<g transform="translate(0 96) scale(.66)" opacity=".9">' + aro(n, true) + '</g>' + racimo(n);
  if (anillo.familia === 'flores')
    return '<g transform="translate(0 118) scale(.62)" opacity=".95">' + aro(n, true) + '</g>' + flor(n);
  if (anillo.familia === 'apilables')
    /* dos aros delgados encimados, que es como se usan */
    return '<g transform="translate(14 16) scale(.94)" opacity=".5">' + aro(n, true) + '</g>' + aro(n, true);
  return aro(n);
}

function ilustracion(anillo, clase) {
  var n = ++serie;
  var esArete = tipoDe(anillo) === 'arete';
  var cuerpo = cuerpoDe(anillo, n);

  /* Un arete es el mismo vidrio, colgado en vez de puesto en el dedo. */
  if (esArete) {
    cuerpo = gancho(n) +
      '<g transform="translate(150 198) scale(.58) translate(-150 -150)">' + cuerpo + '</g>';
  }

  return '<svg class="' + (clase || '') + '" viewBox="0 0 300 300" role="img" ' +
    'aria-label="' + (esArete ? 'Aretes ' : 'Anillo ') + escapar(anillo.nombre) + '">' +
    degradados(anillo, n) + cuerpo +
  '</svg>';
}

/* Lo que se ve de cada pieza.
   No hace falta tocar el codigo para poner tus fotos: guarda el archivo en
   imagenes/ con el mismo id de la pieza (imagenes/aro-cielo.jpg) y el sitio
   la encuentra solo. Sirven .jpg, .jpeg, .png y .webp; cuadradas y de unos
   900 px por lado se ven bien en todos lados.

   Mientras una pieza no tenga foto se queda el dibujo, asi que puedes ir
   fotografiando de a poco sin que el sitio se rompa. */
var EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp'];

function rutasPosibles(anillo) {
  if (anillo.foto) return [anillo.foto];
  return EXTENSIONES.map(function (ext) { return 'imagenes/' + anillo.id + '.' + ext; });
}

/* Se pinta el dibujo de inmediato; si la foto existe, entra en su lugar.
   Asi nunca se ve el hueco de una imagen rota mientras carga.

   anillo.foto puede venir de tres formas:
     sin poner   se buscan las rutas de siempre, imagenes/<id>.jpg y demas
     una ruta    se usa esa y nada mas
     null        la pieza se queda en dibujo a proposito */
function dibujo(anillo, clase) {
  var extra = anillo.foto === null ? ' data-sin-foto="1"'
            : anillo.foto ? ' data-foto="' + escapar(anillo.foto) + '"' : '';
  return '<span class="lienzo" data-foto-de="' + escapar(anillo.id) + '"' + extra +
    ' data-nombre="' + escapar(anillo.nombre) + '"' +
    ' data-clase="' + (clase || '') + '">' +
    ilustracion(anillo, clase) + '</span>';
}

/* Que pieza tiene foto y cual no. Se guarda mientras dure la visita para no
   volver a preguntar por lo mismo en cada pagina. Si agregas una foto nueva
   y no aparece, recarga con la pestana cerrada y abierta de nuevo. */
var LLAVE_FOTOS = 'soplo:fotos';
var FOTOS = {};
try { FOTOS = JSON.parse(sessionStorage.getItem(LLAVE_FOTOS) || '{}'); } catch (e) { FOTOS = {}; }

function recordarFoto(id, valor) {
  FOTOS[id] = valor;
  try { sessionStorage.setItem(LLAVE_FOTOS, JSON.stringify(FOTOS)); } catch (e) { /* modo privado */ }
}

function buscarFotos(raiz) {
  function poner(hueco, anillo, ruta) {
    hueco.innerHTML = '<img class="' + (hueco.getAttribute('data-clase') || '') + '" src="' +
      escapar(ruta) + '" alt="Anillo ' + escapar(anillo.nombre) + '" loading="lazy">';
  }

  $$('.lienzo[data-foto-de]', raiz).forEach(function (hueco) {
    if (hueco.hasAttribute('data-sin-foto')) return;
    var id = hueco.getAttribute('data-foto-de');
    var directa = hueco.getAttribute('data-foto');
    var anillo = porId(id) ||
      { id:id, nombre:hueco.getAttribute('data-nombre') || 'Anillo', foto:directa };
    if (FOTOS[id] === false) return;
    if (FOTOS[id]) { poner(hueco, anillo, FOTOS[id]); return; }

    (function probar(rutas, i) {
      if (i >= rutas.length) { recordarFoto(id, false); return; }
      var prueba = new Image();
      prueba.onload  = function () { recordarFoto(id, rutas[i]); poner(hueco, anillo, rutas[i]); };
      prueba.onerror = function () { probar(rutas, i + 1); };
      prueba.src = rutas[i];
    })(directa ? [directa] : rutasPosibles(anillo), 0);
  });
}

/* ============ LA MISMA PIEZA EN OTRO COLOR ============
   Todas las formas se hacen en los trece colores del taller. Lo que se le
   enseña al cliente en cada color es una de dos cosas, nunca un invento a
   medias:

     la foto de esa pieza hecha en ese color, cuando ya existe, o
     el dibujo con ese vidrio, que sale de un color parejo y limpio.

   Hubo un intento de teñir las fotos para rellenar los huecos. Se quito:
   veintitres de las veinticuatro fotos son la pieza puesta en la mano, y
   ahi el color del vidrio y el de la piel se encinan tanto que el anillo
   salia manchado. Mas vale un dibujo honesto que una foto sucia.
   ======================================================= */

/* Que piezas estan fotografiadas de verdad en otros colores. Los archivos
   van en imagenes/reales/<pieza>-<color>.jpg y este bloque lo escribe
   herramientas/colores.py. No lo edites a mano. */
/* INICIO FOTOS REALES */
var FOTOS_REALES = {
  'are-cuatro':['amarillo','amatista','anil','esmeralda','naranja','nube','rosa','rubi','tabaco','transparente'],
  'are-dos':['amarillo','anil','cielo','esmeralda','lila','naranja','nube','rosa','rubi','transparente'],
  'are-tres':['amarillo','anil','lila','limon','naranja','nube','rosa','rubi','tabaco','transparente'],
  'are-uno':['amarillo','anil','cielo','esmeralda','lila','naranja','nube','rosa','rubi','tabaco','transparente'],
  'aro-ambar':['amarillo','ambar','cielo','esmeralda','lila','nube','rosa','rubi','tabaco','transparente'],
  'aro-cobalto':['amarillo','ambar','cobalto','esmeralda','lila','nube','rosa','rubi','tabaco','transparente'],
  'aro-rosa':['amarillo','ambar','cielo','esmeralda','lila','nube','rosa','rubi','tabaco','transparente'],
  'esp-rubi':['amarillo','amatista','ambar','cielo','esmeralda','lila','rosa','rubi','tabaco','transparente'],
  'flo-ambar':['amarillo','ambar','cobalto','esmeralda','lila','nube','rosa','tabaco','transparente'],
  'got-azul':['amarillo','amatista','anil','esmeralda','naranja','nube','rosa','rubi','tabaco','transparente'],
  'got-banda':['amarillo','cielo','esmeralda','lila','limon','rosa','rubi','tabaco'],
  'got-rosa':['amarillo','amatista','esmeralda','naranja','rosa','rubi','tabaco','transparente'],
  'rac-geoda':['amarillo','ambar','cielo','lila','nube','rosa','rubi','tabaco','transparente'],
  'rac-marino':['amarillo','ambar','cielo','esmeralda','lila','nube','rosa','rubi','tabaco','transparente']
};
/* FIN FOTOS REALES */

var COLOR_ORIGINAL = 'original';   /* la foto tal como se tomo */

/* La foto de esa pieza en ese color, o null si todavia no existe. */
function fotoDeColor(anillo, color) {
  var lista = FOTOS_REALES[anillo.id];
  return (lista && lista.indexOf(color) >= 0)
    ? 'imagenes/reales/' + anillo.id + '-' + color + '.jpg'
    : null;
}

/* Una copia de la pieza con el vidrio de otro color. Si hay foto se usa; si
   no, queda en dibujo (foto:null) para no enseñar el color que no es. */
function enColor(anillo, color) {
  if (!color || color === COLOR_ORIGINAL) return anillo;
  var vidrio = vidrioPorId(color);
  var copia = {}, k;
  for (k in anillo) if (Object.prototype.hasOwnProperty.call(anillo, k)) copia[k] = anillo[k];
  copia.id = anillo.id + '@' + color;
  copia.cristal = vidrio.cristal;
  copia.acento = vidrio.acento || anillo.acento;
  copia.foto = fotoDeColor(anillo, color);
  return copia;
}

/* Como se llama el color elegido cuando hay que escribirlo. */
function nombreColor(anillo, color) {
  return (!color || color === COLOR_ORIGINAL)
    ? 'el color de la foto'
    : vidrioPorId(color).nombre.toLowerCase();
}

/* Los vidrios en los que esta pieza esta fotografiada, en el orden de la
   lista de colores. Solo esos se le ofrecen al cliente: un circulito que
   lleva a un dibujo no dice nada de como queda la pieza de verdad. */
function coloresDe(anillo) {
  var hay = FOTOS_REALES[anillo.id] || [];
  return VIDRIOS.filter(function (v) { return hay.indexOf(v.id) >= 0; });
}

/* Los circulitos de color de la ficha: primero la foto, luego los vidrios. */
function botonesColorFicha(anillo, puesto) {
  var boton = function (id, nombre, fondo, clase) {
    return '<button class="color' + (clase || '') + '" type="button"' +
      ' aria-pressed="' + (puesto === id) + '"' +
      ' title="' + escapar(nombre) + '" aria-label="' + escapar(nombre) + '"' +
      ' data-color="' + id + '"' + (fondo ? ' style="background:' + fondo + '"' : '') + '></button>';
  };
  var propio = anillo.cristal !== 'transparente' ? anillo.cristal : anillo.acento;
  return boton(COLOR_ORIGINAL, 'Como la foto', propio, ' color--foto') +
    coloresDe(anillo).map(function (v) {
      return boton(v.id, v.nombre, v.cristal === 'transparente' ? '' : v.cristal,
                   v.cristal === 'transparente' ? ' color--limpio' : '');
    }).join('');
}

/* Una pieza de esa forma que si este fotografiada en ese color, para poder
   enseñar cristal de verdad. Null si de esa forma todavia no hay ninguna. */
function piezaFotografiada(familia, tipo, color) {
  if (!color || color === COLOR_ORIGINAL) return null;
  var mismas = CATALOGO.filter(function (a) {
    return a.familia === familia && tipoDe(a) === tipo && fotoDeColor(a, color);
  });
  if (!mismas.length) {
    mismas = CATALOGO.filter(function (a) {
      return a.familia === familia && fotoDeColor(a, color);
    });
  }
  return mismas[0] || null;
}

/* El pie de la muestra grande del disenador. */
function pieDeMuestra(anillo, familia, color) {
  var forma = NOMBRE_FAMILIA[familia].toLowerCase().replace(/s$/, '');
  return 'Un ' + forma + ' del taller hecho en ' +
    vidrioPorId(color).nombre.toLowerCase() + '. Es foto, no dibujo.';
}

/* Las formas que tienen alguna pieza fotografiada en algun color. Son las
   unicas que se ofrecen para armar: de las demas no hay nada que enseñar. */
function formasConFoto(tipo) {
  return Object.keys(NOMBRE_FAMILIA).filter(function (f) {
    return CATALOGO.some(function (a) {
      return a.familia === f && tipoDe(a) === tipo && (FOTOS_REALES[a.id] || []).length;
    });
  });
}

/* Que tipos de pieza tienen alguna forma fotografiada en algun color. */
function tiposConFoto() {
  return Object.keys(TIPOS).filter(function (t) { return formasConFoto(t).length; });
}

/* Los vidrios en los que hay foto de esa forma. */
function coloresDeForma(familia, tipo) {
  var hay = {};
  CATALOGO.forEach(function (a) {
    if (a.familia !== familia || tipoDe(a) !== tipo) return;
    (FOTOS_REALES[a.id] || []).forEach(function (c) { hay[c] = true; });
  });
  return VIDRIOS.filter(function (v) { return hay[v.id]; });
}

/* En la tarjeta: en cuantos colores esta fotografiada esa pieza. Se cuentan
   solo las fotos que existen, nunca de mas. */
function cuantosColores(anillo) {
  var n = (FOTOS_REALES[anillo.id] || []).length;
  return n ? '<p class="pieza__colores">' + n + ' colores</p>' : '';
}

/* Como se le dice al cliente de donde salio la imagen que esta viendo. */
function notaColor(anillo, color) {
  if (!color || color === COLOR_ORIGINAL) return 'Foto real de la pieza, sin retocar.';
  return 'Foto real: esta pieza hecha en ' + vidrioPorId(color).nombre.toLowerCase() + '.';
}

/* ============ 4. AYUDANTES ============ */
function $(sel, raiz) { return (raiz || document).querySelector(sel); }
function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

function pesos(n) {
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapar(txt) {
  return String(txt).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}

function sinAcentos(txt) {
  return String(txt).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function porId(id) {
  for (var i = 0; i < CATALOGO.length; i++) {
    if (CATALOGO[i].id === id) return CATALOGO[i];
  }
  return null;
}

function urlDe(a) { return 'producto.html?id=' + encodeURIComponent(a.id); }

/* Familias que no van al precio de la casa, porque llevan mas trabajo. */
var PRECIO_FAMILIA = {
  flores: 450
};

/* Lo que cuesta armar algo de esa forma y ese tipo. */
function precioDeForma(familia, tipo) {
  return PRECIO_FAMILIA[familia] || TIPOS[tipo].precio || PRECIO;
}

/* El precio de una pieza: el suyo si lo tiene, si no el de su forma, si no
   el de su tipo. */
function precioDe(a) {
  return a.precio || PRECIO_FAMILIA[a.familia] || TIPOS[tipoDe(a)].precio || PRECIO;
}

/* Las medidas de una pieza: las suyas si las tiene, si no las de la casa. */
function medidasDe(a) { return a.medidas || MEDIDAS; }

/* Anillo o arete. Lo que no dice nada, es anillo. */
function tipoDe(a) { return TIPOS[a.tipo] ? a.tipo : 'anillo'; }
function llevaMedida(a) { return TIPOS[tipoDe(a)].llevaMedida; }

function filtrar(familia, soloDestacados, tipo) {
  return CATALOGO.filter(function (a) {
    var okFamilia = !familia || familia === 'todo' || a.familia === familia;
    var okTipo = !tipo || tipo === 'todo' || tipoDe(a) === tipo;
    return okFamilia && okTipo && (!soloDestacados || a.destacado === true);
  });
}

/* ============ 5. TARJETAS Y REJILLAS ============ */
function tarjeta(a) {
  var etiqueta = '';
  if (a.etiqueta === 'nuevo')  etiqueta = '<span class="pieza__marca">Nuevo</span>';

  return '<article class="pieza">' +
    '<figure class="pieza__foto">' + etiqueta + dibujo(a) + '</figure>' +
    '<div class="pieza__cuerpo">' +
      '<span class="pieza__familia">' + NOMBRE_FAMILIA[a.familia] + '</span>' +
      '<h3 class="pieza__nombre"><a href="' + urlDe(a) + '">' + escapar(a.nombre) + '</a></h3>' +
      '<p class="pieza__precio">' + pesos(precioDe(a)) + '</p>' +
      cuantosColores(a) +
      '<button class="enlace-boton" type="button" data-agregar="' + a.id + '">Agregar a la bolsa</button>' +
    '</div>' +
  '</article>';
}

/* Pinta una rejilla. El elemento manda con sus data-*:
     data-familia    aros | espirales | ... | todo
     data-tipo       anillo | arete | todo
     data-destacados solo las piezas marcadas como destacadas
     data-limite     cuantas piezas como maximo
     data-excluir    id de una pieza que no debe aparecer            */
function pintarRejilla(rejilla, familiaForzada) {
  var familia = familiaForzada || rejilla.getAttribute('data-familia') || 'todo';
  var limite = parseInt(rejilla.getAttribute('data-limite'), 10);
  var excluir = rejilla.getAttribute('data-excluir');

  var piezas = filtrar(familia, rejilla.hasAttribute('data-destacados'),
                       rejilla.getAttribute('data-tipo'));
  if (excluir) piezas = piezas.filter(function (a) { return a.id !== excluir; });
  if (limite > 0) piezas = piezas.slice(0, limite);

  rejilla.innerHTML = piezas.length
    ? piezas.map(tarjeta).join('')
    : '<p class="rejilla__vacio">Por ahora no hay piezas en esta familia. ' +
      'Escribenos y lo hacemos a tu gusto.</p>';
  buscarFotos(rejilla);
  return piezas.length;
}

function actualizarCuenta(n) {
  var cuenta = $('#cuenta-piezas');
  if (cuenta) cuenta.textContent = n === 1 ? '1 pieza' : n + ' piezas';
}

/* ============ 6. FILTROS ============ */
function iniciarFiltros() {
  var botones = $$('.filtro');
  var tipos = $$('.filtro-tipo');
  var rejilla = $('#rejilla-catalogo');
  if (!botones.length || !rejilla) return;

  function aplicar(familia) {
    botones.forEach(function (b) {
      b.setAttribute('aria-selected', String(b.getAttribute('data-familia') === familia));
    });
    actualizarCuenta(pintarRejilla(rejilla, familia));
    if (history.replaceState) {
      history.replaceState(null, '', familia === 'todo' ? location.pathname : '#' + familia);
    }
  }

  botones.forEach(function (b) {
    b.addEventListener('click', function () { aplicar(b.getAttribute('data-familia')); });
  });

  /* El otro eje: anillos, aretes o todo. Manda sobre la rejilla entera. */
  tipos.forEach(function (b) {
    b.addEventListener('click', function () {
      var tipo = b.getAttribute('data-tipo');
      tipos.forEach(function (o) {
        o.setAttribute('aria-selected', String(o.getAttribute('data-tipo') === tipo));
      });
      rejilla.setAttribute('data-tipo', tipo);
      var puesta = botones.filter(function (o) {
        return o.getAttribute('aria-selected') === 'true';
      })[0];
      aplicar(puesta ? puesta.getAttribute('data-familia') : 'todo');
    });
  });

  var inicial = location.hash.replace('#', '');
  var valida = botones.some(function (b) { return b.getAttribute('data-familia') === inicial; });
  aplicar(valida ? inicial : 'todo');

  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    if (botones.some(function (b) { return b.getAttribute('data-familia') === h; })) aplicar(h);
  });
}

/* ============ 7. FICHA DE PRODUCTO ============ */
function iniciarFicha() {
  var ficha = $('#ficha');
  if (!ficha) return;

  var id = new URLSearchParams(location.search).get('id');
  var a = id ? porId(id) : null;

  if (!a) {
    ficha.innerHTML = '<div class="ficha__vacia"><h1>No encontramos esa pieza</h1>' +
      '<p>Puede que el enlace este incompleto.</p>' +
      '<a class="boton" href="tienda.html">Ver todos los anillos</a></div>';
    document.title = 'Pieza no encontrada · ' + MARCA.nombre;
    var otra = $('#rejilla-relacionados');
    if (otra) { otra.setAttribute('data-limite', '4'); pintarRejilla(otra); }
    return;
  }

  document.title = a.nombre + ' · ' + MARCA.nombre;
  var meta = $('meta[name="description"]');
  if (meta) meta.setAttribute('content', a.texto);

  var medidas = medidasDe(a);
  var ajustable = medidas.length === 1 && medidas[0] === 'Ajustable';
  var conMedida = llevaMedida(a);
  var color = COLOR_ORIGINAL;

  ficha.innerHTML =
    '<div class="ficha__vista" id="vista-ficha">' + dibujo(a) + '</div>' +
    '<div class="ficha__datos">' +
      '<p class="migas"><a href="index.html">Inicio</a> / <a href="tienda.html">Anillos</a> / ' +
        escapar(a.nombre) + '</p>' +
      '<span class="ficha__familia">' + NOMBRE_FAMILIA[a.familia] + '</span>' +
      '<h1>' + escapar(a.nombre) + '</h1>' +
      '<p class="ficha__precio">' + pesos(precioDe(a)) + '</p>' +
      '<p class="ficha__nota">Precio con IVA. Envio gratis desde ' + pesos(MARCA.envioGratis) + '.</p>' +
      '<p class="ficha__texto">' + escapar(a.texto) + '</p>' +

      (coloresDe(a).length
        ? '<div class="campo">' +
            '<span class="campo__titulo">Color del vidrio</span>' +
            '<div class="colores" id="colores-ficha">' + botonesColorFicha(a, color) + '</div>' +
            '<p class="campo__pista" id="nota-color">' + notaColor(a, color) + '</p>' +
            '<p class="campo__pista">Si lo quieres en otro vidrio se hace bajo pedido: ' +
            'pregunta por WhatsApp.</p>' +
          '</div>'
        : '') +

      (conMedida
        ? '<div class="campo">' +
            '<span class="campo__titulo">' + (ajustable ? 'Medida' : 'Numero de anillo') + '</span>' +
            '<div class="medidas" id="medidas">' +
              medidas.map(function (m, i) {
                return '<button class="medida" type="button" aria-pressed="' + (i === 0) +
                  '" data-medida="' + m + '">' + m + '</button>';
              }).join('') +
            '</div>' +
            (ajustable
              ? '<p class="campo__pista">Se abre y cierra un poco con los dedos para ajustar.</p>'
              : '<p class="campo__pista"><a href="index.html#medidas">¿Como se cual es mi numero?</a></p>') +
          '</div>'
        : '<div class="campo">' +
            '<span class="campo__titulo">Se vende por par</span>' +
            '<p class="campo__pista">Los dos aretes se soplan juntos para que salgan parecidos, ' +
            'aunque nunca identicos.</p>' +
          '</div>') +

      '<div class="campo">' +
        '<span class="campo__titulo">Cantidad</span>' +
        '<div class="cantidad">' +
          '<button type="button" id="menos" aria-label="Quitar una">&minus;</button>' +
          '<output id="cantidad" aria-live="polite">1</output>' +
          '<button type="button" id="mas" aria-label="Agregar una">+</button>' +
        '</div>' +
      '</div>' +

      '<div class="ficha__acciones">' +
        '<button class="boton" type="button" id="agregar-ficha">Agregar a la bolsa</button>' +
        '<a class="boton boton--linea" id="pedir-directo" href="#" target="_blank" rel="noopener">Preguntar por WhatsApp</a>' +
      '</div>' +
      '<p class="ficha__aviso" id="aviso-ficha" role="status"></p>' +

      '<div class="desplegables">' +
        '<details open><summary>Como se hizo</summary><div class="desplegables__cuerpo">' +
          '<p>Vidrio de borosilicato trabajado al soplete, pieza por pieza. No hay molde: ' +
          'el aro se forma en caliente y el remate se sopla y se pega a mano.</p>' +
          '<p>Se hace despues de que lo pides, a tu medida y en el color que elijas. ' +
          'Diferencias minimas de grosor, tono o burbujas internas son parte del ' +
          'trabajo a mano, no un defecto.</p>' +
        '</div></details>' +
        '<details><summary>Cuidados</summary><div class="desplegables__cuerpo">' +
          '<p>Es cristal: aguanta el uso diario pero se rompe si cae sobre piso duro. ' +
          'Quitatelo para hacer ejercicio, cargar cosas pesadas o dormir.</p>' +
          '<p>Se limpia con agua tibia y jabon neutro. No uses limpiadores con cloro ' +
          'ni lo metas al ultrasonido de joyeria.</p>' +
        '</div></details>' +
        '<details><summary>Envios y cambios</summary><div class="desplegables__cuerpo">' +
          '<p>Se hace despues de que lo pides, en tu medida y en el color que ' +
          'elegiste: tarda de dos a tres semanas. Sale del taller empacado en ' +
          'caja rigida y el envio es gratis desde ' + pesos(MARCA.envioGratis) + '.</p>' +
          '<p>Si te queda mal la medida, lo cambiamos dentro de los 15 dias siguientes. ' +
          'Si llega roto, mandanos una foto y lo reponemos sin costo.</p>' +
        '</div></details>' +
      '</div>' +
    '</div>';

  var cantidad = 1;
  var medida = conMedida ? medidas[0] : 'Par';

  if ($('#colores-ficha')) $('#colores-ficha').addEventListener('click', function (e) {
    var b = e.target.closest('.color');
    if (!b) return;
    color = b.getAttribute('data-color');
    $$('.color', $('#colores-ficha')).forEach(function (o) {
      o.setAttribute('aria-pressed', String(o === b));
    });
    $('#vista-ficha').innerHTML = dibujo(enColor(a, color));
    $('#nota-color').textContent = notaColor(a, color);
    buscarFotos($('#vista-ficha'));
    enlaceDirecto();
  });

  if (conMedida) $('#medidas').addEventListener('click', function (e) {
    var b = e.target.closest('.medida');
    if (!b) return;
    medida = b.getAttribute('data-medida');
    $$('.medida', ficha).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    enlaceDirecto();
  });

  function pintaCantidad() { $('#cantidad').textContent = String(cantidad); enlaceDirecto(); }
  $('#mas').addEventListener('click', function () { if (cantidad < 10) { cantidad++; pintaCantidad(); } });
  $('#menos').addEventListener('click', function () { if (cantidad > 1) { cantidad--; pintaCantidad(); } });

  function enlaceDirecto() {
    var texto = 'Hola ' + MARCA.nombre + ', me interesa ' +
      (conMedida ? 'el anillo "' + a.nombre + '" en medida ' + medida
                 : 'el par de aretes "' + a.nombre + '"') +
      ' en ' + nombreColor(a, color) +
      ' (' + cantidad + ' pieza' + (cantidad > 1 ? 's' : '') + '). ' + location.href;
    $('#pedir-directo').href = 'https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  enlaceDirecto();

  $('#agregar-ficha').addEventListener('click', function () {
    agregar(a.id, medida, cantidad, color);
    $('#aviso-ficha').textContent = 'Listo, ya esta en tu bolsa.';
    abrirBolsa();
  });

  buscarFotos(ficha);

  var relacionados = $('#rejilla-relacionados');
  if (relacionados) {
    relacionados.setAttribute('data-familia', a.familia);
    relacionados.setAttribute('data-excluir', a.id);
    relacionados.setAttribute('data-limite', '4');
    if (!pintarRejilla(relacionados)) {
      relacionados.removeAttribute('data-familia');
      pintarRejilla(relacionados);
    }
  }
}

/* ============ HAZLO TUYO ============
   El cliente arma su anillo eligiendo forma, color, segundo color y
   medida. El dibujo se rehace con cada eleccion, usando las mismas
   funciones con las que se dibujan las piezas del catalogo, asi que lo
   que ve es como se veria la pieza de verdad.

   El pedido no pasa por la bolsa: una pieza a la medida se cotiza y se
   agenda por WhatsApp, como dice la seccion de preguntas.
   ==================================== */
var VIDRIOS = [
  { id:'transparente', nombre:'Transparente', cristal:'transparente', muestra:'' },
  { id:'cielo',    nombre:'Azul cielo',    cristal:'#5fa8d8', acento:'#bfe4fb' },
  { id:'cobalto',  nombre:'Azul cobalto',  cristal:'#2a5ba8', acento:'#8fb6ee' },
  { id:'anil',     nombre:'Azul anil',     cristal:'#1f43c4', acento:'#7f9bf0' },
  { id:'esmeralda',nombre:'Verde esmeralda',cristal:'#1f8f4a', acento:'#8ce8b0' },
  { id:'limon',    nombre:'Verde limon',   cristal:'#7cc24a', acento:'#d3f0a8' },
  { id:'amarillo', nombre:'Amarillo',      cristal:'#f2b705', acento:'#ffe9a3' },
  { id:'ambar',    nombre:'Ambar',         cristal:'#c8860d', acento:'#ffe3a8' },
  { id:'naranja',  nombre:'Naranja',       cristal:'#e0531a', acento:'#ffb389' },
  { id:'rubi',     nombre:'Rojo rubi',     cristal:'#a81222', acento:'#ff8a8a' },
  { id:'rosa',     nombre:'Rosa',          cristal:'#e58fae', acento:'#ffd3e2' },
  { id:'lila',     nombre:'Lila',          cristal:'#b9a0dc', acento:'#e8dcf8' },
  { id:'amatista', nombre:'Amatista',      cristal:'#7b42a8', acento:'#c9a0e8' },
  { id:'nube',     nombre:'Blanco nube',   cristal:'#e9e4de', acento:'#ffffff' },
  { id:'tabaco',   nombre:'Tabaco',        cristal:'#7a3a1c', acento:'#e0a06a' }
];

/* Que familias usan un segundo color y como se llama ahi. */
var SEGUNDO = {
  gotas:'Color de las gotitas',
  racimos:'Color de las piedras',
  flores:'Color del centro'
};

function vidrioPorId(id) {
  for (var i = 0; i < VIDRIOS.length; i++) { if (VIDRIOS[i].id === id) return VIDRIOS[i]; }
  return VIDRIOS[0];
}

function iniciarDisenador() {
  var caja = $('#disenador');
  if (!caja) return;

  var eleccion = { tipo:'anillo', forma:'aros', vidrio:'cielo',
                   segundo:'transparente', medida:MEDIDAS[0] };

  /* Si lo elegido no tiene foto, se corre a lo primero que si la tenga. Asi
     el cliente nunca ve un dibujo: todo lo que puede armar existe en foto. */
  function acomodar() {
    var tipos = tiposConFoto();
    if (tipos.indexOf(eleccion.tipo) < 0) eleccion.tipo = tipos[0] || 'anillo';
    var formas = formasConFoto(eleccion.tipo);
    if (formas.indexOf(eleccion.forma) < 0) eleccion.forma = formas[0];
    var colores = coloresDeForma(eleccion.forma, eleccion.tipo);
    if (!colores.some(function (v) { return v.id === eleccion.vidrio; })) {
      eleccion.vidrio = colores.length ? colores[0].id : 'transparente';
    }
  }
  acomodar();

  /* La pieza imaginaria que se dibuja, con la misma forma que las del catalogo. */
  function pieza() {
    var v = vidrioPorId(eleccion.vidrio);
    var g = vidrioPorId(eleccion.segundo);
    return {
      id:'a-tu-gusto',
      nombre:'tu pieza',
      familia:eleccion.forma,
      tipo:eleccion.tipo,
      cristal:v.cristal,
      acento:(SEGUNDO[eleccion.forma] ? (g.cristal === 'transparente' ? '#dbe9f0' : g.cristal)
                                      : (v.acento || '#ffffff'))
    };
  }

  /* --- que tan lejos esta un color de otro, para buscar parecidos --- */
  function aRgb(color) {
    if (!color || color === 'transparente') return [226, 238, 244];
    var n = parseInt(color.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function distancia(uno, otro) {
    var a = aRgb(uno), b = aRgb(otro);
    return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) + Math.pow(a[2]-b[2],2));
  }

  /* Las piezas ya hechas que mas se parecen a lo que va armando: primero las
     de su misma forma y tipo, ordenadas por cercania de color. Sirven para
     que vea el cristal de verdad, no solo el dibujo. */
  function parecidas() {
    var v = vidrioPorId(eleccion.vidrio);
    var mismas = CATALOGO.filter(function (a) {
      return a.familia === eleccion.forma && tipoDe(a) === eleccion.tipo;
    });
    if (!mismas.length) {
      mismas = CATALOGO.filter(function (a) { return a.familia === eleccion.forma; });
    }
    if (!mismas.length) {
      mismas = CATALOGO.filter(function (a) { return tipoDe(a) === eleccion.tipo; });
    }
    return mismas.slice().sort(function (a, b) {
      return distancia(a.cristal, v.cristal) - distancia(b.cristal, v.cristal);
    }).slice(0, 3);
  }

  function botonesColor(cual) {
    var lista = cual === 'vidrio'
      ? coloresDeForma(eleccion.forma, eleccion.tipo)
      : VIDRIOS;
    return lista.map(function (v) {
      var puesto = eleccion[cual] === v.id;
      var fondo = v.cristal === 'transparente' ? '' : ' style="background:' + v.cristal + '"';
      return '<button class="color' + (v.cristal === 'transparente' ? ' color--limpio' : '') +
        '" type="button" aria-pressed="' + puesto + '" title="' + v.nombre +
        '" aria-label="' + v.nombre + '" data-' + cual + '="' + v.id + '"' + fondo + '></button>';
    }).join('');
  }

  function pintar() {
    var v = vidrioPorId(eleccion.vidrio);
    var g = vidrioPorId(eleccion.segundo);
    var hayDos = !!SEGUNDO[eleccion.forma];
    var esAnillo = TIPOS[eleccion.tipo].llevaMedida;
    var cercanas = parecidas();

    /* Izquierda: como quedaria. Si de esa forma hay una foto que se pueda
       tenir en el color elegido, va esa, y el dibujo pasa a segundo termino.
       Si no la hay, manda el dibujo. */
    var real = piezaFotografiada(eleccion.forma, eleccion.tipo, eleccion.vidrio);

    $('#disenador-vista').innerHTML =
      '<figure class="prueba prueba--simulada">' +
        '<div class="prueba__lienzo">' +
          (real ? dibujo(enColor(real, eleccion.vidrio)) : ilustracion(pieza(), '')) +
        '</div>' +
        '<figcaption>' +
          (real ? pieDeMuestra(real, eleccion.forma, eleccion.vidrio)
                : 'Tu combinacion, dibujada') +
        '</figcaption>' +
      '</figure>' +
      (cercanas.length
        ? '<div class="parecidas">' +
            '<span class="campo__titulo">Asi se ve en cristal</span>' +
            '<div class="parecidas__fila">' +
              cercanas.map(function (a) {
                return '<a class="parecida" href="' + urlDe(a) + '">' +
                  '<span class="parecida__foto">' + dibujo(a) + '</span>' +
                  '<span>' + escapar(a.nombre) + '</span></a>';
              }).join('') +
            '</div>' +
            '<p class="campo__pista">Piezas que ya salieron del taller con esta forma. ' +
              'Son fotos reales: el color que elijas se vera con este mismo cristal.</p>' +
          '</div>'
        : '');

    $('#disenador-opciones').innerHTML =
      '<span class="ficha__familia">Pieza a tu gusto</span>' +
      '<h1>Hazlo tuyo</h1>' +
      '<p class="ficha__precio">Desde ' +
        pesos(precioDeForma(eleccion.forma, eleccion.tipo)) + '</p>' +
      '<p class="ficha__nota">El precio final depende de que tan trabajada quede la pieza; ' +
        'te lo confirmamos por WhatsApp antes de empezar. Tarda de dos a tres semanas.</p>' +

      /* Solo se ofrece lo que tiene fotos; si nada mas hay de un tipo,
         el renglon sobra. */
      (tiposConFoto().length > 1
        ? '<div class="campo">' +
            '<span class="campo__titulo">Que quieres</span>' +
            '<div class="medidas" id="tipos-hazlo">' +
              tiposConFoto().map(function (t) {
                return '<button class="medida" type="button" aria-pressed="' + (eleccion.tipo === t) +
                  '" data-tipohazlo="' + t + '">' + TIPOS[t].varios + '</button>';
              }).join('') +
            '</div>' +
          '</div>'
        : '') +

      '<div class="campo">' +
        '<span class="campo__titulo">Forma</span>' +
        '<div class="formas" id="formas">' +
          formasConFoto(eleccion.tipo).map(function (f) {
            /* Cada forma se enseña ya en el color elegido, para que se vean
               todas juntas antes de escoger. Si de esa forma no hay foto que
               tenir, sale la foto tal cual. */
            var tenida = piezaFotografiada(f, eleccion.tipo, eleccion.vidrio);
            var muestra = tenida ||
                          CATALOGO.filter(function (a) { return a.familia === f; })[0];
            return '<button class="forma" type="button" aria-pressed="' + (eleccion.forma === f) +
              '" data-forma="' + f + '">' +
              (muestra ? dibujo(tenida ? enColor(tenida, eleccion.vidrio) : muestra)
                       : ilustracion({ id:'m-'+f, nombre:NOMBRE_FAMILIA[f], familia:f,
                                       cristal:'#5fa8d8', acento:'#bfe4fb' }, '')) +
              '<span>' + NOMBRE_FAMILIA[f] + '</span></button>';
          }).join('') +
        '</div>' +
        '<p class="campo__pista">' + escapar(TEXTO_FAMILIA[eleccion.forma]) + '</p>' +
      '</div>' +

      '<div class="campo">' +
        '<span class="campo__titulo">Color del vidrio · ' + escapar(v.nombre) + '</span>' +
        '<div class="colores" id="colores">' + botonesColor('vidrio') + '</div>' +
      '</div>' +

      (hayDos
        ? '<div class="campo">' +
            '<span class="campo__titulo">' + SEGUNDO[eleccion.forma] + ' · ' + escapar(g.nombre) + '</span>' +
            '<div class="colores" id="segundos">' + botonesColor('segundo') + '</div>' +
          '</div>'
        : '') +

      (esAnillo
        ? '<div class="campo">' +
            '<span class="campo__titulo">Numero de anillo</span>' +
            '<div class="medidas" id="medidas-hazlo">' +
              MEDIDAS.map(function (m) {
                return '<button class="medida" type="button" aria-pressed="' + (eleccion.medida === m) +
                  '" data-medida="' + m + '">' + m + '</button>';
              }).join('') +
            '</div>' +
            '<p class="campo__pista"><a href="index.html#medidas">¿Como se cual es mi numero?</a></p>' +
          '</div>'
        : '<div class="campo">' +
            '<span class="campo__titulo">Se hacen por par</span>' +
            '<p class="campo__pista">Los dos se soplan juntos para que salgan parecidos. ' +
            'Si los quieres disparejos, de dos colores, dinoslo por WhatsApp.</p>' +
          '</div>') +

      '<div class="hazlo__resumen"><dl>' +
        '<dt>Pieza</dt><dd>' + TIPOS[eleccion.tipo].varios + '</dd>' +
        '<dt>Forma</dt><dd>' + NOMBRE_FAMILIA[eleccion.forma] + '</dd>' +
        '<dt>Vidrio</dt><dd>' + escapar(v.nombre) + '</dd>' +
        (hayDos ? '<dt>' + SEGUNDO[eleccion.forma] + '</dt><dd>' + escapar(g.nombre) + '</dd>' : '') +
        (esAnillo ? '<dt>Medida</dt><dd>' + eleccion.medida + '</dd>' : '') +
      '</dl></div>' +

      '<div class="ficha__acciones">' +
        '<a class="boton" id="pedir-hazlo" href="#" target="_blank" rel="noopener">Pedirlo por WhatsApp</a>' +
      '</div>' +
      '<p class="campo__pista">El dibujo es una aproximacion: el vidrio se sopla a mano y ' +
        'cada pieza sale con su propia forma.</p>';

    var texto = 'Hola ' + MARCA.nombre + ', quiero una pieza a mi gusto:\n\n' +
      '• Pieza: ' + TIPOS[eleccion.tipo].varios + '\n' +
      '• Forma: ' + NOMBRE_FAMILIA[eleccion.forma] + '\n' +
      '• Vidrio: ' + v.nombre + '\n' +
      (hayDos ? '• ' + SEGUNDO[eleccion.forma] + ': ' + g.nombre + '\n' : '') +
      (esAnillo ? '• Medida: ' + eleccion.medida + '\n' : '• Se hacen por par\n') +
      '\n¿Me confirman precio y tiempo?';
    $('#pedir-hazlo').href = 'https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto);

    /* Las muestras y los parecidos son piezas de verdad: van con su foto. */
    buscarFotos(caja);
  }

  caja.addEventListener('click', function (e) {
    var b = e.target.closest('[data-forma],[data-vidrio],[data-segundo],[data-medida],[data-tipohazlo]');
    if (!b) return;
    if (b.hasAttribute('data-tipohazlo')) eleccion.tipo    = b.getAttribute('data-tipohazlo');
    if (b.hasAttribute('data-forma'))     eleccion.forma   = b.getAttribute('data-forma');
    if (b.hasAttribute('data-vidrio'))    eleccion.vidrio  = b.getAttribute('data-vidrio');
    if (b.hasAttribute('data-segundo'))   eleccion.segundo = b.getAttribute('data-segundo');
    if (b.hasAttribute('data-medida'))    eleccion.medida  = b.getAttribute('data-medida');
    acomodar();
    pintar();
  });

  pintar();
}

/* ============ 8. BUSCADOR ============ */
function iniciarBuscador() {
  var boton = $('#btn-buscar');
  var caja = $('#caja-buscar');
  if (!boton || !caja) return;

  var campo = $('input', caja);
  var salida = $('#resultados');

  boton.addEventListener('click', function () {
    var abierto = caja.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    if (abierto && campo) campo.focus();
  });

  if (!campo || !salida) return;

  function buscar() {
    var q = sinAcentos(campo.value.trim());
    if (q.length < 2) { salida.innerHTML = ''; return; }

    var hallazgos = CATALOGO.filter(function (a) {
      var heno = sinAcentos([a.nombre, NOMBRE_FAMILIA[a.familia], a.texto].join(' '));
      return q.split(/\s+/).every(function (parte) { return heno.indexOf(parte) !== -1; });
    }).slice(0, 6);

    salida.innerHTML = hallazgos.length
      ? '<ul class="resultados__lista">' + hallazgos.map(function (a) {
          return '<li><a href="' + urlDe(a) + '">' + dibujo(a) +
            '<span><b>' + escapar(a.nombre) + '</b>' +
            '<span>' + NOMBRE_FAMILIA[a.familia] + ' · ' + pesos(precioDe(a)) + '</span></span></a></li>';
        }).join('') + '</ul>'
      : '<p class="resultados__vacio">Nada con &laquo;' + escapar(campo.value.trim()) +
        '&raquo;. Prueba con aros, espirales, gotas, racimos o flores.</p>';
  }

  campo.addEventListener('input', function () { buscar(); buscarFotos(salida); });
  campo.addEventListener('search', buscar);
  $('form', caja).addEventListener('submit', function (e) { e.preventDefault(); buscar(); });
}

/* ============ 9. BOLSA ============ */
var LLAVE = 'soplo:bolsa';
var bolsa = [];

function leerBolsa() {
  try {
    var crudo = localStorage.getItem(LLAVE);
    var datos = crudo ? JSON.parse(crudo) : [];
    bolsa = Array.isArray(datos) ? datos.filter(function (r) { return porId(r.id); }) : [];
  } catch (e) { bolsa = []; }
}

function guardarBolsa() {
  try { localStorage.setItem(LLAVE, JSON.stringify(bolsa)); } catch (e) { /* modo privado */ }
}

function agregar(id, medida, cantidad, color) {
  var a = porId(id);
  if (!a) return;
  medida = medida || (llevaMedida(a) ? medidasDe(a)[0] : 'Par');
  cantidad = cantidad || 1;
  color = color || COLOR_ORIGINAL;

  for (var i = 0; i < bolsa.length; i++) {
    if (bolsa[i].id === id && bolsa[i].medida === medida &&
        (bolsa[i].color || COLOR_ORIGINAL) === color) {
      bolsa[i].cantidad = Math.min(10, bolsa[i].cantidad + cantidad);
      guardarBolsa(); pintarBolsa(); return;
    }
  }
  bolsa.push({ id: id, medida: medida, cantidad: cantidad, color: color });
  guardarBolsa();
  pintarBolsa();
}

function cambiarCantidad(i, delta) {
  var r = bolsa[i];
  if (!r) return;
  r.cantidad += delta;
  if (r.cantidad < 1) bolsa.splice(i, 1);
  else r.cantidad = Math.min(10, r.cantidad);
  guardarBolsa();
  pintarBolsa();
}

function totalBolsa() {
  return bolsa.reduce(function (s, r) {
    var a = porId(r.id);
    return s + (a ? precioDe(a) * r.cantidad : 0);
  }, 0);
}

function piezasBolsa() {
  return bolsa.reduce(function (s, r) { return s + r.cantidad; }, 0);
}

function mensajeWhatsApp() {
  if (!bolsa.length) return 'https://wa.me/' + MARCA.whatsapp;
  var lineas = bolsa.map(function (r) {
    var a = porId(r.id);
    return '• ' + a.nombre + (r.medida === 'Par' ? ' — par' : ' — medida ' + r.medida) +
      ' — ' + nombreColor(a, r.color) +
      ' × ' + r.cantidad + ' — ' + pesos(precioDe(a) * r.cantidad);
  });
  var total = totalBolsa();
  var envio = total >= MARCA.envioGratis
    ? '\nEnvio: gratis'
    : '\nEnvio: por confirmar segun codigo postal';
  var texto = 'Hola ' + MARCA.nombre + ', quiero este pedido:\n\n' + lineas.join('\n') +
    '\n\nTotal: ' + pesos(total) + envio + '\n\n¿Me confirman disponibilidad?';
  return 'https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto);
}

function pintarBolsa() {
  var n = piezasBolsa();
  var contador = $('#contador-bolsa');
  if (contador) {
    contador.textContent = String(n);
    contador.classList.toggle('visible', n > 0);
  }

  var lista = $('#bolsa-lista');
  if (!lista) return;

  lista.innerHTML = bolsa.length
    ? bolsa.map(function (r, i) {
        var a = porId(r.id);
        return '<div class="renglon">' +
          '<figure class="renglon__foto">' + dibujo(enColor(a, r.color)) + '</figure>' +
          '<div>' +
            '<b>' + escapar(a.nombre) + '</b>' +
            '<small>' + (r.medida === 'Par' ? 'Par de aretes' : 'Medida ' + escapar(r.medida)) +
              ' · ' + escapar(nombreColor(a, r.color)) + '</small>' +
            '<div class="renglon__control">' +
              '<button type="button" data-menos="' + i + '" aria-label="Quitar una">&minus;</button>' +
              '<span>' + r.cantidad + '</span>' +
              '<button type="button" data-mas="' + i + '" aria-label="Agregar una">+</button>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<p class="renglon__precio">' + pesos(precioDe(a) * r.cantidad) + '</p>' +
            '<button class="renglon__quitar" type="button" data-quitar="' + i + '">Quitar</button>' +
          '</div>' +
        '</div>';
      }).join('')
    : '<p class="bolsa__vacia">Tu bolsa esta vacia.</p>';
  buscarFotos(lista);

  var total = totalBolsa();
  var elTotal = $('#bolsa-total');
  if (elTotal) elTotal.textContent = pesos(total);

  var envio = $('#bolsa-envio');
  if (envio) {
    if (!bolsa.length) envio.textContent = '';
    else if (total >= MARCA.envioGratis) envio.textContent = 'Tu pedido ya lleva envio gratis.';
    else envio.textContent = 'Te faltan ' + pesos(MARCA.envioGratis - total) + ' para el envio gratis.';
  }

  var boton = $('#bolsa-whatsapp');
  if (boton) {
    boton.href = mensajeWhatsApp();
    boton.setAttribute('aria-disabled', String(!bolsa.length));
  }
}

function abrirBolsa() {
  var panel = $('#bolsa'), fondo = $('#bolsa-fondo');
  if (!panel) return;
  panel.classList.add('abierta');
  panel.setAttribute('aria-hidden', 'false');
  if (fondo) fondo.classList.add('visible');
  var cerrar = $('#bolsa-cerrar');
  if (cerrar) cerrar.focus();
}

function cerrarBolsa() {
  var panel = $('#bolsa'), fondo = $('#bolsa-fondo');
  if (!panel) return;
  panel.classList.remove('abierta');
  panel.setAttribute('aria-hidden', 'true');
  if (fondo) fondo.classList.remove('visible');
}

function iniciarBolsa() {
  leerBolsa();
  pintarBolsa();

  var btn = $('#btn-bolsa');
  if (btn) btn.addEventListener('click', abrirBolsa);

  var cerrar = $('#bolsa-cerrar');
  if (cerrar) cerrar.addEventListener('click', cerrarBolsa);

  var fondo = $('#bolsa-fondo');
  if (fondo) fondo.addEventListener('click', cerrarBolsa);

  var vaciar = $('#bolsa-vaciar');
  if (vaciar) vaciar.addEventListener('click', function () {
    bolsa = []; guardarBolsa(); pintarBolsa();
  });

  var lista = $('#bolsa-lista');
  if (lista) lista.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-mas'))   cambiarCantidad(+b.getAttribute('data-mas'), 1);
    if (b.hasAttribute('data-menos')) cambiarCantidad(+b.getAttribute('data-menos'), -1);
    if (b.hasAttribute('data-quitar')) {
      bolsa.splice(+b.getAttribute('data-quitar'), 1);
      guardarBolsa(); pintarBolsa();
    }
  });

  var whats = $('#bolsa-whatsapp');
  if (whats) whats.addEventListener('click', function (e) { if (!bolsa.length) e.preventDefault(); });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-agregar]');
    if (!b) return;
    e.preventDefault();
    agregar(b.getAttribute('data-agregar'));
    abrirBolsa();
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarBolsa(); });
}

/* ============ 10. ENCABEZADO, MENU Y AVISOS ============ */
function iniciarEncabezado() {
  var cabecera = $('#cabecera');
  if (cabecera) {
    var alSubir = function () { cabecera.classList.toggle('flotando', window.scrollY > 8); };
    window.addEventListener('scroll', alSubir, { passive: true });
    alSubir();
  }

  var btnMenu = $('#btn-menu');
  var nav = $('#nav');
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      btnMenu.setAttribute('aria-expanded', String(abierto));
      document.body.style.overflow = abierto ? 'hidden' : '';
    });
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('abierto')) return;
      if (nav.contains(e.target) || btnMenu.contains(e.target)) return;
      nav.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }
}

/* Los huecos decorativos de la portada. Cada uno dice que quiere:
     data-pieza="aro-azul"   esa pieza en concreto
     data-muestra="gotas"    la primera pieza de esa familia
     data-vitrina="1"        una destacada, en el orden en que aparecen
   Si la pieza pedida ya no esta en el catalogo, se toma otra en su lugar,
   para que quitar una pieza nunca deje un hueco vacio. */
function pintarHuecos() {
  var sobran = CATALOGO.filter(function (a) { return a.destacado; }).concat(CATALOGO);
  var siguiente = 0;

  $$('[data-pieza],[data-muestra],[data-vitrina]').forEach(function (el) {
    var a = porId(el.getAttribute('data-pieza'));

    if (!a && el.hasAttribute('data-muestra')) {
      var f = el.getAttribute('data-muestra');
      a = CATALOGO.filter(function (o) { return o.familia === f; })[0];
    }
    if (!a) a = sobran[siguiente++ % sobran.length];
    if (a) el.insertAdjacentHTML('afterbegin', dibujo(a));
  });
  buscarFotos(document);
}

/* Los formularios no tienen servidor: confirmamos en pantalla. */
function iniciarFormularios() {
  $$('form[data-boletin]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var campo = $('input', form);
      if (campo && !campo.checkValidity()) { campo.reportValidity(); return; }
      form.innerHTML = '<p class="boletin__gracias">Gracias, ya estas en la lista. ' +
        'Te avisamos cuando salga una forma o un color nuevo.</p>';
    });
  });
}

/* ============ 11. ARRANQUE ============ */
function iniciar() {
  pintarHuecos();

  $$('.rejilla').forEach(function (r) {
    if (r.id === 'rejilla-catalogo' || r.id === 'rejilla-relacionados') return;
    pintarRejilla(r);
  });

  var catalogo = $('#rejilla-catalogo');
  if (catalogo && !$('.filtro')) actualizarCuenta(pintarRejilla(catalogo));

  iniciarFiltros();
  iniciarFicha();
  iniciarDisenador();
  iniciarBuscador();
  iniciarBolsa();
  iniciarEncabezado();
  iniciarFormularios();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}

})();
