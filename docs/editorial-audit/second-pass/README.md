# Segunda auditoría editorial — octubre 2026

Sobre `origin/main` en `ddc72d0` (incluye la PR #2). El informe se escribió sin tocar código; las fases 1–3 se implementaron después en la rama `content/photo-alt-pass` (ver §13).

- [`photo-matrix.md`](./photo-matrix.md): una fila por fotografía única (121 imágenes), con lo que se ve, los ALT en ES/EN/RU, problemas, propuesta y pendientes.
- Este README: cobertura, evaluación por sección, rankings, traducciones, incidencias, porcentajes y preguntas.

> **Corrección de la auditoría anterior.** En la primera pasada di los ALT por buenos sin abrir las imágenes, y comparé ES/EN/RU sin incluirlos. Por eso se escaparon dos fallos graves: **nueve ALT que no corresponden a su foto**, y **los 46 ALT de las series en ruso escritos en inglés**. Esta vez se han abierto todas las imágenes.

---

## 1. Cobertura comprobada

| Elemento | Total | Cómo se comprobó |
|---|---|---|
| Páginas públicas | **45** (15 × 3 idiomas) | Navegador sobre `pnpm start`, con scroll completo, extrayendo `innerText`, todos los `alt` y todos los `aria-label`. Coincide con las 45 URL de `sitemap.xml`. |
| Páginas no públicas | 3 tipos | 404 (×3 idiomas, revisada), `reporter-reel` (no publicada, devuelve 404), fichas de reels (sin página de detalle, por diseño), `/dev/media` (404 en producción). |
| Claves de mensajes | 325 por idioma | Las tres leídas completas (las de `Projects.items.*.media.*.alt` incluidas). |
| Fotografías únicas | **113** | 74 del archivo + 38 de *Entre tiendas y tambores* + retrato de Perfil. Revisadas una a una en hojas de contacto de 560 px; las dudosas, a tamaño completo. |
| Apariciones de fotos | 46 duplicadas | Las 46 fotos de los ensayos de Música, Calle, Estudio y Retrato son **las mismas** que las del archivo (firma perceptiva, distancia ≤ 0,4). Se cuentan una vez. El archivo no tiene duplicados internos. |
| Pósteres de vídeo | 8 | El fotograma exacto que usa la web (Mux, `posterTime`). |
| Fotos de *Entre tiendas* | 38 archivos | 37 publicados (16 en el ensayo y 37 en «Serie completa»). La 029 está descartada en código, pero el archivo sigue en `/public`. |

**Lo que no se ha podido verificar:**
- El **contenido completo de los vídeos** (se revisó el póster y lo que dicen los textos, no los minutos de metraje). Las descripciones de los reels se apoyan en `docs/reels-ingest-manifest.md`.
- **Lugares, fechas, identidades, encargos y derechos**: no hay fuente en el repositorio.
- Los **originales** (`IMG_*.jpeg`): se revisaron las versiones publicadas (webp de 640–2800 px).
- La **calidad del ruso** a nivel nativo (se señalan calcos evidentes; conviene una revisión humana).

## 2. Lo que recibe realmente el lector

Medido en el HTML publicado, por idioma:

| Página | Imágenes | ALT de plantilla | ALT en inglés en /ru |
|---|---|---|---|
| Archivo | 74 | **74** («Música en directo, imagen 3») | — |
| Ficha Música | 33 | **22** («Serie completa 12») | 11 |
| Ficha Calle | 17 | **10** | 7 |
| Ficha Estudio | 22 | **13** | 5 |
| Ficha Retrato | 38 | **29** | 9 |
| Ficha *Entre tiendas* | 53 | 0 | 0 |
| Inicio / Trabajo | 14 / 14 | 0 | 4 / 4 |

Son **148 renders con ALT de plantilla por idioma**. De ellos, 46 corresponden a fotos que **ya tienen** un ALT descriptivo bajo otro ID (`musica-en-directo-03` = `musica-img-4768`), y 10 de esos ALT descriptivos no se usan en ningún sitio.

## 3. Evaluación por sección

### Inicio
Funciona en lo esencial: nombre, oficio, una frase con hechos (Grupo Cadena Media, 2024) y una pieza en pantalla. Problemas:
- **El motivo «ante/detrás de la cámara» se repite tanto que se vuelve fórmula**: hero («Detrás de la cámara, dirijo…»), etiqueta de reels («Piezas ante la cámara»), secciones («Ante la cámara», «Detrás de la cámara»), Perfil («Ante la cámara / Detrás de la cámara / Con la cámara de fotos») y Trabajo («Primero, ante la cámara»). Es la señal más reconocible de texto generado: un hallazgo bueno, usado en cinco sitios.
- **Enumeraciones en cadena**: «estrenos, eventos y ruedas de prensa… artistas y figuras públicas… conciertos, calle y retrato». Tres listas en dos frases.
- **Fotografía**: «Conciertos, calle y retrato» no nombra la serie más fuerte y la única periodística, *Entre tiendas y tambores*, que además es la primera tarjeta.

### Sobre mí
Es honesto (no inventa nada), pero se lee como un CV redactado. **La misma lista aparece tres veces en la página**: lede y cuerpo («cubro estrenos, eventos…», «dirijo y monto…»), y otra vez en «Lo que hago» («Reporterismo de eventos, entrevistas y guion…»). Casi todo lo personal está pendiente de que Sofía lo cuente. La única frase con voz propia es «Hablo español y ruso como lenguas nativas».

### Experiencia
Es un género de CV y se acepta cierta sequedad, pero:
- **Grupo Cadena Media** no tiene línea de contexto (las demás sí). El lector no sabe qué es ni para qué canal o programa trabaja: el dato periodístico más importante de la página.
- En Grupo Cadena Media hay bullets redundantes: «Cobertura de eventos y ruedas de prensa» y «Reporterismo en eventos y estrenos».
- Hay frases de plantilla corporativa: «Desarrollo de identidad digital y posicionamiento», «Comunicación con público y colaboradores», «Apoyo en estrategia de contenidos y calendario editorial».

### Audiovisual
Es lo mejor escrito de la web: los créditos son exactos y el texto de sección dice quién hizo qué. Las descripciones de los cortos son mínimas, pero no inventan nada. «Cortometraje dramático ambientado en un interior doméstico» se lee como un campo rellenado por obligación. VERSIÓN BETA sigue sin rol.

### Fotografía (sección, títulos y fichas)
- **Los títulos de serie son etiquetas de género intercambiables**: «Música en directo», «Calle y documental», «Retrato y editorial», «Estudio y editorial». «Editorial» aparece dos veces y no describe ninguna de las dos. Solo *Entre tiendas y tambores* es un título.
- **Las fichas fotográficas no tienen ninguna línea de texto visible**. La descripción solo va al SEO. Los datos repiten la palabra tres veces: antetítulo «Fotografía», «Rol: Fotografía», «Formato: Fotografía · Retrato · Editorial».
- **Desfase entre imágenes y texto**: las fotos tienen personalidad (rap en festival, una acampada con pancartas, sesiones con atrezo de televisores antiguos y espejos naranjas) y los textos son neutros y abstractos.
- **Clasificación**: «Calle y documental» mezcla una manifestación nocturna (edificio en violeta) con escenas diurnas de turistas y parques. Son dos conjuntos sin relación. En «Estudio» hay una foto de exterior (`estudio-80c82615…`).

### Descripciones de series (solo SEO)
«Fotografía documental y de calle.», «Retrato de estudio y fotografía editorial.»: repiten el título con otras palabras. La de *Entre tiendas y tambores* es concreta, pero **neutraliza la noticia**: describe «una plaza con tiendas de campaña y carteles» cuando los carteles dicen «Universitarios por la vivienda pública», «Ser rentista no es un trabajo» o «Fondos buitre fuera de nuestras ciudades». Es una acampada por la vivienda, y el texto lo esconde.

### ALT
Tres calidades muy distintas:
- ***Entre tiendas y tambores***: los mejores del sitio. Concretos, neutrales y variados. Fallan tres (008, 018, 020) y casi nunca transcriben el texto de los carteles, que en este ensayo es el contenido.
- **Las 46 fotos con ALT propio de las cuatro series**: 6 no corresponden a su imagen, 6 son inexactas, 15 genéricas («Retrato de estudio de tres cuartos», «…segundo encuadre»), 1 mejorable y 18 buenas.
- **Archivo y «Serie completa»**: 100 % plantilla.

**Hipótesis sobre el origen de los errores** (con evidencia, sin confirmar): los ALT de Calle y Música se escribieron para una selección anterior y no se reasignaron tras la curaduría v2. El mapa `REUSE` de `scripts/media/curate-photos.mjs` asocia los números antiguos con otros originales. Por ejemplo, el ALT de `calle-documental-08` describe `retrato-img-2364`, que no pertenece a Calle.

## 4. Matriz de fotografías

Ver [`photo-matrix.md`](./photo-matrix.md). Resumen:

| Estado del ALT | Fotos |
|---|---|
| Correcto | 41 (22 de *Entre tiendas*, 18 de las series y el retrato de Perfil) |
| Correcto pero mejorable (omite el texto de un cartel, a una persona o el contexto) | 13 (12 de *Entre tiendas* y música-04) |
| Genérico o de relleno | 15 |
| **No corresponde a la imagen** | **9** (calle-02, -07, -08 · música-06, -08, -14 · plaza 008, 018, 020) |
| Inexacto en un detalle relevante | 7 (estudio-01, -03 ES, -05 · música-05, -09, -12 · plaza 028) |
| Solo plantilla (sin ALT propio) | 28 |
| **Total** | **113** fotos únicas |
| Pósteres de vídeo (8) | 7 correctos, 1 con una leve inexactitud (Silver Praxis) |

**¿Necesitan caption?**
- ***Entre tiendas y tambores***: no hace falta un pie por foto, pero sí **una entradilla de serie** con lugar, fecha y qué era, en cuanto Sofía lo confirme. Sin ella, un ensayo periodístico queda sin el dónde ni el cuándo.
- **Calle** (manifestación nocturna): igual, una línea de serie.
- **Música**: caption opcional con el nombre del artista y el concierto, solo si Sofía lo tiene. Si no, nada.
- **Retrato, Estudio y archivo**: no necesitan caption. El ALT basta.

## 5. Los 20 textos que más necesitan mejorar

| # | Ubicación | Texto actual | Problema |
|---|---|---|---|
| 1 | ALT `musica-en-directo-06` | Músico en escenario con guitarra bajo luz de escenario | No hay guitarra ni escenario: canta entre el público, en B/N. |
| 2 | ALT `musica-en-directo-08` | Artista y público en un concierto, en blanco y negro | Es color y no hay público: artista arrodillado tapándose la cara. |
| 3 | ALT `musica-en-directo-14` | Artista con micrófono ante el público… en blanco y negro | Es color y no se ve al artista: público con móviles y alguien en volandas. |
| 4 | ALT `calle-documental-07` | Patio con macetas alineadas… a través de una verja | Describe la foto 08. Es un parque con gente en el césped. |
| 5 | ALT `calle-documental-08` | Persona de espaldas… grafiti rosa | Describe una foto de otra serie (`retrato-img-2364`). |
| 6 | ALT `calle-documental-02` | Calle nocturna con gente… frente a un edificio iluminado | El motivo es una persona de espaldas con los brazos en alto. |
| 7 | ALT plaza 008 | Dos personas junto a una silla de ruedas… | No hay silla de ruedas; son tres jóvenes y sillas de camping. |
| 8 | ALT plaza 018 | Grupo reunido alrededor de músicos | No hay músicos: un corro mira a dos personas abrazadas. |
| 9 | ALT plaza 020 | Personas conversan bajo una gran pancarta | Están colgando la pancarta. |
| 10 | 46 ALT en `ru.json` | (en inglés) | El lector de pantalla ruso lee inglés. |
| 11 | ALT de archivo y «Serie completa» | «Música en directo, imagen 3» / «Serie completa 12» | 148 renders por idioma sin descripción. |
| 12 | `entre-tiendas-y-tambores.description` | Una plaza con tiendas de campaña, carteles hechos a mano… | Neutraliza la noticia (acampada por la vivienda). |
| 13 | Serie «Calle y documental» (título y descripción) | Fotografía documental y de calle. | Repite el título y mezcla dos conjuntos sin relación. |
| 14 | Títulos «Retrato y editorial» / «Estudio y editorial» | — | Intercambiables; «editorial» no describe nada. |
| 15 | ALT `estudio-editorial-05`, `-07`, `-08`, `-09`, `-10` | «encuadre cercano», «tres cuartos», «segundo encuadre»… | Uno es falso (05 es un plano general) y el resto, relleno. |
| 16 | ALT ES `estudio-editorial-03` | …en un escenario con fondo claro | Es un fondo de estudio; el EN acierta y el ES no. |
| 17 | Perfil: `bioMore` + `practices` | (tres listas casi iguales) | Repetición dentro de la misma página; no hay voz. |
| 18 | Experiencia: Grupo Cadena Media | (sin contexto; dos bullets solapados) | Falta qué es y para quién trabaja. |
| 19 | `Hero.summary` + `Work.pageText` + `Profile.practices[*].title` | «Ante/Detrás de la cámara»… | El mismo motivo en cinco sitios. |
| 20 | RU Silver Praxis | «группы Silver Praxis» · «Креативная режиссура» | Afirma que es un grupo; calco de *creative direction*. |

## 6. Los 20 que funcionan y deben conservarse

| # | Ubicación | Texto | Por qué |
|---|---|---|---|
| 1 | `Hero.role` | Reportera de televisión | Claro, sin adorno. |
| 2 | `Home.pathTitle` | Dónde he trabajado | Natural, en primera persona, sin pose. |
| 3 | `Work.reportingText` | Entrevista, paseo a cámara, guía y prueba de producto, en vertical. Mejor con sonido. | Dice exactamente lo que hay y da una instrucción útil. |
| 4 | Reel 001 | Madrid a pie, cámara al cuello | Titular de periodista: visual y verdadero. |
| 5 | Reel 002 | En el decorado de «9‑1‑1» | Concreto, despierta curiosidad. |
| 6 | Reel 004 | Probando el vivo X300 Pro | Directo. |
| 7 | Reel 001 (descripción) | Paseo hablado a cámara por el centro de Madrid, de Gran Vía en adelante. | Ritmo natural, dato verificable. |
| 8 | `Work.audiovisualText` | Dirigí los dos cortometrajes y monté «Tras el sofá»… | Crédito exacto en voz propia. |
| 9 | Créditos de 4 MINUTOS | …Equipo: Nikon D3300 · iPhone 13 | Un detalle honesto que ningún generador inventaría. |
| 10 | Créditos de Silver Praxis | Dirección creativa, estilismo y lettering — Briza Sanchez | Reparto real de funciones. |
| 11 | ALT `musica-en-directo-01` | Artista de espaldas con los brazos levantados ante el público… | Preciso y visual. |
| 12 | ALT `retrato-editorial-12` | Hombre acuclillado sobre una escultura de adoquines… | Concreto. |
| 13 | ALT `estudio-editorial-06` | Retrato en picado… traje de rayas y gafas de cristal verde | Describe la decisión fotográfica (el picado). |
| 14 | ALT `retrato-editorial-13` | …camisa verde a cuadros | Verificado a tamaño completo: exacto. |
| 15 | ALT plaza 005 | Personas con una cámara de vídeo graban entre las tiendas… | Muestra a la prensa dentro de la noticia. |
| 16 | ALT plaza 019 | Una persona salta en el centro de un grupo que observa. | Breve y vivo. |
| 17 | ALT póster *Tras el sofá* | Dos personas en un sofá verde azulado junto a un ramo de rosas rojas | Exacto, sin interpretar. |
| 18 | `Profile.bioMore` (última frase) | Hablo español y ruso como lenguas nativas. | El único dato personal y relevante. |
| 19 | `Contact.contactPageText` | Si tienes una propuesta de trabajo… escríbeme. | Natural, sin tono de landing. |
| 20 | Título | Entre tiendas y tambores | Un título real, no una categoría. |

## 7. Propuestas antes/después

Las de ALT foto a foto están en la matriz. Aquí, las de texto editorial. Las marcadas con ⚑ necesitan confirmación de Sofía y **no deben publicarse sin ella**.

| Ubicación | Antes | Propuesta | Motivo |
|---|---|---|---|
| `Hero.summary` | …Detrás de la cámara, dirijo cortometrajes y hago fotografía de conciertos, calle y retrato. | …También dirijo cortometrajes y hago fotografía de conciertos, calle y retrato. | Libera «Detrás de la cámara» para el título de sección. |
| `Work.pageText` | Primero, ante la cámara. Después, lo que ruedo y lo que fotografío. | Reportajes, cine y fotografía, en ese orden. | Quita la quinta aparición del motivo; mantiene la información del orden. |
| `Profile.practices[*].text` | Repite el bio. | Mantener solo los títulos y enlaces, o sustituir el texto por la pieza más representativa de cada área. ⚑ | Evita la tercera lista en la misma página. |
| Experiencia, Grupo Cadena Media `context` | (no existe) | «[Medio], [programa/canal].» ⚑ | El dato que falta. |
| Experiencia, Grupo Cadena Media | 4 bullets | Fusionar «Cobertura de eventos y ruedas de prensa» y «Reporterismo en eventos y estrenos» en «Cobertura de estrenos, eventos y ruedas de prensa». | Redundancia. |
| `entre-tiendas…description` | Una plaza con tiendas de campaña, carteles hechos a mano, grupos reunidos y músicos con percusión. | Acampada por la vivienda en la Puerta del Sol de Madrid, [fecha]: carteles, asambleas, música y batucada. ⚑ | Pasa de describir objetos a contar qué pasó. |
| Ficha de *Entre tiendas*: entradilla visible | (no hay) | La misma línea, como `dek`. ⚑ | Un ensayo periodístico necesita el dónde y el cuándo. |
| `calle-documental` | Calle y documental / Fotografía documental y de calle. | Opción A: dividir en «[Manifestación], [fecha]» y «Madrid, a pie». Opción B: mantener una serie y describirla: «Una manifestación nocturna ante un edificio iluminado en violeta y escenas de calle de día en Madrid.» ⚑ | Dos conjuntos distintos bajo una etiqueta genérica. |
| `musica-en-directo.description` | Cobertura fotográfica de actuaciones musicales en directo. | Conciertos de [artistas] y del festival Madrid Salvaje, desde el escenario y desde el público. ⚑ | El rótulo «Madrid Salvaje» se lee en cuatro fotos (4929, 4937, 5038, 6299); falta confirmar todo lo demás. |
| `estudio-editorial` | Estudio y editorial / Retrato de estudio y fotografía editorial. | Título ⚑ (p. ej., el de la sesión). Descripción: «Sesiones sobre fondo blanco con atrezo: televisores antiguos, un espejo naranja, una maleta y una guitarra.» | La descripción solo usa lo visible y es segura. El título necesita a Sofía. |
| `retrato-editorial.description` | Fotografía de retrato en localización urbana. | Retratos en una nave abandonada, una azotea, una lavandería con neón y calles con grafiti. | Visible y concreto. |
| Datos de la ficha fotográfica | Rol: Fotografía · Formato: Fotografía · Retrato · Editorial | Formato: Retrato · Editorial | «Fotografía» ya está en el antetítulo y en el rol. |
| `silver-praxis…description` (RU) | Клип на песню «Condición Perfecta» группы Silver Praxis. | Клип на песню Silver Praxis «Condición Perfecta». | No afirma que sea un grupo. |
| Póster de Silver Praxis (ALT) | El artista junto a la puerta de un coche… | El artista, sentado en un coche con la puerta abierta, de noche, bajo luz roja y azul. | Exactitud. |

## 8. Fallos de traducción ES/EN/RU

| Idioma | Ubicación | Fallo | Gravedad |
|---|---|---|---|
| RU | 46 ALT de las cuatro series | En inglés, copiados del EN. | **P0** (accesibilidad y localización) |
| RU | `Work.archiveRetratoFull` / `archiveEstudioFull` y títulos de series | «Портрет и editorial»: latín dentro de un título ruso. | P1, revisión nativa |
| RU | Silver Praxis | «группы» (afirma que es un grupo); «Креативная режиссура» (calco). | P1 |
| RU | `Hero.summary` | «фотографирую… улицу» (calco de «fotografío calle»). | P2 → «уличную съёмку» |
| RU | `Hero.reelListLabel` | «Работы в кадре» suena forzado. | P2 → «Сюжеты в кадре» |
| ES ↔ EN | ALT `estudio-editorial-03` | ES «en un escenario» y EN «studio backdrop»: hechos distintos. | P1 |
| EN | Títulos | «Live Music» y «Portrait & Editorial» (Title Case) frente a «Portrait & editorial» en el archivo. | P2 |
| EN | `Contact.contactPageText` | «If you have a job» es ambiguo (*tener* un trabajo). | P2 → «If you have work for me…» |
| ES/EN/RU | `reporter-reel.dek`/`roles` (no publicado) | Conserva «festivales / festivals / фестивалей». | P2: corregir antes de publicar el reel |
| ES | ALT calle 01 y 03 | «lila» y «violeta» para el mismo edificio. | P2 |

## 9. Incidencias objetivas de exactitud, atribución, créditos y derechos

1. **Nueve ALT que no corresponden a su imagen** y siete inexactos (§4).
2. **Clasificación**: `estudio-80c82615…` es un exterior y está en «Estudio». «Calle y documental» mezcla dos conjuntos.
3. **ALT sin uso**: 10 ALT de proyecto (calle-03, estudio-02, música-07, 11 y 12, retrato-02, 03, 05, 06 y 10) existen pero no se muestran. Su foto solo aparece en «Serie completa», con la etiqueta genérica.
4. **Foto 029** de *Entre tiendas*: descartada en código, pero accesible por URL directa en `/public`.
5. **Silver Praxis**: el ruso afirma que es un grupo (ES/EN son neutros).
6. **Grupo Cadena Media**: no se dice qué es ni dónde se emite.
7. **Reel 004 (vivo)**: posible contenido patrocinado sin indicarlo (ya preguntado).
8. **Reel 002**: el micrófono lleva un logo. No se sabe de qué medio ni de qué cliente.
9. **VERSIÓN BETA**: sin rol de Sofía.
10. **Retrato de Perfil**: sin crédito del fotógrafo.
11. **Derechos de imagen**:
    - Personas identificables como protagonistas: `calle-img-4741`, portada de la serie; el músico callejero `calle-img-4748`; manifestantes en primer plano en *Entre tiendas*.
    - Contenido con carga política en el archivo: la pegatina de `retrato-img-5454`. La pancarta del PP aparece en cuatro fotos de *Entre tiendas*; dos están en «Serie completa».
    - Todo esto está pendiente en `projects.ts` (`rights.verified: false`).
12. **Festival**: cuatro fotos (4929, 4937, 5038, 6299) muestran el rótulo «Madrid Salvaje». Es la única evidencia de festivales en el material, y es fotográfica, no de televisión. No sirve para recuperar «festivales» en el hero.
13. **Años**: ninguna serie fotográfica tiene año («Pendiente» oculto).

## 10. Estimación editorial de «parecido a IA»

**Qué mide.** Cuánto se parece el texto a un texto genérico y formulario. **No detecta autoría** y no es una probabilidad.

**Rúbrica.** Cinco criterios, de 0 a 20 cada uno. La suma va de 0 (natural y específico) a 100 (genérico y formulario).

| Criterio | 0 | 20 |
|---|---|---|
| A. Especificidad | Nombres, cifras, hechos comprobables | Abstracciones intercambiables |
| B. Fórmula y simetría | Ritmo variado | Mismas estructuras o motivos repetidos |
| C. Relleno | Cada frase informa | Frases que existen para llenar un campo |
| D. Ajuste texto ↔ contenido | El texto corresponde a la pieza | Desfase o descripción errónea |
| E. Naturalidad lingüística | Idiomático | Calcos, mezcla de idiomas, plantilla |

Los textos técnicos breves y correctos (botones, créditos, ARIA) **no puntúan alto por ser breves**. Las cifras son **rangos**: dos lectores atentos podrían discrepar unos 10 puntos.

| Categoría | Rango | Ejemplos que lo justifican |
|---|---|---|
| Inicio | **25–35** | (+) «Dónde he trabajado», Grupo Cadena Media 2024, titulares de reels. (−) Motivo de la cámara repetido; tres listas en el resumen. |
| Sobre mí | **40–50** | Honesto, pero la misma lista tres veces y sin voz propia (pendiente de Sofía). |
| Experiencia | **45–55** | Género de CV. «Desarrollo de identidad digital y posicionamiento», «Comunicación con público y colaboradores». |
| Audiovisual | **15–25** | Créditos exactos y texto con quién hizo qué. Resta: «Cortometraje dramático ambientado en un interior doméstico». |
| Fotografía (sección, títulos, fichas) | **50–60** | Títulos de categoría, «editorial» ×2, «Fotografía» ×3 en cada ficha, cero contexto. |
| Descripciones de series | **60–70** | «Fotografía documental y de calle.», «Retrato de estudio y fotografía editorial.» *Entre tiendas* es concreta, pero neutralizada. |
| ALT | **55–65** | 74 de plantilla en el archivo (≈90), ensayos con «…segundo encuadre» (≈70), errores de correspondencia (D = 20), y *Entre tiendas* (≈20–25). |
| Español | **35–45** | La media de lo anterior, con mucho peso de la fotografía. |
| Inglés | **35–45** | Idiomático en general; hereda los mismos huecos. Leve mezcla de Title Case. |
| Ruso | **55–65** | 46 ALT en inglés (E = 20 en esa parte), latín en títulos, calcos. |
| **Global** | **40–50** | Las partes que escribe una persona con información (reels, créditos) suenan humanas. Las que se rellenaron sin información (series, ALT, Experiencia) suenan a plantilla. |

**Limitaciones.** Es una valoración editorial, no un detector. Mezcla la sensación de fórmula con errores de correspondencia, que no son «estilo IA» sino señales de automatización. El peso del archivo (74 plantillas) sube los ALT; si solo se miraran los ensayos, bajarían a unos 45.

## 11. Preguntas imprescindibles para Sofía

1. ***Entre tiendas y tambores***: ¿es la acampada por la vivienda en la Puerta del Sol? ¿Qué fecha? ¿La hiciste para algún medio o por tu cuenta? ¿Tienes permiso o criterio sobre las caras reconocibles?
2. **Calle**: ¿qué fue la manifestación nocturna del edificio en violeta y cuándo? ¿Prefieres separarla de las fotos diurnas?
3. **Música**: ¿qué conciertos son? ¿Estabas acreditada en Madrid Salvaje? ¿Podemos nombrar a los artistas?
4. **Retrato y Estudio**: ¿quiénes son? ¿Eran sesiones por encargo o personales? ¿Hay créditos de estilismo? ¿Quieres un título propio para cada sesión?
5. **Grupo Cadena Media**: ¿cómo lo describirías en una línea (canal, programa, ámbito)?
6. **Reels**: medio o cliente de cada uno. ¿El del vivo X300 Pro fue patrocinado?
7. **VERSIÓN BETA**: ¿cuál fue tu papel?
8. **Silver Praxis**: ¿es un artista solista o un grupo?
9. **Archivo**: ¿mantenemos la foto de la pegatina (`5454`) y la de exterior que está en Estudio (`80c82615`)?
10. **Retrato de Perfil**: ¿quién lo hizo?
11. **Voz**: si tuvieras que presentarte en una frase a alguien de una redacción, ¿qué dirías? (Con eso se reescribe el Perfil sin inventar.)

## 12. Estrategia de corrección mínima

Por fases. Cada una se puede revisar y fusionar por separado.

**Fase 1: errores objetivos, sin información nueva** (solo `messages/*.json`; ~1–2 h)
- Reescribir los 9 ALT erróneos y los 7 inexactos con la propuesta de la matriz, en ES/EN/RU.
- Sustituir los 15 ALT genéricos por descripciones de lo visible.
- Traducir al ruso los 46 ALT que están en inglés (y pasarlos por revisión nativa).
- Transcribir el texto de los carteles en los ALT de *Entre tiendas* donde el cartel es el contenido (007, 009, 014, 025…).
- RU: «группы», «Креативная режиссура», «улицу». ES: «lila/violeta».

**Fase 2: ALT reales en archivo y «Serie completa»** (pequeño cambio de código + mensajes; ~2–3 h)
- Mapear los IDs de archivo a los ALT de proyecto que ya existen (46 fotos, incluidas las 10 sin uso). Sale del propio `selectedOriginals`/firma; no hay que escribir nada nuevo.
- Escribir ALT para las 28 fotos que solo están en el archivo (propuestas ya en la matriz) en una clave nueva `Work.archiveAlt.{id}`, con la plantilla actual como respaldo.

**Fase 3: estructura editorial sin hechos nuevos** (~1 h)
- Quitar «Fotografía ·» del formato en las fichas fotográficas.
- Reducir el motivo de la cámara (hero y `Work.pageText`).
- Fusionar los bullets redundantes de Grupo Cadena Media.
- Descripciones de Estudio y Retrato basadas solo en lo visible.

**Fase 4: con respuestas de Sofía** (⚑)
- Entradilla y descripción de *Entre tiendas*.
- Calle (dividir o describir), Música (artistas o festival) y títulos de Retrato/Estudio.
- Contexto de Grupo Cadena Media, rol en VERSIÓN BETA y voz del Perfil.
- Decisiones sobre las fotos 5454, 80c8 y los derechos.

## 13. Implementación (fases 1–3)

Rama `content/photo-alt-pass`, desde `main`. La fase 4 no se ha tocado: necesita las respuestas de §11.

**Textos** (`messages/*.json`)
- 9 ALT erróneos y 7 inexactos corregidos con lo que se ve en la foto; 15 genéricos sustituidos.
- 46 ALT de las series traducidos al ruso (estaban en inglés).
- 28 ALT nuevos para las fotos que solo estaban en el archivo, en `Projects.items.<serie>.media.<id-de-archivo>`.
- *Entre tiendas*: el texto de los carteles transcrito en el ALT (en EN y RU, el original más una traducción entre paréntesis); policía y cordón visibles en 024 y 028; sin «vista vertical».
- ES: «grafiti» en lugar de «graffiti»; «lila/violeta» unificado.
- Hero y `Work.pageText` sin el motivo de la cámara. En Perfil, la tercera práctica es «Fotografía», `bioMore` no repite la lista de «Lo que hago», y la práctica 1 describe las piezas que enlaza.
- Grupo Cadena Media: dos bullets fusionados en «Cobertura de estrenos, eventos y ruedas de prensa». Se elimina la clave `eventReporting`.
- Formato de las fichas fotográficas sin el «Fotografía ·» repetido.
- Descripciones (SEO) de Música, Calle, Estudio y Retrato basadas solo en lo visible. *Entre tiendas* no se toca (⚑).
- RU: Silver Praxis sin «группы» y crédito «Креативное руководство…» (pendiente de revisión nativa); «уличные сцены»; «Сюжеты в кадре».
- EN: títulos de serie en sentence case; nuevo texto de Contacto.
- `reporter-reel` (no publicado) sin «festivales» en los tres idiomas.
- ALT del póster de Silver Praxis: «sentado en un coche».

**Código** (cambios mínimos)
- `photo-viewer-dialog.tsx`: `PhotoViewerItem` separa `alt` (para la imagen) de `label` (pie visible). Antes, el visor del ensayo mostraba el ALT completo como pie en mayúsculas.
- `photo-archive-data.ts`: `archivePhotoCopyKey()` reutiliza el ALT del ensayo para la misma foto del archivo (por su posición en `selectedOriginals`), y `getArchivePhotosForProject()` añade `copyKey`.
- Archivo (`archive/page.tsx` + `photo-archive.tsx`) y «Serie completa» (`more-from-series.tsx`): ALT real en la imagen y en el nombre del botón, más `aria-haspopup="dialog"`. El pie visible sigue siendo «Música en directo, imagen 3» / «Serie completa 3».
- Visor del ensayo: el pie muestra el título de la serie (o un caption real, si algún día existe).

**QA**
- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ (52 páginas).
- 45 páginas públicas extraídas del HTML renderizado: 810 imágenes, **0 ALT de plantilla** (antes, 148 por idioma) y **0 ALT en alfabeto latino en /ru** (antes, 36 en las fichas y 4 en Inicio).
- Las 111 fotos de proyecto tienen **un único ALT por idioma** en todas las páginas donde aparecen (ensayo, archivo y «Serie completa»): el mapeo es correcto.
- Visor probado con clics en 5 casos (ES/EN/RU): pie corto, ALT descriptivo, navegación con teclado, foco devuelto al cerrar, sin errores de JS.
- 23 rutas × 3 anchos × claro/oscuro: 0 desbordamientos.

**No hecho, a propósito**
- Fase 4 completa (⚑).
- Mover `estudio-80c82615` fuera de Estudio y decidir sobre `retrato-img-5454`: decisiones editoriales de Sofía.
- Borrar `entre-tiendas-y-tambores-029.webp` de `/public`.
- RU «Портрет и editorial»: pendiente de revisión nativa.
- La matriz (`photo-matrix.md`) refleja el estado **anterior** a la implementación; su columna «Propuesta» es lo que se ha aplicado, salvo los ajustes que se indican arriba.
