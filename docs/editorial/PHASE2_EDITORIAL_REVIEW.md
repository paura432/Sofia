# Fase 2 · Revisión editorial adversarial y pulido final

> **Nota (Fase 3, 2026-10-11):** este informe describe un estado intermedio. Los bloques pregunta/respuesta se sustituyeron después por prosa editorial; ver `PHASE3_EDITORIAL_REWRITE.md`.

Fecha: 2026-10-11 · Rama: `content/editorial-review-final` · Base: `main` en `e23d99a` (Fase 1).

Revisión independiente del portfolio tal y como quedó tras integrar la ficha de Sofía. Se ha leído todo el texto publicado de forma consecutiva (ES, con contraste EN/RU), se ha comparado con la versión previa a la Fase 1 (`14f830d`) y se han recorrido las páginas en escritorio y móvil con capturas. Esta es una revisión heurística: no se ha medido la comprensión de usuarios reales.

## 1. Estado inicial y final

| Métrica | Fase 1 (inicio) | Final | Nota |
|---|---|---|---|
| Palabras en `messages/es.json` (sin ALT) | 7 381 | 6 169 | −16 % |
| Párrafos literales de Sofía publicados | 91 | 67 | 24 pasan a «retenidos en revisión» (§7) |
| Párrafos literales con alteración no documentada | 0 | 0 | Verificado por script (§9) |
| Bloques «Con mis palabras» | 56 | 40 | |
| Encabezados de pregunta distintos | 29 | 25 | 17 acortados |
| Alto de Experiencia (escritorio 1280) | 5 567 px | 4 839 px | |
| Alto de Perfil (escritorio 1280) | 3 521 px | 3 222 px | |

## 2. Reducción real de texto por apartado

Palabras de los bloques «Con mis palabras» en ES.

| Apartado | Fase 1 | Final | Diferencia |
|---|---|---|---|
| 4 MINUTOS | 357 | 341 | −16 |
| Tras el sofá | 338 | 261 | −77 |
| VERSIÓN BETA | 309 | 148 | −161 |
| Madrid a pie, cámara al cuello | 366 | 268 | −98 |
| En el decorado de «9‑1‑1» | 177 | 91 | −86 |
| MyMUN, paso a paso | 238 | 164 | −74 |
| Probando el vivo X300 Pro | 224 | 143 | −81 |
| Silver Praxis — Condición Perfecta | 277 | 102 | −175 |
| Retrato y editorial | 23 | 17 | −6 |
| Entre tiendas y tambores | 151 | 139 | −12 |
| Estudio y editorial | 24 | 19 | −5 |
| Experiencia · Grupo Cadena Media | 233 | 225 | −8 |
| Experiencia · URJCmun | 272 | 233 | −39 |
| Experiencia · Annie Bonnie | 247 | 192 | −55 |
| Experiencia · Isocero | 312 | 182 | −130 |
| Perfil · Con mis palabras | 346 | 252 | −94 |
| Contacto · Con mis palabras | 241 | 140 | −101 |
| **Total** | **4 135** | **2 917** | **−1 218 (−29 %)** |

Las diferencias pequeñas (4 MINUTOS, Grupo Cadena Media, series fotográficas) corresponden solo a encabezados acortados: ahí no se ha retirado ningún párrafo.

## 3. Problemas detectados y eliminados

**A. Texto artificial y repetición**

- La estructura del formulario se había trasladado íntegra: cuatro vídeos verticales repetían las mismas cinco preguntas y cuatro piezas audiovisuales las mismas cuatro, con encabezados de hasta once palabras («¿Recuerdas alguna decisión de rodaje, guion, montaje o producción que tomaras?»). Se han acortado 17 encabezados en los tres idiomas; la respuesta sigue encajando con la pregunta.
- «Porque enseña una parte de mi trabajo que no siempre se ve en mis piezas más periodísticas» (MyMUN) y «Porque enseña una parte de mí que no se ve tanto en mis trabajos más periodísticos» (vivo X300 Pro) abrían igual en dos páginas consecutivas. Retirados ambos bloques de justificación; se conserva el de «Madrid a pie», que es el único con contenido propio («explica bastante bien cómo miro»).
- Annie Bonnie: la respuesta empieza «Sí, aunque añadiría…» pero el encabezado de Fase 1 («¿Qué responsabilidades eran tuyas?») no era una pregunta de sí o no. Encabezado corregido a «¿Es correcta esta lista de responsabilidades?», que es lo que preguntaba el formulario y lo que precede en la página.

