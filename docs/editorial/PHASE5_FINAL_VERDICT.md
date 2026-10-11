# Fase 5.1 · Veredicto editorial

Fecha: 2026-10-11 · Rama: `audit/sofia-photojournalism-phase5` (sobre `bfad55a` = `main`; `content/phase-4-simplification` es ancestro). Documentos de esta fase: este veredicto, `PHASE5_CURATED_PORTFOLIO_PROPOSAL.md` (selección y secuencias definitivas) y `PHASE5_CHANGES_AND_QA.md` (qué se ha tocado y cómo se ha comprobado). Los informes de Fase 5 se conservan como evidencia; no se reescriben.

Leyenda: **HECHO** (código, documento, imagen o vídeo), **OBSERVACIÓN** (apreciación visual fundamentada), **INFERENCIA** (interpretación editorial plausible), **PENDIENTE** (necesita confirmación).

## 1. Estado al empezar

| Comprobación | Resultado |
|---|---|
| Rama y commits | `audit/sofia-photojournalism-phase5` con tres commits sobre `main`: auditoría (9412603), segunda pasada con audio (0b43d27) y el reel de coberturas (0e5295d, cherry-pick de `content/reporter-reel-hero`, publicado hoy a petición del propietario) |
| Cambios sin commitear | Ninguno con seguimiento; en la raíz siguen los archivos sin seguimiento de siempre (Word, vídeos fuente, ZIP). Intactos |
| Auditoría anterior | Completa: los cinco informes existen, la matriz cubre las 112 imágenes públicas y `phase5-review/index.html` tiene 120 miniaturas más la adenda de audio. Sus miniaturas (240 px) no bastan para reevaluar: en esta fase se han vuelto a mirar las 112 imágenes en hojas de contacto a 480 px generadas desde los másteres públicos |
| Fuentes originales | Word con el mismo SHA-256 registrado; ningún original tocado |

## 2. Identidad de Sofía como criterio (del Word, no para publicarlo)

HECHO (registro literal): lo que enseñaría primero es *Lo que vibra no muere*, la imagen de URJCmun y «la recopilación de coberturas que tengo en LinkedIn»; de las fotos recuerda una de Kinder Malo «por cómo entra la luz»; de la acampada quería «recoger cómo se estaba viviendo aquel espacio»; de los conciertos, «la energía del artista, la reacción del público»; en las entrevistas busca que la persona «se olvide de la cámara». Consecuencia editorial: la pieza que más se parece a lo que ella pide enseñar es el reel de coberturas, que hoy ya abre la portada; en fotografía, la fuerza está en acampada y conciertos, no en retrato; en vídeo, lo que la representa como realizadora es la producción y el montaje (VERSIÓN BETA, Condición Perfecta), no un corto mudo.

## 3. Matriz adversarial de los hallazgos de Fase 5

