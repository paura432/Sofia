# Curación fotográfica v2 (visual)

Revisión editorial de las cinco series fotográficas del portfolio a partir de la
inspección visual de los ficheros publicados en `public/media/projects/`. Sustituye
como referencia de orden y portadas a la curación anterior
(`docs/photo-project-entre-tiendas-y-tambores-curation.md`), que se conserva como
histórico. Solo describe lo visible: no atribuye lugar, fecha, evento, organización,
identidad ni motivación a nadie.

## Material revisado

Hojas de contacto JPEG (6 columnas, 1600 px, ID impreso) generadas con `sharp` en el
scratchpad de la sesión, **fuera de git**
(`…/scratchpad/curation/*.jpg`, script `sheets.mjs`; ampliaciones en `curation/view/`):

| Hoja | Contenido |
| --- | --- |
| `main-musica-en-directo.jpg` | portada + 13 (orden actual) |
| `main-calle-documental.jpg` | portada 02 + 7 |
| `main-estudio-editorial.jpg` | portada + 9 |
| `main-retrato-editorial.jpg` | portada + 13 |
| `main-entre-tiendas-y-tambores.jpg` | portada 001 + 14 |
| `full-etyt.jpg` | las 38 de Entre tiendas y tambores |
| `archive-{musica,retrato,estudio,calle}.jpg` | Archivo completo (22 + 29 + 13 + 10 = 74) |

Abiertas a tamaño grande (800–1100 px): ETYT 001, 002, 003, 005, 006, 010, 012, 013,
017, 018, 019, 021, 027, 030, 031, 032, 033, 036, 037, 038; música 01, img-6317,
img-4929; retrato 08, 13, img-5860, img-5487; estudio 01, 02, 06; calle 02, 05, 07,
img-4748. El resto se valoró solo en hoja de contactos (~260 px), lo que basta para
composición y redundancia pero no para nitidez fina.

Originales: `incoming-media/originals/fotos-{1,2,3}` (23 + 28 + 23 = 74 JPEG del
Archivo, ignorado por git) y el ZIP de ETYT en `.media-source/incoming/` existen, pero
**no se abrieron**: la decisión se tomó sobre los WebP publicados (2800 px en series,
960 px en Archivo). Conviene revisar nitidez en original antes de ampliar a `full`
cualquier imagen añadida desde el Archivo (solo hay 960 px publicados).

Leyenda: COVER_CANDIDATE · MAIN_STORY · FULL_SERIES_ONLY · REDUNDANT · WEAK ·
TECHNICAL_ISSUE · PENDING_CONTEXT.

## Portadas: resumen

| Serie | Actual | Nueva (tile 3:2 / 4:5) | Móvil | Focal (x,y %) | ¿Cambia? |
| --- | --- | --- | --- | --- | --- |
| Música en directo | 01 | **01** | 01 | 50, 45 | No |
| Calle documental | 02 | **07** | 07 | 42, 62 | Sí |
| Estudio editorial | 01 | **01** | **06** (vertical) | 01: 40, 40 · 06: 50, 35 | Solo móvil |
| Retrato editorial | 01 | **13** | 13 | 40, 42 | Sí |
| Entre tiendas y tambores | 001 | **038** | 038 | 40, 45 | Sí |

Distinción entre portadas: música = blanco y negro nocturno, de espaldas al público;
ETYT = color nocturno, percusión amarilla en movimiento; calle = plano diurno
abierto, césped y figuras pequeñas; retrato = primer plano soleado verde/turquesa;
estudio = ciclorama blanco con punto naranja. No hay dos portadas con la misma luz,
escala ni paleta dominante. Riesgo menor: retrato y calle comparten verdes; si se
ven juntas, alternativa de retrato = 08 (camiseta roja, focal 48, 38).

Recortes comprobados sobre la imagen ampliada: en 4:5 desde 3:2 queda ~53–56 % del
ancho; los focales dados mantienen caras completas (038: portadora de tambor y
grupo central; la estatua puede quedar al borde. Calle 07: figura de brazos abiertos
y niña. Retrato 13: rostro y pelo. Estudio 01 en 4:5 corta el espejo naranja, por
eso en móvil se usa 06).

