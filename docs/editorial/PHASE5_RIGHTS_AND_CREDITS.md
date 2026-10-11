# Fase 5 · Derechos, ética y créditos

Auditoría documental: compara los campos `rights`/`published` de `src/content/projects.ts`, las marcas de permiso del Word (registro `SOFIA_SOURCE_RESPONSES.md`), el manifiesto de Mux (`docs/reels-ingest-manifest.md`) y los créditos visibles en pantalla. **Un campo vacío o una casilla sin marcar no se interpreta como negativa ni como autorización.** No se ha cambiado ningún `published` ni `rights.verified`.

## 1. Estado por obra

| Obra | `published` | `rights` en código | Permiso en el Word | Autoría | Terceros visibles | Música | Créditos web frente a pantalla | Estado |
|---|---|---|---|---|---|---|---|---|
| Entre tiendas y tambores | true | `verified: false` («permisos de imagen, titularidad, crédito y rol fotográfico pendientes») | Sin marcar (P0391) | Sofía (P0379: «fui con mi cámara») | Manifestantes identificables, agentes de policía, pancartas con nombres de partidos | — | Sin créditos (correcto: autora única) | **Bloqueo editorial/legal** |
| Música en directo | true | `verified: false` | «si Todas» en P0346, pero en el bloque de Calle (ambiguo) | Sofía (P0334: iniciativa propia y «proyectos de cobertura fotográfica») | Artistas identificables; público con rostro (6317, 4965, 4974) | — | Sin créditos de artista ni festival | **Bloqueo hasta aclarar P0346**; uso en portfolio habitual |
| Calle y documental | true | `verified: false` | Bloque con respuestas de conciertos (P0334–P0346) | Sofía | Manifestantes (3352/3363/3371), menores a distancia (4705), transeúntes | — | — | **Bloqueo**; menores: decisión expresa |
| Retrato y editorial | true | `verified: false` | Sin marcar (P0376) | Sofía; encargo «para una revista de moda y actualidad» (P0365): posibles derechos del cliente | Modelos identificables; pegatina «FUCK AIRBNB» en 5454 | — | Sin cliente ni estilismo | **Bloqueo**; preguntar por la revista |
| Estudio y editorial | true | `verified: false` | Sin marcar (P0361) | Sofía; «colaboraciones con dj o cantantes… para su proyecto» (P0350): material por encargo | Artistas identificables | — | Sin artistas | **Bloqueo**; preguntar si los artistas aceptan la exhibición |
| 4 MINUTOS | true | **sin campo** | Sin marcar (P0248) | Sofía dirige, graba, monta; actores Eneko Valle García, Fran Vidales Santos; sonido María Rodríguez | Tres jóvenes del prólogo (vídeollamada) sin acreditar | Crédito en pantalla «Sound / Autro – losniñosdelcaminito»: derechos no documentados | Web: dirección, sonido, reparto, equipo. Falta música | **Bloqueo**: permiso + música + participantes |
| Tras el sofá | true | **sin campo** | Sin marcar (P0269) | Sofía dirige y monta; guion Ángela Barroso y Vera Herráez; producción Sandra Alcaide Barrón; cámara Ángela Gómez Cabeza y Sofía Mora; arte Ángela Barroso, Cristina García y María Rodríguez; sonido Cristina García Jiménez y Sandra Alcaide Barrón; script Vera Herráez; ayudante de dirección Julia Almazán | Dos actrices (reparto no transcrito) | No visible en fotogramas | Web: solo dirección y montaje | **Bloqueo** (permiso) + créditos incompletos |
| VERSIÓN BETA | true | **sin campo** | Sin marcar (P0292) | Sofía produce, graba, monta | Pedro Aguado (persona pública) y varios jóvenes | Música no documentada | Sin créditos en web ni cartela vista | **Bloqueo**: permiso de Pedro Aguado y de los jóvenes |
| Condición Perfecta | true | `verified: true` (propietario, 2026-10-02) | Sin bloque de permisos específico | Sofía rodaje y posproducción; Briza Sanchez dirección creativa; Silver Praxis producción musical | Artista y 6 extras acreditados en pantalla | Del propio artista | Web: tres créditos principales; faltan extras | OK; completar extras (menor) |
| 9‑1‑1 (short-form-002) | true | `verified: true` (propietario, 2026-10-02) | — | Producida en Annie Bonnie para Yoigo | Creador @telocuentosinspoilers; marcas Yoigo, Star Channel | — | Sin créditos de producción | OK con el propietario; **permiso del cliente no registrado** |
| vivo X300 Pro (short-form-004) | true | `verified: true` | — | Annie Bonnie para Yoigo | Compañera en cámara (P0189 «una de las personas») | — | — | Ídem |
| MyMUN (short-form-003) | true | `verified: true` | — | URJCmun | Pantallas con datos de ejemplo (formulario con «DNI/Pasaporte» de muestra) | — | — | OK; comprobar que las pantallas no muestran datos reales |
| Madrid a pie (short-form-001) | true | `verified: true` | Sin marcar (P0150) | Sofía (P0144 «proyecto propio») | Transeúntes | **No comprobada** (fuente: descarga de Instagram) | — | OK con el propietario; música pendiente |
| Reporter reel | false | `verified: false` | P0063 (LinkedIn) | Grupo Cadena Media (emisiones) | Entrevistados, cadena | — | — | No publicar sin permiso de la cadena |

