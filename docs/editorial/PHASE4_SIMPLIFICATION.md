# Fase 4 · Simplificación editorial definitiva

Fecha: 2026-10-11 · Rama: `content/phase-4-simplification` (sobre `c302c03`, Fase 3) · `main` intacto · sin merge ni despliegue.

Punto de partida: la rama de Fase 3 ya no tenía preguntas del formulario, pero Perfil (278 palabras visibles) y Experiencia (353) seguían siendo páginas para leer, no para mirar. Esta fase elimina estructuras enteras, no solo texto dentro de ellas.

## 1. Resumen de decisiones

**Referencias externas** (`janvi01/minimalist-dev-portfolio`, `sachinbhujel/NextJS-Portfolio-Template`, `xiaopeng-ye/minimalist-portfolio`). Las tres coinciden en una arquitectura mínima: una bio de una o dos líneas, un solo campo `description` por puesto (la primera incluso lo justifica «como en LinkedIn»), un solo `description` por proyecto y enlaces salientes en lugar de explicaciones. Ninguna separa «contexto» de «proceso» ni lista responsabilidades. Se adopta esa arquitectura de contenido; no su estética ni su identidad de desarrollador. El posicionamiento sigue siendo el del documento maestro (`CREATIVE_DIRECTION.md`): reportera de televisión en cámara, con audiovisual y fotografía como segundo y tercer oficio, y el vídeo del monitor en el primer viewport.

**Perfil.** Queda: retrato, dos párrafos (87 palabras), dos enlaces (Trabajo, Experiencia) y la ficha de formación, idiomas, herramientas y base. Se eliminan de la página y del código las tres tarjetas «Lo que hago» (repetían Trabajo) y los cuatro párrafos «Cómo trabajo» (autoevaluación). El primer párrafo es literal de Sofía (P0012). El segundo sigue la propuesta del brief, contrastada con la ficha: «estar donde están pasando cosas» (P0041, P0397), «detrás de un micrófono» (P0019), «editar, que es otra manera de mirar» (P0019), el rodaje, el concierto y el paseo por Madrid son hechos del portfolio. Se añade una frase de orientación («Desde 2024 trabajo como reportera de televisión en Madrid») para que la lectura de diez segundos funcione sin ir a Experiencia. Se retira de la web la frase de P0013 («las historias que están pasando mientras todos estamos mirando hacia otro lado») para no acumular tres «mirar» en una página; sigue en la ficha y puede recuperarse si el propietario la prefiere al segundo párrafo. Herramientas se conserva: es una línea verificada, no prosa, y es lo que un empleador busca; se quita en un minuto si se decide lo contrario.

**Experiencia.** Empresa · cargo · periodo · una descripción de 30–38 palabras. Desaparecen `summary`, `context`, `responsibilities` (3–6 por puesto), `note` y la línea de disciplinas, tanto del JSON como del componente y del modelo `experience.ts`. URJCmun conserva la progresión de cargos como tira compacta (Communication Team → … → Deputy Director); los enlaces a las piezas relacionadas se mantienen. De las anécdotas se conserva una sola, en Grupo Cadena Media («dos minutos para conseguirlo todo… una conversación de diez»), porque describe el trabajo mejor que cualquier lista; C. Tangana, Jon Favreau, las 150 entrevistas, Iker Casillas y la jornada de Isocero salen de la web y quedan en la documentación.

**Proyectos.** Plantilla única: título · descripción (bajo el título) · vídeo · rol, formato, año · «Cómo se hizo» solo en las cuatro obras audiovisuales · créditos · siguiente. `context` y `dek` desaparecen del JSON y del componente; `description` pasa a ser el único texto de la pieza (listado, cabecera y metadescripción). Los listados de Trabajo y el monitor de la portada dejan de mostrar descripciones: póster, título, formato y rol bastan para elegir qué abrir. Los vídeos verticales ganan un campo «Rol» verificado en la ficha (P0131, P0163, P0213, P0189) y pierden «Cómo se hizo». El bloque «Resultado / publicación», que ningún proyecto usaba, se retira del código.

**Fotografía.** Cada serie tiene título, una descripción de una o dos frases bajo el título, las fotografías, formato y créditos. Entre tiendas y tambores conserva el contexto de la acampada por el derecho a la vivienda dentro de su descripción. Música en directo y Calle y documental no tienen introducción. Los 120 ALT por idioma no cambian (comprobado por diff).

