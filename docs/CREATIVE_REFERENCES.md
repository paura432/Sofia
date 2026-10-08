# Referencias creativas: rediseño del portfolio

Fecha de consulta: 2026-10-08.
Caso: reportera de televisión joven, con base en Madrid. Su prueba principal son 4 reels verticales 9:16 grabados a cámara (alojados en Mux). Además tiene 4 piezas audiovisuales en 16:9 (cortos, un videoclip, documental), 5 series fotográficas (documental, conciertos, retrato) y un archivo de 74 imágenes. Idiomas: ES, EN y RU.

> **Cómo se ha hecho este análisis.** Todas las referencias se consultaron con WebFetch, que devuelve el texto o el marcado de la página convertido, no capturas de pantalla. Por eso lo que sigue habla de estructura, navegación, jerarquía de contenido, etiquetas, nombres de archivo y créditos, no de color, tipografía real ni composición visual. Cuando algo es una inferencia, se dice.

---

## Referencias principales

### 1. Ramita Navai: periodista de televisión y documentalista
**URL:** https://www.ramitanavai.com (y `/films`)

- **Qué resuelve especialmente bien:**
  - *Claridad profesional.* La cabecera dice solo "Ramita Navai, Journalist & Writer". El menú tiene siete entradas: About, Books, Films, Countries, Articles, Awards, Gallery.
  - *Cadena y programa antes que el título.* Cada pieza se nombra con el patrón "Cadena + programa: tema", por ejemplo "PBS FRONTLINE: Iraq's Assassins" o "Channel 4 Unreported World Burundi: Boys Behind Bars". Así la credibilidad del medio va pegada a cada pieza.
  - *Índice por países.* Ofrece una segunda forma de recorrer el trabajo (Afghanistan… Zimbabwe), muy propia del reporterismo.
- **Qué no funciona:**
  - La lista de películas es solo texto, sin miniatura, año ni descripción.
  - El menú aparece duplicado en el HTML.
  - Las redes son iconos sin etiqueta, lo que perjudica la accesibilidad.
  - Para ver un reportaje hay que hacer clic sin ninguna pista previa.
- **Qué aprender:** acreditar siempre medio, programa y fecha en cada reel. Un segundo eje de navegación (temas o lugares) puede dar profundidad sin añadir secciones.
- **Qué NO copiar:**
  - La lista solo de texto. En nuestro caso el vídeo es la prueba y tiene que verse.
  - Siete entradas de menú con submenús, que es demasiado para un portfolio joven.

### 2. Jenny Kleeman: periodista, presentadora y autora
**URL:** https://www.jennykleeman.com

- **Qué resuelve especialmente bien:**
  - *Personalidad y profesión en una línea.* "journalist, author, broadcaster", seguida de una entradilla corta con el premio más reciente (Orwell Prize 2025).
  - *Menú mínimo.* Home, Print, Audio, Contact, Books.
  - *Bio escaneable.* Las palabras clave van en negrita y nombra programas concretos ("BBC One's Panorama", "Channel 4's Dispatches").
  - *Crédito fotográfico del retrato en el pie,* una atención a la autoría que conviene imitar.
- **Qué no funciona:**
  - En el texto capturado, la televisión solo aparece mencionada en la bio, sin vídeos ni enlaces.
  - No hay agente ni representación visible.
- **Qué aprender:**
  - Una entradilla de 2 o 3 líneas con el dato más fuerte, sea premio, medio o programa.
  - Separar los formatos (Print / Audio). Para nosotros serían *Reportajes / Audiovisual / Fotografía*.
  - Un CTA secundario discreto, como el newsletter.
- **Qué NO copiar:** dejar el trabajo audiovisual dentro de un párrafo de bio. Para una reportera de cámara eso esconde la prueba principal.

### 3. Natasha Braier: directora de fotografía
**URL:** https://www.natashabraier.com (y `/narrative/honey-boy`)

- **Qué resuelve especialmente bien:**
  - *Presentación de proyectos con ficha técnica estricta.* "Honey Boy / Director: Alma Har'el / USA / 2019". La página de detalle añade "Shot in Los Angeles" y "2:35 Anamorphic Alexa mini".
  - *Navegación entre piezas.* Los enlaces "PREVIOUS FILM" / "NEXT FILM" permiten encadenar trabajos sin volver al índice.
  - *Categorías claras en la home.* NARRATIVE / COMMERCIALS / MUSIC VIDEOS como anclas, más STILLS, BIO, NEWS y CONTACT.
