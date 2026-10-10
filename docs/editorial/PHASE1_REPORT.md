# FASE 1 · Integración del Word en el portfolio — informe

Rama: `content/phase-1-word-integration` (desde `main` @ 14f830d). Fuentes: el DOCX de Sofía (SHA-256 `a66dde13…64993f`), [SOFIA_SOURCE_RESPONSES.md](./SOFIA_SOURCE_RESPONSES.md) y [SOFIA_VOICE_PROFILE.md](./SOFIA_VOICE_PROFILE.md). Matriz completa en [PHASE1_PROVENANCE_MATRIX.md](./PHASE1_PROVENANCE_MATRIX.md); fotografías en [PHASE1_PHOTO_REVIEW.md](./PHASE1_PHOTO_REVIEW.md).

## 1. Qué ha cambiado en el portfolio

Un único mecanismo nuevo, «Con mis palabras»: bloques formados por la pregunta original del formulario (nuestra, como encabezado de navegación) y los párrafos de Sofía tal cual, separados como ella los separó. Se renderizan con el componente `StoryBlocks` sobre la rejilla editorial existente. No hay rediseño ni dependencias nuevas.

| Destino | Contenido de Sofía incorporado | Párrafos |
|---|---|---|
| Perfil (lede + cuerpo) | P0012, P0013 sustituyen la bio editorial anterior | 2 |
| Perfil · Con mis palabras | Qué disfruta (P0017, P0019) · Delante de cámara (P0023–24) · Entrevista (P0028–30) · Trabajos que enseñaría (P0033, P0035) · Cómo no describirse (P0039–41) | 12 |
| Experiencia · Grupo Cadena Media | Cobertura (P0053–54) · Entrevistas recordadas (P0058–60) | 5 |
| Experiencia · URJCmun | Cargos (P0068) · Qué hacía (P0074–76) · Momento que la representa (P0080–82) | 7 |
| Experiencia · Annie Bonnie | Responsabilidades (P0088–90) · Proyecto recordado (P0095–97) | 6 |
| Experiencia · Isocero | Día normal (P0104–107) · De la sesión a la entrega (P0111–114) | 8 |
| Reportajes · Madrid a pie, cámara al cuello (nueva ficha) | P0122–123, P0127, P0131–132, P0136–138, P0142–144 | 11 |
| Reportajes · En el decorado de «9-1-1» (nueva ficha) | P0155, P0159, P0163, P0166 | 4 |
| Reportajes · MyMUN, paso a paso (nueva ficha) | P0207, P0210, P0213, P0216, P0219 | 5 |
| Reportajes · Probando el vivo X300 Pro (nueva ficha) | P0181, P0186, P0189, P0192–193, P0196–197 | 7 |
| 4 MINUTOS | P0231–232, P0236, P0241, P0244 + año 2025 | 5 |
| Tras el sofá | P0253, P0257, P0260, P0263 | 4 |
| VERSIÓN BETA | P0274, P0278, P0282, P0286 | 4 |
| Silver Praxis · Condición Perfecta | P0297, P0301, P0305, P0309 | 4 |
| Entre tiendas y tambores | P0380, P0384 | 2 |
| Estudio y editorial · Retrato y editorial | P0350 · P0365 (respuestas parciales) | 2 |
| Contacto · Qué me gustaría hacer ahora | P0397, P0400, P0408 | 3 |
| **Total publicado** | | **91** |

Datos factuales tomados de sus respuestas y aplicados en `src/content/projects.ts`: año y lugar del vídeo de Madrid (2026, Madrid); organización, año y experiencia vinculada de los vídeos de Yoigo (Annie Bonnie, 2025) y MyMUN (URJCmun, 2025); año de 4 MINUTOS (2025). Las cuatro piezas verticales tienen ahora página de detalle (`detailPage: true`) y enlace «Ver proyecto» desde Trabajo y desde la portada.

## 2. Textos conservados (EXISTING_COPY)

