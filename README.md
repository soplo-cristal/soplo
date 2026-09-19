# Soplo · Anillos de cristal

> Este sitio es independiente. No comparte archivos con ningún otro proyecto:
> todo lo que necesita está en esta carpeta.

Tienda de anillos de cristal estirado a mano: catálogo con filtros, ficha de
producto con medidas, bolsa que se guarda en el navegador y pedido que se
cierra por WhatsApp. Es HTML, CSS y JavaScript planos —sin compilación, sin
dependencias, sin servidor—, así que se publica copiando los archivos.

## Lo primero: poner tus fotos

Los anillos que se ven ahora son **dibujos SVG**, no fotos: sirven de relleno
mientras llegan las tuyas. Para cambiarlos **no hay que tocar código**:

1. Guarda cada foto en `imagenes/`, nombrada como el id de la pieza:
   `aro-azul.jpg`, `esp-rubi.jpg`, `got-verde.jpg`, …
2. Recarga la página. Ya está.

Los ids están en `guion.js`, en el campo `id` de cada pieza. Sirven `.jpg`,
`.png`, `.webp` y `.jpeg`; cuadradas y de unos 900 × 900 px se ven bien en
todo el sitio.

Cada pieza que tenga foto usa la foto; las que no, se quedan con el dibujo,
así que puedes ir fotografiando de a poco sin que el sitio se rompa.

Si prefieres otro nombre de archivo, agrégale a la pieza el campo `foto`:

```js
{ id:'aro-azul', nombre:'Aro Cielo', familia:'aros', precio:780,
  foto:'imagenes/lo-que-tu-quieras.jpg', ... }
```

> El navegador recuerda durante la visita qué piezas tienen foto, para no
> preguntar dos veces por lo mismo. Si agregas una foto nueva y no aparece,
> cierra la pestaña y vuelve a abrirla.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada: familias, lo que hace el taller, cómo se hace, medidas y preguntas |
| `tienda.html` | Catálogo completo con filtros por familia |
| `producto.html` | Ficha de una pieza. Se abre como `producto.html?id=esp-rubi` |
| `hazlo-tuyo.html` | El cliente arma su anillo: forma, color y medida, y lo pide por WhatsApp |
| `estilos.css` | Toda la hoja de estilos |
| `guion.js` | Marca, catálogo, dibujos, buscador y bolsa |
| `imagenes/` | Tus fotos de producto |
| `imagenes/guardadas/` | Fotos de piezas que salieron del catálogo. No se borran, por si vuelven |
| `imagenes/reales/` | Fotos de la misma pieza en otros colores |
| `herramientas/colores.py` | Apunta en `guion.js` qué colores tiene fotografiados cada pieza |
| `assets/favicon.svg` | Icono de la pestaña |
| `assets/og.jpg` | Imagen que se ve al compartir el enlace |
| `assets/og-fuente.html` | De donde sale `og.jpg` |

## Publicarlo en GitHub Pages

El sitio es HTML plano, asi que se publica tal cual, sin compilar nada.

1. En GitHub, crea un repositorio **publico** llamado `soplo`, **vacio**
   (sin README, sin .gitignore, sin licencia).
2. Sube esta carpeta a ese repositorio, en la rama `main`.
3. En el repositorio: **Settings → Pages**. En *Source* elige
   **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.

En un par de minutos queda en `https://<usuario>.github.io/soplo/`.

### Con dominio propio

Cuando tengas el dominio comprado:

1. Crea en la raiz del repositorio un archivo llamado `CNAME` cuyo unico
   contenido sea el dominio, sin `https://` ni barras. Por ejemplo:
   `soplo.mx`
2. Con tu proveedor del dominio, apunta los registros `A` de la raiz a las
   cuatro direcciones de GitHub Pages (185.199.108.153, 185.199.109.153,
   185.199.110.153 y 185.199.111.153) y el `CNAME` de `www` a
   `<usuario>.github.io`.
3. En **Settings → Pages**, escribe el dominio en *Custom domain* y deja
   palomeado *Enforce HTTPS*.

El archivo `.nojekyll` que esta en la raiz le dice a GitHub que publique los
archivos tal cual, sin pasarlos por su generador de blogs.

## Verlo en tu computadora

```bash
python3 -m http.server 8000
# y abre http://localhost:8000
```

## Cambiar la marca

Al principio de `guion.js` está todo junto:

```js
var MARCA = {
  nombre:'Soplo',
  lema:'Anillos de cristal estirado a mano',
  whatsapp:'525643120421',   // solo dígitos, con lada del país
  instagram:'https://www.instagram.com/',
  envioGratis:1200,          // pedidos desde este monto no pagan envío
  moneda:'MXN'
};
```

El nombre visible del encabezado y el pie está escrito en el HTML de cada
página, así que si cambias `MARCA.nombre` busca y reemplaza `SOPLO` y `Soplo`
en los tres `.html`.

## Cambiar el catálogo