- **Qué no funciona:**
  - En el texto capturado, la ficha de detalle no tiene tráiler ni fotogramas, aunque podrían cargarse por JS sin aparecer en la captura.
  - Contacto sin email ni representación visibles en la home.
- **Qué aprender:**
  - Una ficha uniforme para las 4 piezas 16:9: título, dirección o rol, año, lugar, formato y duración.
  - Navegación anterior/siguiente dentro de cada familia de trabajos.
  - La categoría "MUSIC VIDEOS" demuestra que un solo videoclip cabe con dignidad dentro de *Audiovisual*.
- **Qué NO copiar:**
  - Las siglas gremiales tipo "ASC ADF" como reclamo, porque no aplican.
  - Un detalle de proyecto sin la obra visible.

### 4. Lynsey Addario: fotoperiodista documental
**URL:** https://www.lynseyaddario.com (y `/maternal-mortality`)

- **Qué resuelve especialmente bien:**
  - *Navegación por series.* "Work" despliega 14 series con títulos breves y temáticos ("Maternal Mortality", "Covid in the UK", "Korengal Valley").
  - *Identidad seca.* El nombre con "Photographer" debajo.
  - *Info agrupada.* Contact, Exhibitions y Awards & Education van juntos, separados del trabajo.
- **Qué no funciona:**
  - La serie analizada tiene 16 imágenes sin texto introductorio ni pies de foto en el marcado, solo "View fullsize". Los nombres de archivo dan pistas de que mezcla Afganistán y Sierra Leona, pero el lector no lo sabe.
  - No hay anterior/siguiente entre series.
- **Qué aprender:**
  - Cada serie como unidad con nombre propio y una lista corta. Las 5 series de nuestro caso caben así sin menú gigante.
  - Separar la credibilidad (premios, exposiciones) del trabajo.
- **Qué NO copiar:** las series sin contexto ni pies. En fotografía documental, el lugar, la fecha y una línea de contexto son parte de la ética del trabajo.

### 5. Cristina de Middel: fotógrafa documental (española)
**URL:** https://www.lademiddel.com

- **Qué resuelve especialmente bien:**
  - *Personalidad.* El menú usa etiquetas propias en minúscula ("my spark", "their spark", "books", "exhibitions", "journal", "about").
  - *Una cita como puente a la bio.* "Photography, for me, is just the perfect excuse."
  - *Newsletter con humor:* "Receive unperiodic news and unrelated GIFs".
  - *Proyectos en rejilla.* Miniaturas con título ("The Afronauts", "Hotel Hoetl", "Antipodes").
  - *Hero con un proyecto concreto.* Un slider de 9 imágenes de "Midnight at the Crossroads" con su ficha editorial (año, idioma, páginas, editorial).
- **Qué no funciona:**
  - Los proyectos se repiten varias veces en la rejilla con distintas imágenes, lo que genera ruido.
  - Hay etiquetas del slider en otro idioma ("Anterior", "Próximo") en una web en inglés, una inconsistencia de idioma.
  - El newsletter sale en pop-up.
  - Hay una errata en el título ("Crossroards").
- **Qué aprender:**
  - Una voz propia en microcopys y etiquetas, siempre que no sacrifique claridad.
  - Un hero que presenta *un* trabajo concreto con su ficha, en lugar de un collage genérico.
  - Una frase personal como enlace a "sobre mí".
- **Qué NO copiar:**
  - Etiquetas crípticas en la navegación principal. Para una reportera, el seleccionador debe entender el menú en un segundo.
  - Los pop-ups.
  - La mezcla de idiomas en la interfaz. Con ES/EN/RU, la coherencia por idioma es obligatoria.

### 6. Danny Clinch: fotografía de música, retrato y conciertos
**URL:** https://www.dannyclinch.com

- **Qué resuelve especialmente bien:**
  - *Inmersión inmediata.* No hay hero de texto: la home es directamente una rejilla de unas 70 imágenes.
  - *Menú mínimo.* "Work", "Info" y un enlace externo a su galería.
  - Es un buen ejemplo de cómo se comporta un archivo amplio, comparable a nuestras 74 imágenes.
- **Qué no funciona:**
  - No hay categorías: retrato, concierto y película se mezclan, y solo se distinguen por nombres de archivo (p. ej. "Keith-Richards-14193-1-7.jpg").
  - No hay pies ni títulos, y muchos archivos se llaman como capturas de pantalla, lo que perjudica la accesibilidad y el SEO.
  - El contacto está escondido.