| ID | Hallazgo anterior | Evidencia | ¿Confirmado? | Prioridad | Acción |
|---|---|---|---|---|---|
| F5-001 (P0-1) | Cinco series fotográficas publicadas con `rights.verified: false` y sin permiso marcado en el Word | HECHO: `projects.ts`; P0331, P0346, P0361, P0376, P0391 | Sí | P0 | Consultar: autorización escrita por serie. No se afirma que el permiso no exista |
| F5-002 (P0-2) | Acampada: personas identificables, agentes, 18 imágenes con consignas | HECHO: hojas de contacto 5.1 (008, 017, 025–027 rostros; 024, 028 policía; 001/004/010/011/020 consignas con siglas de partidos) | Sí | P0 | Consultar (criterio legal del propietario); pies factuales. Ver F51-2 sobre las consignas repetidas |
| F5-003 (P0-3) | 4 MINUTOS: «Un solo plano, sin cortes» frente al vídeo | HECHO: detección de cambios de plano: prólogo con 16 cortes, cuatro planos largos (17–89, 89–103, 105–160, 160–212 s), créditos | Sí | P0 | Consultar: texto nuevo con Sofía. Aviso: el ejemplo de texto del brief 5.1 («rodado en un único plano secuencia») repetiría el error; no se ha usado |
| F5-004 (P0-4) | 4 MINUTOS: crédito musical y tres participantes del prólogo sin acreditar | HECHO: fotograma de créditos; fotograma t=5 s | Sí | P0 | Consultar (créditos) |
| F5-005 (P0-5) | Tras el sofá y VERSIÓN BETA sin `rights`; Pedro Aguado | HECHO: `projects.ts`; P0269, P0292 | Sí | P0 | Consultar |
| F5-006 (P0-6) | 4 MINUTOS publicado sin pista de audio en Mux | HECHO: manifiesto HLS sin `mp4a`; rendiciones 270 p y 1080 p sin stream de audio; subtítulos incrustados visibles | Sí | P0 | **Mitigado**: deja de abrir Audiovisual (VERSIÓN BETA primero). Resolver: máster con audio y resubida |
| F5-007 (P1-1) | No hay ninguna pieza de televisión | HECHO: hoy existe el reel de coberturas (01:52, Mux) en el monitor | **Resuelto en parte** | P1 | Pendiente: créditos por segmento, cadena detrás del logo «You!», fechas |
| F5-008 (P1-2) | Tras el sofá: ocho créditos en pantalla ausentes de la web | HECHO: fotogramas 350–357 s | Sí | P1 | Consultar (grafías) |
| F5-009 (P1-3) | Calle y documental no es una serie | OBSERVACIÓN 5.1 confirmada: tres conjuntos (nocturnas de Cibeles, calle diurna, dos ejercicios formales) | Sí | P1 | **Hecho**: pasa a la última posición de Fotografía. Reducir a cinco imágenes y cambiar la portada requieren aprobación |
| F5-010 (P1-4) | Respuestas de conciertos bajo «Calle» en el Word | HECHO: P0334–P0346 | Sí | P1 | Consultar |
| F5-011 (P1-5) | 15 variantes casi idénticas en los ensayos | OBSERVACIÓN 5.1: confirmadas (6667/6668, 5319/5323/5328, 5476/5487, 6cf7/1345, 1378/1386, 4965/4974, 5004/5038, 022/033, 032/034/035, 028/024) | Sí | P1 | Propuesta en el documento de selección; cambiar los ensayos requiere aprobación |
| F5-012 (P1-6) | `retrato-img-5454` (pegatina política) y `estudio-80c82615` (exterior) mal ubicadas | OBSERVACIÓN 5.1 confirmada: 80c8 es un exterior al atardecer con gorro de pescador; 5454 señala la pegatina | Sí | P1 | **Hecho**: 80c8 reclasificada a Retrato en el Archivo (ID y ALT intactos). 5454: consultar |
| F5-013 (P1-7) | `calle-img-4705` muestra menores | OBSERVACIÓN: dos niños a distancia en el césped | Sí | P1 | Consultar antes de usarla como portada |
| F5-014 (P1-8) | Música de Madrid a pie y permisos de cliente | PENDIENTE | — | P1 | Consultar |
| F5-015 (P1-9) | 9‑1‑1: «entrevisto» sin ninguna pregunta en el audio | HECHO: transcripción | Sí | P1 | Consultar (reescritura o versión larga) |
| F5-016 (P1-10) | Tras el sofá: 80 s iniciales sin diálogo; póster en tramo mudo | HECHO: transcripción. **La parte del póster se descarta**: el póster actual (174 s) ya muestra a las dos actrices en diálogo | Parcial | P1 | **Hecho**: última de Audiovisual. Póster sin cambio |
| F5-017 (P2-1) | El Archivo compite con las series («74» en la navegación, «74 fotografías» en el texto) | HECHO: `work/page.tsx`, `Work.photographyText`; OBSERVACIÓN en captura: el «74» dominaba la barra de secciones | Parcial | P2 | **Hecho**: sin contador en la navegación; texto «Cinco series y un archivo para mirar sin prisa»; en la página del Archivo se elimina el recuento duplicado del encabezado |
| F5-018 (P2-2) | Sin pies en ninguna imagen | HECHO: 0 `caption` | Sí | P2 | Consultar (datos nuevos) |
| F5-019 (P2-3) | Fotos promovidas del Archivo solo a 960 px | HECHO | Sí | P2 | Depende de aprobar la selección |
| F5-020 (P2-4) | Huérfano `entre-tiendas-y-tambores-028.webp` | HECHO | Sí | P2 | No se borra ningún archivo de medios en esta fase |
| F5-021 (P2-5) | Fechas EXIF de exportación; acampada datable por el ZIP | HECHO | Sí | P2 | Consultar (confirmar 28–29 sept. 2026) |
| F5-022 (P2-6) | MyMUN tercera en el monitor | HECHO | Sí | P2 | **Hecho**: MyMUN última |
| F5-023 (P2-7) | Póster de 4 MINUTOS en t=186 s | OBSERVACIÓN 5.1: a 186 s hay subtítulo incrustado; el fotograma actual (145 s) es más limpio | **Descartado** | P2 | Sin cambio |
| F5-024 (P2-8) | Nombre del festival | PENDIENTE («Madrid Salvaje» visible en 4937/4929) | — | P2 | Consultar |
| F5-025 (P2-9 a P2-11) | vivo («sin que parezca una explicación»), música de Madrid a pie, locución de VERSIÓN BETA | HECHO/PENDIENTE | Sí/— | P2 | Consultar |