La lista `CATALOGO` en `guion.js` manda sobre todo el sitio: portada, tienda,
buscador, relacionados y ficha. Cada pieza es así:

```js
{ id:'got-verde', nombre:'Gotas de Musgo', familia:'gotas',
  cristal:'transparente', acento:'#7cc24a',
  medidas:['5','6','7','8'], etiqueta:'', destacado:true,
  texto:'Las mismas gotitas, en verde limón sobre aro transparente.' }
```

- `familia` — `aros`, `espirales`, `gotas`, `racimos`, `flores` o `apilables`.
- `tipo` — `arete` si es un par de aretes. Sin este campo, la pieza es un
  anillo. Los aretes no piden número: se venden por par.
- `cristal` y `acento` — colores del dibujo. No hacen nada si ya pusiste `foto`.
- `medidas` — **no hace falta**: todas se hacen en las `MEDIDAS` de la casa
  (5 a 10), la constante que está al principio de `guion.js`. Ponle sus
  propias `medidas: ['Ajustable']` solo a la pieza que se salga de la regla.
- `etiqueta` — `nuevo`, `ultima` o vacío.
- `precio` — **no hace falta**: todas las piezas cuestan `PRECIO` ($420),
  la constante que está al principio de `guion.js`. Ponle su propio
  `precio: 550` solo a la pieza que cueste distinto.
- `destacado` — `true` para que salga en la portada.

Agregar, quitar o reordenar piezas ahí actualiza solo todo lo demás.

### Cuando se vende una pieza

Como cada anillo es único, lo normal es borrar su renglón del `CATALOGO` (o
ponerle `etiqueta:'ultima'` mientras queda una).

## Publicarlo

1. Sube la carpeta a tu hosting (GitHub Pages, Netlify, Vercel, el que sea:
   no hace falta backend).
2. Busca y reemplaza `cristaldesoplo.mx` por tu dominio real en los seis
   `canonical`, `og:url`, `og:image` y `twitter:image` de las tres páginas.
   Sin la URL absoluta correcta, WhatsApp e Instagram no muestran la vista
   previa al compartir el enlace.

## Lo que este sitio no hace

La bolsa guarda el pedido en el navegador de quien visita (no hay base de
datos) y el cobro se cierra por WhatsApp: no hay pasarela de pago ni control
de inventario. El formulario del boletín tampoco manda correos, solo confirma
en pantalla. Ahí es donde habría que conectar un servicio si más adelante
quieres cobrar en línea.

## Los colores del diseñador

La página `hazlo-tuyo.html` ofrece los vidrios que están en la lista
`VIDRIOS` de `guion.js`. Cada entrada lleva el nombre que ve el cliente y
el color con el que se dibuja:

```js
{ id:'rubi', nombre:'Rojo rubí', cristal:'#a81222', acento:'#ff8a8a' },
```

Agrega, quita o cambia colores ahí y el diseñador se actualiza solo. El
pedido llega por WhatsApp con la combinación escrita; no pasa por la bolsa,
porque una pieza a la medida se cotiza antes de hacerse.

## Todas las formas, en los trece colores

Cada pieza se ofrece en los trece vidrios de la lista `VIDRIOS`. Lo que ve el
cliente al elegir un color es **una de dos cosas, nunca una foto retocada**:

1. la **foto de esa pieza hecha en ese color**, si ya existe, o
2. el **dibujo** con ese vidrio, que sale de un color parejo y limpio.

La ficha dice cuál de las dos está viendo.

### Agregar un color

Guarda la foto en `imagenes/reales/` con el nombre `<pieza>-<color>.jpg`:

```
imagenes/reales/rac-marino-esmeralda.jpg
imagenes/reales/aro-ambar-amarillo.jpg
```

`<pieza>` es el `id` del catálogo y `<color>` el `id` del vidrio:
`transparente`, `cielo`, `cobalto`, `anil`, `esmeralda`, `limon`, `amarillo`,
`ambar`, `rubi`, `rosa`, `lila`, `nube`, `tabaco`.

Luego corre:

```bash
python3 herramientas/colores.py
```

Apunta lo que encontró dentro de `guion.js`, entre las marcas
`INICIO FOTOS REALES` y `FIN FOTOS REALES` —ese bloque no se edita a mano— y
te dice qué colores le faltan a cada pieza. No necesita nada instalado.

### Por qué no se tiñen las fotos

Hubo una versión que tomaba tu foto y le giraba el tono al vidrio para
rellenar los colores que faltaban. Se quitó.

Veintitrés de las veinticuatro fotos son la pieza **puesta en la mano**, y ahí
el color del vidrio y el de la piel se encinan tanto que el anillo salía
manchado: pedazos del color viejo encima del nuevo, o los dedos teñidos. Sólo
salía limpio en la única foto de estudio.

Un dibujo honesto se ve mejor que una foto sucia. Y si quieres la foto de
verdad, sale más a cuenta tomarla: diez tomas seguidas con la misma mano y el
mismo fondo, como las que ya están en `imagenes/reales/`.