## 2. Riesgos por prioridad

**P0**
1. Publicación de las cinco series fotográficas y de tres cortos sin autorización documentada (P0-1, P0-5). Acción: tabla de autorización firmada o escrita por Sofía, obra por obra; registrar fecha en `rights.note` como se hizo con los Mux.
2. Personas identificables en contexto de protesta (plaza; nocturnas de Calle) y agentes de policía (024, 028): criterio legal del propietario antes de mantener la serie en portada; pies factuales obligatorios (P0-2).
3. 4 MINUTOS: música de terceros acreditada en pantalla y ausente de la web; tres participantes del prólogo sin consentimiento documentado; descripción que contradice el vídeo (P0-3, P0-4).
4. VERSIÓN BETA: imagen de Pedro Aguado y de jóvenes en un vídeo académico ahora público (P0-5).

**P1**
5. Créditos incompletos de Tras el sofá (ocho personas con rol en pantalla no aparecen en la web).
6. Material por encargo (retratos para una revista; estudio para artistas; Yoigo/URJCmun): confirmar que los clientes aceptan la exhibición; es práctica habitual, pero no consta.
7. Menores en `calle-img-4705` (a distancia, no identificables en miniatura): decisión expresa si se usa como portada.
8. `retrato-img-5454`: texto político legible en un retrato de encargo; el modelo lo señala, pero en el portfolio de Sofía se lee como opinión de la autora.
9. Madrid a pie: música de fondo sin comprobar; fuente descargada de Instagram (calidad 720p, posible compresión doble).

**P2**
10. Extras de Condición Perfecta sin acreditar en la web.
11. Pantallas de MyMUN con formularios: verificar que son datos de ejemplo.
12. Las ALT transcriben consignas de pancartas: es correcto y factual, pero conviene que los pies digan «pancarta con el texto…» y no reproduzcan el eslogan como titular.
13. Sin créditos de retrato de perfil (`public/media/profile`): si lo hizo otra persona, acreditarla (patrón verificado en todas las referencias).

## 3. Distinciones aplicadas

- **Autoría**: Sofía es autora de todas las fotografías publicadas según el Word; en los cortos, dirige y monta, pero guion (Tras el sofá), producción (Tras el sofá), dirección creativa (Condición Perfecta) y actuación son de terceros, y la web ya lo respeta salvo las omisiones citadas.
- **Permiso de publicación**: solo documentado para los cinco Mux de marca/videoclip (propietario, 2026-10-02). Para el resto, pendiente.
- **Derechos sobre música**: Condición Perfecta (del artista), 4 MINUTOS (crédito de terceros), Madrid a pie y VERSIÓN BETA (desconocidos).
- **Derechos de terceros**: modelos, artistas, entrevistados, manifestantes, agentes, participantes del prólogo.
- **Menores**: 4705; posible presencia en público de conciertos y plaza (no determinable).
- **Material por encargo**: retratos (revista), estudio (artistas), 9‑1‑1 y vivo (Yoigo vía Annie Bonnie), MyMUN (URJCmun).
- **Restricciones de distribución**: reel de TV (cadena); contenidos de cliente (uso en portfolio por confirmar).

## 4. Qué no se ha hecho

No se ha modificado `published`, `rights.verified` ni ninguna nota. No se ha dado por hecho que falte un permiso: lo que falta es su registro. Cada bloqueo se levanta con una confirmación escrita de Sofía o del cliente, anotada en `rights.note` con fecha.