**B. Exceso de información**

- Respuestas que solo repetían un dato ya visible en la ficha del proyecto (año, lugar, organización): «2025, durante mis prácticas en Annie Bonnie», «2025, para URJCmun», «Lo hice en septiembre de 2026, en el centro de Madrid…», «Fue en 2025, durante mis prácticas en Annie Bonnie, en Madrid». Retiradas (4).
- Bloques que repetían el anterior casi palabra por palabra: Silver Praxis (coche, dron y montaje contados tres veces), VERSIÓN BETA (Pedro Aguado y «un minuto» tres veces), «9‑1‑1» (decorado y entrevista tres veces), Isocero (sesión, edición, venta y caja dos veces), URJCmun («cargos y fechas» ya en la franja de progresión), Annie Bonnie (el dashboard semanal dos veces). Retirados.
- Contacto: el «proyecto ideal» solapaba con «qué oportunidades te interesan». Se conservan las dos respuestas que responden a lo que un empleador necesita saber (qué busca; Madrid o fuera; contrato o freelance).

**C. Voz de Sofía**

- Ningún texto nuevo le atribuye pensamientos. Las únicas frases en primera persona redactadas por el equipo son enunciados de hecho verificados en su ficha (ver §6).
- Perfil: el bloque «¿Qué trabajos enseñarías primero?» citaba «Lo que vibra no muere», un proyecto que no existe en la web, y su párrafo central sigue bloqueado por la contradicción 16/18 reporteros, de modo que «Y por último…» quedaba colgado. Bloque retirado hasta que exista el proyecto o Sofía aclare el dato. Se mantienen sus respuestas sobre cámara, entrevista y «multidisciplinar», que son las que mejor la distinguen.

**D. Ritmo visual**

- Perfil: «Con mis palabras» se ha movido debajo de «Lo que hago», para que el visitante vea primero qué hace y dónde verlo, y después la lea.
- Páginas de proyecto: el vídeo o la fotografía siguen abriendo la página; después van los datos y el texto. Ninguna página de vídeo vertical supera ya los 270 palabras de relato.
- Experiencia sigue siendo una página sin imágenes por naturaleza; con los recortes baja un 13 % de alto y cada puesto tiene como mucho dos bloques.

**E. Precisión profesional**

- 4 MINUTOS: «Rol» decía solo «Dirección»; Sofía escribe «Me encargué de la dirección, el guion, la grabación y el montaje». Rol actualizado a «Dirección, guion, grabación y montaje» (SOFIA_STRUCTURED). Los créditos de terceros no se tocan.
- VERSIÓN BETA no tenía ningún rol en la ficha. Añadido «Producción, grabación y montaje — Sofía Chernikova», que es la lectura estructurada de su respuesta.
- Trabajo · Audiovisual: «Dirigí los dos cortometrajes y monté “Tras el sofá”» pasa a «Dirigí y monté los dos cortometrajes», coherente con lo anterior.
- Trabajos individuales frente a colectivos: sigue visible en sus propias palabras («El proyecto lo hice yo de principio a fin» en Madrid; «Éramos diez personas» en Tras el sofá; «fui una de las personas que aparece delante de cámara» en el vivo).

**F. Prueba de 15 segundos (portada)**

Quién es, a qué se dedica, un vídeo reproducible, los cuatro tipos de trabajo y el contacto están en la primera pantalla o a un scroll. Sin cambios necesarios.

**G. Lectura completa**

Descubrir (portada) → explorar (Trabajo) → comprender (proyecto: medio, datos, relato) → conocer (Perfil, Experiencia) → contactar. Las fotografías no exigen leer trayectoria; los cortos se reproducen antes de cualquier párrafo.

## 4. Problemas todavía pendientes

- Experiencia es la página más larga en proporción a su interés para un visitante nuevo. Una solución mejor pasaría por enlazar más proyectos desde cada puesto, y eso depende de material nuevo, no de texto.
- El bloque «¿Es correcta esta lista de responsabilidades?» sigue siendo una fórmula de formulario; es la única manera honesta de dar sentido al «Sí, aunque añadiría…» sin tocar sus palabras.
- Las series «Música en directo» y «Calle y documental» no tienen introducción propia porque las respuestas de Sofía sobre conciertos están archivadas bajo otro encabezado del formulario (ver §8).
- Reporter reel (`published: false`) tiene `dek`, `context` y `roles` casi idénticos; no se ve, pero conviene limpiarlo cuando se publique.

