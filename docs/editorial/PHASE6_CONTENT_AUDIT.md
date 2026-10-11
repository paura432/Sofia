# Fase 6 · Auditoría de contenido texto por texto

Fecha: 2026-10-11 · Rama: `content/phase6-editorial-voice-audit` (sobre `main` = e020c19). Auditoría de solo lectura: ningún texto público se ha modificado. Propuestas completas en `PHASE6_PROPOSED_COPY_ES.md`; comprobación de hechos en `PHASE6_FACT_CHECK.md`; voz en `PHASE6_SOFIA_VOICE_ANALYSIS.md`; plan en `PHASE6_IMPLEMENTATION_PLAN.md`.

## 1. Inventario

Fuentes de texto público: `messages/{es,en,ru}.json` (409 claves por idioma: 279 de interfaz, fichas, perfil y experiencia; 121 textos alternativos; 9 títulos de medios), `src/content/experience.ts` (nombres de empresa), `src/content/profile.ts` (nombre, correo, LinkedIn, lista de herramientas), `src/components/hero.tsx` (el nombre en dos tramos), `src/lib/metadata.ts` (título, Open Graph, Twitter, alternates) y `src/content/projects.ts` (años, organizaciones, localizaciones, duraciones). No hay más cadenas visibles fuera de las traducciones salvo `/dev/media`, que no es pública. El CV y el «Documento maestro» no están en el repositorio: los hechos del CV se toman del registro interno `docs/profile-content-source.md` y de los valores ya publicados, y se marcan como «CV (registro interno)».

| Página | Textos visibles | Metadatos | Accesibilidad |
|---|---|---|---|
| Contacto | 13 | 0 | 0 |
| Experiencia | 18 | 0 | 0 |
| Fichas de proyecto (interfaz) | 40 | 0 | 2 |
| Fotografía · calle-documental | 4 | 0 | 0 |
| Fotografía · entre-tiendas-y-tambores | 3 | 0 | 0 |
| Fotografía · estudio-editorial | 4 | 0 | 0 |
| Fotografía · musica-en-directo | 4 | 0 | 0 |
| Fotografía · retrato-editorial | 4 | 0 | 0 |
| General (navegación, footer, 404) | 21 | 0 | 9 |
| Inicio | 12 | 0 | 1 |
| Perfil | 29 | 0 | 0 |
| Proyecto · 4-minutos | 13 | 0 | 0 |
| Proyecto · reporter-reel | 5 | 0 | 0 |
| Proyecto · short-form-001 | 3 | 0 | 0 |
| Proyecto · short-form-002 | 3 | 0 | 0 |
| Proyecto · short-form-003 | 4 | 0 | 0 |
| Proyecto · short-form-004 | 3 | 0 | 0 |
| Proyecto · silver-praxis-condicion-perfecta | 11 | 0 | 0 |
| Proyecto · tras-el-sofa | 10 | 0 | 0 |
| Proyecto · version-beta | 5 | 0 | 0 |
| SEO (metadatos) | 0 | 18 | 0 |
| Trabajo / Archivo | 37 | 0 | 2 |
| ALT de imágenes (anexo A) | — | — | 122 |
| Títulos de medios (anexo B) | 9 | — | — |

Claves presentes en los JSON pero que ningún componente renderiza (sin efecto público; candidatas a limpieza en implementación): `Projects.allEyebrow`, `Projects.audiovisualEyebrow`, `Projects.disciplines.communication`, `Projects.featuredEyebrow`, `Projects.locations.tenerife`, `Projects.locations.torrejon-de-ardoz`, `Projects.locations.valencia`, `Projects.moreFromSeries`, `Projects.moreFromSeriesCount`, `Projects.playCoverage`, `Projects.reelEyebrow`, `Projects.reelMeta`, `Projects.selectedEyebrow`, `Projects.transcript`, `Projects.viewReel`, `Projects.viewRelatedWork`.

Textos públicos fuera de los JSON: nombre «Sofía Chernikova» (hero, metadatos, footer), correo `chernisv@gmail.com`, enlace LinkedIn `/in/sofia-chernikova`, empresas «Grupo Cadena Media», «Annie Bonnie», «URJCmun», «Isocero», herramientas (10, ver §3), años y organizaciones de las fichas (ver `PHASE6_FACT_CHECK.md`).

## 2. Matriz texto por texto

Una fila por clave pública. Clasificación de problemas: FACTUAL, INFORMATIVO, EDITORIAL, REDUNDANCIA, VOZ, UX, JERARQUÍA, PRECISIÓN, TRADUCCIÓN. «—» en Problema significa que el texto cumple su función. Para las claves sin fuente externa (botones, etiquetas, ARIA) la fuente es la interfaz misma.