**Contacto.** Una sola invitación de dos frases: la segunda recoge lo que buscaba el antiguo bloque «Qué busco». El bloque, su etiqueta y su componente desaparecen.

**Código retirado** (seguro: sin referencias restantes, build limpio): tipos `ResponsibilityKey` y `responsibilityKeys`; campos `description` en `FilmEntry`, `ShortFormStory` y `ReportingCopy`; `dek`, `context`, `result` en `ProjectCopy`; secciones «Lo que hago», «Cómo trabajo», «Qué busco», «Resultado / publicación»; CSS de `.practice-columns`, `.practice-item`, `.about-summary-item`, `.trajectory-row ul/li`, `.company-context`, `.trajectory-note`, `.film-description`, `.short-form-description`, `.reel-stage-description`. Sin acordeones, modales ni «leer más». Sin dependencias nuevas. 15 archivos, +172 / −693 líneas.

## 2. Perfil: textos completos

**ES**
> Digo que cuento cosas. A veces con una cámara, a veces escribiendo, a veces hablando con alguien y haciendo preguntas. Estudié Periodismo y Comunicación Audiovisual porque siempre me ha costado elegir entre mirar y contar lo que miro. Supongo que sigo un poco ahí.
>
> Desde 2024 trabajo como reportera de televisión en Madrid. Me gusta estar donde están pasando cosas: en un rodaje, detrás de un micrófono, en un concierto o caminando por la ciudad con una cámara. Y después editar, que es otra manera de mirar.

**EN**
> I say I tell stories. Sometimes with a camera, sometimes in writing, sometimes by talking to someone and asking questions. I studied Journalism and Audiovisual Communication because I've always found it hard to choose between looking and telling what I see. I suppose I'm still somewhere in between.
>
> Since 2024 I've been a television reporter in Madrid. I like being where things are happening: on a shoot, behind a microphone, at a concert or walking around the city with a camera. And then editing, which is another way of looking.

**RU**
> Я говорю, что рассказываю о разном. Иногда с камерой, иногда письменно, иногда разговаривая с кем-то и задавая вопросы. Я училась на журналистике и аудиовизуальной коммуникации, потому что мне всегда было трудно выбрать между тем, чтобы смотреть, и тем, чтобы рассказывать о том, что вижу. Кажется, я до сих пор немного там и осталась.
>
> С 2024 года я работаю телерепортёром в Мадриде. Мне нравится быть там, где что-то происходит: на съёмках, с микрофоном в руках, на концерте или гуляя по городу с камерой. А потом монтаж — это ещё один способ смотреть.

Debajo: Formación (Periodismo y Comunicación Audiovisual · URJC · 2021 — 2026), Idiomas (5), Herramientas (10), Base (Madrid), enlaces «Ver el trabajo» y «Experiencia completa».

## 3. Experiencia: los cuatro puestos

| Empresa · cargo · periodo | Descripción (ES) | EN | RU |
|---|---|---|---|
| **Grupo Cadena Media** · Reportera TV · 2024 — Actualidad | Cubro estrenos, eventos y ruedas de prensa para televisión, entrevisto a artistas, actores y figuras públicas y escribo los guiones de las piezas. Unas veces hay dos minutos para conseguirlo todo; otras, una conversación de diez. | I cover premieres, events and press conferences for television, interview artists, actors and public figures, and write the scripts for the pieces. Sometimes there are two minutes to get everything; sometimes, a ten-minute conversation. | Освещаю премьеры, мероприятия и пресс-конференции для телевидения, беру интервью у артистов, актёров и публичных людей и пишу сценарии сюжетов. Иногда на всё есть две минуты, иногда — разговор на десять. |
| **Annie Bonnie** · Comunicación corporativa · 2025 — 2026 | En una consultora de comunicación: artículos para el blog, TikToks, edición de vídeo, entrevistas y cobertura de eventos como MWC Madrid, además de un dashboard semanal con el rendimiento de las cuentas y lo que hacía la competencia. | At a communications consultancy: blog articles, TikToks, video editing, interviews and event coverage including MWC Madrid, plus a weekly dashboard on how the accounts were performing and what the competition was doing. | В консалтинговом агентстве по коммуникациям: статьи для блога, TikTok, монтаж видео, интервью и освещение мероприятий, включая MWC Madrid, плюс еженедельный дашборд о работе аккаунтов и действиях конкурентов. |
| **URJCmun** · Deputy Director for Social Media · 2022 — 2026 (tira: Communication Team → Camera Operator → Delegate → Deputy Director) | Redes sociales del Modelo de Naciones Unidas de la Universidad Rey Juan Carlos, incluida su edición TEEN: estrategia, calendario y métricas, contenido gráfico y audiovisual, y la coordinación de un equipo de reporteros durante la semana del congreso. | Social media for the Model United Nations at Universidad Rey Juan Carlos, including its TEEN edition: strategy, calendar and metrics, graphic and video content, and coordinating a team of reporters during conference week. | Соцсети Модели ООН Universidad Rey Juan Carlos, включая её издание TEEN: стратегия, календарь и метрики, графический и видеоконтент, координация команды репортёров в неделю конференции. |
| **Isocero** · Fotógrafa en hoteles · 2023 | Sesiones de retrato a familias en la piscina de los hoteles por la mañana, edición en Lightroom a mediodía y venta de las fotografías en el stand por la tarde. | Portrait sessions with families by the hotel pool in the morning, Lightroom editing at midday and selling the photographs at the stand in the afternoon. | Утром портретные съёмки семей у бассейна отеля, в полдень обработка в Lightroom, вечером продажа фотографий на стенде. |