Títulos y descripciones breves de los 13 proyectos, créditos de 4 MINUTOS y Condición Perfecta, resumen de portada (Hero), textos de navegación de Trabajo, fichas de Experiencia (cargo, periodo, responsabilidades), «Lo que hago», formación, idiomas, herramientas y metadatos. Detalle y motivo en la matriz.

## 3. Redacción de Claude (CLAUDE_PROPOSAL)

- Ningún párrafo nuevo atribuible a Sofía. No se ha redactado ninguna declaración en primera persona.
- Rótulos de sección: «Con mis palabras» (eco del título del formulario) y «Qué me gustaría hacer ahora» (título de la sección 06 del formulario), traducidos a EN/RU.
- 27 textos ALT corregidos tras inspección visual (12 por empezar con «el mismo hombre / la misma persona», que no se entienden en el visor aislado; 15 por error u omisión objetiva: pancarta «ESPEKULACIÓN» con K, consola portátil en lugar de móvil, letrero «Tío Pepe» omitido, gestos descritos mal, etc.). Antes/después en el informe fotográfico.

## 4. Correcciones documentadas sobre texto de Sofía (8 de 91 párrafos)

| P | Cambio | Tipo |
|---|---|---|
| P0024 | punto final | puntuación |
| P0095 | «entrevistado» → «entrevistando» | errata evidente (forma verbal) |
| P0159 | punto final | puntuación |
| P0163 | «video» → «vídeo» (ella escribe «vídeo» en P0182); punto final | ortografía |
| P0260 | doble espacio → simple | tipografía |
| P0350 | «dj» → «DJ»; punto final | ortografía |
| P0365 | «Principammeye» → «Principalmente»; punto final | errata evidente |
| P0384 | «tiendas,las» → «tiendas, las» | puntuación |

Además se retiran espacios iniciales/finales. No se cambia ninguna palabra, orden, atenuador ni construcción oral. «Madring» (P0095), «Cuatro minutos» (P0231) y «Lo que vibra no muere» (P0033) se publican tal cual.

## 5. Retenido (PENDING_VERIFICATION) — 15 párrafos con texto + campos vacíos

| Qué | Por qué no se publica | Qué hace falta |
|---|---|---|
| P0018 (Perfil) | Falta una palabra: «con  conversación que se alarga» | Que Sofía confirme la palabra (¿«una»?) |
| P0034 y P0073 (reporteros URJCmun) | «16 reporteros» frente a «alrededor de 18 reporteros» | Cifra confirmada por Sofía |
| P0069 (URJCmun 2027) | «En 2027 continúo … Chair de la CCP: East», futuro sin confirmar; el periodo publicado sigue 2022 — 2026 | Confirmar cargo y fechas |
| P0182 (vídeo D) | Dice «OPPO»; el vídeo rotula «VIVO X300 PRO» y el teléfono lleva el logotipo vivo (fotogramas 5 s y 44 s). El título existente se mantiene porque está verificado sobre el propio vídeo | Que Sofía confirme la marca |
| P0334, P0339, P0343, P0345 (fotos) | Escritas bajo «Calle y documental» pero describen conciertos; «Madrid Salvaje» frente a «madrid sálvale 2025» | Confirmar a qué serie pertenecen y el nombre del festival; después publicarlas en Música en directo |
| P0247, P0312 (créditos) | Respuesta inacabada / rol de Briza Sánchez distinto del crédito existente («arte y guion» vs «dirección creativa, estilismo y lettering») y grafía «Sanchez» | Créditos y fechas confirmados |
| P0063, P0411, P0414 | Instrucciones operativas, no texto público. Faltan URLs de Instagram y YouTube | Enlaces |
| Permisos | Sin marcar en Vídeo A, 4 MINUTOS, Tras el sofá, VERSIÓN BETA y cuatro series fotográficas. Marcados «si»: Vídeo B, Vídeo C, Condición Perfecta y las fotos de conciertos (bajo el bloque «Calle y documental»). Esta fase no cambia ningún estado de publicación | Autorizaciones explícitas |
| Derechos de terceros | Música y talento de Condición Perfecta (nota del formulario); @telocuentosinspoilers, Pedro Aguado, actores de 4 MINUTOS y «los jóvenes» de VERSIÓN BETA aparecen solo dentro del relato de Sofía, no como créditos nuevos | Confirmación |
| Annie Bonnie | Sofía lo llama cuatro veces «mis prácticas»; la ficha dice «Comunicación corporativa». No se ha tocado el cargo | Confirmar denominación |