### Hallazgos nuevos de esta fase

| ID | Hallazgo | Tipo | Prioridad | Acción |
|---|---|---|---|---|
| F51-1 | La portada de Calle (IMG_4741, vertical 2:3) se mostraba en formato ancho con el punto focal en el tercio superior: en la página de serie se veían árboles y el sujeto cortado al borde inferior | OBSERVACIÓN (captura de escritorio) | P2 | **Hecho**: `focalPoint.y` 42 → 56. La sustitución por IMG_4748 sigue requiriendo aprobación |
| F51-2 | En el ensayo propuesto de la acampada (17), la pancarta «PP maltrata la infancia» aparece dos veces (011 al anochecer, 020 de noche) y la foto 001 la repite en el Archivo; un ensayo de 17 con una consigna partidista repetida la convierte en el mensaje de la serie | OBSERVACIÓN + INFERENCIA | P1 | Propuesta: una sola aparición (020, porque es acción: izar la pancarta); 011 sale y entran 014 (detalle «Ser rentista no es un trabajo») y 008 (dos personas conversando ante su tienda) |
| F51-3 | Música: `musica-img-4989` (medio plano, bruma lila) es correcta pero genérica; `musica-img-4596` (monocromo verde) demuestra manejo de luz de sala, que es una de las competencias que la serie debe probar; el móvil en la esquina es un recorte menor | OBSERVACIÓN + INFERENCIA (revisa la decisión de Fase 5) | P2 | Propuesta: 4596 en lugar de 4989 |
| F51-4 | Reel de coberturas: funciona como primera pieza (vertical → apaisado resuelto en el monitor), pero no tiene créditos por segmento, la cadena detrás del logo «You!» no está verificada y el eslabón con Grupo Cadena Media viene de la ficha, no del vídeo | HECHO/PENDIENTE | P1 | Consultar con Sofía: programa, cadena, fechas, segmentos |
| F51-5 | Rejilla «Ante la cámara» en Trabajo: una tarjeta apaisada entre cuatro verticales deja un hueco bajo el reel en escritorio | OBSERVACIÓN (captura) | P2 | Aceptable; alternativa (tarjeta del reel a doble columna) solo si molesta al propietario |

## 4. Veredicto

**Qué estaba perjudicando realmente el portfolio** (por orden de daño):

1. La obra que abría Audiovisual, 4 MINUTOS, se reproduce muda y su texto promete un plano secuencia que no existe. Un reclutador de productora lo abriría primero y lo cerraría a los diez segundos. Mitigado hoy por orden; resuelto solo con el máster con audio.
2. Hasta hoy no había ni un minuto de reporterismo real: la ficha de 9‑1‑1 habla de una entrevista que el audio no contiene. El reel de coberturas corrige lo primero; la ficha de 9‑1‑1 sigue pendiente.
3. Las series fotográficas mezclan selección y archivo: 15 variantes en los ensayos, un archivo con el mismo peso que las series y una serie («Calle y documental») que no es una serie. Hoy se ha bajado el peso del archivo y se ha movido Calle al final; la reducción de los ensayos espera aprobación porque cambia la selección pública.
4. Derechos: nueve obras publicadas sin autorización registrada. No es un problema de presentación sino de riesgo; sigue siendo el primer bloqueo para dar el sitio por terminado.