## Entre tiendas y tambores

### La portada actual (001)

001 es una buena fotografía de contexto (tiendas, personas sentadas, torre con reloj),
pero la pancarta «P.P. MALTRATA LA INFANCIA» ocupa el tercio central y es lo primero
que se lee, también en miniatura. Como portada del portfolio:

- **Representatividad:** solo cuenta la parte diurna del campamento; la serie
  avanza hacia la noche, la música y la percusión, que no aparecen.
- **Lectura:** una portada aislada, sin pie, en la home de una periodista de TV
  se lee como mensaje propio. Un eslogan dirigido a un partido concreto convierte
  la portada en una afirmación política atribuible a la autora, no en una
  observación. Dentro del ensayo, con contexto y junto a otras imágenes, la
  pancarta funciona como documento; como portada, no.
- Otras candidatas diurnas tienen el mismo problema en distinto grado: 002 (banderas
  en primer término), 010 (pancarta «Frente a su especulación okupación»), 008/011/020
  (la misma pancarta de 001).

Candidatas comparadas: 038 (corro de percusión de noche, caras visibles, estatua
ecuestre y edificios iluminados; energía y color) · 037 (brazos y baquetas en alto,
más cielo negro, figura de espaldas en primer plano) · 031 (percusionista de
espaldas tapa el lado izquierdo) · 036 (fachada roja; brazo movido arriba) · 027
(brazos alzados, limpio pero sin lugar ni música) · 033 (manos en primer término,
pancartas legibles al fondo) · 032/034 (plaza nocturna, rótulo comercial luminoso
dominante) · 004/005 (plaza con tiendas al atardecer).

**Nueva portada: 038.** Resume el título (los «tambores»), tiene caras nítidas y
alegres, funciona en 3:2 y en 4:5, y ningún texto domina (las camisetas llevan un
logotipo pequeño y un parche de tambor tiene una bandera; no se leen en miniatura).

### Clasificación del ensayo actual

| ID | Clase | Motivo |
| --- | --- | --- |
| 001 | FULL_SERIES_ONLY | Buen contexto, pero el eslogan partidista domina; fuera de portada y del ensayo |
| 004 | MAIN_STORY | Plano general al atardecer; establece plaza y tiendas |
| 007 | WEAK | Cartel bajo lona azul, composición plana; poco aporta |
| 009 | MAIN_STORY | Detalle: tienda roja y cartel manuscrito junto a una persona |
| 011 | REDUNDANT | Repite 004 con la pancarta de 001 al fondo |
| 017 | MAIN_STORY | Retrato nocturno junto a una tienda; pausa humana |
| 012 | MAIN_STORY | Grupo sentado en la acera, B/N; escucha |
| 016 | REDUNDANT | Multitud nocturna de espaldas, lectura confusa |
| 018 | MAIN_STORY | Abrazo dentro de un corro, B/N; momento íntimo |
| 023 | REDUNDANT | Multitud bajo rótulo luminoso; 032/033 lo cuentan mejor |
| 025 | FULL_SERIES_ONLY | Cartel sostenido en primer plano domina la imagen |
| 027 | COVER_CANDIDATE | Brazos alzados, caras claras; pico emocional |
| 030 | MAIN_STORY | Detalle de metales entre músicos |
| 031 | COVER_CANDIDATE | Percusión ante el público y estatua; figura de espaldas a la izquierda |
| 038 | COVER_CANDIDATE | → nueva portada |

Resto de la serie (no en ensayo): 002 FULL (banderas dominan) · 003 MAIN (vertical:
tiendas y edificio, sin personas en primer plano) · 005 MAIN (equipo de televisión
grabando entre las tiendas: muy pertinente en el portfolio de una reportera) · 006
MAIN (bodegón vertical: taburetes de colores bajo la carpa) · 008 REDUNDANT (misma
pancarta de 001) · 010 FULL (pancarta domina) · 013 MAIN (baile en la calle de noche)
· 014 FULL (cartel) · 015 FULL · 019 FULL (salto; alternativa a 013) · 020 REDUNDANT
(pancarta de 001) · 021 MAIN (gesto de extender una lona) · 022 WEAK (oscura, morado
saturado) · 024 WEAK · 026 FULL · 028 FULL · 029 FULL · 032 FULL (alternativa a 033)
· 033 MAIN · 034/035 REDUNDANT entre sí (verticales casi iguales) · 036 FULL
(alternativa de cierre) · 037 MAIN (cierre).