## 6. Traducciones

91 párrafos + 29 encabezados + 2 rótulos traducidos a EN y RU a partir del español final, conservando atenuadores («un poco» → «a bit» / «немного»; «bastante» → «fairly / quite» / «довольно»), registro, cifras y nombres propios (títulos de obras sin traducir: *Lo que vibra no muere*, *Cuatro minutos*, *Sueños y pan*, *Tras el sofá*, *Hermano Mayor*). Comprobación automática: mismo número de bloques y párrafos en los tres idiomas, ningún párrafo sin traducir, ruso con cirílico en el 100 %, paridad total de claves entre `es.json`, `en.json` y `ru.json`. Las palabrotas y el estilo directo se mantienen («joder» → “bloody hell” / «чёрт»).

## 7. Control de fidelidad (automático)

| Comprobación | Resultado |
|---|---|
| Párrafos de Sofía sin destino (publicado o retenido con motivo) | 0 de 106 |
| Párrafos publicados que no aparecen literalmente en `es.json` | 0 de 91 |
| Párrafos retenidos filtrados a la web | 0 |
| Correcciones no documentadas | 0 |
| Desajustes ES/EN/RU (bloques, párrafos, claves) | 0 |
| ALT ambiguos («el mismo…») restantes en tres idiomas | 0 |
| **Cobertura documental** | **100 %** (91 integrados + 15 retenidos con justificación, sobre 105 párrafos sustantivos) |
| **Fidelidad textual** | **100 %** sin alteraciones sustantivas; 91,2 % literalmente idénticos (8 correcciones ortotipográficas documentadas) |

## 8. QA técnico y editorial

- `pnpm lint`, `pnpm typecheck`, `pnpm build`: sin errores. 64 páginas estáticas generadas; el sitemap incluye las 4 fichas nuevas en 3 idiomas.
- Capturas de pantalla con scroll (Playwright, Chromium): Perfil, Experiencia, Trabajo, Contacto, 4 fichas de reportaje, 4 MINUTOS, Tras el sofá, Entre tiendas y tambores, en escritorio (1280) y móvil (390), temas claro y oscuro, ES/EN/RU. Lectura cómoda (máx. 64 caracteres por línea), párrafos respetados, vídeos y galerías intactos.
- Accesibilidad: encabezados jerárquicos (h2 en fichas y Perfil, h3 dentro de las filas de Experiencia), secciones con `aria-label`, enlaces con `aria-label` descriptivo, ALT sin anáforas.
- No se ha hecho merge ni despliegue desde esta fase; el push a `main` se realiza por indicación expresa del propietario del repositorio.

## 9. Diferencias antes / después

| | Antes | Después |
|---|---|---|
| Bio de Perfil | Dos frases editoriales de CV | Sus dos párrafos de respuesta (P0012–13) |
| Perfil | Bio + «Lo que hago» + ficha | + sección «Con mis palabras» (5 preguntas, 12 párrafos) |
| Experiencia | Cargo, periodo, responsabilidades | + 26 párrafos suyos repartidos en 9 preguntas bajo cada puesto |
| Piezas verticales | Solo tarjeta en Trabajo y portada | + página de detalle con 27 párrafos suyos, organización, año y lugar |
| Cortos y videoclip | Vídeo + rol + créditos | + 17 párrafos suyos (origen, decisiones, dificultades) |
| Entre tiendas y tambores | Descripción editorial | + su explicación de por qué fue y qué buscaba |
| Contacto | Datos | + «Qué me gustaría hacer ahora» (3 respuestas) |
| ALT | 111 revisados en octubre | 27 corregidos tras nueva inspección |
| Música en directo / Calle y documental | Descripciones editoriales | Sin cambios (textos de Sofía retenidos hasta aclarar la serie) |