## 5. Frases originales de Sofía conservadas

67 párrafos literales (más `Profile.bio` y `bioMore`), todos verificados como coincidencia exacta con el DOCX o como una de las 7 correcciones ortográficas documentadas en Fase 1 (P0024, P0095, P0163, P0260, P0350, P0365, P0384). Ningún párrafo publicado ha sido resumido, parafraseado ni recortado por dentro: la unidad mínima retirada ha sido siempre un párrafo completo.

## 6. Textos nuevos redactados editorialmente en esta fase

| Ubicación | Texto | Tipo |
|---|---|---|
| `Projects.items.4-minutos.roles[0]` | Dirección, guion, grabación y montaje — Sofía Chernikova | SOFIA_STRUCTURED (P0236) |
| `Projects.items.version-beta.roles[0]` | Producción, grabación y montaje — Sofía Chernikova | SOFIA_STRUCTURED (P0278) |
| `Work.audiovisualText` | Dirigí y monté los dos cortometrajes. Del videoclip de Silver Praxis hice el rodaje y la posproducción. | CLAUDE_PROPOSAL, hechos de la ficha |
| `Contact.opportunitiesEyebrow` | Con mis palabras | Etiqueta de navegación |
| 17 encabezados de pregunta | ver tabla al final | Navegación editorial, no cita |

Todo con su versión EN y RU.

## 7. Cambios revertidos o retirados después de la revisión

Veinticuatro párrafos de Sofía publicados en Fase 1 dejan de mostrarse. Siguen íntegros en `SOFIA_SOURCE_RESPONSES.md` y en la matriz de Fase 1; cualquiera puede reinstaurarse sin reescribir nada.