## 4. Descripciones audiovisuales simplificadas (ES)

| Pieza | Descripción (bajo el título) | «Cómo se hizo» |
|---|---|---|
| 4 MINUTOS | Trabajo de último año: dos chicos de barrio pasan el rato, fuman y dicen tonterías hasta que la conversación se va a sitios más grandes. Un solo plano, sin cortes, en blanco y negro. Inspirado en Sueños y pan. | Un solo plano para dejar espacio a los silencios y a los cambios de tono entre la broma y algo más serio. Cuando los personajes se marchan, la cámara se queda mirando el espacio vacío. A mitad de rodaje el estabilizador se quedó sin batería y tocó improvisar. |
| Tras el sofá | Proyecto de último año: seis minutos de ficción rodados en un plató, en cuatro horas y sin salir de él. Una chica mata a su hermano sin querer y la novia de él descubre lo ocurrido. | Con un equipo de diez personas y un solo espacio, todo dependía de dónde estaban los actores y de cómo se revelaba lo ocurrido. Faltó tiempo para algunos planos y la continuidad se resolvió en montaje. |
| VERSIÓN BETA | Pitch de un minuto para una asignatura de Producción: una serie documental sobre jóvenes etiquetados como problemáticos, conducida por Pedro Aguado, presentador de Hermano Mayor. | Contacté con Pedro Aguado, gestioné la localización y grabé a los jóvenes. El montaje es rápido a propósito: la energía de la serie en un minuto. |
| Condición Perfecta | Videoclip para Silver Praxis, de la escena del rap underground: varias localizaciones y situaciones que siguen el tema con movimiento y una estética ligada al universo del artista. | Cinco días de rodaje, planos dentro de un coche y tomas aéreas con un dron que piloté yo misma. Sin guion técnico, el montaje salió de varias horas de probar combinaciones hasta encontrar el ritmo del tema. |
| Madrid a pie, cámara al cuello | Pieza personal: un paseo hablado a cámara por el centro de Madrid buscando lo que normalmente no enseñamos de los lugares más turísticos: basura, desperfectos, rincones abandonados. | — (Rol: Idea, grabación, presentación y montaje) |
| En el decorado de «9‑1‑1» | Pieza para las redes de Yoigo, producida en Annie Bonnie y grabada en el decorado de 9‑1‑1 en la estación de Chamartín. Presento el lugar y entrevisto al creador de contenido @telocuentosinspoilers sobre la serie. | — (Rol: Reportera y apoyo en edición) |
| MyMUN, paso a paso | Vertical para las redes de URJCmun que explica MyMUN, la aplicación del congreso, a quien la abre por primera vez: grabación de pantalla, grafismos y explicación a cámara. | — (Rol: Contenido y presentación · Grabación y edición — en equipo) |
| Probando el vivo X300 Pro | Para el TikTok de Yoigo, producida en Annie Bonnie: probar una función del teléfono y enseñar en cámara qué se puede hacer con ella, sin que la explicación parezca una explicación. | — (Rol: Contenido y presentación) |

EN y RU están en `messages/en.json` y `messages/ru.json`, escritos a partir del español con los mismos hechos.

## 5. Fotografía y Contacto