### Nuevo orden (16)

| # | ID | Papel | Layout |
| ---: | --- | --- | --- |
| 1 | 038 | Apertura (portada) | full |
| 2 | 004 | Contexto: plaza al atardecer | wide |
| 3 | 005 | Contexto: equipo de TV entre tiendas | wide |
| 4 | 003 | Lugar (vertical) | pair |
| 5 | 006 | Detalle (vertical) | pair |
| 6 | 021 | Personas: gesto con la lona | wide |
| 7 | 017 | Personas: retrato nocturno | pair |
| 8 | 009 | Detalle: tienda roja | pair |
| 9 | 013 | Desarrollo: baile en la calle | wide |
| 10 | 018 | Desarrollo: abrazo en el corro (B/N) | pair |
| 11 | 012 | Desarrollo: grupo sentado (B/N) | pair |
| 12 | 033 | Momento fuerte: manos alzadas | wide |
| 13 | 027 | Momento fuerte: brazos y caras | pair |
| 14 | 030 | Detalle: metales | pair |
| 15 | 031 | Percusión ante el público | wide |
| 16 | 037 | Cierre: baquetas en alto | full |

- **Salen:** 001, 007, 011, 016, 023, 025.
- **Entran:** 003, 005, 006, 013, 021, 033, 037.
- La secuencia abre con la percusión, retrocede al día (tiendas) y avanza hacia la
  noche hasta volver a los tambores: estructura circular. Las pancartas siguen
  presentes como contexto (004, 005, 009, 033), sin protagonismo.
- Alt texts a revisar en `messages/es.json`: 005 no menciona el equipo de grabación;
  037 dice «vistos desde un lateral» y es un plano frontal con brazos alzados.

## Música en directo

| ID (original) | Clase | Motivo |
| --- | --- | --- |
| 01 (6313) | COVER_CANDIDATE | B/N, brazos abiertos frente al público; icónica. Se mantiene |
| 02 (6385) | MAIN_STORY | Silueta en humo dorado, vertical |
| 03 (4768) | MAIN_STORY | Silueta con proyección y manos del público |
| 04 (4937) | MAIN_STORY | Contrapicado diurno, gesto intenso |
| 05 (4959) | MAIN_STORY | Gesto contra el cielo |
| 06 (4965) | MAIN_STORY | B/N entre el público (mismo artista que 05) |
| 07 (4974) | REDUNDANT | Versión color del momento de 06 |
| 08 (6294) | MAIN_STORY | Arrodillado, gesto emocional; singular |
| 09 (6299) | MAIN_STORY | Dúo en escenario |
| 10 (4989) | MAIN_STORY | Chándal blanco, luz morada |
| 11 (6377) | FULL_SERIES_ONLY | Pose de brazo alzado repetida en la serie |
| 12 (4662) | REDUNDANT | Misma escena azul que 13, menos fuerza |
| 13 (4776) | MAIN_STORY | Haces de luz y manos |
| 14 (5179) | MAIN_STORY | Público con móviles; cierre |

Archivo: img-4929 entra (contrapicado contra cielo azul, vertical); img-6317 FULL
(mismo momento que 01, algo blando); 4596 FULL (verde, buena variación de color);
5038/5004 REDUNDANT entre sí; 4954, 6154, 5174 FULL.

Orden: 01 · 03 · 02+08 · 04 · 06+img-4929 · 05 · 09+10 · 13 · 14. Salen 07, 11, 12.

## Calle documental