**Qué destaca** (OBSERVACIÓN sobre las 112 imágenes y los 8 vídeos): la acampada como ensayo (038, 024, 009, 015, 023, 027, 036), seis fotos de concierto con luz y momento (6313, 6385, 5179, 6317, 6294, 4959), tres retratos (5800, 5436, 6676), el espejo de estudio (6cf7) y, en vídeo, VERSIÓN BETA y Condición Perfecta como muestra de producción y montaje, y el reel como muestra de presencia a cámara.

**Qué no debería protagonizar la web**: 4 MINUTOS mientras esté mudo; MyMUN y vivo como «reportajes» (son servicio y publicidad bien leídos); las variantes listadas en F5-011; `retrato-img-5454`; Calle como serie documental.

**Tres perspectivas.** Editor de fotografía: con la selección propuesta, sí (consistencia y criterio visibles; sin ella, el archivo y las variantes diluyen). Editor periodístico: no todavía: faltan pies con lugar y fecha en la acampada y en las nocturnas de Calle, y dos fichas de vídeo (4 MINUTOS, 9‑1‑1) dicen cosas que el material desmiente. Responsable de selección: sí para productora y fotografía; para un medio, sí desde hoy gracias al reel, con la reserva de los créditos del reel.

## 5. Decisiones que requieren aprobación (en orden de impacto)

1. **Sofía**: máster de 4 MINUTOS con audio; texto nuevo («rodado en planos largos, en blanco y negro» o lo que ella decida); crédito musical y participantes del prólogo.
2. **Sofía**: autorización escrita por serie fotográfica y por corto (F5-001, F5-005), incluida la de los modelos de retrato y estudio y la de Pedro Aguado.
3. **Propietario + Sofía**: acampada en portada con personas identificables y agentes (F5-002), y la secuencia de 18 con una sola consigna partidista (F51-2).
4. **Propietario**: aplicar los ensayos reducidos (plaza 18, música 12, retrato 10, estudio 7, calle 5) y la portada de Calle con IMG_4748; implica re-exportar cinco originales a 2 800 px.
5. **Sofía**: ficha de 9‑1‑1 (F5-015), descripción de vivo (F5-025), créditos de Tras el sofá (F5-008), reel: programa, cadena y segmentos (F51-4).
6. **Sofía**: fecha de la acampada (28–29 sept. 2026 según EXIF), evento de las nocturnas de marzo de 2023, festival «Madrid Salvaje», foto de Kinder Malo, retirada de 5454.
7. **Propietario**: eliminar el huérfano 028 de `public/` y renombrar la serie a «Acampada en Sol» (decisión ya tomada el 2026-10-11; se ejecuta en la fase de implementación).

## 6. Riesgos pendientes

- Legales: F5-001, F5-002, F5-005 (publicación sin autorización registrada; personas identificables en protesta; persona pública en VERSIÓN BETA).
- De exactitud: F5-003 y F5-015 (dos fichas contradicen el material); F51-4 (atribución del reel).
- De presentación: ensayos con variantes y fotos promovidas solo a 960 px hasta que se apruebe la selección.

## 7. ¿Está la rama lista para revisión humana?

Sí. Compila (typecheck, lint, build, media:doctor sin errores), las 80 rutas de los tres idiomas responden 200, las 136 imágenes se sirven y todas llevan ALT, y hay capturas antes/después en escritorio, móvil y modo claro (`PHASE5_CHANGES_AND_QA.md`). Lo que contiene es seguro de publicar: órdenes, una reclasificación de archivo, un punto focal y tres líneas de microcopy, más el reel ya aprobado por el propietario.

## 8. Siguiente paso concreto

Enviar a Sofía la lista del punto 5 con `phase5-review/index.html` y las hojas de contacto, y pedirle en el mismo correo el máster de 4 MINUTOS con audio. Con su respuesta se abre `content/phase-6-curation` sobre `main` para aplicar los ensayos reducidos y los pies, siguiendo `PHASE5_CURATED_PORTFOLIO_PROPOSAL.md`.