Fotografía: Entre tiendas y tambores («Segundo día de la acampada en Sol, en Madrid, durante las movilizaciones por el derecho a la vivienda: las tiendas, las pancartas, las conversaciones y la gente organizándose y compartiendo espacio.»), Retrato y editorial («Retratos hechos principalmente para una revista de moda y actualidad: una nave abandonada, una terraza, un local con neón rojo y calles con grafiti.»), Estudio y editorial («Sesiones de estudio con DJ y cantantes para sus propios proyectos: fondo blanco y atrezo, de televisores antiguos a una guitarra.»). Música en directo y Calle y documental conservan su descripción anterior de una frase. Sin párrafos de «Contexto».

Contacto (ES): «Si tienes una propuesta de trabajo, una colaboración o una pregunta sobre alguna de mis piezas, escríbeme. Me interesan sobre todo los reportajes, las entrevistas y los proyectos audiovisuales, en Madrid o fuera.» Email, LinkedIn, base e idiomas, sin más bloques.

## 6. Comparativa

Palabras visibles en `<main>` sin ALT, sin créditos, sin bloque de contacto y sin pie; alturas de página completa a 1280 px y 390 px, tema oscuro. Medido con Chromium headless sobre el build de producción antes (`c302c03`) y después.

| Página (ES) | Palabras antes | Palabras después | Alto 1280 antes → después | Alto 390 antes → después |
|---|---|---|---|---|
| Perfil | 278 | 114 (87 de prosa) | 2 599 → 1 633 px | 3 712 → 2 268 px |
| Experiencia | 353 | 170 | 2 336 → 1 444 px | 3 070 → 1 855 px |
| Contacto (invitación + «Qué busco») | 53 | 33 | 1 170 → 900 px | 1 200 → 872 px |
| 4 MINUTOS | 131 | 89 | 2 593 → 2 498 px | 2 181 → 1 963 px |
| Tras el sofá | 99 | 75 | 2 349 → 2 307 px | 1 838 → 1 726 px |
| VERSIÓN BETA | 89 | 53 | 2 070 → 2 001 px | 1 595 → 1 430 px |
| Condición Perfecta | 77 | 70 | 2 312 → 2 296 px | 1 892 → 1 806 px |
| Madrid a pie | 105 | 36 | 2 267 → 2 056 px | 2 022 → 1 677 px |
| 9‑1‑1 / MyMUN / vivo | 68 / 76 / 73 | 41 / 33 / 39 | ≈2 220 → ≈2 080 px | ≈1 930 → ≈1 700 px |
| Trabajo (listados) | 234 | 123 | 4 545 → 4 479 px | 6 200 → 5 643 px |
| Portada | 182 | 167 | 3 399 → 3 354 px | 4 796 → 4 731 px |
| Entre tiendas y tambores | 46 | 37 | 11 575 → 11 433 px | sin cambio relevante |

EN y RU siguen la misma proporción (Perfil EN 286 → 117, Experiencia EN 324 → 150, Perfil RU 252 → 117, Experiencia RU 270 → 124).

Párrafos duplicados (mismo texto en dos sitios de una página): 0 antes y 0 después. Secciones redundantes eliminadas: «Lo que hago» (repetía Trabajo), «Cómo trabajo», lista de responsabilidades + apunte por puesto (la lista y el apunte decían lo mismo), «Contexto» + «Cómo se hizo» en verticales (ambos describían la pieza), «Qué busco», descripciones en listados y en el monitor (repetían la ficha).

Fichas audiovisuales: 4 MINUTOS 129 → 87 palabras de texto propio; Tras el sofá 96 → 72; VERSIÓN BETA 87 → 51; Condición Perfecta 72 → 65; verticales 61–95 → 27–35.

## 7. Capturas antes / después

`docs/editorial/phase4-captures/` (JPEG, página completa): Perfil, Experiencia, Contacto, 4 MINUTOS y Trabajo a 1280 px en oscuro; Perfil en claro; Perfil y Experiencia a 390 px. Cada una con prefijo `before-` y `after-`.

## 8. QA técnico y visual

| Comprobación | Resultado |
|---|---|
| `pnpm lint` · `pnpm typecheck` · `pnpm build` | 0 errores · 64 páginas estáticas |
| Paridad estructural ES/EN/RU | idéntica (48 claves retiradas por idioma, las mismas) |
| Tema claro y oscuro, forzados por separado (`data-theme` + `localStorage`) | 72 capturas; sin solapes, cortes ni desbordamiento horizontal |
| Rastreo de enlaces internos desde la portada | 76 páginas, 0 rotas (incluye redirecciones de idioma) |
| ALT | 120 por idioma, idénticos a la rama anterior |
| Créditos | sin cambios en ninguna obra |
| Metadatos SEO | título y descripción presentes en las páginas revisadas; la descripción de cada proyecto es ahora su `description` |
| Reproducción | póster y botón de reproducir presentes en portada, Trabajo y fichas; sin cambios en el reproductor |
| Accesibilidad | encabezados h1/h2 conservados, `aria-label` en tira de progresión y navegación, enlaces con texto visible |

