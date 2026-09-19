# -*- coding: utf-8 -*-
"""
Apuntar en guion.js que piezas estan fotografiadas en otros colores.

Cada pieza se ofrece en los trece vidrios del taller. Lo que ve el cliente en
cada color es una de dos cosas: la foto de esa pieza hecha en ese color, si ya
existe, o el dibujo con ese vidrio. Nunca una foto retocada.

Para agregar un color, guarda la foto asi:

    imagenes/reales/<pieza>-<color>.jpg

donde <pieza> es el id del CATALOGO y <color> el id de la lista VIDRIOS
(transparente, cielo, cobalto, anil, esmeralda, limon, amarillo, ambar, rubi,
rosa, lila, nube, tabaco). Luego corre:

    python3 herramientas/colores.py

Deja la lista dentro de guion.js, entre las marcas INICIO FOTOS REALES y
FIN FOTOS REALES, y avisa que colores le faltan a cada pieza.

Va dentro de guion.js y no en un archivo aparte para que la pagina siga
abriendo con doble clic: un fetch() de JSON no funciona con file://.
"""

import io
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REALES = os.path.join(RAIZ, 'imagenes', 'reales')
GUION = os.path.join(RAIZ, 'guion.js')

EXTENSIONES = ('.jpg', '.jpeg', '.png', '.webp')


def bloque(texto, nombre):
    ini = texto.index('var %s = [' % nombre)
    return texto[ini:texto.index('\n];', ini)]


def catalogo():
    """Los ids de las piezas y los de los colores, leidos de guion.js."""
    texto = io.open(GUION, encoding='utf-8').read()
    piezas = re.findall(r"\{\s*id:'([^']+)'", bloque(texto, 'CATALOGO'))
    colores = re.findall(r"\{\s*id:'([^']+)'", bloque(texto, 'VIDRIOS'))
    return piezas, colores


def fotos():
    """Que colores tiene fotografiados cada pieza, mirando la carpeta."""
    hay = {}
    if not os.path.isdir(REALES):
        return hay
    for nombre in sorted(os.listdir(REALES)):
        raiz, ext = os.path.splitext(nombre)
        if ext.lower() not in EXTENSIONES or '-' not in raiz:
            continue
        pieza, _, color = raiz.rpartition('-')
        hay.setdefault(pieza, []).append(color)
    return hay


def escribir(indice):
    texto = io.open(GUION, encoding='utf-8').read()
    marca_ini = '/* INICIO FOTOS REALES */'
    marca_fin = '/* FIN FOTOS REALES */'
    ini = texto.index(marca_ini) + len(marca_ini)
    fin = texto.index(marca_fin)
    cuerpo = '\nvar FOTOS_REALES = {\n' + ',\n'.join(
        "  '%s':[%s]" % (pieza, ','.join("'%s'" % c for c in sorted(colores)))
        for pieza, colores in sorted(indice.items())) + '\n};\n'
    io.open(GUION, 'w', encoding='utf-8').write(texto[:ini] + cuerpo + texto[fin:])


def main():
    piezas, colores = catalogo()
    hay = fotos()

    sobra = [p for p in hay if p not in piezas]
    if sobra:
        print('ojo, estas fotos no corresponden a ninguna pieza: ' + ', '.join(sobra))

    malos = sorted({c for lista in hay.values() for c in lista if c not in colores})
    if malos:
        print('ojo, estos colores no estan en VIDRIOS: ' + ', '.join(malos))

    escribir(hay)

    total = sum(len(v) for v in hay.values())
    print('%d piezas con foto de color, %d fotos en total' % (len(hay), total))
    for pieza in piezas:
        faltan = [c for c in colores if c not in hay.get(pieza, [])]
        if len(faltan) < len(colores):
            print('  %-14s le faltan: %s' % (pieza, ', '.join(faltan) or 'ninguno'))


if __name__ == '__main__':
    sys.exit(main())