| ID (original) | Clase | Motivo |
| --- | --- | --- |
| 02 (3363) | MAIN_STORY | Portada actual: brazos alzados de espaldas, pancarta legible; de noche, solapa con ETYT y se lee como manifestación. PENDING_CONTEXT del acto |
| 01 (3352) | MAIN_STORY | Edificio iluminado en morado y multitud |
| 03 (3371) | REDUNDANT | Mismo encuadre que 01 con carteles |
| 04 (4741) | MAIN_STORY | Hombre caminando bajo árboles; arbusto desenfocado delante |
| 05 (4756) | COVER_CANDIDATE | Mototaxi turístico junto a un taxi; humor urbano |
| 06 (4458) | MAIN_STORY | Fachada vertical en B/N; respiro gráfico |
| 07 (4705) | COVER_CANDIDATE | → nueva portada: césped, figura con brazos abiertos, niña corriendo, escalinata |
| 08 (4725) | MAIN_STORY | Sombra/forma de estrella en una verja |

Archivo: img-4748 entra (músico con guitarra y ciclista, vertical); img-4744 FULL.

Orden: 07 · 05 · 04+img-4748 · 08 · 06 · 02 · 01. Sale 03.

## Estudio editorial

| ID (original) | Clase | Motivo |
| --- | --- | --- |
| 01 (6CF759E9) | COVER_CANDIDATE | Mirada a cámara, ganchillo y espejo naranja. Se mantiene en 3:2 |
| 02 (1345) | REDUNDANT | Variante de 01 mirando al espejo |
| 03 (1046) | MAIN_STORY | Guitarra verde agua |
| 04 (1233) | MAIN_STORY | Figura pequeña sentada, mucho blanco |
| 05 (1247) | MAIN_STORY | Recostado en silla; pareja natural de 04 |
| 06 (1276) | COVER_CANDIDATE | Ojo de pez, gafas verdes; portada móvil |
| 07 (1251) | MAIN_STORY | Dúo, vertical |
| 08 (1321) | MAIN_STORY | Maleta y taburete, vertical |
| 09 (1378) | MAIN_STORY | Sentado con TV antigua |
| 10 (1386) | MAIN_STORY | Tumbado entre televisores |

Archivo: dsc-1293 REDUNDANT con 06; dsc-1255 FULL; 80c82615 PENDING_CONTEXT (exterior,
no pertenece a la sesión de estudio).

Orden: 01 · 03 · 07+08 · 04+05 · 06 · 09+10. Sale 02.

## Retrato editorial

| ID (original) | Clase | Motivo |
| --- | --- | --- |
| 01 (6676) | MAIN_STORY | Dúo con franjas de luz; deja de ser portada |
| 02 (6636) | REDUNDANT | Dúo ante grafiti, quinta toma de la misma sesión |
| 03 (6643) | REDUNDANT | Ídem |
| 04 (6667) | MAIN_STORY | Plano amplio en ruina, figuras pequeñas |
| 05 (6668) | REDUNDANT | Ídem |
| 06 (5541) | FULL_SERIES_ONLY | Sujeto pequeño en terraza; 13 y 07 lo cuentan mejor |
| 07 (5551) | MAIN_STORY | Silla y neón, vertical |
| 08 (5800) | COVER_CANDIDATE | Manos en la cabeza, camiseta roja |
| 09 (5805) | MAIN_STORY | Banco y mural |
| 10 (5319) | REDUNDANT | Casi igual que 11 |
| 11 (5323) | MAIN_STORY | Cuarto rojo con neón |
| 12 (5436) | MAIN_STORY | En cuclillas, fachada amarilla |
| 13 (5490) | COVER_CANDIDATE | → nueva portada: inclinación, gafas, luz de sol |
| 14 (2403) | MAIN_STORY | Cuerpo entero ante grafiti, vertical |

Archivo: img-5860 entra (primer plano vertical); img-5487 entra (vertical, bolso
verde, muy fuerte); img-2364 FULL; img-5454 FULL (pegatina con eslogan visible);
5808, 5851, 5795, 5450, 5400, 5328, 5597, 5425, 5476, 5522, 6648 FULL.

Orden: 13 · 08 · 01+04 · img-5860+14 · 09 · 11 · 12 · img-5487+07. Salen 02, 03, 05,
06, 10.

## Notas de implementación

- Las imágenes «img-…» del Archivo solo existen a 960 px; para usarlas en el ensayo
  hay que procesarlas desde `incoming-media/originals` y revisar nitidez.
- `pair` siempre con dos imágenes consecutivas de la misma orientación (comprobado
  en cada orden propuesto).
- Ninguna decisión cambia derechos, créditos ni `rights.verified`.