- **Qué aprender:**
  - El archivo de 74 imágenes puede ser una rejilla densa y silenciosa, pero en una página secundaria y no en la home.
  - El poder del retrato de músicos funciona sin texto cuando la marca ya existe.
- **Qué NO copiar:**
  - La ausencia de categorías y de `alt`.
  - La home-archivo. Ella aún no es una marca conocida y necesita contexto antes de las imágenes.

### 7. Revista 5W: periodismo cultural y crónica en español
**URL:** https://www.revista5w.com

- **Qué resuelve especialmente bien:**
  - *Lenguaje periodístico en las tarjetas.* Cada una tiene antetítulo de formato ("Ensayo", "Fotografía"), titular, entradilla que arranca con el lugar ("Nabatiyeh, Líbano") y firma con rol ("Periodista", "Fotógrafo documental").
  - *Crédito fotográfico en el pie de foto.*
  - Agrupación por tema y por región.
- **Qué no funciona (para nuestro uso):**
  - La densidad de un medio, con tienda, suscripción, eventos y podcast, es excesiva para un portfolio.
  - Solo ofrece español.
- **Qué aprender:**
  - El patrón *formato · lugar · fecha · rol* aplicado a cada pieza da tono de periodista seria sin adornos. Ejemplo: "Reportaje · Madrid · 2026 · Reportera".
  - Acreditar siempre la fotografía.
- **Qué NO copiar:** la arquitectura de un medio (menús temáticos y regionales, bloques comerciales).

### 8. Meduza (edición en inglés): publicación bilingüe RU/EN
**URL:** https://meduza.io/en

- **Qué resuelve especialmente bien:**
  - *Selector de idioma mínimo.* Un único enlace "RU" a la otra edición. El pie repite "Meduza in Russian".
  - *Tarjetas con etiqueta, titular largo y fecha completa* ("October 8, 2026, 10:26 am").
  - Un "Found an error?" (seleccionar y Ctrl+Enter) muy periodístico.
- **Qué no funciona (para nuestro uso):** es un feed infinito con "Show more", pensado para noticias y no para un portfolio, y en el texto capturado no se detectan formatos multimedia.
- **Qué aprender:**
  - El selector de idioma muestra los otros idiomas con su código (ES · EN · RU), es visible y es corto.
  - Cada edición tiene la interfaz completamente en su idioma.
  - Fechas en formato local por idioma.
- **Qué NO copiar:** el feed cronológico infinito. Nuestro contenido es pequeño y curado.

### Consultadas como apoyo secundario (fetch correcto, menor peso)
- **It's Nice That**, https://www.itsnicethat.com: tarjetas con etiquetas de disciplina y tema como chips ("Documentary", "TV", "Process"), y una entradilla corta en las piezas largas. Es útil para etiquetar fotografía y audiovisual sin crear secciones nuevas. Lo que no hay que copiar es la densidad de navegación (dos barras más mega-menú).
- **Aperture**, https://aperture.org: patrón "Nombre: Título" y etiquetas de tipo (Essays, Interviews, Portfolios). En el marcado, el `alt` de las imágenes suele ser el nombre de archivo, que es justo el error que queremos evitar.
- **Colin Stone (TV & Radio)**, https://colin-stone.com/tv-radio: presentador de informativos. Se descarta como referencia positiva. Anuncia "two reels", pero en el texto capturado solo aparece un voicereel MP3 descargable. Ilustra lo que pasa cuando el reel no es el centro de la página.

### Fetch fallido (no se describen)
- rogerdeakins.com: HTTP 429.
- bradfordyoung.com, janeferguson.tv, yaldahakim.com, johnnyharris.co, thisissimonthompson.co.uk: el dominio no resuelve.
- ariwegner.com: error SSL.
- isobelyeung.com: dominio aparcado (Namecheap).

---

## Síntesis: principios transferibles a este caso

