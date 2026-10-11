# Fase 6.1 · Historial de iteraciones

## Iteración 1 · 2026-10-11 · Ronda 1 (Perfil, Experiencia, Formación, Idiomas, Herramientas)

**Punto de partida.** Propuesta de Fase 6 (`PHASE6_PROPOSED_COPY_ES.md`), registro literal del Word, perfil de voz, `experience.ts`, `profile.ts`, `messages/es.json`. El CV y el documento maestro no están en el repositorio; los hechos del CV se toman del registro interno y se marcan como pendientes cuando el Word no los confirma.

**Cinco perspectivas sobre las propuestas de Fase 6.**

- Editor periodístico: dos afirmaciones de Experiencia dependen solo del CV (guion, ruedas de prensa); una inferencia no documentada («clientes como Yoigo»); «delegada» mal situada como escalón. Corregidas o marcadas.
- Responsable de selección: con las cuatro descripciones nuevas se entiende el ciclo de una cobertura, el reparto de un puesto de comunicación, la evolución en URJCmun y un trabajo de fotografía con venta; antes solo se leían tareas.
- Voz: los verbos son suyos (investigar, buscar recursos, conseguir entrevistas, improvisar, coordinar, repartir, proponer, dirigir, editar, vender, encargarse). Dos aperturas sin verbo (Grupo Cadena Media, Isocero) sonaban a ficha de CV; cambiadas. Recuento en Perfil B: mirar ×3, contar ×1, cámara ×2, historia ×0.
- Verificador factual: 5 dudas registradas (Q-01…Q-05); nada inventado; cifra de reporteros fuera; TEEN retirada.
- UX: Perfil B supera la regla de tres frases del propietario (I-002, decisión suya); Experiencia pasa de 148 a 211 palabras en total (cuatro descripciones de 48–58), aceptable para la página.

**Cambios materiales respecto a Fase 6.** T221 (verbo inicial y anécdota recuperada), T231 («con Yoigo entre los clientes»; versión sin «prácticas» como base), T228 (sin «delegada» en el texto; 57 palabras en lugar de 68), T234 (abre con verbo). Sin cambios: T207 B, T209, T219, tira de URJCmun, formación, idiomas, herramientas.

**Resultado.** 22 textos revisados; 12 aprobados editorialmente, 8 pendientes de Sofía, 0 que necesiten revisión; 10 problemas corregidos, 13 abiertos (de los que 8 esperan a Sofía o al propietario y 5 corresponden a rondas 2–3). Contador de revisiones sin cambio material: 0.

**Siguiente iteración.** Ronda 2: portada (T039), textos de Trabajo (T059, T062, T064), reel (T184–T186), fichas de vídeo (T131–T132, T162, T169 y el resto de 4 MINUTOS, Tras el sofá, VERSIÓN BETA, Condición Perfecta, Madrid a pie, MyMUN).

## Iteración 2 · 2026-10-11 · Ronda 2 (Portada, Trabajo, Reporterismo, Audiovisual)

**Textos revisados:** 37 (T037–T039, T051, T059, T062, T064, T182–T186, T158–T160, T162–T163, T165–T167, T169–T170, T131–T136, T144–T149, T154–T157, T172–T178).

**Cinco perspectivas.** Periodístico: tres fichas decían algo que el material desmiente (4 MINUTOS, 9‑1‑1, vivo); las propuestas de Fase 6 se han reformulado para que digan lo observable sin asignar a Sofía una intención que no escribió (I-026). Selección: con T059/T062 un visitante entiende qué hay en cada sección y qué hizo Sofía en cada pieza; los roles coinciden con el Word en las ocho fichas. Voz: «pitch» y «considerados problemáticos» son palabras suyas recuperadas; «teaser» y «etiquetados» eran nuestras. Factual: emisión en televisión del reel sin confirmar (I-024, I-028); marca del teléfono OPPO/vivo (Q-08); créditos incompletos (I-029). UX: la portada no cambia (I-020 descartado: un cambio sin mejora clara); textos de sección de 17–24 palabras.

**Cambios materiales respecto a Fase 6.** T059 («de estrenos y eventos» en lugar de «para televisión»), T062 («pitch de serie» en lugar de «teaser»), T064 (sin el artículo «una»), T169 (sin repetición), T132 (intención + lo ocurrido), T154 («considerados»). Sin cambio y aprobados: portada, Madrid a pie, MyMUN, Tras el sofá (texto), Condición Perfecta (texto).

**Resultado.** 59 textos revisados en total; en esta ronda 26 aprobados, 11 pendientes de Sofía, 0 que necesiten revisión. Problemas: 6 corregidos (I-021, I-024, I-025, I-026, I-027 y la parte editorial de I-022), 1 descartado (I-020), 2 nuevos pendientes de Sofía (I-028, I-029). Dudas nuevas Q-06…Q-09. Contador de revisiones sin cambio material: 0.

**Siguiente iteración.** Ronda 3: series fotográficas (T187–T205), archivo (T065–T093 en la parte que describe contenido), créditos y pies.

## Iteración 3 · 2026-10-11 · Cierre por decisión del propietario e implementación

El propietario pidió la versión final y su implementación antes de completar las rondas 3–5. Se implementó en `messages/{es,en,ru}.json`, `src/content/profile.ts` (herramientas por grupos), `src/app/[locale]/about/page.tsx` (bio en dos párrafos, grupos de herramientas), `src/styles/showcase.css` y `src/content/projects.ts` (año de la acampada):

- Ronda 1 y 2 tal como quedaron en las iteraciones 1 y 2 (bio B; cuatro experiencias; cargos y tira en español; textos de Trabajo; reel; 9‑1‑1 «doy paso»; vivo; 4 MINUTOS «planos largos» e intención + lo ocurrido; VERSIÓN BETA «considerados»).
- Ronda 3 (series) con lo que ya estaba fundamentado en Fase 5/6: «Acampada en Sol» (decisión del propietario) con «a finales de septiembre de 2026» (EXIF), «Calle» con «marcha nocturna en marzo de 2023» (EXIF; sin nombrar edificio ni marcha), Música con «en Madrid» (P0334). Créditos completados desde pantalla: Tras el sofá (guion, producción, cámara, arte, sonido, script, ayudante de dirección), 4 MINUTOS (música: losniñosdelcaminito), VERSIÓN BETA (presentador: Pedro Aguado), Condición Perfecta (seis extras).
- Ronda 4 (traducciones): las 18 correcciones EN y las 32 RU de la auditoría de Fase 6, más la traducción editorial de todos los textos nuevos. 16 claves sin uso eliminadas en los tres idiomas.
- Para los textos pendientes de Sofía se publicó la formulación que no afirma nada que el material desmienta; sus dudas (Q-01…Q-09) siguen en `ISSUES.md` para la siguiente conversación con ella.

QA: typecheck, lint y build sin errores; 80 rutas y 136 imágenes en 200; capturas de Perfil (ES/EN/RU, escritorio y móvil), Experiencia, Trabajo, Tras el sofá y Acampada en Sol.