| ID | Página | Clave | Texto actual | Función | Problema | Fuente | Estado factual | Nueva propuesta | Motivo | Acción |
|---|---|---|---|---|---|---|---|---|---|---|
| T001 | SEO (metadatos) | `Metadata.siteTitle` | Sofía Chernikova — Periodista y reportera de televisión | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T002 | SEO (metadatos) | `Metadata.siteDescription` | Sofía Chernikova, periodista y reportera de televisión en Madrid. Reportajes ante la cámara, cortometrajes y fotografía. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T003 | SEO (metadatos) | `Metadata.ogAlt` | Portfolio profesional de Sofía Chernikova | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T004 | SEO (metadatos) | `Metadata.personRole` | Periodista y reportera de televisión | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T005 | SEO (metadatos) | `Metadata.pages.home.title` | Sofía Chernikova — Periodista y reportera de televisión | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T006 | SEO (metadatos) | `Metadata.pages.home.description` | Sofía Chernikova, periodista y reportera de televisión en Madrid. Reportajes ante la cámara, cortometrajes y fotografía. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T007 | SEO (metadatos) | `Metadata.pages.work.title` | Trabajo | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T008 | SEO (metadatos) | `Metadata.pages.work.description` | Reportajes ante la cámara, cortometrajes, videoclip y series fotográficas de Sofía Chernikova. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T009 | SEO (metadatos) | `Metadata.pages.photoArchive.title` | Archivo fotográfico | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T010 | SEO (metadatos) | `Metadata.pages.photoArchive.description` | Las 74 fotografías del archivo de Sofía Chernikova, ordenadas por temas. | SEO del Archivo | — | — | Verificado | Sin cambio | — | **Mantener** |
| T011 | SEO (metadatos) | `Metadata.pages.about.title` | Perfil | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T012 | SEO (metadatos) | `Metadata.pages.about.description` | Perfil de Sofía Chernikova, periodista y reportera de televisión, con formación en Periodismo y Comunicación Audiovisual en la Universidad Rey Juan Carlos. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T013 | SEO (metadatos) | `Metadata.pages.experience.title` | Experiencia | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T014 | SEO (metadatos) | `Metadata.pages.experience.description` | Trayectoria de Sofía Chernikova en televisión, comunicación digital, comunicación corporativa y fotografía. | SEO de Experiencia | PRECISIÓN (menor): «comunicación digital, comunicación corporativa» son dos etiquetas para dos puestos; aceptable | — | Verificado | Sin cambio | — | **Mantener** |
| T015 | SEO (metadatos) | `Metadata.pages.contact.title` | Contacto | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T016 | SEO (metadatos) | `Metadata.pages.contact.description` | Contacto profesional de Sofía Chernikova para medios, coberturas, producción audiovisual y comunicación. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T017 | SEO (metadatos) | `Metadata.pages.notFound.title` | Página no encontrada | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T018 | SEO (metadatos) | `Metadata.pages.notFound.description` | La página solicitada no existe o ha cambiado de dirección. | Metadato SEO | — | Interfaz / portfolio | Verificado | Sin cambio | Título y descripción coherentes con la página | **Mantener** |
| T019 | General (navegación, footer, 404) | `Navigation.theme.dark` | Activar modo oscuro | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T020 | General (navegación, footer, 404) | `Navigation.theme.light` | Activar modo claro | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T021 | General (navegación, footer, 404) | `Navigation.skip` | Saltar al contenido | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T022 | General (navegación, footer, 404) | `Navigation.homeAria` | Ir al inicio | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T023 | General (navegación, footer, 404) | `Navigation.sectionsAria` | Navegación principal | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T024 | General (navegación, footer, 404) | `Navigation.menu` | Menú | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T025 | General (navegación, footer, 404) | `Navigation.mobileSummary` | Menú | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T026 | General (navegación, footer, 404) | `Navigation.mobileAria` | Navegación móvil | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T027 | General (navegación, footer, 404) | `Navigation.closeMenu` | Cerrar menú | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T028 | General (navegación, footer, 404) | `Navigation.opensInNewTab` | (abre en nueva pestaña) | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T029 | General (navegación, footer, 404) | `Navigation.localeAria` | Cambiar idioma | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T030 | General (navegación, footer, 404) | `Navigation.localeNames.es` | Español | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T031 | General (navegación, footer, 404) | `Navigation.localeNames.en` | English | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T032 | General (navegación, footer, 404) | `Navigation.localeNames.ru` | Русский | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T033 | General (navegación, footer, 404) | `Navigation.items.work` | Trabajo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T034 | General (navegación, footer, 404) | `Navigation.items.about` | Perfil | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T035 | General (navegación, footer, 404) | `Navigation.items.experience` | Experiencia | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T036 | General (navegación, footer, 404) | `Navigation.items.contact` | Contacto | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T037 | Inicio | `Hero.dateline` | Periodista · Madrid | Antetítulo de portada | — | — | Verificado | Periodista · Madrid | — | **Mantener** |
| T038 | Inicio | `Hero.role` | Reportera de televisión | Oficio en portada | — | CV (registro interno) | Verificado | Reportera de televisión | — | **Mantener** |
| T039 | Inicio | `Hero.summary` | Desde 2024 cubro estrenos, eventos y ruedas de prensa para Grupo Cadena Media y entrevisto a artistas y figuras públicas. También dirijo cortometrajes y hago fo… | Resumen profesional de portada | PRECISIÓN (menor): «ruedas de prensa» procede del CV, no del Word; «hago fotografía de conciertos, calle y retrato» omite la acampada, su serie más fuerte | CV (registro interno); P0053–P0054; portfolio | Verificado / «ruedas de prensa» pendiente de recomprobar en el CV | Desde 2024 cubro estrenos, eventos y ruedas de prensa para Grupo Cadena Media y entrevisto a artistas y figuras públicas. También dirijo cortometrajes y fotografío conciertos, la calle y a la gente. | Mismo contenido; el cierre deja de ser una lista de categorías de la web y abarca la serie documental | **Reescribir (ajuste menor; aprobación de Sofía por ser primera persona)** |
| T040 | Inicio | `Hero.actionsAria` | Acciones principales | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T041 | Inicio | `Hero.viewWork` | Ver todo el trabajo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T042 | Inicio | `Hero.contact` | Escríbeme | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T043 | Inicio | `Hero.reelListLabel` | Piezas ante la cámara | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T044 | Inicio | `Hero.nowShowing` | En pantalla | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T045 | Inicio | `Hero.soundHint` | Con sonido · pulsa para ver | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T046 | Inicio | `Home.pathEyebrow` | Trayectoria | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T047 | Inicio | `Home.pathTitle` | Dónde he trabajado | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T048 | Inicio | `Home.viewExperience` | Experiencia completa | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T049 | Inicio | `Home.moreAbout` | Perfil | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T050 | Trabajo / Archivo | `Work.pageTitle` | Trabajo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T051 | Trabajo / Archivo | `Work.pageText` | Primero, los reportajes; después, el audiovisual y la fotografía. | Explica el orden de la página | — | — | Verificado | Sin cambio | — | **Mantener** |
| T052 | Trabajo / Archivo | `Work.sectionsAria` | Secciones de Trabajo | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T053 | Trabajo / Archivo | `Work.reportingNav` | Reportajes | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T054 | Trabajo / Archivo | `Work.audiovisualNav` | Audiovisual | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T055 | Trabajo / Archivo | `Work.photographyNav` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T056 | Trabajo / Archivo | `Work.archiveNav` | Archivo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T057 | Trabajo / Archivo | `Work.reportingKicker` | Reportajes | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T058 | Trabajo / Archivo | `Work.reportingTitle` | Ante la cámara | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T059 | Trabajo / Archivo | `Work.reportingText` | Entrevista, paseo a cámara, guía y prueba de producto, en vertical. Mejor con sonido. | Qué hay en «Ante la cámara» | FACTUAL: desde el 2026-10-11 la sección abre con el reel de coberturas (apaisado, 1:52); el texto solo describe las cuatro verticales y llama «entrevista» a 9‑1‑1 | Fase 5.1 | Desactualizado | Coberturas para televisión, una pieza personal, una guía y una prueba de producto. Mejor con sonido. | Incluye el reel y deja de prometer una entrevista | **Reescribir** |
| T060 | Trabajo / Archivo | `Work.audiovisualKicker` | Audiovisual | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T061 | Trabajo / Archivo | `Work.audiovisualTitle` | Detrás de la cámara | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T062 | Trabajo / Archivo | `Work.audiovisualText` | Dirigí y monté los dos cortometrajes. Del videoclip de Silver Praxis hice el rodaje y la posproducción. | Qué hay en «Detrás de la cámara» | FACTUAL (omisión): no menciona VERSIÓN BETA, que ahora abre la sección | P0257, P0278, P0301 | Verificado | Dos cortometrajes que dirigí y monté, un teaser que produje y grabé, y un videoclip del que hice el rodaje y la posproducción. | Una frase por tipo de pieza; sin repetir los créditos de cada ficha | **Reescribir** |
| T063 | Trabajo / Archivo | `Work.photographyKicker` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T064 | Trabajo / Archivo | `Work.photographyTitle` | Conciertos, calle y retrato | Título de Fotografía | JERARQUÍA: «Conciertos, calle y retrato» omite la acampada, la serie documental que la auditoría sitúa primero | Fase 5 | Verificado | Conciertos, una acampada, calle y retrato | Nombra lo que hay en el orden en que aparece | **Reescribir (menor)** |
| T065 | Trabajo / Archivo | `Work.photographyText` | Cinco series y un archivo para mirar sin prisa. | Subtítulo de Fotografía | — | Fase 5.1 | Verificado | Sin cambio | Ya revisado en 5.1 | **Mantener** |
| T066 | Trabajo / Archivo | `Work.seriesCount` | {count, plural, one {# fotografía} other {# fotografías}} | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T067 | Trabajo / Archivo | `Work.archiveTeaser` | {count} fotografías, por temas | Etiqueta de la tarjeta del Archivo | — | — | Verificado | Sin cambio | — | **Mantener** |
| T068 | Trabajo / Archivo | `Work.shortFormShowMore` | Ver {count} piezas más | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T069 | Trabajo / Archivo | `Work.shortFormShowLess` | Ver menos | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T070 | Trabajo / Archivo | `Work.viewAudiovisual` | Todo el audiovisual | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T071 | Trabajo / Archivo | `Work.viewPhotography` | Toda la fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T072 | Trabajo / Archivo | `Work.backToPhotography` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T073 | Trabajo / Archivo | `Work.photographyEyebrow` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T074 | Trabajo / Archivo | `Work.archiveTitle` | Archivo fotográfico | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T075 | Trabajo / Archivo | `Work.archiveTotal` | 74 imágenes | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T076 | Trabajo / Archivo | `Work.archiveIndexAll` | Todas | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T077 | Trabajo / Archivo | `Work.archiveMusica` | Música | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T078 | Trabajo / Archivo | `Work.archiveRetrato` | Retrato | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T079 | Trabajo / Archivo | `Work.archiveEstudio` | Estudio | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T080 | Trabajo / Archivo | `Work.archiveCalle` | Calle | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T081 | Trabajo / Archivo | `Work.archiveMusicaFull` | Música en directo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T082 | Trabajo / Archivo | `Work.archiveRetratoFull` | Retrato y editorial | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T083 | Trabajo / Archivo | `Work.archiveEstudioFull` | Estudio y editorial | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T084 | Trabajo / Archivo | `Work.archiveCalleFull` | Calle y documental | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T085 | Trabajo / Archivo | `Work.archiveClose` | Cerrar | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T086 | Trabajo / Archivo | `Work.archivePrev` | Anterior | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T087 | Trabajo / Archivo | `Work.archiveNext` | Siguiente | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T088 | Trabajo / Archivo | `Work.archiveImageLabel` | {group}, imagen {index} | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T089 | Fichas de proyecto (interfaz) | `Projects.featuredEyebrow` | Destacado | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T090 | Fichas de proyecto (interfaz) | `Projects.selectedEyebrow` | Trabajo seleccionado | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T091 | Fichas de proyecto (interfaz) | `Projects.audiovisualEyebrow` | Audiovisual | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T092 | Fichas de proyecto (interfaz) | `Projects.allEyebrow` | Portfolio | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T093 | Fichas de proyecto (interfaz) | `Projects.viewProject` | Ver proyecto | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T094 | Fichas de proyecto (interfaz) | `Projects.viewReel` | Ver reel | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T095 | Fichas de proyecto (interfaz) | `Projects.viewRelatedWork` | Ver {count, plural, one {# proyecto} other {# proyectos}} | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T096 | Fichas de proyecto (interfaz) | `Projects.viewOriginal` | Ver original | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T097 | Fichas de proyecto (interfaz) | `Projects.nextProject` | Proyecto siguiente | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T098 | Fichas de proyecto (interfaz) | `Projects.prevProject` | Proyecto anterior | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T099 | Fichas de proyecto (interfaz) | `Projects.moreFromSeries` | Más de esta serie | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T100 | Fichas de proyecto (interfaz) | `Projects.moreFromSeriesCount` | {count, plural, one {# imagen} other {# imágenes}} | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T101 | Fichas de proyecto (interfaz) | `Projects.seriesNavigation` | Navegación de serie fotográfica | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T102 | Fichas de proyecto (interfaz) | `Projects.seriesStory` | Historia | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T103 | Fichas de proyecto (interfaz) | `Projects.seriesComplete` | Serie completa | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T104 | Fichas de proyecto (interfaz) | `Projects.seriesCompleteCount` | {count, plural, one {# imagen} other {# imágenes}} | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T105 | Fichas de proyecto (interfaz) | `Projects.viewerPrev` | Anterior | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T106 | Fichas de proyecto (interfaz) | `Projects.viewerNext` | Siguiente | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T107 | Fichas de proyecto (interfaz) | `Projects.viewerClose` | Cerrar | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T108 | Fichas de proyecto (interfaz) | `Projects.projectNavAria` | Navegación entre proyectos | Etiqueta accesible | — | Interfaz | Verificado | Sin cambio | Describe la acción o el elemento | **Mantener** |
| T109 | Fichas de proyecto (interfaz) | `Projects.role` | Rol | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T110 | Fichas de proyecto (interfaz) | `Projects.credits` | Créditos | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T111 | Fichas de proyecto (interfaz) | `Projects.organisation` | Organización | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T112 | Fichas de proyecto (interfaz) | `Projects.year` | Año | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T113 | Fichas de proyecto (interfaz) | `Projects.format` | Formato | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T114 | Fichas de proyecto (interfaz) | `Projects.location` | Localización | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T115 | Fichas de proyecto (interfaz) | `Projects.play` | Reproducir | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T116 | Fichas de proyecto (interfaz) | `Projects.playCoverage` | Reproducir cobertura: {title} | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T117 | Fichas de proyecto (interfaz) | `Projects.reelEyebrow` | Reporter reel | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T118 | Fichas de proyecto (interfaz) | `Projects.reelMeta` | Reporterismo TV · Entrevistas · Cobertura de eventos | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T119 | Fichas de proyecto (interfaz) | `Projects.transcript` | Transcripción | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T120 | Fichas de proyecto (interfaz) | `Projects.locations.madrid` | Madrid | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T121 | Fichas de proyecto (interfaz) | `Projects.locations.tenerife` | Tenerife | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T122 | Fichas de proyecto (interfaz) | `Projects.locations.torrejon-de-ardoz` | Torrejón de Ardoz | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T123 | Fichas de proyecto (interfaz) | `Projects.locations.valencia` | Valencia | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T124 | Fichas de proyecto (interfaz) | `Projects.disciplines.reporting` | Reportajes | Etiqueta de disciplina | — | — | Verificado | Reportajes | — | **Mantener** |
| T125 | Fichas de proyecto (interfaz) | `Projects.disciplines.interview` | Entrevista | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T126 | Fichas de proyecto (interfaz) | `Projects.disciplines.video` | Vídeo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T127 | Fichas de proyecto (interfaz) | `Projects.disciplines.audiovisual` | Audiovisual | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T128 | Fichas de proyecto (interfaz) | `Projects.disciplines.photography` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T129 | Fichas de proyecto (interfaz) | `Projects.disciplines.communication` | Comunicación | (sin uso) | UX: clave no renderizada por ningún componente | Código | — | Eliminar en limpieza | Evita traducir texto muerto | **Eliminar (limpieza)** |
| T130 | Proyecto · 4-minutos | `Projects.items.4-minutos.title` | 4 MINUTOS | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T131 | Proyecto · 4-minutos | `Projects.items.4-minutos.description` | Trabajo de último año: dos chicos de barrio pasan el rato, fuman y dicen tonterías hasta que la conversación se va a sitios más grandes. Un solo plano, sin cort… | Qué es 4 MINUTOS | FACTUAL: «Un solo plano, sin cortes» contradice el vídeo (prólogo con cortes y cuatro planos largos; Fase 5 P0-3) | P0231–P0232, P0236, P0241; análisis de planos (Fase 5) | Pendiente: Sofía debe confirmar cómo describir el rodaje | Trabajo de último año: dos chicos de barrio pasan el rato, fuman y dicen tonterías hasta que la conversación se va a sitios más grandes. En blanco y negro y en planos largos. Inspirado en Sueños y pan. | Conserva su sinopsis literal y sustituye la afirmación falsa por lo que el vídeo muestra | **Reescribir (aprobación de Sofía)** |
| T132 | Proyecto · 4-minutos | `Projects.items.4-minutos.process[0]` | Un solo plano para dejar espacio a los silencios y a los cambios de tono entre la broma y algo más serio. Cuando los personajes se marchan, la cámara se queda m… | Cómo se hizo | FACTUAL: repite «Un solo plano»; «la cámara se queda mirando el espacio vacío» solo se sostiene en parte (hay un plano de banco vacío) | P0241; Fase 5 P0-3 | Pendiente | Planos largos para dejar espacio a los silencios y a los cambios de tono entre la broma y algo más serio. A mitad de rodaje el estabilizador se quedó sin batería y tocó improvisar. | Mantiene la intención y el problema de producción, que son suyos; retira lo que el vídeo desmiente hasta que Sofía lo aclare | **Reescribir (aprobación de Sofía)** |
| T133 | Proyecto · 4-minutos | `Projects.items.4-minutos.format` | Cortometraje | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T134 | Proyecto · 4-minutos | `Projects.items.4-minutos.roles[0]` | Dirección, guion, grabación y montaje — Sofía Chernikova | Rol de Sofía | — | P0236 | Verificado | Sin cambio | — | **Mantener** |
| T135 | Proyecto · 4-minutos | `Projects.items.4-minutos.credits.direction` | Sofía Chernikova | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T136 | Proyecto · 4-minutos | `Projects.items.4-minutos.credits.sound` | María Rodríguez | Crédito de sonido | FACTUAL (incompleto): en pantalla hay además un crédito musical («Sound / Autro – losniñosdelcaminito») | Fotograma de créditos (Fase 5) | Pendiente (derechos de la música) | Añadir clave `music`: losniñosdelcaminito (grafía literal de pantalla) | Créditos completos; derechos por confirmar | **Verificar (aprobación: créditos)** |
| T137 | Proyecto · 4-minutos | `Projects.items.4-minutos.credits.cast` | Eneko Valle García · Fran Vidales Santos | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T138 | Proyecto · 4-minutos | `Projects.items.4-minutos.credits.equipment` | Nikon D3300 · iPhone 13 | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T139 | Proyecto · 4-minutos | `Projects.items.4-minutos.creditLabels.direction` | Dirección | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T140 | Proyecto · 4-minutos | `Projects.items.4-minutos.creditLabels.sound` | Sonido | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T141 | Proyecto · 4-minutos | `Projects.items.4-minutos.creditLabels.cast` | Reparto | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T142 | Proyecto · 4-minutos | `Projects.items.4-minutos.creditLabels.equipment` | Equipo | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T143 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.title` | Tras el sofá | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T144 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.description` | Proyecto de último año: seis minutos de ficción rodados en un plató, en cuatro horas y sin salir de él. Una chica mata a su hermano sin querer y la novia de él … | Qué es Tras el sofá | — | P0253 | Verificado | Sin cambio | Sinopsis y condiciones de rodaje en dos frases; funciona | **Mantener** |
| T145 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.process[0]` | Con un equipo de diez personas y un solo espacio, todo dependía de dónde estaban los actores y de cómo se revelaba lo ocurrido. Faltó tiempo para algunos planos… | Cómo se hizo | — | P0260, P0263 | Verificado | Sin cambio | — | **Mantener** |
| T146 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.format` | Cortometraje | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T147 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.roles[0]` | Dirección — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T148 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.roles[1]` | Montaje — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T149 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.credits.direction` | Sofía Chernikova | Créditos | FACTUAL (incompleto): en pantalla constan producción, sonido, cámara, arte, guion, script y ayudante de dirección (ocho personas); la web solo lista a Sofía | Fotogramas 350–357 s (Fase 5) | Pendiente (grafías) | Añadir guion, producción, cámara, arte, sonido, script y ayudante de dirección según `PHASE6_FACT_CHECK.md` §4 | Atribución a las colaboradoras; el guion no es de Sofía y la ficha debe decirlo | **Verificar (aprobación: créditos)** |
| T150 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.credits.editing` | Sofía Chernikova | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T151 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.creditLabels.direction` | Dirección | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T152 | Proyecto · tras-el-sofa | `Projects.items.tras-el-sofa.creditLabels.editing` | Montaje | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T153 | Proyecto · version-beta | `Projects.items.version-beta.title` | VERSIÓN BETA | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T154 | Proyecto · version-beta | `Projects.items.version-beta.description` | Pitch de un minuto para una asignatura de Producción: una serie documental sobre jóvenes etiquetados como problemáticos, conducida por Pedro Aguado, presentador… | Qué es VERSIÓN BETA | — | P0274, P0278 | Verificado | Sin cambio | — | **Mantener** |
| T155 | Proyecto · version-beta | `Projects.items.version-beta.process[0]` | Contacté con Pedro Aguado, gestioné la localización y grabé a los jóvenes. El montaje es rápido a propósito: la energía de la serie en un minuto. | Cómo se hizo | — | P0278, P0282 | Verificado | Sin cambio | — | **Mantener** |
| T156 | Proyecto · version-beta | `Projects.items.version-beta.format` | Pieza promocional | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T157 | Proyecto · version-beta | `Projects.items.version-beta.roles[0]` | Producción, grabación y montaje — Sofía Chernikova | Rol | — | P0278 | Verificado | Sin cambio | — | **Mantener** |
| T158 | Proyecto · short-form-001 | `Projects.items.short-form-001.title` | Madrid a pie, cámara al cuello | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T159 | Proyecto · short-form-001 | `Projects.items.short-form-001.description` | Pieza personal: un paseo hablado a cámara por el centro de Madrid buscando lo que normalmente no enseñamos de los lugares más turísticos: basura, desperfectos, … | Qué es Madrid a pie | — | P0122, P0127, P0136–P0138 | Verificado | Sin cambio | Resume su idea con sus palabras | **Mantener** |
| T160 | Proyecto · short-form-001 | `Projects.items.short-form-001.roles[0]` | Idea, grabación, presentación y montaje — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T161 | Proyecto · short-form-002 | `Projects.items.short-form-002.title` | En el decorado de «9‑1‑1» | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T162 | Proyecto · short-form-002 | `Projects.items.short-form-002.description` | Pieza para las redes de Yoigo, producida en Annie Bonnie y grabada en el decorado de 9‑1‑1 en la estación de Chamartín. Presento el lugar y entrevisto al creado… | Qué es la pieza de 9‑1‑1 | FACTUAL: «entrevisto al creador de contenido» no se corresponde con la pieza publicada (sin preguntas en el audio; presentación, paso al invitado y cierre; Fase 5 P1-9). Sofía sí describe una entrevista (P0163): puede existir una versión larga | P0155, P0163, P0166; transcripción (Fase 5) | Pendiente | Pieza para las redes de Yoigo, producida en Annie Bonnie y grabada en el decorado de 9‑1‑1 en la estación de Chamartín. Presento el lugar y doy paso al creador de contenido @telocuentosinspoilers, que explica la serie. | Describe lo que el visitante va a ver; si Sofía aporta la versión con entrevista, se recupera la frase actual | **Reescribir (aprobación de Sofía)** |
| T163 | Proyecto · short-form-002 | `Projects.items.short-form-002.roles[0]` | Reportera y apoyo en edición — Sofía Chernikova | Rol | — | P0163 | Verificado | Sin cambio | «apoyo en edición» = «ayudar a editar» (P0163) | **Mantener** |
| T164 | Proyecto · short-form-003 | `Projects.items.short-form-003.title` | MyMUN, paso a paso | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T165 | Proyecto · short-form-003 | `Projects.items.short-form-003.description` | Vertical para las redes de URJCmun que explica MyMUN, la aplicación del congreso, a quien la abre por primera vez: grabación de pantalla, grafismos y explicació… | Qué es MyMUN | PRECISIÓN (menor): el vídeo promociona la edición 2026 («URJCmun 2026» en pantalla y en audio) y la ficha dice 2025 | P0207, P0210, P0213; transcripción | Parcial: año de realización 2025 según Sofía; la pieza es para la edición 2026 | Sin cambio de texto; `year` queda en 2025 si Sofía confirma que se grabó en 2025 | — | **Verificar** |
| T166 | Proyecto · short-form-003 | `Projects.items.short-form-003.roles[0]` | Contenido y presentación — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T167 | Proyecto · short-form-003 | `Projects.items.short-form-003.roles[1]` | Grabación y edición — en equipo | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T168 | Proyecto · short-form-004 | `Projects.items.short-form-004.title` | Probando el vivo X300 Pro | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T169 | Proyecto · short-form-004 | `Projects.items.short-form-004.description` | Para el TikTok de Yoigo, producida en Annie Bonnie: probar una función del teléfono y enseñar en cámara qué se puede hacer con ella, sin que la explicación pare… | Qué es la pieza del vivo X300 Pro | FACTUAL (Word vs vídeo): Sofía escribe «un modelo de OPPO» (P0182); el vídeo muestra y nombra el vivo X300 Pro. EDITORIAL: «sin que la explicación parezca una explicación» es su frase (P0193), pero el audio es una lectura de ficha técnica (Fase 5 P2-9) | P0181–P0182, P0189, P0192–P0193; transcripción | Parcial: marca por confirmar con Sofía (la web sigue al vídeo) | Para el TikTok de Yoigo, producida en Annie Bonnie: presentar a cámara las funciones de cámara del teléfono en el formato de la plataforma, aprendiéndose las frases en un minuto. | Lo que se ve y lo que ella cuenta del rodaje (P0193, «aprenderme las frases en cuestión de un minuto»); retira la promesa que el audio no cumple | **Reescribir (aprobación de Sofía)** |
| T170 | Proyecto · short-form-004 | `Projects.items.short-form-004.roles[0]` | Contenido y presentación — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T171 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.title` | Silver Praxis — Condición Perfecta | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T172 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.description` | Videoclip para Silver Praxis, de la escena del rap underground: varias localizaciones y situaciones que siguen el tema con movimiento y una estética ligada al u… | Qué es el videoclip | — | P0297 | Verificado | Sin cambio | Es su texto (registro formal); correcto | **Mantener** |
| T173 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.process[0]` | Cinco días de rodaje, planos dentro de un coche y tomas aéreas con un dron que piloté yo misma. Sin guion técnico, el montaje salió de varias horas de probar co… | Cómo se hizo | — | P0301, P0309 | Verificado | Sin cambio | — | **Mantener** |
| T174 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.format` | Videoclip | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T175 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.roles[0]` | Rodaje y posproducción — Sofía Chernikova | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T176 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.credits.filming` | Sofía Chernikova | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T177 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.credits.creative` | Briza Sanchez | Crédito de dirección creativa | PRECISIÓN: Sofía escribe «Briza Sánchez» (P0312); la pantalla «Briza Sanchez»; la web sigue a la pantalla | P0312; créditos en pantalla | Pendiente (grafía) | Confirmar con Sofía o con la propia Briza | — | **Verificar** |
| T178 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.credits.production` | Silver Praxis | Crédito de producción musical | FACTUAL (incompleto): seis extras acreditados en pantalla no aparecen | Créditos en pantalla (Fase 5) | Pendiente | Añadir clave `extras` con los seis nombres de pantalla | Créditos completos | **Verificar (aprobación: créditos)** |
| T179 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.filming` | Rodaje y posproducción | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T180 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.creative` | Dirección creativa, estilismo y lettering | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T181 | Proyecto · silver-praxis-condicion-perfecta | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.production` | Producción, mezcla y master | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T182 | Proyecto · reporter-reel | `Projects.items.reporter-reel.title` | Coberturas para «Tacones y Asfalto» | Título del reel | — | Vídeo (rótulos y audio) | Verificado en el vídeo; afiliación pendiente | Sin cambio | — | **Mantener** |
| T183 | Proyecto · reporter-reel | `Projects.items.reporter-reel.description` | Resumen de coberturas como reportera del programa Tacones y Asfalto: el estreno de La guitarra flamenca de Yerai Cortés en Kinépolis, la 43.ª Semana del Cine Es… | Qué es el reel | PRECISIÓN (pendiente): «como reportera del programa Tacones y Asfalto» se basa en los rótulos y la frase de apertura del vídeo; la relación programa/cadena/Grupo Cadena Media no está confirmada por Sofía | Vídeo; CV (Grupo Cadena Media) | Pendiente | Sin cambio hasta que Sofía confirme programa, cadena y fechas | — | **Verificar** |
| T184 | Proyecto · reporter-reel | `Projects.items.reporter-reel.format` | Televisión · Reel | Formato | PRECISIÓN: «Televisión» no está confirmado como medio de emisión | — | Pendiente | Reel de coberturas (si no se confirma la emisión en televisión) | — | **Verificar** |
| T185 | Proyecto · reporter-reel | `Projects.items.reporter-reel.roles[0]` | Reporterismo en estrenos, eventos y ruedas de prensa. | Rol (línea 1) | PRECISIÓN: el campo `roles` espera «Rol — Persona»; aquí hay una frase descriptiva heredada de la ficha sin publicar | — | Verificado | Reportera — Sofía Chernikova | Coherente con el resto de fichas | **Reescribir (menor)** |
| T186 | Proyecto · reporter-reel | `Projects.items.reporter-reel.roles[1]` | Entrevistas a artistas, actores y figuras públicas. | Rol (línea 2) | REDUNDANCIA: repite la descripción | — | — | Eliminar | La descripción ya lo dice | **Eliminar** |
| T187 | Fotografía · retrato-editorial | `Projects.items.retrato-editorial.title` | Retrato y editorial | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T188 | Fotografía · retrato-editorial | `Projects.items.retrato-editorial.description` | Retratos hechos principalmente para una revista de moda y actualidad: una nave abandonada, una terraza, un local con neón rojo y calles con grafiti. | Qué es la serie | — | P0365; EXIF junio 2024 | Parcial: revista sin nombrar | Sin cambio (si Sofía nombra la revista, sustituir «una revista de moda y actualidad» por el nombre) | — | **Verificar** |
| T189 | Fotografía · retrato-editorial | `Projects.items.retrato-editorial.format` | Retrato · Editorial | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T190 | Fotografía · retrato-editorial | `Projects.items.retrato-editorial.roles[0]` | Fotografía | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T191 | Fotografía · musica-en-directo | `Projects.items.musica-en-directo.title` | Música en directo | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T192 | Fotografía · musica-en-directo | `Projects.items.musica-en-directo.description` | Conciertos en sala y al aire libre, desde el escenario y entre el público. | Qué es la serie | INFORMATIVO (leve): no dice dónde ni cuándo; Sofía sí da el lugar (Madrid) y el festival (nombre pendiente) | P0334, P0339, P0345 | Parcial: «Madrid Salvaje» vs «madrid sálvale 2025» | Conciertos y festivales en Madrid, en sala y al aire libre, desde el escenario y entre el público. | Añade el lugar, que es verificable; el festival se nombra cuando Sofía confirme la grafía | **Reescribir (menor)** |
| T193 | Fotografía · musica-en-directo | `Projects.items.musica-en-directo.format` | Conciertos | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T194 | Fotografía · musica-en-directo | `Projects.items.musica-en-directo.roles[0]` | Fotografía | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T195 | Fotografía · entre-tiendas-y-tambores | `Projects.items.entre-tiendas-y-tambores.title` | Entre tiendas y tambores | Título de la serie | UX: el propietario decidió renombrarla «Acampada en Sol» (2026-10-11) | Decisión del propietario | Pendiente de ejecución | Acampada en Sol | Lugar y hecho en el título | **Reescribir (ya aprobado; ejecutar en implementación)** |
| T196 | Fotografía · entre-tiendas-y-tambores | `Projects.items.entre-tiendas-y-tambores.description` | Segundo día de la acampada en Sol, en Madrid, durante las movilizaciones por el derecho a la vivienda: las tiendas, las pancartas, las conversaciones y la gente… | Qué es la serie | INFORMATIVO (leve): falta la fecha, que ahora es documentable | P0380, P0384; EXIF del ZIP (noche del 28 al 29 de septiembre de 2026) | Parcial: fecha pendiente de confirmación | Segundo día de la acampada en Sol, en Madrid, a finales de septiembre de 2026, durante las movilizaciones por el derecho a la vivienda: las tiendas, las pancartas, las conversaciones y la gente organizándose y compartiendo espacio. | Añade el cuándo; el resto es suyo | **Reescribir (confirmar fecha)** |
| T197 | Fotografía · entre-tiendas-y-tambores | `Projects.items.entre-tiendas-y-tambores.format` | Ensayo fotográfico | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T198 | Fotografía · calle-documental | `Projects.items.calle-documental.title` | Calle y documental | Título de la serie | PRECISIÓN: «documental» promete un relato que la serie no tiene (Fase 5 P1-3) | Fase 5 | Verificado | Calle | Lo que hay: escenas de calle y una marcha, sin relato común | **Reescribir (aprobación del propietario: título de serie)** |
| T199 | Fotografía · calle-documental | `Projects.items.calle-documental.description` | Una manifestación nocturna ante un edificio iluminado en violeta y escenas de calle a plena luz. | Qué es la serie | INFORMATIVO: no sitúa ni fecha; «edificio iluminado en violeta» describe la foto en vez de decir qué es | EXIF 2023-03-08; observación visual (Palacio de Cibeles) | Parcial: edificio y evento por confirmar | Escenas de calle en Madrid a plena luz y una marcha nocturna ante el Palacio de Cibeles, en marzo de 2023. | Lugar y fecha verificables sustituyen a la descripción visual; el nombre de la marcha no se afirma | **Reescribir (verificar edificio y evento con Sofía)** |
| T200 | Fotografía · calle-documental | `Projects.items.calle-documental.format` | Calle · Documental | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T201 | Fotografía · calle-documental | `Projects.items.calle-documental.roles[0]` | Fotografía | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T202 | Fotografía · estudio-editorial | `Projects.items.estudio-editorial.title` | Estudio y editorial | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T203 | Fotografía · estudio-editorial | `Projects.items.estudio-editorial.description` | Sesiones de estudio con DJ y cantantes para sus propios proyectos: fondo blanco y atrezo, de televisores antiguos a una guitarra. | Qué es la serie | — | P0350 | Parcial: artistas sin nombrar | Sin cambio | — | **Mantener** |
| T204 | Fotografía · estudio-editorial | `Projects.items.estudio-editorial.format` | Estudio · Editorial | Dato de ficha | — | Ficha / créditos en pantalla | Verificado | Sin cambio | Dato correcto y necesario | **Mantener** |
| T205 | Fotografía · estudio-editorial | `Projects.items.estudio-editorial.roles[0]` | Fotografía | Rol de Sofía | — | Word (sección 03/04) | Verificado | Sin cambio | Coincide con lo que Sofía declara | **Mantener** |
| T206 | Fichas de proyecto (interfaz) | `Projects.processLabel` | Cómo se hizo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T207 | Perfil | `Profile.bio` | Digo que cuento cosas. A veces con una cámara, otras escribiendo o haciendo preguntas. Estudié Periodismo y Comunicación Audiovisual porque siempre me ha costad… | Decir quién es Sofía en primera persona | INFORMATIVO · VOZ: tres frases literales recortadas (la anáfora «a veces… a veces… a veces» y el cierre «Supongo que sigo un poco ahí» se perdieron); no dice a qué se dedica ni cómo trabaja; el oficio solo lo aporta la línea de rol | P0012; P0023–P0024; P0030; P0019 | Verificado (literal) / las frases nuevas requieren aprobación | Variante B de `PHASE6_PROPOSED_COPY_ES.md` §2 | Recupera el párrafo literal íntegro y añade un segundo párrafo con su manera de trabajar (cámara, entrevista, montaje) sin repetir el currículum de la portada | **Reescribir (aprobación de Sofía)** |
| T208 | Perfil | `Profile.aboutPageEyebrow` | Perfil · Madrid | Antetítulo | — | — | Verificado | Perfil · Madrid | — | **Mantener** |
| T209 | Perfil | `Profile.role` | Periodista y reportera de televisión | Oficio visible bajo el nombre | — | CV (registro interno); P0163, P0397 («reportera») | Verificado | Periodista y reportera de televisión | Correcto: una profesión, sin lista de etiquetas | **Mantener** |
| T210 | Perfil | `Profile.educationEyebrow` | Formación | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T211 | Perfil | `Profile.languagesEyebrow` | Idiomas | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T212 | Perfil | `Profile.toolsEyebrow` | Herramientas | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T213 | Perfil | `Profile.viewFullExperience` | Experiencia completa | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T214 | Perfil | `Profile.baseLabel` | Base | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T215 | Perfil | `Profile.baseValue` | Madrid | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T216 | Perfil | `Profile.viewWork` | Ver el trabajo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T217 | Experiencia | `Experience.pageTitle` | Experiencia | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T218 | Experiencia | `Experience.progressionLabel` | Roles desempeñados | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T219 | Experiencia | `Experience.items.grupo-cadena-media.role` | Reportera TV | Cargo | PRECISIÓN (menor): «Reportera TV» es la grafía del CV; la web usa «reportera de televisión» en todas partes | CV (registro interno) | Verificado | Reportera de televisión | Coherencia con Hero.role y Profile.role | **Reescribir (menor)** |
| T220 | Experiencia | `Experience.items.grupo-cadena-media.period` | 2024 — Actualidad | Periodo | — | CV (registro interno) | Verificado | 2024 — Actualidad | — | **Mantener** |
| T221 | Experiencia | `Experience.items.grupo-cadena-media.description` | Cubro estrenos, eventos y ruedas de prensa para televisión, entrevisto a artistas, actores y figuras públicas y escribo los guiones de las piezas. Unas veces ha… | Qué hace una reportera de televisión y qué hace Sofía | INFORMATIVO: enumera tareas sin proceso (preparación, grabación de recursos, trabajo a cámara, guion); la anécdota final ocupa un tercio del texto | P0053–P0054; CV (registro interno) para «guiones» | Parcial: «escribo los guiones» no está en el Word; solo en el CV según el registro interno | Propuesta 1 de `PHASE6_PROPOSED_COPY_ES.md` §3.1 | Describe el ciclo completo de una cobertura con sus verbos (investigar, preparar preguntas, buscar recursos, conseguir entrevistas, hablar a cámara, escribir el guion) y conserva la frase de los dos minutos, más corta | **Reescribir (aprobación de Sofía)** |
| T222 | Experiencia | `Experience.items.urjcmun.role` | Deputy Director for Social Media | Cargo | TRADUCCIÓN/PRECISIÓN: cargo en inglés en la versión española; Sofía lo escribe «Directora Adjunta de Social Media» (P0069) | CV; P0069 | Verificado | Directora adjunta de redes sociales (Deputy Director for Social Media) | Español primero, denominación oficial entre paréntesis | **Reescribir (menor)** |
| T223 | Experiencia | `Experience.items.urjcmun.period` | 2022 — 2026 | Periodo | — | CV; P0068 (2022), P0069 (2026) | Verificado | 2022 — 2026 | La vinculación de 2027 (Chair) no se publica | **Mantener** |
| T224 | Experiencia | `Experience.items.urjcmun.progression.communicationTeam` | Communication Team | Rol 1 de la tira | TRADUCCIÓN: etiqueta en inglés | CV | Verificado (año: 2022 según P0068) | Equipo de comunicación | — | **Reescribir (menor)** |
| T225 | Experiencia | `Experience.items.urjcmun.progression.cameraOperator` | Camera Operator | Rol 2 de la tira | TRADUCCIÓN; año sin fuente | CV | Parcial: año pendiente | Operadora de cámara | — | **Reescribir (menor) + verificar año** |
| T226 | Experiencia | `Experience.items.urjcmun.progression.delegate` | Delegate | Rol 3 de la tira | PRECISIÓN: «Delegate» es participar como delegada en el modelo, no un escalón del equipo de comunicación; la tira lo presenta como progresión | CV | Parcial: año pendiente | Delegada | Mantener en la tira solo si Sofía confirma que quiere mostrarlo como parte de su recorrido | **Verificar** |
| T227 | Experiencia | `Experience.items.urjcmun.progression.deputyDirector` | Deputy Director for Social Media | Rol 4 de la tira | TRADUCCIÓN | CV; P0069 | Verificado (2026) | Directora adjunta de redes sociales | — | **Reescribir (menor)** |
| T228 | Experiencia | `Experience.items.urjcmun.description` | Redes sociales del Modelo de Naciones Unidas de la Universidad Rey Juan Carlos, incluida su edición TEEN: estrategia, calendario y métricas, contenido gráfico y… | Qué hizo en URJCmun y cómo evolucionó | INFORMATIVO · JERARQUÍA: sin verbo principal; mezcla cuatro años en una frase; no se entiende que coordinó un equipo en 2026 ni que empezó en 2022; «edición TEEN» no tiene fuente en el Word | P0068–P0069; P0073–P0076; CV (registro interno) | Parcial: 16 vs 18 reporteros sin resolver (no se publica cifra); TEEN pendiente de fuente; cargo 2027 fuera de la web | Propuesta 1 de `PHASE6_PROPOSED_COPY_ES.md` §3.3 | Cronología (2022 → 2026), responsabilidad concreta de 2026 y el trabajo previo del año, con un verbo por frase | **Reescribir (aprobación de Sofía)** |
| T229 | Experiencia | `Experience.items.annie-bonnie.role` | Comunicación corporativa | Cargo | FACTUAL (pendiente): el CV dice «Comunicación corporativa»; Sofía habla de «mis prácticas» | CV; P0155 | Pendiente | Comunicación corporativa (prácticas) — si Sofía lo confirma | No se cambia sin confirmación | **Verificar** |
| T230 | Experiencia | `Experience.items.annie-bonnie.period` | 2025 — 2026 | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T231 | Experiencia | `Experience.items.annie-bonnie.description` | En una consultora de comunicación: artículos para el blog, TikToks, edición de vídeo, entrevistas y cobertura de eventos como MWC Madrid, además de un dashboard… | Qué hacía en Annie Bonnie y para quién | INFORMATIVO · PRECISIÓN: «En una consultora de comunicación:» no es una frase; «TikToks» y «dashboard» son jerga; no dice que fueran prácticas (Sofía lo dice cuatro veces) ni para qué clientes | P0088–P0090; P0155, P0159, P0181, P0186 («prácticas»); P0095 («Madring», Iker Casillas: sin verificar) | Parcial: naturaleza del puesto (prácticas / cargo) pendiente; «MWC Madrid» lo escribe Sofía (P0088) | Propuesta 1 de `PHASE6_PROPOSED_COPY_ES.md` §3.2 | Ordena el puesto en tres bloques (contenidos, vídeo y coberturas, análisis semanal) con verbos y sin jerga | **Reescribir (aprobación de Sofía; confirmar «prácticas»)** |
| T232 | Experiencia | `Experience.items.isocero.role` | Fotógrafa en hoteles | Cargo | — | CV; P0107 («de fotógrafa a comercial») | Verificado | Fotógrafa en hoteles | — | **Mantener** |
| T233 | Experiencia | `Experience.items.isocero.period` | 2023 | Periodo | — | CV | Verificado | 2023 | — | **Mantener** |
| T234 | Experiencia | `Experience.items.isocero.description` | Sesiones de retrato a familias en la piscina de los hoteles por la mañana, edición en Lightroom a mediodía y venta de las fotografías en el stand por la tarde. | Qué hacía como fotógrafa en hoteles | INFORMATIVO: describe un horario, no el puesto; no transmite que llevaba todo el proceso | P0104–P0107; P0111–P0114 | Verificado | Propuesta 1 de `PHASE6_PROPOSED_COPY_ES.md` §3.4 | Pasa de la jornada a las responsabilidades: proponer, dirigir, editar, vender, responder del material | **Reescribir (aprobación de Sofía)** |
| T235 | Perfil | `Education.items[0].institution` | Universidad Rey Juan Carlos | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T236 | Perfil | `Education.items[0].program` | Periodismo y Comunicación Audiovisual | Titulación | PRECISIÓN (pendiente): no consta si es el doble grado oficial o dos titulaciones; no consta si está finalizado | CV; P0012 («Estudié Periodismo y Comunicación Audiovisual») | Parcial | Periodismo y Comunicación Audiovisual (sin cambio hasta confirmar la denominación oficial) | No se añade «Grado» ni «Doble Grado» ni «graduada» sin el CV delante | **Verificar** |
| T237 | Perfil | `Education.items[0].period` | 2021 — 2026 | Periodo académico | — | CV | Verificado como fechas; finalización no confirmada | 2021 — 2026 | — | **Mantener** |
| T238 | Perfil | `Languages.eyebrow` | Idiomas | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T239 | Perfil | `Languages.items[0].code` | ES | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T240 | Perfil | `Languages.items[0].name` | Español | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T241 | Perfil | `Languages.items[0].level` | Nativo | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T242 | Perfil | `Languages.items[1].code` | RU | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T243 | Perfil | `Languages.items[1].name` | Ruso | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T244 | Perfil | `Languages.items[1].level` | Nativo | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T245 | Perfil | `Languages.items[2].code` | EN | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T246 | Perfil | `Languages.items[2].name` | Inglés | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T247 | Perfil | `Languages.items[2].level` | Avanzado | Nivel de inglés | — | CV | Verificado (sin certificación) | Avanzado | No se convierte en C1 | **Mantener** |
| T248 | Perfil | `Languages.items[3].code` | VAL | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T249 | Perfil | `Languages.items[3].name` | Valenciano | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T250 | Perfil | `Languages.items[3].level` | Avanzado | Nivel de valenciano | — | CV | Verificado (sin certificación) | Avanzado | — | **Mantener** |
| T251 | Perfil | `Languages.items[4].code` | IT | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T252 | Perfil | `Languages.items[4].name` | Italiano | Dato de perfil | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T253 | Perfil | `Languages.items[4].level` | Intermedio | Nivel de italiano | — | CV | Verificado (sin certificación) | Intermedio | No se convierte en B2 | **Mantener** |
| T254 | Contacto | `Contact.eyebrow` | Contacto | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T255 | Contacto | `Contact.title` | ¿Hablamos? | Título | — | — | Verificado | ¿Hablamos? | — | **Mantener** |
| T256 | Contacto | `Contact.email` | Email | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T257 | Contacto | `Contact.linkedin` | LinkedIn | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T258 | Contacto | `Contact.base` | Base | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T259 | Contacto | `Contact.baseValue` | Madrid | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T260 | Contacto | `Contact.contactPageEyebrow` | Contacto | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T261 | Contacto | `Contact.contactPageTitle` | ¿Hablamos? | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T262 | Contacto | `Contact.contactPageText` | Si tienes una propuesta de trabajo, una colaboración o una pregunta sobre alguna de mis piezas, escríbeme. Me interesan sobre todo los reportajes, las entrevist… | Invitación a escribir | — | P0397, P0408 | Verificado (adaptación aprobada en Fase 4, pendiente de Sofía) | Sin cambio | Cumple su función: qué le interesa y dónde | **Mantener** |
| T263 | Contacto | `Contact.copy` | Copiar email | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T264 | Contacto | `Contact.copied` | Copiado | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T265 | Contacto | `Contact.languages` | Idiomas | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T266 | Contacto | `Contact.languagesValue` | Español · Ruso · Inglés · Valenciano · Italiano | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T267 | General (navegación, footer, 404) | `Footer.location` | Madrid | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T268 | General (navegación, footer, 404) | `Footer.copyright` | © 2026 Sofía Chernikova | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T269 | General (navegación, footer, 404) | `NotFound.eyebrow` | 404 | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T270 | General (navegación, footer, 404) | `NotFound.title` | Página no encontrada | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T271 | General (navegación, footer, 404) | `NotFound.body` | La página que buscas no existe o ha cambiado de dirección. | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T272 | General (navegación, footer, 404) | `NotFound.home` | Volver al inicio | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T273 | General (navegación, footer, 404) | `WorkRail.label` | Trabajo | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T274 | General (navegación, footer, 404) | `WorkRail.reporting` | Reportajes | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T275 | General (navegación, footer, 404) | `WorkRail.audiovisual` | Audiovisual | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T276 | General (navegación, footer, 404) | `WorkRail.photography` | Fotografía | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T277 | General (navegación, footer, 404) | `WorkRail.prev` | Proyecto anterior | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T278 | General (navegación, footer, 404) | `WorkRail.next` | Proyecto siguiente | Texto de interfaz | — | Interfaz | Verificado | Sin cambio | Breve y funcional | **Mantener** |
| T279 | Inicio / general | `hero.tsx · nombre` | Sofía Chernikova | Identidad | — | — | Verificado | Sin cambio | — | **Mantener** |
| T280 | Perfil | `profile.ts · tools[0..9]` | Premiere Pro · DaVinci Resolve · Photoshop · Lightroom · Canva · CapCut · Khoros · CMS · Jira · SEO | Competencias | PRECISIÓN: lista plana que mezcla aplicaciones, una plataforma, un tipo de sistema sin nombre («CMS») y un conocimiento («SEO») | CV (registro interno) | Verificado como lista del CV | Cuatro grupos (ver `PHASE6_PROPOSED_COPY_ES.md` §6); «CMS» y «SEO» pasan a «Conocimientos» o al registro interno | Un reclutador de vídeo busca Premiere/DaVinci; uno de comunicación, Khoros; SEO no es una herramienta | **Reescribir (estructura; aprobación del propietario)** |
| T281 | Experiencia | `experience.ts · company ×4` | Grupo Cadena Media · Annie Bonnie · URJCmun · Isocero | Empresas | — | CV (registro interno) | Verificado | Sin cambio | — | **Mantener** |
| T282 | Contacto / footer | `profile.ts · email, linkedin` | chernisv@gmail.com · linkedin.com/in/sofia-chernikova | Contacto | — | Sofía (P0411: LinkedIn) | Verificado | Sin cambio; Instagram y YouTube solo cuando Sofía aporte las URL (P0411) | — | **Mantener** |
| T283 | Fichas | `projects.ts · year (tras-el-sofa, version-beta, condicion-perfecta: vacío; series: «Pendiente»)` | — | Año | FACTUAL: tres obras y cinco series sin año público | Word (vacíos P0267, P0290, P0312); EXIF para las series | Pendiente | Pedir a Sofía; para las series, proponer el año EXIF (ver `PHASE6_FACT_CHECK.md` §5) | Un reclutador quiere fechar las piezas | **Verificar** |

## 3. Resumen de decisiones

| Acción | Claves |
|---|---|
| Mantener | 226 |
| Reescribir | 24 |
| Eliminar | 17 |
| Verificar | 11 |

Los problemas con impacto en lo que un visitante entiende están en 14 claves: la biografía, las cuatro descripciones de Experiencia, los tres textos de sección de Trabajo, las fichas de 4 MINUTOS (descripción y proceso), 9‑1‑1 y vivo, y las descripciones de Música y Calle. El resto es acabado (grafías de cargo, etiquetas en inglés, créditos incompletos) o está correcto.

## 4. Auditoría de traducciones (EN/RU)

Auditoría delegada a un revisor bilingüe sobre las 279 claves no-ALT de `en.json` y `ru.json` frente a `es.json`. Ninguna clave falta. Inglés: ortografía británica consistente; ruso: tipografía (« », —, ё) correcta. Solo se listan problemas reales; las correcciones se aplican en la implementación junto con los textos nuevos, no antes.

**Inglés (18 incidencias)**

| Clave | Problema | Corrección propuesta |
|---|---|---|
| `Metadata.siteTitle`, `Metadata.pages.home.title`, `Metadata.personRole`, `Profile.role` | Tres grafías del oficio («Journalist & TV Reporter», «Journalist and TV Reporter», «Journalist and television reporter»), con mayúsculas de título | «Journalist and TV reporter» en todas |
| `Experience.items.{grupo-cadena-media,annie-bonnie,isocero}.role` | Mayúsculas de título («TV Reporter», «Corporate Communications», «Hotel Photographer») | Minúsculas de frase, como en ES |
| `Metadata.pages.photoArchive.title` vs `Work.archiveTitle` | «Photography Archive» / «Photographic archive» | «Photo archive» |
| `Education.items[0].program` | «Journalism & Audiovisual Communication» frente a «Journalism and Audiovisual Communication» en la bio | Unificar con «and» |
| `Projects.items.{4-minutos,version-beta}.roles[0]` vs `short-form-001.roles[0]`, `short-form-003.roles[1]` | «grabación» como «camera» o «filming» según la ficha | «camera» en las líneas de créditos |
| `Projects.items.tras-el-sofa.process[0]` | «…and on how what had happened was revealed» (calco) | «…and on how the truth came out» |
| `Projects.items.short-form-003.description` | «to whoever opens it for the first time… explanation to camera» | «for first-time users… and me explaining it to camera» |
| `Projects.items.reporter-reel.description` | «43rd Spanish Film Week of Carabanchel» | «43rd Carabanchel Spanish Film Week» |
| `Projects.items.entre-tiendas-y-tambores.title` | «Between Tents and Drums» en mayúsculas de título (el resto va en minúsculas) | Pendiente del renombrado a «Acampada en Sol» (EN «Camp at Puerta del Sol») |
| `Projects.items.entre-tiendas-y-tambores.description` | «the camp in Sol» | «the protest camp at Puerta del Sol» |
| `Work.audiovisualText` | «On the Silver Praxis music video I did the shooting and post-production» | «I shot and post-produced the Silver Praxis music video» (se reescribe entera en esta fase) |
| `Profile.baseLabel`, `Contact.base` | «Base» (calco) | «Based in» |
| `Experience.progressionLabel` | «Roles across URJCmun» añade un nombre que el ES no tiene | «Roles held» |
| `Contact.title`, `Contact.contactPageTitle` | «Get in touch» es un CTA genérico | «Shall we talk?» |
| `Navigation.homeAria` | «Go to home» | «Go to homepage» |
| `Metadata.pages.contact.description` | «Professional contact for Sofía Chernikova, for media…» (doble «for») | «Professional contact for Sofía Chernikova: media, coverage, audiovisual production and communications» |
| `Projects.audiovisualEyebrow` | «Audiovisual» frente a «Film & video» en el resto | Clave sin uso: eliminar |

**Ruso (32 incidencias; las que afectan al sentido primero)**

| Clave | Problema | Corrección propuesta |
|---|---|---|
| `Work.reportingText` | «прогулка с камерой» = paseo *con* cámara; el ES dice *a cámara* | «прогулка на камеру» (se reescribe entera) |
| `Metadata.pages.contact.description` | «СМИ, съёмки» traduce «coberturas» como rodajes | «СМИ, репортажи и освещение событий» |
| `Projects.items.{short-form-002,short-form-004}.description` | «сделанный в Annie Bonnie» se lee como lugar | «спродюсировано агентством Annie Bonnie» |
| `Projects.items.short-form-001.description` | «поломки» = averías de maquinaria | «мусор, разруха, заброшенные углы» |
| `Projects.items.tras-el-sofa.description` | «девушка… его девушка»: la misma palabra para «chica» y «novia» | «Героиня случайно убивает брата, и его девушка узнаёт об этом» |
| `Projects.items.tras-el-sofa.process[0]` | «непрерывность» no es «continuidad» de rodaje | «проблемы с континьюити решили на монтаже» |
| `Work.archiveRetratoFull`, `Work.archiveEstudioFull`, `Projects.items.{retrato-editorial,estudio-editorial}.{title,format}` | «editorial» sin traducir | «Портрет и эдиториал» / «Студия и эдиториал» |
| `Work.archiveTeaser` | «фотографии» sin plural ICU (solo correcto para 2–4) | `{count, plural, one {# фотография} few {# фотографии} many {# фотографий} other {# фотографии}} по темам` |
| `Hero.summary`, `Work.audiovisualText` | «снимаю… как режиссёр» (redundante) y «уличные сцены» | «Ещё снимаю короткометражки и фотографирую концерты, улицу и портреты»; «Обе короткометражки я сняла и смонтировала сама» |
| `Hero.summary`, `Experience.items.grupo-cadena-media.description`, `Projects.items.reporter-reel.roles[1]` | «публичные фигуры» (calco) / «публичных людей» | «публичные персоны» en todas |
| `Metadata.siteTitle`, `Metadata.pages.home.title`; `Projects.items.*.roles[*]` | Nombre en latino en unas claves y en cirílico en otras | «София Черникова» en títulos y líneas de rol; latino solo en `credits.*` junto a otros nombres latinos |
| `Projects.items.4-minutos.creditLabels.cast` | «Актёры» | Etiqueta estándar «В ролях» |
| `Projects.items.version-beta.description` | «который ведёт Педро Агуадо, ведущий…» | «…ведущий — Педро Агуадо из Hermano Mayor» |
| `Projects.items.{short-form-003,short-form-004}.roles[0]` | «Содержание» = índice | «Контент и ведение» |
| `Projects.items.silver-praxis-condicion-perfecta.description`, `.creditLabels.production` | Calco sintáctico; «Продакшн» es término de vídeo | «…которые движутся вслед за треком, в эстетике из мира артиста»; «Продюсирование, сведение и мастеринг» |
| `Projects.items.reporter-reel.description` | Triple «с» | «…и интервью с артистами, в том числе с Лолой Индиго» |
| `Projects.items.entre-tiendas-y-tambores.description` | «на Соль» | «на Пуэрта-дель-Соль» |
| `Profile.bio` | «рассказываю о разном»; «между тем, чтобы смотреть, и тем, чтобы…» | «Я говорю, что рассказываю истории»; «мне всегда было трудно выбрать: смотреть или рассказывать о том, что вижу» (se retraduce con la bio nueva) |
| `Profile.baseLabel` vs `Contact.base` | «Город» / «База» | «Город» en ambas |
| `Experience.progressionLabel` | «Роли в URJCmun» | «Роли» |
| `Experience.items.urjcmun.description` | Universidad en latino frente a «Университете короля Хуана Карлоса» en metadatos; «издание TEEN» = publicación | «формат TEEN»; unificar el nombre de la universidad (se reescribe entera) |
| `Experience.items.annie-bonnie.description` | «консалтинговом агентстве по коммуникациям… TikTok» | «В коммуникационном агентстве… ролики для TikTok» (se reescribe entera) |
| `Projects.disciplines.communication`, `Metadata.pages.experience.description` vs `Experience.items.annie-bonnie.role` | «Коммуникация» singular | «Коммуникации» |
| `Home.pathEyebrow` | «Опыт» choca con el menú «Опыт» | «Карьера» |
| `Work.archiveMusicaFull`, `Projects.items.musica-en-directo.title` | «Музыка вживую» | «Живая музыка» |
| `Projects.viewReel`, `Projects.reelEyebrow`, `Projects.playCoverage` | «рил» (Instagram), «репортаж» vs «Смотреть» | Claves sin uso: eliminar; en `reporter-reel.format` usar «Шоурил» |

**Valoración.** En inglés la voz sobrevive (primera persona, frases cortas, nombres concretos; «shot list», «walk-and-talk», «the cut» bien elegidos); las faltas son de consistencia. En ruso las descripciones largas suenan a persona, no a currículum; las faltas son de término y de dos calcos que cambian el sentido («прогулка с камерой», «съёмки» por coberturas). Mejores: 4 MINUTOS (EN y RU), Annie Bonnie (EN), Grupo Cadena Media (RU). Más débiles: `Tras el sofá · process` (EN), `Base` (EN/RU), `Hero.summary` y el bloque «editorial» (RU).

## 5. Recorrido completo: tres visitantes sobre el contenido actual

| | Responsable de selección de televisión | Productora audiovisual | Editor de fotografía / revista cultural |
|---|---|---|---|
| Diez segundos (portada) | Entiende «Reportera de televisión» y ve a Sofía con micrófono en el reel de coberturas. Suficiente | Lee «dirijo cortometrajes» y ve VERSIÓN BETA grande. Suficiente | Ve la tira de cinco portadas; entiende «fotografía de conciertos, calle y retrato», no que haya un ensayo documental |
| Después de Perfil | Sabe que estudió Periodismo y Comunicación Audiovisual y que «cuenta cosas»; no sabe cómo trabaja ante la cámara ni en entrevista (lo que más le interesa) | Sabe lo mismo; no ve nada sobre rodaje ni montaje | Ve el retrato y una bio que no habla de fotografía |
| Después de Experiencia | Lee tareas (estrenos, eventos, guiones) y una anécdota; no lee el proceso de una cobertura. Annie Bonnie le suena a agencia; URJCmun no le dice qué coordinó | Lee «edición de vídeo» en Annie Bonnie y «contenido audiovisual» en URJCmun; nada sobre dirección o montaje, que están solo en las fichas | Lee Isocero como una jornada de piscina; no entiende que dirigía sesiones y las vendía |
| Piezas que abre para corroborar | Reel (bien); 9‑1‑1 (la ficha promete una entrevista que no oye) | VERSIÓN BETA, Condición Perfecta (bien); 4 MINUTOS (mudo y con una ficha que no se cumple) | Acampada y Música (bien, sin fechas ni lugar en Música); Calle (no es una serie) |
| Preguntas que le quedan | ¿Para qué programa y cadena? ¿Prepara ella las entrevistas? ¿Escribe y monta? | ¿Qué hizo exactamente en cada corto? ¿Con qué equipo? (créditos incompletos) | ¿Cuándo y dónde? ¿Para qué revista? |
| Información que sobra | Anécdota de los dos minutos si no va acompañada del proceso | Ninguna | «74 fotografías» ya retirado en 5.1 |
| Hechos mal explicados | Annie Bonnie (prácticas o cargo), URJCmun (cuatro años en una frase) | 4 MINUTOS («un solo plano») | Calle («documental») |

**Veredicto del recorrido.** La web presenta un perfil coherente (reportera que además dirige y fotografía), no una acumulación de disciplinas: la portada y el orden de Trabajo lo sostienen. Lo que falla es la capa de explicación: Perfil no dice cómo trabaja, Experiencia enumera sin explicar y dos fichas prometen lo que el material no muestra. Con la propuesta de `PHASE6_PROPOSED_COPY_ES.md`, los tres visitantes obtienen respuesta a sus preguntas sin que ninguna página crezca más de un párrafo.

## 6. Comparativa antes/después (resumen)

| Página | Antes (palabras de texto editorial) | Después (propuesta) | Cambio |
|---|---|---|---|
| Perfil · bio | 36 | 88 (B) / 43 (A) | +1 párrafo con su manera de trabajar (B) |
| Experiencia · 4 descripciones | 39 · 42 · 38 · 29 | 50 · 56 · 68 · 50 | Proceso y responsabilidad en lugar de tareas y jornada |
| Trabajo · 3 textos de sección | 15 · 19 · 4 | 17 · 24 · 6 | Describen lo que hay hoy |
| Fichas · 4 descripciones corregidas | — | — | Misma longitud; se retira lo que el material desmiente |
| Series · 3 descripciones | — | +lugar, +fecha | Precisión periodística sin literatura |
| Resto (interfaz, ALT, SEO) | — | sin cambio | — |

## Anexo A · Textos alternativos (121)

Comprobados imagen por imagen en la pasada de ALT de Fase 1 (commit 496a7f2) y revisados de nuevo en Fase 5 (ninguna imagen cambió). Decisión individual: **Mantener** en todos, con dos notas: los ALT de la acampada transcriben consignas de pancartas (correcto como descripción; no se usan como titulares), y el ALT del retrato de perfil («Retrato de Sofía Chernikova») no acredita al fotógrafo porque no consta.

| ID | Clave | ALT actual | Acción |
|---|---|---|---|
| A001 | `Projects.items.4-minutos.media.4-minutos-poster.alt` | Fotograma en blanco y negro: dos jóvenes de noche bajo una farola | Mantener |
| A002 | `Projects.items.tras-el-sofa.media.tras-el-sofa-poster.alt` | Dos personas en un sofá verde azulado junto a un ramo de rosas rojas | Mantener |
| A003 | `Projects.items.version-beta.media.version-beta-poster.alt` | Una persona habla a cámara delante de una pared con grafitis | Mantener |
| A004 | `Projects.items.short-form-001.media.short-form-001-video.alt` | Sofía habla a cámara en una plaza soleada, con una cámara réflex colgada al cuello | Mantener |
| A005 | `Projects.items.short-form-002.media.short-form-002-video.alt` | Sofía sonríe con un micrófono, sentada en un sofá naranja dentro de un decorado | Mantener |
| A006 | `Projects.items.short-form-003.media.short-form-003-video.alt` | Sofía sonríe a cámara delante de una pared de hiedra | Mantener |
| A007 | `Projects.items.short-form-004.media.short-form-004-video.alt` | Primer plano de Sofía hablando a cámara en una habitación clara | Mantener |
| A008 | `Projects.items.silver-praxis-condicion-perfecta.media.silver-praxis-condicion-perfecta-video.alt` | El artista, sentado en un coche con la puerta abierta, de noche, iluminado en rosa y azul | Mantener |
| A009 | `Projects.items.reporter-reel.media.reporter-reel-video.alt` | Sofía con un micrófono ante el photocall de la 43.ª Semana del Cine Español de Carabanchel | Mantener |
| A010 | `Projects.items.retrato-editorial.media.retrato-editorial-01.alt` | Dos personas con camisetas negras ante un muro con grafiti bajo estructuras de hormigón | Mantener |
| A011 | `Projects.items.retrato-editorial.media.retrato-editorial-02.alt` | Dos hombres vestidos de negro, uno de pie y otro agachado, ante un muro con grafitis en un edificio abandonado | Mantener |
| A012 | `Projects.items.retrato-editorial.media.retrato-editorial-03.alt` | Dos personas con camisetas negras frente a ventanas industriales con grafiti | Mantener |
| A013 | `Projects.items.retrato-editorial.media.retrato-editorial-04.alt` | Dos hombres vestidos de negro caminan entre escombros en una nave abandonada con grafitis | Mantener |
| A014 | `Projects.items.retrato-editorial.media.retrato-editorial-05.alt` | Dos hombres vestidos de negro avanzan hacia la cámara por una nave llena de escombros y grafitis | Mantener |
| A015 | `Projects.items.retrato-editorial.media.retrato-editorial-06.alt` | Persona sentada en una terraza urbana con vegetación y luces decorativas | Mantener |
| A016 | `Projects.items.retrato-editorial.media.retrato-editorial-07.alt` | Persona sonriente en silla amarilla ante una pared con luces de neón | Mantener |
| A017 | `Projects.items.retrato-editorial.media.retrato-editorial-08.alt` | Retrato de un hombre con camiseta roja y las manos apoyadas en la cabeza | Mantener |
| A018 | `Projects.items.retrato-editorial.media.retrato-editorial-09.alt` | Persona sentada en un banco ante un mural urbano con grafitis de colores | Mantener |
| A019 | `Projects.items.retrato-editorial.media.retrato-editorial-10.alt` | Hombre vestido de negro, sentado en un banco alicatado bajo un neón rojo que dice «Wash me» | Mantener |
| A020 | `Projects.items.retrato-editorial.media.retrato-editorial-11.alt` | Persona sentada en un espacio de luz roja con letrero de neón | Mantener |
| A021 | `Projects.items.retrato-editorial.media.retrato-editorial-12.alt` | Hombre acuclillado sobre una escultura de adoquines en una plaza urbana | Mantener |
| A022 | `Projects.items.retrato-editorial.media.retrato-editorial-13.alt` | Retrato cercano de una persona con gafas de sol y camisa verde a cuadros | Mantener |
| A023 | `Projects.items.retrato-editorial.media.retrato-editorial-14.alt` | Persona de pie ante un mural de grafiti azul y morado al atardecer | Mantener |
| A024 | `Projects.items.retrato-editorial.media.retrato-img-5522.alt` | Persona con camisa verde sentada en un murete bajo una pérgola con bombillas | Mantener |
| A025 | `Projects.items.retrato-editorial.media.retrato-img-5597.alt` | Persona con camisa verde, gafas de sol y bermudas vaqueras, de pie en la puerta de un baño alicatado en verde | Mantener |
| A026 | `Projects.items.retrato-editorial.media.retrato-img-5476.alt` | Persona con gafas de sol y camisa verde, sentada en una terraza de madera con un bolso verde | Mantener |
| A027 | `Projects.items.retrato-editorial.media.retrato-img-5487.alt` | Persona con gafas de sol y camisa verde, sentada en una terraza de madera con el mentón apoyado en la mano y un bolso verde a sus pies | Mantener |
| A028 | `Projects.items.retrato-editorial.media.retrato-img-5795.alt` | Hombre con camiseta roja y gafas de sol, sentado en una terraza con las manos en la cabeza | Mantener |
| A029 | `Projects.items.retrato-editorial.media.retrato-img-5808.alt` | Hombre rubio con camiseta roja, sentado en un taburete alto dentro de un bar con ventanal | Mantener |
| A030 | `Projects.items.retrato-editorial.media.retrato-img-5851.alt` | Hombre rubio con camiseta roja y gafas de sol, recostado en un banco de madera con una mano en la cabeza | Mantener |
| A031 | `Projects.items.retrato-editorial.media.retrato-img-5860.alt` | Primer plano de un hombre rubio con camiseta roja, con la barbilla alta, contra una pared de hormigón | Mantener |
| A032 | `Projects.items.retrato-editorial.media.retrato-img-6648.alt` | En una nave abandonada, un hombre agachado y otro de pie junto a una columna con grafitis; al fondo, un coche calcinado | Mantener |
| A033 | `Projects.items.retrato-editorial.media.retrato-img-5328.alt` | Hombre con bigote y brazos cruzados, sentado en un banco alicatado bajo luz roja | Mantener |
| A034 | `Projects.items.retrato-editorial.media.retrato-img-5400.alt` | Hombre con camiseta negra corta y las manos sobre la cabeza, ante un muro lleno de grafitis | Mantener |
| A035 | `Projects.items.retrato-editorial.media.retrato-img-5425.alt` | Hombre con bigote y camiseta negra, de perfil entre los troncos y redes de cuerda de un parque infantil | Mantener |
| A036 | `Projects.items.retrato-editorial.media.retrato-img-5450.alt` | Hombre con bigote y camiseta negra, apoyado en una farola con los brazos cruzados ante un muro con grafitis | Mantener |
| A037 | `Projects.items.retrato-editorial.media.retrato-img-5454.alt` | Hombre con bigote y camiseta negra señala una pegatina contra Airbnb pegada en un poste | Mantener |
| A038 | `Projects.items.retrato-editorial.media.retrato-img-2364.alt` | Persona de espaldas, con camiseta tie-dye, asomada a un muro con un grafiti rosa | Mantener |
| A039 | `Projects.items.musica-en-directo.media.musica-en-directo-01.alt` | Artista de espaldas con los brazos levantados ante el público en un concierto nocturno, en blanco y negro | Mantener |
| A040 | `Projects.items.musica-en-directo.media.musica-en-directo-02.alt` | Artista en escenario iluminado con luz amarilla y humo extendiendo el brazo | Mantener |
| A041 | `Projects.items.musica-en-directo.media.musica-en-directo-03.alt` | Artista cantando con micrófono rodeado de manos del público levantadas | Mantener |
| A042 | `Projects.items.musica-en-directo.media.musica-en-directo-04.alt` | Artista con chaleco acolchado y pañuelo negro canta bajo un cielo azul; detrás, el rótulo «Madrid Salvaje» | Mantener |
| A043 | `Projects.items.musica-en-directo.media.musica-en-directo-05.alt` | De perfil contra un cielo azul, un artista con gorra y sudadera blanca levanta una mano | Mantener |
| A044 | `Projects.items.musica-en-directo.media.musica-en-directo-06.alt` | En blanco y negro, un artista canta entre el público, que le graba con el móvil | Mantener |
| A045 | `Projects.items.musica-en-directo.media.musica-en-directo-07.alt` | Un artista con gorra y sudadera blanca canta junto a la valla, rodeado de público | Mantener |
| A046 | `Projects.items.musica-en-directo.media.musica-en-directo-08.alt` | Bajo luz azul, un artista arrodillado en el escenario se tapa la cara con la mano | Mantener |
| A047 | `Projects.items.musica-en-directo.media.musica-en-directo-09.alt` | Dos artistas en un escenario con luz azul: uno canta con el micrófono; el otro lleva un pantalón de retales de colores | Mantener |
| A048 | `Projects.items.musica-en-directo.media.musica-en-directo-10.alt` | Un artista con chándal blanco sonríe con el micrófono bajo luces azules | Mantener |
| A049 | `Projects.items.musica-en-directo.media.musica-en-directo-11.alt` | Un artista canta con el puño en alto; detrás, su imagen en la pantalla del escenario | Mantener |
| A050 | `Projects.items.musica-en-directo.media.musica-en-directo-12.alt` | Un artista vestido de blanco canta bajo focos azules ante los móviles del público | Mantener |
| A051 | `Projects.items.musica-en-directo.media.musica-en-directo-13.alt` | Haces de luz cruzados sobre un artista de blanco que canta; en primer plano, manos del público | Mantener |
| A052 | `Projects.items.musica-en-directo.media.musica-en-directo-14.alt` | De noche, el público graba con los móviles mientras lleva a alguien en volandas | Mantener |
| A053 | `Projects.items.musica-en-directo.media.musica-img-6154.alt` | Bajo luz violeta, un artista agachado en el escenario se tapa la cara con una mano y sujeta el micrófono con la otra | Mantener |
| A054 | `Projects.items.musica-en-directo.media.musica-img-6317.alt` | De noche, un artista de espaldas acerca el micrófono al público, que levanta los brazos | Mantener |
| A055 | `Projects.items.musica-en-directo.media.musica-img-4929.alt` | De día, un artista canta mirando al cielo en un escenario al aire libre con el rótulo «Madrid Salvaje»; abajo, un cámara le graba | Mantener |
| A056 | `Projects.items.musica-en-directo.media.musica-img-4954.alt` | Un artista con sudadera blanca extiende el brazo hacia el público en un escenario con humo | Mantener |
| A057 | `Projects.items.musica-en-directo.media.musica-img-5004.alt` | Un artista con chándal beis y gafas de sol levanta el micrófono en un escenario al aire libre | Mantener |
| A058 | `Projects.items.musica-en-directo.media.musica-img-5038.alt` | Un artista con chándal beis canta con el micrófono y levanta el otro brazo bajo el rótulo «Madrid Salvaje» | Mantener |
| A059 | `Projects.items.musica-en-directo.media.musica-img-5174.alt` | Un artista con sudadera oscura señala al público entre focos azules | Mantener |
| A060 | `Projects.items.musica-en-directo.media.musica-img-4596.alt` | Un artista en chándal canta bajo una luz verde intensa | Mantener |
| A061 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-001.alt` | Tiendas de campaña bajo lonas azules y la pancarta «P.P. maltrata la infancia», con personas sentadas entre ellas. | Mantener |
| A062 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-002.alt` | Varias tiendas de campaña ocupan una plaza frente a edificios, con banderas sobre el conjunto. | Mantener |
| A063 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-003.alt` | Tiendas de campaña y varias pancartas manuscritas al pie de un edificio con el letrero «Tío Pepe» en la azotea, bajo un cielo nublado. | Mantener |
| A064 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-004.alt` | Tiendas de campaña y pancartas, una con el lema «PSOE y Sumar, responsables de nuestra miseria»; una persona de pie entre ellas. | Mantener |
| A065 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-005.alt` | Personas con una cámara de vídeo graban entre las tiendas de campaña de la plaza. | Mantener |
| A066 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-006.alt` | Sillas y utensilios dispuestos entre tiendas de campaña y toldos. | Mantener |
| A067 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-007.alt` | Bajo lonas azules, un cartel de cartón escrito a mano sobre las tiendas: «La sociedad civil está gritando ¡¡ya basta!!». | Mantener |
| A068 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-008.alt` | Tres jóvenes charlan entre sillas plegables y tiendas, bajo la pancarta «P.P. maltrata la infancia». | Mantener |
| A069 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-009.alt` | Tienda roja con un cartel escrito a mano: «¡Universitarios por la vivienda pública!». | Mantener |
| A070 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-010.alt` | Plaza cubierta por toldos, con tiendas y la pancarta «Frente a su espekulación, okupación». | Mantener |
| A071 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-011.alt` | Al anochecer, tiendas de campaña bajo lonas azules y la pancarta «P.P. maltrata la infancia», frente a un edificio con torre de reloj. | Mantener |
| A072 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-012.alt` | Grupo reunido en círculo en una calle, fotografiado en blanco y negro. | Mantener |
| A073 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-013.alt` | De noche, tres personas bailan en el centro de un corro de gente en una calle iluminada. | Mantener |
| A074 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-014.alt` | Sobre una tienda, un cartel escrito a mano: «Ser rentista no es un trabajo». | Mantener |
| A075 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-015.alt` | De noche, tiendas y una pancarta larga: «Se acabó. Bajemos los alquileres». | Mantener |
| A076 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-016.alt` | Músicos con instrumentos de cuerda y percusión tocan ante un círculo de personas. | Mantener |
| A077 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-017.alt` | Persona sentada ante una tienda bajo una gran pancarta. | Mantener |
| A078 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-018.alt` | En blanco y negro, un corro de gente mira a dos personas que se abrazan en el centro. | Mantener |
| A079 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-019.alt` | De noche, una persona salta a la comba en el centro de un corro de gente que observa. | Mantener |
| A080 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-020.alt` | De noche, varias personas cuelgan con cuerdas la pancarta «P.P. maltrata la infancia». | Mantener |
| A081 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-021.alt` | Una persona recoge una tienda de campaña bajo lonas azules. | Mantener |
| A082 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-022.alt` | Varias personas levantan los brazos bajo luces azules. | Mantener |
| A083 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-023.alt` | De noche, una multitud alza los puños bajo el letrero luminoso «Tío Pepe» en lo alto de un edificio. | Mantener |
| A084 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-024.alt` | De noche, un grupo levanta los brazos; a la derecha, agentes de policía junto a un cordón. | Mantener |
| A085 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-025.alt` | De noche, entre la multitud, un joven sostiene un cartel de cartón: «Fondos buitre fuera de nuestras ciudades». | Mantener |
| A086 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-026.alt` | Persona con la boca abierta y las manos juntas entre la multitud. | Mantener |
| A087 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-027.alt` | Varias personas alzan las manos durante una reunión nocturna. | Mantener |
| A088 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-028.alt` | Un puño en alto entre la multitud; a la izquierda, policías ante la fachada de un edificio. | Mantener |
| A089 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-029.alt` | De noche, una multitud con una bandera roja, amarilla y morada y músicos de viento metal ante una estatua ecuestre iluminada. | Mantener |
| A090 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-030.alt` | Detalle de instrumentos de metal y músicos tocando entre la multitud. | Mantener |
| A091 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-031.alt` | Percusionistas actúan en el centro de un corro de personas. | Mantener |
| A092 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-032.alt` | Multitud reunida de noche junto a varias tiendas y un letrero luminoso en una azotea. | Mantener |
| A093 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-033.alt` | Multitud vista entre brazos levantados en una plaza iluminada. | Mantener |
| A094 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-034.alt` | Multitud y tiendas bajo un letrero luminoso en lo alto de un edificio. | Mantener |
| A095 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-035.alt` | De noche, una multitud llena la plaza bajo un letrero luminoso. | Mantener |
| A096 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-036.alt` | Percusionistas con tambores amarillos tocan entre el público en una calle de noche. | Mantener |
| A097 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-037.alt` | Percusionistas tocan de frente, con los brazos en alto, en la plaza de noche. | Mantener |
| A098 | `Projects.items.entre-tiendas-y-tambores.media.entre-tiendas-y-tambores-038.alt` | Percusionistas y multitud en un corro, con edificios iluminados al fondo. | Mantener |
| A099 | `Projects.items.calle-documental.media.calle-documental-01.alt` | Multitud de noche ante un edificio monumental iluminado en violeta | Mantener |
| A100 | `Projects.items.calle-documental.media.calle-documental-02.alt` | De noche, una persona de espaldas con gorro de lana levanta los brazos entre la multitud, junto a una pancarta | Mantener |
| A101 | `Projects.items.calle-documental.media.calle-documental-03.alt` | Multitud con carteles en manifestación nocturna ante un edificio iluminado en violeta | Mantener |
| A102 | `Projects.items.calle-documental.media.calle-documental-04.alt` | Un hombre con gafas de sol y camisa clara camina por un paseo arbolado; detrás, otro con camiseta roja | Mantener |
| A103 | `Projects.items.calle-documental.media.calle-documental-05.alt` | Un taxi y un tuk-tuk lleno de turistas pasan ante un edificio de ladrillo | Mantener |
| A104 | `Projects.items.calle-documental.media.calle-documental-06.alt` | En blanco y negro, una torre de ascensores de cristal; detrás asoma una cúpula | Mantener |
| A105 | `Projects.items.calle-documental.media.calle-documental-07.alt` | Un parque soleado: una persona abre los brazos en el césped mientras una niña corre; al fondo, gente en una escalinata | Mantener |
| A106 | `Projects.items.calle-documental.media.calle-documental-08.alt` | Macetas con arbolitos alineadas contra un muro, vistas entre los barrotes de una verja | Mantener |
| A107 | `Projects.items.calle-documental.media.calle-img-4744.alt` | Paseo arbolado con muchos peatones; en primer plano, una papelera desenfocada | Mantener |
| A108 | `Projects.items.calle-documental.media.calle-img-4748.alt` | Un músico callejero toca la guitarra junto a la verja de un parque; a su lado, un hombre con bicicleta | Mantener |
| A109 | `Projects.items.estudio-editorial.media.estudio-editorial-01.alt` | Hombre con jersey de ganchillo, agachado junto a un espejo naranja que le refleja, sobre fondo blanco | Mantener |
| A110 | `Projects.items.estudio-editorial.media.estudio-editorial-02.alt` | Hombre con gorra azul y jersey de ganchillo multicolor, agachado de perfil, se mira en un espejo naranja sobre fondo blanco | Mantener |
| A111 | `Projects.items.estudio-editorial.media.estudio-editorial-03.alt` | Hombre de pelo rizado con americana de cuadros toca una guitarra eléctrica verde agua sobre fondo de estudio | Mantener |
| A112 | `Projects.items.estudio-editorial.media.estudio-editorial-04.alt` | Hombre rapado con traje de raya diplomática y gafas verdes, a horcajadas en una silla y con una rosa roja; a sus pies, un televisor pequeño | Mantener |
| A113 | `Projects.items.estudio-editorial.media.estudio-editorial-05.alt` | Hombre rapado con traje de raya diplomática y gafas verdes, recostado en una silla, levanta una pierna y mira hacia arriba | Mantener |
| A114 | `Projects.items.estudio-editorial.media.estudio-editorial-06.alt` | Retrato en picado de una persona con traje de rayas y gafas de cristal verde | Mantener |
| A115 | `Projects.items.estudio-editorial.media.estudio-editorial-07.alt` | Dos hombres sobre fondo blanco: uno, con jersey de ganchillo, se apoya en una silla; el otro, con traje de rayas, mira el móvil | Mantener |
| A116 | `Projects.items.estudio-editorial.media.estudio-editorial-08.alt` | Hombre con jersey de ganchillo apoya un pie en un taburete y sostiene una maleta verde antigua | Mantener |
| A117 | `Projects.items.estudio-editorial.media.estudio-editorial-09.alt` | Hombre con gorra y chaqueta gris, sentado en el suelo junto a un televisor antiguo y unos cojines | Mantener |
| A118 | `Projects.items.estudio-editorial.media.estudio-editorial-10.alt` | Hombre con gorra y chaqueta de punto gris, recostado en el suelo con las manos en la nuca, entre dos televisores antiguos y un cojín | Mantener |
| A119 | `Projects.items.estudio-editorial.media.estudio-80c82615-228f-40a7-99de-ac4c0d672e38.alt` | Al atardecer, un joven con gorro de pescador y camiseta tie-dye mira algo que sostiene en las manos | Mantener |
| A120 | `Projects.items.estudio-editorial.media.estudio-dsc-1255.alt` | Hombre con traje de rayas y gafas verdes, agachado, con un móvil de tapa en la mano | Mantener |
| A121 | `Projects.items.estudio-editorial.media.estudio-dsc-1293.alt` | En picado y con gran angular, un hombre rapado con gafas verdes y traje de rayas sonríe con una videoconsola portátil abierta en las manos | Mantener |
| A122 | `Profile.portraitAlt` | Retrato de Sofía Chernikova | Mantener |

## Anexo B · Títulos de medios (9)

| ID | Clave | Título | Acción |
|---|---|---|---|
| B01 | `Projects.items.4-minutos.media.4-minutos-poster.title` | 4 MINUTOS | Mantener (coincide con el título de la ficha) |
| B02 | `Projects.items.tras-el-sofa.media.tras-el-sofa-poster.title` | Tras el sofá | Mantener (coincide con el título de la ficha) |
| B03 | `Projects.items.version-beta.media.version-beta-poster.title` | VERSIÓN BETA | Mantener (coincide con el título de la ficha) |
| B04 | `Projects.items.short-form-001.media.short-form-001-video.title` | Madrid a pie, cámara al cuello | Mantener (coincide con el título de la ficha) |
| B05 | `Projects.items.short-form-002.media.short-form-002-video.title` | En el decorado de «9‑1‑1» | Mantener (coincide con el título de la ficha) |
| B06 | `Projects.items.short-form-003.media.short-form-003-video.title` | MyMUN, paso a paso | Mantener (coincide con el título de la ficha) |
| B07 | `Projects.items.short-form-004.media.short-form-004-video.title` | Probando el vivo X300 Pro | Mantener (coincide con el título de la ficha) |
| B08 | `Projects.items.silver-praxis-condicion-perfecta.media.silver-praxis-condicion-perfecta-video.title` | Silver Praxis — Condición Perfecta | Mantener (coincide con el título de la ficha) |
| B09 | `Projects.items.reporter-reel.media.reporter-reel-video.title` | Coberturas para «Tacones y Asfalto» | Mantener (coincide con el título de la ficha) |