1. **Los reels verticales son el hero.** Ninguna de las referencias de TV analizadas (Navai, Kleeman, Stone) pone el vídeo a cámara en primer plano. Es su mayor debilidad y nuestra oportunidad. Los 4 reels 9:16 deben verse en la primera pantalla y sin clic: autoplay silenciado con póster de Mux y control de sonido explícito. En escritorio van como fila de 4 columnas verticales; en móvil, como carrusel o scroll con snap a pantalla completa, que es el formato nativo del 9:16.
2. **Una línea de identidad, sin adjetivos.** Nombre + rol + ciudad, al estilo de "Journalist & Writer" o "Photographer". Por ejemplo: "Reportera de televisión · Madrid". Lo audiovisual y la foto aparecen como oficios secundarios, no en la misma línea con el mismo peso.
3. **Acreditar cada reel con medio, programa, lugar y fecha.** Es el patrón de Navai ("Cadena + programa: tema") y de 5W (lugar al inicio). Para un seleccionador de casting o redacción, ese pie es tan importante como el vídeo.
4. **Una ficha uniforme para las 4 piezas 16:9.** Siguiendo a Braier: título / rol (dirección, cámara, reportera) / año / lugar / formato / duración. El reproductor va dentro del detalle y hay anterior/siguiente dentro de *Audiovisual*. El videoclip entra sin complejos como una categoría más.
5. **Las series fotográficas, como unidades con nombre, contexto y pies.** De Addario se toma la estructura (lista corta de series con títulos claros). Hay que evitar su silencio: cada serie lleva una entradilla de 2 o 3 líneas, lugar y fecha, y pies o al menos un `alt` descriptivo en cada imagen.
6. **El archivo de 74 imágenes es secundario y denso.** Puede ser una rejilla silenciosa a lo Clinch, pero filtrable por tipo (documental / concierto / retrato) y con `alt` real, nunca nombres de archivo. No debe competir con los reels en la home.
7. **Navegación de 4 o 5 entradas en lenguaje llano.** Por ejemplo: Reportajes · Audiovisual · Fotografía · Sobre mí · Contacto. La voz propia se guarda para microcopys (cita, CTA, pie), como hace De Middel, y no para las etiquetas del menú.
8. **Una entradilla corta con el dato más fuerte.** Como Kleeman, 2 o 3 líneas con medio, programa o logro más reciente, enlazadas a una bio completa. La bio se escribe con nombres concretos de programas y medios, no con adjetivos.
9. **Idioma coherente por edición.** Siguiendo a Meduza, un selector visible ES · EN · RU, con toda la interfaz traducida (botones, fechas, etiquetas de los controles de vídeo) y fechas en formato local. No puede repetirse el "Anterior/Próximo" en una web en inglés de De Middel. Si un reel tiene audio en español, se indica, y si hay subtítulos, se ofrecen.
10. **Contacto visible y directo.** En casi todas las referencias el contacto queda escondido tras un enlace o en iconos sin etiqueta. Hay que poner email en texto plano y redes con etiqueta textual en el pie y en "Sobre mí", más un CTA claro tras los reels. Si hay representación, se nombra.
11. **Crédito y autoría como rasgo de oficio.** Acreditar al fotógrafo del retrato propio (Kleeman), y en las piezas colectivas acreditar dirección, cámara y producción. Transmite rigor periodístico.
12. **Sin ruido comercial ni pop-ups.** Nada de newsletter emergente, tienda ni feed infinito. Con un corpus de 4 + 4 + 5 + 74 piezas, la curaduría y el orden ya son el mensaje.

---

## Limitaciones

- **Sin capturas visuales.** WebFetch devuelve texto o marcado convertido, no imágenes, así que no se ha evaluado color, tipografía real, espaciado, animación ni el aspecto en móvil. Las observaciones sobre "hero", "rejilla" o "slider" se basan en la estructura del contenido y en etiquetas o nombres de archivo. Antes de tomar decisiones de diseño visual hay que revisar cada referencia en un navegador real (escritorio y móvil).
- **Contenido cargado por JavaScript.** Puede no aparecer en la captura. Por ejemplo, la ausencia de vídeo en las fichas de Braier o en los reels de Colin Stone podría deberse a reproductores que se cargan dinámicamente.
- **Fecha de consulta: 2026-10-08.** Las webs pueden cambiar o desaparecer.
- **Pocas webs personales de reporteros de TV.** Varios dominios de reporteros que se probaron no existen o están aparcados (ver "Fetch fallido"). No se encontró ninguna web personal de una reportera joven en español con reels verticales que pudiera usarse como referencia directa. Los principios 1 y 9 se derivan por contraste (de lo que falta en las referencias), no por imitación.
- **Sin referencias de producción con vídeo vertical en web.** Ninguna de las fuentes analizadas muestra cómo integran vídeo 9:16 en escritorio. Esa decisión debe prototiparse y probarse.