Limitaciones: sin Safari, sin dispositivos reales, sin lector de pantalla; los vídeos se verifican por póster, no reproducidos.

## 9. Frases nuevas pendientes de aprobación de Sofía

Primera persona o afirmaciones sobre ella que no son literales. Fuente en la ficha entre paréntesis.

- Perfil · «Desde 2024 trabajo como reportera de televisión en Madrid. Me gusta estar donde están pasando cosas: en un rodaje, detrás de un micrófono, en un concierto o caminando por la ciudad con una cámara. Y después editar, que es otra manera de mirar.» (P0041, P0397, P0019, portfolio)
- Experiencia · Grupo Cadena Media: descripción completa (P0053–P0054, CV).
- Experiencia · Annie Bonnie: descripción completa (P0088–P0089, CV).
- Experiencia · URJCmun: descripción completa (P0069, P0075–P0076, CV).
- Experiencia · Isocero: descripción completa (P0104–P0108).
- 4 MINUTOS · descripción y «Cómo se hizo» (P0231–P0232, P0236, P0241).
- Tras el sofá · descripción y «Cómo se hizo» (P0253, P0257, P0261, P0266).
- VERSIÓN BETA · descripción y «Cómo se hizo» (P0274, P0278).
- Condición Perfecta · descripción y «Cómo se hizo» (P0297, P0301, P0309).
- Madrid a pie · descripción y rol (P0122, P0131, P0138).
- 9‑1‑1 · descripción y rol «Reportera y apoyo en edición» (P0163, P0207).
- MyMUN · descripción y rol «Grabación y edición — en equipo» (P0203, P0207, P0213).
- vivo X300 Pro · descripción y rol (P0189, P0192, P0193).
- Entre tiendas y tambores, Retrato y editorial, Estudio y editorial · descripciones (P0380, P0384, P0365, P0350).
- Contacto · «Me interesan sobre todo los reportajes, las entrevistas y los proyectos audiovisuales, en Madrid o fuera.» (P0397, P0403)

Frases literales conservadas: Perfil párrafo 1 (P0012); «la cámara se queda mirando el espacio vacío» (P0241); «sin que la explicación parezca una explicación» (P0193).

## 10. Problemas factuales o de permisos pendientes

Sin cambios respecto a Fase 1–3: 16 frente a 18 reporteros en URJCmun (la web ya no da la cifra); rol de URJCmun en 2027 (no publicado); OPPO frente a vivo (la web dice vivo, que es lo que muestra el vídeo); festival de las fotografías de conciertos (sin texto); créditos y fechas pendientes de 4 MINUTOS, Tras el sofá, VERSIÓN BETA y Condición Perfecta; «prácticas» frente a «Comunicación corporativa» en Annie Bonnie (la web mantiene el cargo del CV y dice «producida en Annie Bonnie»); permisos de uso de imagen de terceros en los vídeos verticales, según el registro de Fase 1. El reporter reel sigue sin publicar.

## 11. Prueba de las tres lecturas

**Diez segundos** (portada o Perfil): nombre, «Reportera de televisión», Madrid, un vídeo en el que habla a cámara, y en Perfil dos párrafos cortos con retrato. Se entiende quién es y qué hace.

**Un minuto** (Trabajo): cuatro verticales con póster y título, cuatro obras con fotograma, formato y rol, cinco series fotográficas y el archivo. No hay ningún bloque de texto que leer para decidir qué abrir; el texto más largo de la página es de dos frases.

**Cinco minutos** (fichas y Experiencia): cada obra tiene una descripción de dos o tres frases, el rol, los créditos y, en las cuatro audiovisuales, una nota de cómo se hizo con lo que el vídeo no cuenta; Experiencia da una frase de trabajo real por puesto y enlaza a las piezas. El Word, las anécdotas y el detalle completo siguen en `SOFIA_SOURCE_RESPONSES.md`, `PHASE3_EDITORIAL_REWRITE.md` y `SOFIA_VOICE_PROFILE.md` para quien edite después.

