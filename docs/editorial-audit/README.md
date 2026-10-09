# Auditoría editorial y humanización — octubre 2026

Rama: `content/editorial-voice-audit`, creada desde `origin/main` (`3e2aa55`, Creative Engineering 3.0 + PR #1).
Sin merge ni despliegue.

> **Aviso de integración.** La rama `feat/sofia-creative-engineering-v3` tiene seis commits de CE 4.0 que no están en `main` y que tocan `messages/*.json` (+6 líneas por idioma), `work/[slug]/page.tsx` y `work/photography/archive/page.tsx`. Si CE 4.0 se fusiona antes, este PR necesitará un rebase con conflictos pequeños en esos archivos.

Documentos:

- [`inventory.md`](./inventory.md): inventario completo (325 claves, 92 ALT y los textos fijados en código), con función, prioridad y problema de cada texto.
- Este README: hallazgos, guía de voz, cambios antes/después, pendientes, diseño editorial y QA.

---

## 1. Hallazgos principales

El punto de partida era mejor de lo esperado. Una pasada anterior (`docs/copy-humanization-audit.md`) ya había quitado eslóganes, introducciones de relleno y comentarios sobre atmósfera. La web **no suena a agencia ni a IA**: casi no aparecen «narrativa», «mirada», «esencia», «pasión» ni «universo». Los titulares son cortos y concretos («Ante la cámara», «Detrás de la cámara», «Dónde he trabajado»).

Los problemas reales son de **precisión**, no de tono:

| # | Prioridad | Hallazgo |
|---|---|---|
| 1 | P0 | **«festivales»** aparece en el hero y en la bio, pero no consta en el CV («eventos y estrenos») ni en las piezas del reel registradas en `content-intake.md` (premios, estrenos, Fashion Week…). Es una afirmación sin fuente. |
| 2 | P0 | **Audiovisual sobreatribuye**: «Cortometrajes que dirijo y monto». *4 MINUTOS* solo acredita dirección; el montaje es de *Tras el sofá*. Además, el texto omitía *VERSIÓN BETA*, que aparece en la misma sección. |
| 3 | P0 | **Annie Bonnie, eventos**: en ES ponía «Organización y cobertura de eventos.» y en EN/RU, «Supporting the organisation…». Un mismo rol con dos niveles de responsabilidad según el idioma. |
| 4 | P0 | **RU**: errata en la etiqueta de créditos («Титки» por «Титры»). «Я окончила факультет…» afirma una titulación y una facultad que no constan. El hero y la bio decían «снимаю премьеры» (*filmo* estrenos) en lugar de «освещаю» (*cubro*). |
| 5 | P1 | **Las URL desconocidas mostraban el 404 genérico de Next**: en inglés, sin estilos ni navegación, también en `/` y `/ru`. |
| 6 | P1 | **Imagen Open Graph** con «REPORTING / VISUAL / COMMUNICATION» fijado en inglés para los tres idiomas. |
| 7 | P1 | **Contacto**: «preguntas sobre cualquiera de estas piezas», en una página donde no hay piezas. |
| 8 | P1 | **RU**: plural roto en el archivo («74 фотографий»), nombre en latín dentro de frases rusas sin declinar («Профиль Sofía Chernikova»), registro coloquial («документалка») y una descripción que añadía «студии» sin que ES lo dijera. |
| 9 | P1 | **EN**: varias frases correctas pero no nativas: «Write to me», «Shall we talk?», «Path», «to look at slowly», «what I shoot and what I photograph». En «Madrid on foot, camera in hand», la cámara va al cuello, no en la mano. |
| 10 | P1 | **Jerarquía en Perfil**: el lede en tipografía display ocupaba seis líneas y repetía casi palabra por palabra el hero. |
| 11 | P2 | Relleno de CV en Isocero («Trabajo en entornos dinámicos y orientados al cliente», «Edición profesional»). En URJCmun, «Social Media · Liderazgo». |
| 12 | P2 | Detalles ortotipográficos: «posproduje» y «postproducción» en la misma pantalla, «&» y mayúsculas a la inglesa («Calle & Documental», «Fotógrafa en Hoteles», «Reportera TV»), «Reporting» en la interfaz española. |

Lo que **funciona y no se toca**: titulares de sección, descripciones de los reels (concretas y verificables por la imagen), créditos, ALT, navegación, CTA principal, 404, pie y la estructura de Experiencia.

## 2. Guía de voz de Sofía

**Quién habla.** Una periodista joven que trabaja delante y detrás de la cámara. Cuenta lo que hace con verbos de oficio, sin adornarlo.

**Principios**

1. **Hechos antes que adjetivos.** «Cubro estrenos, eventos y ruedas de prensa» en vez de «apasionada por contar historias». Si una frase no se puede comprobar en el CV, en una pieza o en un crédito, no se publica.
2. **Verbos de oficio.** Cubrir, entrevistar, escribir, rodar, montar, dirigir, fotografiar. Evitar «crear contenido», «aportar valor», «desarrollar identidad».
3. **Crédito exacto.** El texto dice lo mismo que la ficha técnica, ni más ni menos. Si una pieza no tiene rol confirmado, el texto no le asigna ninguno.
4. **La pieza manda.** En Trabajo, el texto dice qué se ve y qué hizo Sofía, en una o dos frases. No interpreta la emoción de la pieza.
5. **Primera persona donde hay una persona**: hero, Perfil, introducciones de sección y Contacto. **Voz descriptiva** en fichas, créditos, Experiencia, ALT y SEO. Experiencia se lee como un CV, no como un diario.
6. **Ritmo variado.** No todas las frases en tríada ni todos los titulares en dos palabras. Una frase larga con información puede convivir con un titular corto.
7. **Cercanía sin informalidad.** Tuteo en Contacto («si tienes una propuesta…»), sin exclamaciones ni llamadas a la acción de landing comercial.
8. **No inventar la voz.** Opiniones, motivaciones o gustos de Sofía solo se publican con su confirmación (ver §5).

**Léxico**

| Usar | Evitar |
|---|---|
| reportera de televisión, cubrir, entrevistar, pieza, cobertura | storyteller, creadora de contenido, narrativa visual |
| cortometraje, videoclip, rodaje, montaje, posproducción | universo audiovisual, propuesta estética |
| fotografía de conciertos / calle / retrato | mirada, esencia, capturar la emoción |
| redes sociales, coordinación | social media (en ES), liderazgo, sinergias |
| y | & (en español) |

**Idiomas.** ES es la fuente. EN y RU se adaptan, no se calcan: mismos hechos, mismo rol y misma intensidad. En RU, el nombre va en cirílico y declinado en la prosa («Софии Черниковой»). En titulares, créditos y marca se mantiene «Sofía Chernikova».

## 3. Cambios aplicados (antes / después)

### Español

| Ubicación | Texto actual | Propuesta aplicada | Motivo |
|---|---|---|---|
| `Hero.summary` | Desde 2024 cubro estrenos, **festivales** y ruedas de prensa para Grupo Cadena Media, y entrevisto a artistas y figuras públicas. Detrás de la cámara, dirijo cortometrajes y **fotografío conciertos, retratos y calle**. | Desde 2024 cubro estrenos, **eventos** y ruedas de prensa para Grupo Cadena Media y entrevisto a artistas y figuras públicas. Detrás de la cámara, dirijo cortometrajes y **hago fotografía de conciertos, calle y retrato**. | «festivales» sin fuente (P0). «fotografío calle» es jerga; los géneros se nombran como tales. |
| `Profile.bio` (lede) | Soy periodista y reportera de televisión. Trabajo en Grupo Cadena Media desde 2024: cubro estrenos, festivales y ruedas de prensa, entrevisto… | Soy periodista y reportera de televisión. Trabajo en Grupo Cadena Media desde 2024. | Lede de 2–3 líneas en tipografía display. Las tareas bajan al cuerpo. Se quita «festivales». |
| `Profile.bioMore` | Estudié Periodismo… Además de reportear, dirijo y monto cortometrajes… | Cubro estrenos, eventos y ruedas de prensa, entrevisto a artistas y figuras públicas y escribo guiones y piezas informativas. Estudié Periodismo y Comunicación Audiovisual en la Universidad Rey Juan Carlos. Además, dirijo y monto cortometrajes, ruedo y posproduzco vídeo y hago fotografía de conciertos, calle y retrato. Hablo español y ruso como lenguas nativas. | Recoge el contenido que sale del lede. Mismos hechos, sin repetir el hero. |
| `Work.audiovisualText` (Inicio + Trabajo) | Cortometrajes que dirijo y monto, y un videoclip que rodé y posproduje. | Dirigí los dos cortometrajes y monté «Tras el sofá». Del videoclip de Silver Praxis hice el rodaje y la posproducción. | Crédito exacto (P0). No atribuye nada a VERSIÓN BETA mientras su rol esté pendiente. |
| `Experience…annie-bonnie…events` | Organización y cobertura de eventos. | Apoyo en la organización y cobertura de eventos. | Igualado con EN/RU en la versión más prudente hasta confirmarlo (§5). |
| `Experience…urjcmun.discipline` | Comunicación · Social Media · Liderazgo | Comunicación · Redes sociales · Coordinación | Sin anglicismo. «Coordinación» es lo que acreditan las responsabilidades; «liderazgo», no. Ya no se parte mal en dos líneas. |
| `Experience…isocero…fastPaced` | Trabajo en entornos dinámicos y orientados al cliente. | *(eliminada)* | No es una responsabilidad; es relleno de CV. |
| `Experience…isocero…editing` | Edición profesional de imágenes. | Edición de las fotografías. | «profesional» no informa. |
| `…isocero.role` / `…annie-bonnie.role` | Fotógrafa en Hoteles / Comunicación Corporativa | Fotógrafa en hoteles / Comunicación corporativa | Mayúsculas en español. |
| `Contact.contactPageText` | Para propuestas de trabajo, colaboraciones o preguntas sobre cualquiera de estas piezas, escríbeme. | Si tienes una propuesta de trabajo, una colaboración o una pregunta sobre alguna de mis piezas, escríbeme. | «estas piezas» no tenía referente en Contacto. |
| Títulos de serie y del archivo | Retrato & Editorial · Calle & Documental · Estudio & Editorial | Retrato y editorial · Calle y documental · Estudio y editorial | «&» y Title Case son convenciones inglesas. |
| Silver Praxis (rol y crédito), `practices[1]` | postproducción | posproducción | Unifica con «posproduje / posproduzco» (forma preferida por la RAE). |
| `Projects.disciplines.reporting` | Reporting | Reportajes | Inglés en la interfaz española. |
| `Metadata.siteTitle`, `home.title`, `personRole` | Periodista y Reportera TV | Periodista y reportera de televisión | Mayúscula interior; 55 caracteres, dentro del límite del title. |
| `Metadata.pages.photoArchive.description` | Explora las 74 fotografías del archivo… | Las 74 fotografías del archivo de Sofía Chernikova, ordenadas por temas. | Imperativo genérico por un dato útil. |

### Inglés (adaptación, no calco)

| Clave | Antes | Después | Motivo |
|---|---|---|---|
| `Hero.summary` | …premieres, festivals and press conferences… photograph concerts, portraits and the street. | …premieres, events and press conferences… shoot concert, street and portrait photography. | Mismo hecho que ES; «photograph the street» no es natural. |
| `Hero.contact` | Write to me | Email me | Es un `mailto:`. |
| `Home.pathEyebrow` | Path | Career | «Path» no se usa así. |
| `Work.pageText` | First, on camera. Then, what I shoot and what I photograph. | First, my on-camera work. Then the films I make and the photographs I take. | «shoot» y «photograph» se solapan en inglés. |
| `Work.audiovisualText` | Short films I directed and edited… | I directed both short films and edited Tras el sofá. On the Silver Praxis music video, I did the filming and post-production. | Crédito exacto. |
| `Work.photographyText` | …to look at slowly. | …to browse at your own pace. | Natural en EN. |
| `short-form-001.title` | Madrid on foot, camera in hand | On foot through Madrid, camera round my neck | La imagen muestra la cámara colgada al cuello. |
| `Profile.bio` / `bioMore` | (mismo reparto que ES) | I'm a journalist and TV reporter, working at Grupo Cadena Media since 2024. / I cover premieres, events… | Jerarquía y «festivals». |
| `Contact.title`, `contactPageTitle` | Shall we talk? | Get in touch | «Shall we talk?» suena rígido en EN. |
| `Contact.contactPageText` | …about any of these pieces, write to me. | If you have a job, a collaboration or a question about any of my work, email me. | Deíctico y registro. |
| `urjcmun.discipline` | Communications · Social Media · Leadership | Communications · Social media · Coordination | Igual que ES. |
| `isocero…editing` | Professional image editing. | Editing the photographs. | Igual que ES. |
| `photoArchive.description` | Explore all 74 photographs… | All 74 photographs in Sofía Chernikova's archive, grouped by theme. | Igual que ES. |

### Ruso (**revisión nativa recomendada**, ver §5)

| Clave | Antes | Después | Motivo |
|---|---|---|---|
| `Projects.credits` | Титки | Титры | Errata. |
| `Hero.summary` | С 2024 года я **снимаю** премьеры, **фестивали**… По другую сторону камеры — снимаю короткометражные фильмы… | С 2024 года **освещаю** премьеры, **мероприятия** и пресс-конференции… По другую сторону камеры — снимаю короткометражные фильмы **как режиссёр** и фотографирую… | «снимаю» = *filmar*; una reportera *cubre* («освещает»). Se quita «фестивали». Se precisa la dirección. |
| `Profile.bio` / `bioMore` | Я **окончила факультет** журналистики… я снимаю и монтирую… снимаю и обрабатываю видео… | Я журналист и телерепортёр. С 2024 года работаю в Grupo Cadena Media. / Освещаю… **Изучала** журналистику… Кроме того, снимаю как режиссёр и монтирую короткометражные фильмы, занимаюсь съёмкой и постпродакшном видео… | «окончила факультет» afirma una titulación no confirmada. Se quita la repetición de «снимаю». |
| `Work.audiovisualText` | …которые я сняла и смонтировала, и клип, который я сняла и обработала. | Оба короткометражных фильма — моя режиссёрская работа, «Tras el sofá» я ещё и смонтировала. В клипе Silver Praxis отвечала за съёмку и постпродакшн. | Crédito exacto; «обработала» es flojo para posproducción. |
| `Hero.soundHint` | Со звуком · нажмите | Со звуком · нажмите, чтобы смотреть | La frase quedaba cortada. |
| Archivo: contador | 74 фотографий | 74 фотографии | Ahora usa el plural ICU (`Work.seriesCount`). |
| `seriesCompleteCount`, `moreFromSeriesCount` | {count} изображений | plural ICU one/few/many | Correcto para 22, 23, 24, 32… (aplicado también a ES/EN). |
| `Work.archiveCalleFull`, `calle-documental.title/format` | Улица и документалка / Документалка | Улица и документальная съёмка / Документальная съёмка | «документалка» es coloquial y significa *película* documental. |
| `retrato-editorial.description` | Портретная и editorial-фотография в городе, **студии** и на улице. | Портретная съёмка в городской среде. | Añadía «studio», que no está en ES ni en la serie. |
| `ogAlt`, `portraitAlt`, descripciones SEO de Perfil, Experiencia, Contacto y Archivo | …Sofía Chernikova (latín, sin declinar) | …Софии Черниковой | Mezcla de alfabetos dentro de frases rusas. |
| `contactPageText` | …о любой из этих работ — пишите. | Если у вас есть предложение о работе, идея для сотрудничества или вопрос о моих работах — напишите мне. | Deíctico. |
| `urjcmun.discipline`, `isocero…editing` | …Лидерство / Профессиональная обработка изображений. | …Координация / Обработка фотографий. | Igual que ES. |

### Código (cambios mínimos y justificados)

| Archivo | Cambio | Motivo |
|---|---|---|
| `src/app/[locale]/[...rest]/page.tsx` (nuevo) | Catch-all que llama a `notFound()`. | Las URL desconocidas (`/no-existe`, `/ru/net`) caen en el 404 traducido y con estilos, con estado HTTP 404. |
| `src/app/[locale]/opengraph-image.tsx` | «REPORTING / VISUAL / COMMUNICATION» → `Reportajes / Audiovisual / Fotografía` desde `Work.*Nav`. | La imagen OG en el idioma de la página y con las secciones reales. |
| `src/app/[locale]/work/photography/archive/page.tsx` | `{74} {archiveCountLabel}` → `t("seriesCount", { count })`. | Plural correcto en RU. Se elimina `archiveCountLabel`. |
| `src/content/experience.ts` | Se elimina la clave `fastPaced`. | Ver Isocero. |
| `messages/en.json`, `messages/ru.json` | Se eliminan `Work.archiveTeaserEyebrow` y `Work.archiveTeaserGroups`. | Claves sin uso que solo existían en EN/RU. |

Sin dependencias nuevas, sin cambios de rutas, slugs, identificadores, estado de publicación ni CSS.

## 4. Diseño editorial del texto

Revisión en 1440, 834 y 390 px, claro y oscuro, ES/EN/RU (23 rutas, 92 capturas antes y 92 después).

| Aspecto | Estado | Acción |
|---|---|---|
| Desbordamientos / scroll horizontal | Ninguno en ninguna combinación (comprobación automática de `scrollWidth` y bordes de cada elemento de texto). | — |
| Lede de Perfil | Seis líneas en tipografía display, más pesado que el titular. | Resuelto con el reparto de texto lede/cuerpo; no hacía falta tocar el CSS. Ahora son 2–3 líneas. |
| Antetítulo URJCmun en Experiencia | Se partía como «…SOCIAL MEDIA / · LIDERAZGO», con el punto al inicio de línea. | Resuelto al acortar la etiqueta. |
| Hero (escritorio y móvil) | Jerarquía clara: nombre, oficio, una frase y dos acciones. En móvil, la pieza aparece antes que el resumen: es intencionado (CE 3.0) y correcto para una reportera. | Sin cambios. |
| Introducción de Audiovisual | Pasa de una línea a dos. Cabe en la columna sin competir con el titular. | — |
| Contacto | Mucho aire bajo el bloque en escritorio, pero la página tiene un solo propósito. | Sin cambios (no se rediseña por gusto). |
| «Base · Madrid» repetido en Perfil (ficha y bloque de contacto) | Redundancia menor. | P2, no aplicado: tocaría el componente compartido. |
| Medida de línea en cuerpo de Perfil y en Experiencia | Entre 60 y 80 caracteres en escritorio. Correcto. | — |
| Contraste (claro y oscuro) | Los textos secundarios (`muted`, antetítulos) siguen legibles en las capturas. No se han tocado tokens. | — |

## 5. Pendiente de validación por Sofía

No se publica nada de esta lista hasta que ella lo confirme. Añadido a `docs/creative-engineering/questions-for-sofia.md`.

| Tema | Pregunta | Estado en la web |
|---|---|---|
| Festivales | ¿Has cubierto festivales para Grupo Cadena Media? ¿Cuáles? | Se dice «eventos». |
| Annie Bonnie, eventos | ¿Organizabas los eventos o apoyabas su organización? | Se dice «Apoyo en la organización y cobertura». |
| VERSIÓN BETA | ¿Cuál fue tu rol? | Sin rol; el texto de sección no la menciona. |
| *Tras el sofá* / *4 MINUTOS* | Sinopsis de una línea, año, si hubo festival o proyección. | Descripción mínima y verificable. |
| URJC | ¿Has terminado el grado? (2021–2026) | «Estudié» / «Изучала»: no afirma titulación. |
| Nombre en ruso | ¿«София Черникова» es la grafía que usas? | Aplicado en la prosa rusa; marca en latín. |
| Ruso en general | Revisión de un hablante nativo: «эдиториал» frente a «editorial» en los títulos de serie, registro de «снимаю как режиссёр». | Se ha mantenido «editorial» en latín, como estaba. |
| Voz personal | Las ocho preguntas de `copy-humanization-audit.md` siguen abiertas (qué te interesa contar, qué te representa…). | Sin frases de opinión inventadas. |
| Series fotográficas | Lugar, año y contexto de *Entre tiendas y tambores* y de las demás series. | Sin año («Pendiente» oculto). |

## 6. QA

| Comprobación | Resultado |
|---|---|
| `pnpm lint` | ✅ exit 0 |
| `pnpm typecheck` | ✅ exit 0. El primer intento falló por tipos obsoletos de `.next/types` de otra rama (rutas `/work/audiovisual` que no existen en `main`); `pnpm build` los regenera. |
| `pnpm build` | ✅ 52 páginas generadas. Nueva ruta `ƒ /[locale]/[...rest]`; el resto sin cambios de modo de renderizado (todo era ya ƒ en `main`). |
| Rutas en producción (`pnpm start`) | ✅ 200 en las 16 rutas públicas de muestra (3 idiomas). ✅ 404 en `/no-existe` y `/ru/net`, ya con la plantilla traducida. ✅ `sitemap.xml` y `/ru/opengraph-image`. |
| Consola del navegador (producción) | Solo 404 de `/_vercel/insights` y `/_vercel/speed-insights`: esos scripts solo existen desplegados en Vercel. Sin errores de la aplicación. |
| Consola (dev, página 404) | Aviso de React «Encountered a script tag…». **Ya ocurría antes** en `/trabajo/<slug-inexistente>`; viene del script inline de tema del layout, no de este cambio. P2. |
| Responsive / temas / desbordamientos | ✅ 0 incidencias en 23 rutas × 3 anchos × claro/oscuro, antes y después. |
| Traducciones | ✅ Las tres traducciones tienen ahora las mismas claves (se quitaron dos que solo existían en EN/RU). Sin textos en el idioma equivocado en la interfaz española («Reporting» corregido). |
| SEO | ✅ Títulos y descripciones revisados. El title de la página 404 es el del sitio (comportamiento previo; `Metadata.pages.notFound` no se usa). P2. |
| Accesibilidad de enlaces y botones | ✅ Sin cambios en etiquetas ARIA; «Email me» describe ahora la acción real del `mailto:`. |
| Segunda lectura | Se descartaron alternativas más «elegantes» («Fuera del plató…», «Con la cámara al hombro…») por no aportar información. Cada frase cambiada responde a un hecho, un crédito o un error concreto. |

## 7. Archivos modificados

```
messages/es.json
messages/en.json
messages/ru.json
src/app/[locale]/[...rest]/page.tsx          (nuevo)
src/app/[locale]/opengraph-image.tsx
src/app/[locale]/work/photography/archive/page.tsx
src/content/experience.ts
docs/editorial-audit/README.md              (nuevo)
docs/editorial-audit/inventory.md           (nuevo)
docs/creative-engineering/questions-for-sofia.md
```

## 8. No aplicado (P2, a decidir)

- Las tríadas «Ante la cámara / Detrás de la cámara / Con la cámara de fotos» en Perfil. La tercera rompe un poco el paralelismo, pero ordena bien la página. Se mantiene.
- «¿Hablamos?» (ES/RU): es una fórmula común, pero natural en español y no promete nada. Se mantiene. En EN se cambió porque no funcionaba.
- Descripciones de series fotográficas: solo se ven en SEO y repiten el título. Ampliarlas exige contexto que no está documentado.
- ALT genéricos en Retrato, Estudio y Música (≈14). Mejorarlos exige revisarlos imagen por imagen.
- Claves sin uso en `Projects.*` (eyebrows, reel). Se dejan porque las usará el reporter reel cuando se publique.
- El 74 escrito a mano en tres textos (`photographyText`, `archiveTotal`, metadatos) y no tomado de `PHOTO_ARCHIVE_COUNT`.