| Ubicación (Fase 1) | ID | Texto retirado (inicio) | Motivo |
|---|---|---|---|
| `Contact.opportunities[1]` «Si mañana te ofrecieran un proyecto ideal, ¿cómo sería?» | P0400 | Un proyecto en el que pudiera salir con una cámara, conocer a gente interesante y contar a… | Proyecto ideal: aspiracional, solapa con el bloque 1 |
| `Experience.items.isocero.story[1]` «¿Qué hacías tú desde la sesión hasta la entrega de las fotos?» | P0111 | Me encargaba prácticamente de todo el proceso.… | Repite el bloque anterior (sesión, edición, venta, caja) |
| `Experience.items.isocero.story[1]` «¿Qué hacías tú desde la sesión hasta la entrega de las fotos?» | P0112 | Primero hacía la sesión y seleccionaba las fotografías que tenían potencial. Después desca… | Repite el bloque anterior (sesión, edición, venta, caja) |
| `Experience.items.isocero.story[1]` «¿Qué hacías tú desde la sesión hasta la entrega de las fotos?» | P0113 | Después enseñaba las fotografías a los clientes en el stand y me encargaba de todo el proc… | Repite el bloque anterior (sesión, edición, venta, caja) |
| `Experience.items.isocero.story[1]` «¿Qué hacías tú desde la sesión hasta la entrega de las fotos?» | P0114 | Era un trabajo en el que la fotografía era solo una parte. Tenía que saber acercarme a des… | Repite el bloque anterior (sesión, edición, venta, caja) |
| `Experience.items.urjcmun.story[0]` «¿Qué cargos tuviste y en qué fechas?» | P0068 | Empecé en el equipo de Comunicación de URJCmun en 2022. Desde entonces he pasado por disti… | Cargos y fechas ya en la franja de progresión y el periodo |
| `Profile.voice[3]` «¿Qué trabajos enseñarías primero?» | P0033 | Lo que vibra no muere. Mi proyecto audiovisual sobre la noche y la cultura techno en Madri… | Cita «Lo que vibra no muere», proyecto que no existe en la web; el párrafo central sigue bloqueado (16/18 reporteros) y «Y por último» quedaba colgado |
| `Profile.voice[3]` «¿Qué trabajos enseñarías primero?» | P0035 | Y por último, mis coberturas de eventos, estrenos y entrevistas. Me gusta trabajar cuando … | Cita «Lo que vibra no muere», proyecto que no existe en la web; el párrafo central sigue bloqueado (16/18 reporteros) y «Y por último» quedaba colgado |
| `Projects.items.short-form-001.story[1]` «¿En qué año fue y dónde?» | P0127 | Lo hice en septiembre de 2026, en el centro de Madrid, recorriendo algunas de las zonas má… | Dato (año/lugar) ya visible en ficha y pie |
| `Projects.items.short-form-002.story[3]` «¿Qué estaba pasando?» | P0166 | Nos habíamos desplazado hasta el decorado de 911 y aproveché la visita para introducir al … | Repite bloques 1 y 3 (decorado, entrevista) |
| `Projects.items.short-form-002.story[1]` «¿En qué año fue?» | P0159 | 2025, durante mis prácticas en Annie Bonnie.… | Dato (año) ya visible en ficha |
| `Projects.items.short-form-003.story[4]` «¿Por qué incluirías este vídeo en tu portfolio?» | P0219 | Porque enseña una parte de mi trabajo que no siempre se ve en mis piezas más periodísticas… | Justificación de inclusión; autoevaluación |
| `Projects.items.short-form-003.story[1]` «¿En qué año fue?» | P0210 | 2025, para URJCmun.… | Dato (año) ya visible en ficha |
| `Projects.items.short-form-004.story[4]` «¿Por qué incluirías este vídeo en tu portfolio?» | P0196 | Porque enseña una parte de mí que no se ve tanto en mis trabajos más periodísticos.… | Justificación de inclusión; abre igual que la de MyMUN |
| `Projects.items.short-form-004.story[4]` «¿Por qué incluirías este vídeo en tu portfolio?» | P0197 | Tengo soltura delante de cámara y puedo cambiar de registro dependiendo de lo que necesite… | Justificación de inclusión; abre igual que la de MyMUN |
| `Projects.items.short-form-004.story[1]` «¿En qué año fue y dónde?» | P0186 | Fue en 2025, durante mis prácticas en Annie Bonnie, en Madrid.… | Dato (año/lugar) ya visible en ficha |
| `Projects.items.silver-praxis-condicion-perfecta.story[3]` «¿Qué parte del resultado te gusta más?» | P0309 | Me gusta la variedad de recursos que pude trabajar dentro de un mismo proyecto. Pasar de g… | Repite bloques 2 y 3; autoevaluación |
| `Projects.items.silver-praxis-condicion-perfecta.story[2]` «¿Recuerdas alguna decisión de rodaje, guion, montaje o producción que tomaras?» | P0305 | Una parte importante del rodaje fue combinar localizaciones y tipos de plano para que el v… | Repite bloque 2 (coche, dron, montaje) |
| `Projects.items.tras-el-sofa.story[1]` «¿Qué hiciste tú exactamente?» | P0257 | Me encargué de la dirección y el montaje. Durante el rodaje, mi trabajo consistió en coord… | Rol ya en «Rol»/créditos; resto genérico |
| `Projects.items.version-beta.story[3]` «¿Qué parte del resultado te gusta más?» | P0286 | Destacaría que el proyecto me permitió trabajar en distintas fases de una producción audio… | Autoevaluación; repite el bloque «qué hiciste» |
| `Projects.items.version-beta.story[2]` «¿Recuerdas alguna decisión de rodaje, guion, montaje o producción que tomaras?» | P0282 | La principal decisión fue concentrar el concepto de una serie documental en un minuto. Par… | Repite bloques 1 y 2 (un minuto, Pedro Aguado) |
| `Projects.items.short-form-001.story[2].paragraphs[1]` | P0132 | También decidí qué quería enseñar y desde qué mirada. La gracia estaba precisamente en no … | Repite la idea de las «antifotos» del bloque siguiente |
| `Projects.items.short-form-001.story[4].paragraphs[2]` | P0144 | También es un proyecto bastante mío porque no había un encargo detrás que me dijera qué te… | Repite «no era para ningún medio» del bloque 1 |
| `Experience.items.annie-bonnie.story[1].paragraphs[2]` | P0097 | Y quizá lo que más me enseñó fue el trabajo semanal de análisis de redes y competencia. Me… | Repite el dashboard semanal del bloque anterior |