## 12. Perfil, primera pantalla (segunda pasada, 2026-10-11)

El problema que quedaba: la presentación se componía como titular serif de 97 palabras en dos párrafos y la profesión no aparecía en la primera pantalla. Un responsable de selección veía una foto, un nombre y un bloque de texto.

**Nueva jerarquía:** etiqueta «Perfil · Madrid» → nombre (sin cambios) → subtítulo profesional en serif con el filo rojo de la portada → presentación de tres frases en tipografía de lectura (sans, 1–1,1 rem, 50 ch, interlineado 1,6, color suave) → dos enlaces. Se retira el segundo párrafo de Fase 4 («Desde 2024 trabajo como reportera…»): la profesión ya la da el subtítulo y la enumeración de lugares no añadía una idea distinta. Se probó la composición sin párrafo de apoyo y no lo necesita: el bloque queda centrado junto al retrato con aire arriba y abajo. La fotografía, su encuadre, el header y el resto de la página no cambian. Sin animaciones ni elementos nuevos; el subtítulo reutiliza la voz del rol de la portada.

**Textos finales**

| | Etiqueta | Subtítulo | Presentación |
|---|---|---|---|
| ES | Perfil · Madrid | Periodista y reportera de televisión | Digo que cuento cosas. A veces con una cámara, otras escribiendo o haciendo preguntas. Estudié Periodismo y Comunicación Audiovisual porque siempre me ha costado elegir entre mirar y contar lo que miro. |
| EN | Profile · Madrid | Journalist and television reporter | I say I tell stories. Sometimes with a camera, sometimes in writing or by asking questions. I studied Journalism and Audiovisual Communication because I've always found it hard to choose between looking and telling what I see. |
| RU | Профиль · Мадрид | Журналист и телерепортёр | Я говорю, что рассказываю о разном. Иногда с камерой, иногда письменно или задавая вопросы. Я училась на журналистике и аудиовизуальной коммуникации, потому что мне всегда было трудно выбрать между тем, чтобы смотреть, и тем, чтобы рассказывать о том, что вижу. |

Origen: P0012 de la ficha, con la segunda frase condensada según la propuesta del propietario («otras escribiendo o haciendo preguntas» en lugar de la triple «a veces»). Se omite el cierre literal «Supongo que sigo un poco ahí.» por atenerse a la propuesta; es literal de Sofía y puede añadirse sin tocar nada más si se prefiere ese remate. El subtítulo es el `personRole` ya usado en los metadatos.

**Medidas** (bloque de presentación, sin ficha ni contacto)

| | Antes | Después |
|---|---|---|
| Palabras en la primera pantalla (ES / EN / RU) | 97 / 100 / 100 | 49 / 53 / 54 |
| Alto de la primera sección a 1280 px (ES / EN / RU) | 760 / 740 / 833 px | 740 / 740 / 740 px |
| Alto de la primera sección a 390 px (ES / EN / RU) | 1 152 / 1 155 / 1 233 px | 902 / 927 / 953 px |

En móvil el orden es retrato → etiqueta → nombre → profesión → texto → enlaces; el nombre conserva su tamaño y la primera sección cabe en poco más de un viewport sin reducir nada a la fuerza.

**Archivos:** `messages/{es,en,ru}.json` (Profile: `aboutPageEyebrow`, nueva `role`, `bio`; `bioMore` eliminada), `src/app/[locale]/about/page.tsx`, `src/styles/showcase.css` (`.about-role`, `.about-lede`; `.about-body` eliminada). Capturas: `docs/editorial/phase4-captures/perfil-v2-{before,after}-*.jpg` (escritorio oscuro y claro, móvil oscuro, ruso).

**QA:** `pnpm lint`, `pnpm typecheck`, `pnpm build` sin errores (64 páginas). Capturas en escritorio y móvil, tema claro y oscuro forzados, ES/EN/RU: sin cortes ni desbordamiento. Sin Safari ni dispositivos reales.

**Lectura como responsable de selección:** 1) la profesión se lee en la segunda línea, antes que el texto; 2) tres frases, con una expresión suya y ninguna explicación; 3) no hay frases redundantes: la etiqueta da el lugar, el subtítulo el oficio, el texto la voz; 4) retrato y nombre dominan la pantalla, el texto es secundario por tamaño, peso y color; 5) los dos enlaces quedan a la vista bajo el texto, sin hacer scroll en escritorio.