| Encabezado Fase 1 (ES) | Encabezado final (ES) |
|---|---|
| ¿Cómo surgió el proyecto y qué cuenta la pieza? | ¿Cómo surgió? |
| ¿Qué hiciste tú exactamente? | ¿Qué hiciste tú? |
| ¿Recuerdas alguna decisión de rodaje, guion, montaje o producción que tomaras? | ¿Qué decisiones recuerdas? |
| ¿Por qué incluirías este vídeo en tu portfolio? | ¿Por qué está en tu portfolio? |
| ¿Dónde y cuándo hiciste estas fotografías? ¿Por qué estabas allí? | ¿De qué son estas fotografías? |
| ¿Qué te llamó la atención o qué querías fotografiar? | ¿Qué querías fotografiar? |
| ¿Cómo te sientes trabajando delante de cámara? | ¿Cómo te sientes delante de cámara? |
| Cuando haces una entrevista, ¿qué intentas conseguir? | ¿Qué intentas conseguir en una entrevista? |
| ¿Qué haces tú en una cobertura, desde que te preparas hasta que acaba? | ¿Qué haces en una cobertura? |
| ¿Qué hacías realmente y qué coordinabas con otras personas? | ¿Qué hacías y qué coordinabas? |
| ¿Qué contenido o momento de URJCmun te representa más? | ¿Qué momento te representa más? |
| ¿Qué responsabilidades eran tuyas? | ¿Es correcta esta lista de responsabilidades? |
| ¿Qué proyecto, pieza o actividad concreta recuerdas? | ¿Qué recuerdas especialmente? |
| ¿Cómo era un día normal de trabajo allí? | ¿Cómo era un día normal? |
| ¿Qué tipo de oportunidades te gustaría recibir? | ¿Qué oportunidades te interesan? |
| ¿Te interesan proyectos fuera de Madrid? ¿Contrato, freelance o colaboraciones? | ¿Fuera de Madrid? ¿Contrato, freelance, colaboraciones? |

Ningún cambio de Fase 1 se ha revertido a la versión anterior: comparados con `14f830d`, la biografía en sus palabras, los relatos de proyecto, los ALT corregidos y las páginas de detalle de los vídeos verticales son MEJORA. Los bloques de datos duplicados y las justificaciones se han considerado NEUTRO o REGRESIÓN de legibilidad y son los que se retiran.

## 8. Contradicciones factuales sin resolver

Sin cambios respecto a Fase 1 (`PHASE1_REPORT.md` §5): 16 frente a 18 reporteros; cargo en URJCmun 2027; OPPO frente a vivo (el vídeo muestra «vivo»); respuestas sobre conciertos archivadas bajo «Calle y documental» y nombre del festival; palabra ausente en P0018; créditos y fechas de 4 MINUTOS, Tras el sofá, VERSIÓN BETA y Condición Perfecta; permisos no marcados; denominación «prácticas» en Annie Bonnie; URLs de Instagram y YouTube. Esta fase no publica ninguno de esos datos.

## 9. QA técnico

| Comprobación | Resultado |
|---|---|
| `pnpm lint` | 0 errores |
| `pnpm typecheck` | 0 errores |
| `pnpm build` | 64 páginas estáticas, sin avisos |
| Paridad estructural ES/EN/RU (mismas rutas JSON) | 0 diferencias |
| Párrafos publicados de Sofía literales o con corrección documentada | 67 / 67 |
| Párrafos pendientes filtrados a la web | 0 |
| Capturas (escritorio 1280 y móvil 390, claro y oscuro, ES/EN/RU) | 21 páginas revisadas, sin solapes ni cortes |

## 10. Limitaciones de la revisión visual

Capturas de página completa con Chromium sin interfaz; no se ha probado en Safari ni en dispositivos reales, ni con lector de pantalla. Los vídeos Mux se han comprobado como póster y botón de reproducción, no reproduciéndolos en la captura. La valoración de «agotamiento» o «ritmo» es juicio editorial, no medición.

## 11. Naturalidad y legibilidad antes/después

Antes, leída de corrido, la web sonaba a transcripción de cuestionario: la misma pregunta larga repetida en cuatro páginas, respuestas de una línea con un dato, y cada proyecto cerrando con una autoevaluación. Después, cada bloque aporta algo distinto (origen, qué hizo ella, una decisión concreta, una anécdota), las preguntas caben en una línea y los datos están solo en la ficha. El tono de Sofía no cambia porque no se ha tocado ninguna frase suya; lo que cambia es la selección.

## 12. Recomendación

La rama está lista para revisión humana. Antes de publicar conviene que Sofía confirme dos cosas que esta fase decide por criterio editorial y no por dato: la retirada del bloque «¿Qué trabajos enseñarías primero?» hasta que exista «Lo que vibra no muere», y los dos roles estructurados (4 MINUTOS y VERSIÓN BETA).
