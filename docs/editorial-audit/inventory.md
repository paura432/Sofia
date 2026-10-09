# Inventario de textos públicos

Generado desde `origin/main` (`messages/es.json`, 417 claves) antes de cualquier cambio, más los textos fijados en código.
Columnas: ubicación · clave · texto actual (ES) · función · prioridad · problema. «OK*» = el español funciona pero la traducción tiene un problema (ver tabla EN/RU en el README).
Los equivalentes EN/RU usan las mismas claves en `messages/en.json` y `messages/ru.json`.

## Textos fijados en código

| Ubicación | Archivo | Texto | Función | Prioridad | Problema |
|---|---|---|---|---|---|
| Hero (h1) | `src/components/hero.tsx` | Sofía Chernikova | Titular | OK | — |
| Imagen OG | `src/app/[locale]/opengraph-image.tsx` | REPORTING / VISUAL / COMMUNICATION | Antetítulo OG | P1 | En inglés en los tres idiomas y abstracto: no describe secciones reales. |
| Imagen OG | `src/app/[locale]/opengraph-image.tsx` | SOFÍA / CHERNIKOVA | Titular OG | OK | — |
| Perfil | `src/app/[locale]/about/page.tsx` | CV ↓ | Enlace | — | Oculto (`hasCv: false`). |
| Contacto | `src/components/contact-block.tsx` | /in/sofia-chernikova | Enlace | OK | — |
| Herramientas | `src/content/profile.ts` | Premiere Pro · DaVinci Resolve · … · SEO | Dato | OK | Nombres propios; «CMS» y «SEO» son genéricos pero vienen del CV. |
| Empresas | `src/content/experience.ts` | Grupo Cadena Media · Annie Bonnie · URJCmun · Isocero | Dato | OK | — |
| 404 sin ruta | (Next por defecto) | 404 · This page could not be found. | Error | P1 | Las URL desconocidas mostraban la página genérica de Next, en inglés y sin estilos. |

## Claves de mensajes

| Ubicación | Clave | Texto actual (ES) | Función | Prioridad | Problema |
|---|---|---|---|---|---|
| SEO / Open Graph (todas las páginas) | `Metadata.siteTitle` | Sofía Chernikova — Periodista y Reportera TV | SEO | P2 | «Reportera TV» con mayúscula interior; mejor completo. |
| SEO / Open Graph (todas las páginas) | `Metadata.siteDescription` | Sofía Chernikova, periodista y reportera de televisión en Madrid. Reportajes ante la cámara, cortometrajes y fotografía. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.ogAlt` | Portfolio profesional de Sofía Chernikova | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.personRole` | Periodista y Reportera TV | SEO | P2 | «Reportera TV» con mayúscula interior; mejor completo. |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.home.title` | Sofía Chernikova — Periodista y Reportera TV | SEO | P2 | «Reportera TV» con mayúscula interior; mejor completo. |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.home.description` | Sofía Chernikova, periodista y reportera de televisión en Madrid. Reportajes ante la cámara, cortometrajes y fotografía. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.work.title` | Trabajo | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.work.description` | Reportajes ante la cámara, cortometrajes, videoclip y series fotográficas de Sofía Chernikova. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.photoArchive.title` | Archivo fotográfico | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.photoArchive.description` | Explora las 74 fotografías del archivo de Sofía Chernikova. | SEO | P2 | «Explora»: imperativo de interfaz genérico. |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.about.title` | Perfil | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.about.description` | Perfil de Sofía Chernikova, periodista y reportera de televisión, con formación en Periodismo y Comunicación Audiovisual en la Universidad Rey Juan Carlos. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.experience.title` | Experiencia | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.experience.description` | Trayectoria de Sofía Chernikova en televisión, comunicación digital, comunicación corporativa y fotografía. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.contact.title` | Contacto | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.contact.description` | Contacto profesional de Sofía Chernikova para medios, coberturas, producción audiovisual y comunicación. | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.notFound.title` | Página no encontrada | SEO | OK | — |
| SEO / Open Graph (todas las páginas) | `Metadata.pages.notFound.description` | La página solicitada no existe o ha cambiado de dirección. | SEO | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.theme.dark` | Activar modo oscuro | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.theme.light` | Activar modo claro | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.skip` | Saltar al contenido | ARIA / accesibilidad | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.homeAria` | Ir al inicio | ARIA / accesibilidad | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.sectionsAria` | Navegación principal | ARIA / accesibilidad | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.menu` | Menú | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.mobileSummary` | Menú | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.mobileAria` | Navegación móvil | ARIA / accesibilidad | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.closeMenu` | Cerrar menú | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.opensInNewTab` | (abre en nueva pestaña) | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.localeAria` | Cambiar idioma | ARIA / accesibilidad | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.localeNames.es` | Español | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.localeNames.en` | English | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.localeNames.ru` | Русский | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.items.work` | Trabajo | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.items.about` | Perfil | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.items.experience` | Experiencia | Botón / enlace / control | OK | — |
| Cabecera, menú móvil, ARIA | `Navigation.items.contact` | Contacto | Botón / enlace / control | OK | — |
| Inicio · hero | `Hero.dateline` | Periodista · Madrid | Dato / etiqueta | OK | — |
| Inicio · hero | `Hero.role` | Reportera de televisión | Créditos / rol | OK | — |
| Inicio · hero | `Hero.summary` | Desde 2024 cubro estrenos, festivales y ruedas de prensa para Grupo Cadena Media, y entrevisto a artistas y figuras públicas. Detrás de la cámara, dirijo cortometrajes y fotografío conciertos, retratos y calle. | Texto / descripción | P0 | «festivales» no consta en CV ni en el reel; «fotografío… calle» suena a jerga. |
| Inicio · hero | `Hero.actionsAria` | Acciones principales | ARIA / accesibilidad | OK | — |
| Inicio · hero | `Hero.viewWork` | Ver todo el trabajo | Botón / enlace / control | OK | — |
| Inicio · hero | `Hero.contact` | Escríbeme | Botón / enlace / control | OK* | Correcto en ES. EN «Write to me» no es idiomático para un mailto. |
| Inicio · hero | `Hero.reelListLabel` | Piezas ante la cámara | ARIA / accesibilidad | OK | — |
| Inicio · hero | `Hero.nowShowing` | En pantalla | Botón / enlace / control | OK | — |
| Inicio · hero | `Hero.soundHint` | Con sonido · pulsa para ver | Dato / etiqueta | OK | — |
| Inicio · trayectoria | `Home.pathEyebrow` | Trayectoria | Antetítulo | OK* | Correcto en ES. EN «Path» no es natural. |
| Inicio · trayectoria | `Home.pathTitle` | Dónde he trabajado | Titular | OK | — |
| Inicio · trayectoria | `Home.viewExperience` | Experiencia completa | Botón / enlace / control | OK | — |
| Inicio · trayectoria | `Home.moreAbout` | Perfil | Dato / etiqueta | OK | — |
| Trabajo | `Work.pageTitle` | Trabajo | Titular | OK | — |
| Trabajo | `Work.pageText` | Primero, ante la cámara. Después, lo que ruedo y lo que fotografío. | Texto / descripción | OK* | ES funciona. EN «what I shoot and what I photograph» es redundante. |
| Trabajo | `Work.sectionsAria` | Secciones de Trabajo | ARIA / accesibilidad | OK | — |
| Trabajo | `Work.reportingNav` | Reportajes | Botón / enlace / control | OK | — |
| Trabajo | `Work.audiovisualNav` | Audiovisual | Botón / enlace / control | OK | — |
| Trabajo | `Work.photographyNav` | Fotografía | Botón / enlace / control | OK | — |
| Trabajo | `Work.archiveNav` | Archivo | Botón / enlace / control | OK | — |
| Trabajo | `Work.reportingKicker` | Reportajes | Antetítulo | OK | — |
| Trabajo | `Work.reportingTitle` | Ante la cámara | Titular | OK | — |
| Trabajo | `Work.reportingText` | Entrevista, paseo a cámara, guía y prueba de producto, en vertical. Mejor con sonido. | Texto / descripción | OK | — |
| Inicio + Trabajo · secciones | `Work.audiovisualKicker` | Audiovisual | Antetítulo | OK | — |
| Inicio + Trabajo · secciones | `Work.audiovisualTitle` | Detrás de la cámara | Titular | OK | — |
| Inicio + Trabajo · secciones | `Work.audiovisualText` | Cortometrajes que dirijo y monto, y un videoclip que rodé y posproduje. | Texto / descripción | P0 | Atribuye montaje a los dos cortos (4 MINUTOS solo acredita dirección) y omite VERSIÓN BETA. |
| Inicio + Trabajo · secciones | `Work.photographyKicker` | Fotografía | Antetítulo | OK | — |
| Inicio + Trabajo · secciones | `Work.photographyTitle` | Conciertos, calle y retrato | Titular | OK | — |
| Inicio + Trabajo · secciones | `Work.photographyText` | Series completas y un archivo de 74 fotografías para mirar sin prisa. | Texto / descripción | OK* | ES funciona. EN «to look at slowly» suena traducido. |
| Inicio + Trabajo · secciones | `Work.seriesCount` | {count, plural, one {# fotografía} other {# fotografías}} | Dato / contador | OK | — |
| Trabajo | `Work.archiveTeaser` | {count} fotografías, por temas | Dato / etiqueta | OK | — |
| Trabajo | `Work.shortFormShowMore` | Ver {count} piezas más | Botón / enlace / control | OK | — |
| Trabajo | `Work.shortFormShowLess` | Ver menos | Botón / enlace / control | OK | — |
| Inicio + Trabajo · secciones | `Work.viewAudiovisual` | Todo el audiovisual | Botón / enlace / control | OK | — |
| Inicio + Trabajo · secciones | `Work.viewPhotography` | Toda la fotografía | Botón / enlace / control | OK | — |
| Archivo fotográfico | `Work.archiveCountLabel` | fotografías | Dato / contador | P1 | Concatenado con el número: no admite plural (RU muestra «74 фотографий»). |
| Archivo fotográfico | `Work.backToPhotography` | Fotografía | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.photographyEyebrow` | Fotografía | Antetítulo | OK | — |
| Archivo fotográfico | `Work.archiveTitle` | Archivo fotográfico | Titular | OK | — |
| Archivo fotográfico | `Work.archiveTotal` | 74 imágenes | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveIndexAll` | Todas | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveMusica` | Música | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveRetrato` | Retrato | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveEstudio` | Estudio | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveCalle` | Calle | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveMusicaFull` | Música en directo | Dato / etiqueta | OK | — |
| Archivo fotográfico | `Work.archiveRetratoFull` | Retrato & editorial | Dato / etiqueta | P2 | «&» y mayúsculas a la inglesa en español. |
| Archivo fotográfico | `Work.archiveEstudioFull` | Estudio & editorial | Dato / etiqueta | P2 | «&» y mayúsculas a la inglesa en español. |
| Archivo fotográfico | `Work.archiveCalleFull` | Calle & documental | Dato / etiqueta | P2 | «&» y mayúsculas a la inglesa en español. |
| Archivo fotográfico | `Work.archiveClose` | Cerrar | Botón / enlace / control | OK | — |
| Archivo fotográfico | `Work.archivePrev` | Anterior | Botón / enlace / control | OK | — |
| Archivo fotográfico | `Work.archiveNext` | Siguiente | Botón / enlace / control | OK | — |
| Archivo fotográfico | `Work.archiveImageLabel` | {group}, imagen {index} | ARIA / accesibilidad | OK | — |
| Fichas de proyecto / visores | `Projects.featuredEyebrow` | Destacado | Antetítulo | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.selectedEyebrow` | Trabajo seleccionado | Antetítulo | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.audiovisualEyebrow` | Audiovisual | Antetítulo | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.allEyebrow` | Portfolio | Antetítulo | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.viewProject` | Ver proyecto | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.viewReel` | Ver reel | Botón / enlace / control | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.viewRelatedWork` | Ver {count, plural, one {# proyecto} other {# proyectos}} | Botón / enlace / control | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.viewOriginal` | Ver original | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.nextProject` | Proyecto siguiente | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.prevProject` | Proyecto anterior | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.moreFromSeries` | Más de esta serie | Dato / etiqueta | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.moreFromSeriesCount` | {count} imágenes | Dato / contador | P2 | Sin plural ICU (RU incorrecto para 2–4, 22–24…). |
| Fichas de proyecto / visores | `Projects.seriesNavigation` | Navegación de serie fotográfica | ARIA / accesibilidad | OK | — |
| Fichas de proyecto / visores | `Projects.seriesStory` | Historia | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.seriesComplete` | Serie completa | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.seriesCompleteCount` | {count} imágenes | Dato / contador | P2 | Sin plural ICU (RU incorrecto para 2–4, 22–24…). |
| Fichas de proyecto / visores | `Projects.viewerPrev` | Anterior | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.viewerNext` | Siguiente | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.viewerClose` | Cerrar | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.projectNavAria` | Navegación entre proyectos | ARIA / accesibilidad | OK | — |
| Fichas de proyecto / visores | `Projects.context` | Contexto | Texto / descripción | OK | — |
| Fichas de proyecto / visores | `Projects.role` | Rol | Créditos / rol | OK | — |
| Fichas de proyecto / visores | `Projects.credits` | Créditos | Créditos / rol | OK* | ES correcto. RU con errata («Титки»). |
| Fichas de proyecto / visores | `Projects.publication` | Resultado / publicación | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.organisation` | Organización | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.year` | Año | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.format` | Formato | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.location` | Localización | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.play` | Reproducir | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.playCoverage` | Reproducir cobertura: {title} | Botón / enlace / control | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.reelEyebrow` | Reporter reel | Antetítulo | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.reelMeta` | Reporterismo TV · Entrevistas · Cobertura de eventos | Dato / etiqueta | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.transcript` | Transcripción | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.locations.madrid` | Madrid | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.locations.tenerife` | Tenerife | Dato / etiqueta | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.locations.torrejon-de-ardoz` | Torrejón de Ardoz | Dato / etiqueta | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.locations.valencia` | Valencia | Dato / etiqueta | P2 | Sin uso en la web actual (clave huérfana). |
| Fichas de proyecto / visores | `Projects.disciplines.reporting` | Reporting | Dato / etiqueta | P2 | «Reporting» en inglés en la interfaz española. |
| Fichas de proyecto / visores | `Projects.disciplines.interview` | Entrevista | Botón / enlace / control | OK | — |
| Fichas de proyecto / visores | `Projects.disciplines.video` | Vídeo | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.disciplines.audiovisual` | Audiovisual | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.disciplines.photography` | Fotografía | Dato / etiqueta | OK | — |
| Fichas de proyecto / visores | `Projects.disciplines.communication` | Comunicación | Dato / etiqueta | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.title` | 4 MINUTOS | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.description` | Cortometraje en blanco y negro sobre el encuentro entre dos jóvenes. | Texto / descripción | Pend. | Honesto pero mínimo: falta sinopsis de una línea que solo Sofía puede dar. |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.format` | Cortometraje | Dato / etiqueta | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.roles.0` | Dirección — Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.credits.direction` | Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.credits.sound` | María Rodríguez | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.credits.cast` | Eneko Valle García · Fran Vidales Santos | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.credits.equipment` | Nikon D3300 · iPhone 13 | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.creditLabels.direction` | Dirección | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.creditLabels.sound` | Sonido | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.creditLabels.cast` | Reparto | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.creditLabels.equipment` | Equipo | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.4-minutos.media.4-minutos-poster.title` | 4 MINUTOS | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.title` | Tras el sofá | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.description` | Cortometraje dramático ambientado en un interior doméstico. | Texto / descripción | Pend. | Honesto pero mínimo: falta sinopsis de una línea que solo Sofía puede dar. |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.format` | Cortometraje | Dato / etiqueta | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.roles.0` | Dirección — Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.roles.1` | Montaje — Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.credits.direction` | Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.credits.editing` | Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.creditLabels.direction` | Dirección | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.creditLabels.editing` | Montaje | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.tras-el-sofa.media.tras-el-sofa-poster.title` | Tras el sofá | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.version-beta.title` | VERSIÓN BETA | Titular | Pend. | Sin rol acreditado: no se puede explicar su participación. |
| Audiovisual · tarjeta + ficha | `Projects.items.version-beta.description` | Pieza promocional con testimonios a cámara, acción y grafismos. | Texto / descripción | Pend. | Sin rol acreditado: no se puede explicar su participación. |
| Audiovisual · tarjeta + ficha | `Projects.items.version-beta.format` | Pieza promocional | Dato / etiqueta | Pend. | Sin rol acreditado: no se puede explicar su participación. |
| Audiovisual · tarjeta + ficha | `Projects.items.version-beta.media.version-beta-poster.title` | VERSIÓN BETA | Titular | Pend. | Sin rol acreditado: no se puede explicar su participación. |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-001.title` | Madrid a pie, cámara al cuello | Titular | OK* | ES correcto. EN «camera in hand» contradice la imagen (cámara al cuello). |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-001.description` | Paseo hablado a cámara por el centro de Madrid, de Gran Vía en adelante. | Texto / descripción | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-001.media.short-form-001-video.title` | Madrid a pie, cámara al cuello | Titular | OK* | ES correcto. EN «camera in hand» contradice la imagen (cámara al cuello). |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-002.title` | En el decorado de «9‑1‑1» | Titular | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-002.description` | Entrevista micrófono en mano dentro de un decorado de la serie, en la estación de Chamartín. | Texto / descripción | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-002.media.short-form-002-video.title` | En el decorado de «9‑1‑1» | Titular | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-003.title` | MyMUN, paso a paso | Titular | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-003.description` | Cómo inscribirse en URJCmun 2026 a través de la plataforma MyMUN, explicado a cámara. | Texto / descripción | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-003.media.short-form-003-video.title` | MyMUN, paso a paso | Titular | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-004.title` | Probando el vivo X300 Pro | Titular | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-004.description` | Primeras impresiones de un smartphone: cámara, pantalla y accesorios, con planos de detalle. | Texto / descripción | OK | — |
| Inicio (hero) + Trabajo · Reportajes | `Projects.items.short-form-004.media.short-form-004-video.title` | Probando el vivo X300 Pro | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.title` | Silver Praxis — Condición Perfecta | Titular | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.description` | Videoclip de «Condición Perfecta», de Silver Praxis. | Texto / descripción | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.format` | Videoclip | Dato / etiqueta | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.roles.0` | Rodaje y postproducción — Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.credits.filming` | Sofía Chernikova | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.credits.creative` | Briza Sanchez | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.credits.production` | Silver Praxis | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.filming` | Rodaje y postproducción | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.creative` | Dirección creativa, estilismo y lettering | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.creditLabels.production` | Producción, mezcla y master | Créditos / rol | OK | — |
| Audiovisual · tarjeta + ficha | `Projects.items.silver-praxis-condicion-perfecta.media.silver-praxis-condicion-perfecta-video.title` | Silver Praxis — Condición Perfecta | Titular | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.title` | Reporter reel | Titular | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.description` | Selección de coberturas, entrevistas y piezas de reporterismo. | Texto / descripción | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.dek` | Reporterismo en estrenos, festivales y ruedas de prensa. | Texto / descripción | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.format` | Televisión · Reel | Dato / etiqueta | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.context` | Cobertura de eventos, entrevistas y reporterismo de campo. | Texto / descripción | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.roles.0` | Reporterismo en estrenos, festivales y ruedas de prensa. | Créditos / rol | OK | — |
| No publicado (reporter reel) | `Projects.items.reporter-reel.roles.1` | Entrevistas a artistas, actores y figuras públicas. | Créditos / rol | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.retrato-editorial.title` | Retrato & Editorial | Titular | P2 | «&» y mayúsculas a la inglesa en español. |
| Fotografía · serie (ficha + SEO) | `Projects.items.retrato-editorial.description` | Fotografía de retrato en localización urbana. | Texto / descripción | P2 | Solo visible en SEO; repite el título. Sin contexto documentado para ampliarlo. |
| Fotografía · serie (ficha + SEO) | `Projects.items.retrato-editorial.format` | Fotografía · Retrato · Editorial | Dato / etiqueta | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.retrato-editorial.roles.0` | Fotografía | Créditos / rol | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.musica-en-directo.title` | Música en directo | Titular | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.musica-en-directo.description` | Cobertura fotográfica de actuaciones musicales en directo. | Texto / descripción | P2 | Solo visible en SEO; repite el título. Sin contexto documentado para ampliarlo. |
| Fotografía · serie (ficha + SEO) | `Projects.items.musica-en-directo.format` | Fotografía · Conciertos | Dato / etiqueta | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.musica-en-directo.roles.0` | Fotografía | Créditos / rol | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.entre-tiendas-y-tambores.title` | Entre tiendas y tambores | Titular | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.entre-tiendas-y-tambores.description` | Una plaza con tiendas de campaña, carteles hechos a mano, grupos reunidos y músicos con percusión. | Texto / descripción | Pend. | Bien descrito; faltan lugar y fecha confirmados. |
| Fotografía · serie (ficha + SEO) | `Projects.items.entre-tiendas-y-tambores.format` | Fotografía · Ensayo fotográfico | Dato / etiqueta | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.calle-documental.title` | Calle & Documental | Titular | P2 | «&» y mayúsculas a la inglesa en español. |
| Fotografía · serie (ficha + SEO) | `Projects.items.calle-documental.description` | Fotografía documental y de calle. | Texto / descripción | P2 | Solo visible en SEO; repite el título. Sin contexto documentado para ampliarlo. |
| Fotografía · serie (ficha + SEO) | `Projects.items.calle-documental.format` | Fotografía · Documental | Dato / etiqueta | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.calle-documental.roles.0` | Fotografía | Créditos / rol | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.estudio-editorial.title` | Estudio & Editorial | Titular | P2 | «&» y mayúsculas a la inglesa en español. |
| Fotografía · serie (ficha + SEO) | `Projects.items.estudio-editorial.description` | Retrato de estudio y fotografía editorial. | Texto / descripción | P2 | Solo visible en SEO; repite el título. Sin contexto documentado para ampliarlo. |
| Fotografía · serie (ficha + SEO) | `Projects.items.estudio-editorial.format` | Fotografía · Estudio · Editorial | Dato / etiqueta | OK | — |
| Fotografía · serie (ficha + SEO) | `Projects.items.estudio-editorial.roles.0` | Fotografía | Créditos / rol | OK | — |
| Perfil | `Profile.bio` | Soy periodista y reportera de televisión. Trabajo en Grupo Cadena Media desde 2024: cubro estrenos, festivales y ruedas de prensa, entrevisto a artistas y figuras públicas y escribo guiones y piezas informativas. | Texto / descripción | P0 | Repite «festivales» sin fuente. Seis líneas en cuerpo display: jerarquía pesada. |
| Perfil | `Profile.aboutPageEyebrow` | Perfil | Antetítulo | OK | — |
| Perfil | `Profile.portraitAlt` | Retrato de Sofía Chernikova | Dato / etiqueta | OK | — |
| Perfil | `Profile.educationEyebrow` | Formación | Antetítulo | OK | — |
| Perfil | `Profile.languagesEyebrow` | Idiomas | Antetítulo | OK | — |
| Perfil | `Profile.toolsEyebrow` | Herramientas | Antetítulo | OK | — |
| Perfil | `Profile.viewFullExperience` | Experiencia completa | Botón / enlace / control | OK | — |
| Perfil | `Profile.bioMore` | Estudié Periodismo y Comunicación Audiovisual en la Universidad Rey Juan Carlos. Además de reportear, dirijo y monto cortometrajes, ruedo y posproduzco vídeo, y hago fotografía de conciertos, calle y retrato. Hablo español y ruso como lenguas nativas. | Texto / descripción | P1 | Correcto, pero hereda la parte de responsabilidades que se saca del lede. |
| Perfil | `Profile.baseLabel` | Base | ARIA / accesibilidad | OK | — |
| Perfil | `Profile.baseValue` | Madrid | Dato / etiqueta | OK | — |
| Perfil | `Profile.practiceEyebrow` | Lo que hago | Antetítulo | OK | — |
| Perfil | `Profile.practices.0.title` | Ante la cámara | Titular | OK | — |
| Perfil | `Profile.practices.0.text` | Reporterismo de eventos, entrevistas y guion para televisión. | Texto / descripción | OK | — |
| Perfil | `Profile.practices.0.link` | Ver reportajes | Botón / enlace / control | OK | — |
| Perfil | `Profile.practices.0.section` | reporting | Dato / etiqueta | OK | — |
| Perfil | `Profile.practices.1.title` | Detrás de la cámara | Titular | OK | — |
| Perfil | `Profile.practices.1.text` | Dirección y montaje de cortometrajes; rodaje y postproducción de un videoclip. | Texto / descripción | P2 | Convive «posproduje» y «postproducción» en la misma pantalla; unificar. |
| Perfil | `Profile.practices.1.link` | Ver audiovisual | Botón / enlace / control | OK | — |
| Perfil | `Profile.practices.1.section` | audiovisual | Dato / etiqueta | OK | — |
| Perfil | `Profile.practices.2.title` | Con la cámara de fotos | Titular | OK | — |
| Perfil | `Profile.practices.2.text` | Conciertos, calle, retrato y estudio. | Texto / descripción | OK | — |
| Perfil | `Profile.practices.2.link` | Ver fotografía | Botón / enlace / control | OK | — |
| Perfil | `Profile.practices.2.section` | photography | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.pageEyebrow` | _(vacío)_ | Antetítulo | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.pageTitle` | Experiencia | Titular | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.pageText` | _(vacío)_ | Texto / descripción | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.responsibilitiesLabel` | Responsabilidades | ARIA / accesibilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.progressionLabel` | Roles desempeñados | ARIA / accesibilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.role` | Reportera TV | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.discipline` | Reporterismo · Televisión · Entrevistas | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.period` | 2024 — Actualidad | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.summary` | Cobertura de eventos y ruedas de prensa, realización de entrevistas y redacción de guiones y piezas informativas para televisión. | Texto / descripción | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.responsibilities.eventCoverage` | Cobertura de eventos y ruedas de prensa. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.responsibilities.interviews` | Entrevistas a artistas, actores y figuras públicas. | Botón / enlace / control | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.responsibilities.eventReporting` | Reporterismo en eventos y estrenos. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.grupo-cadena-media.responsibilities.scripts` | Redacción de guiones y piezas informativas. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.role` | Deputy Director for Social Media | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.discipline` | Comunicación · Social Media · Liderazgo | Dato / etiqueta | P1 | «Social Media», «Liderazgo»: anglicismo + palabra corporativa; parte mal en dos líneas. |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.period` | 2022 — 2026 | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.summary` | De Communication Team y Camera Operator a Deputy Director for Social Media (2026). | Texto / descripción | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.context` | Modelo de Naciones Unidas de la Universidad Rey Juan Carlos, incluida su edición URJCmun TEEN. | Texto / descripción | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.progression.communicationTeam` | Communication Team | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.progression.cameraOperator` | Camera Operator | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.progression.delegate` | Delegate | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.progression.deputyDirector` | Deputy Director for Social Media | Créditos / rol | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.socialStrategy` | Estrategia y gestión de redes sociales. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.copyMetrics` | Calendario editorial, copy y métricas. | Botón / enlace / control | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.graphicDesign` | Producción de contenido gráfico y audiovisual. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.teamCoordination` | Coordinación de reporteros y creadores de contenido. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.liveContent` | Cobertura de eventos y producción de contenido en tiempo real. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.urjcmun.responsibilities.digitalIdentity` | Desarrollo de identidad digital y posicionamiento. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.role` | Comunicación Corporativa | Créditos / rol | P2 | Mayúsculas a la inglesa (Title Case). |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.discipline` | Contenido · Audiovisual · Comunicación | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.period` | 2025 — 2026 | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.summary` | Redacción, producción audiovisual, eventos y planificación editorial. | Texto / descripción | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.context` | Consultora de comunicación, estrategia, marketing de contenidos y relaciones públicas. | Texto / descripción | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.writing` | Redacción de artículos para blog corporativo y contenidos web. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.videoProduction` | Grabación y edición de piezas audiovisuales. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.socialContent` | Producción de contenido para redes sociales y comunicación interna. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.events` | Organización y cobertura de eventos. | Responsabilidad | P0 | ES dice «Organización»; EN/RU dicen «apoyo». Rol no coincide entre idiomas. |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.stakeholders` | Comunicación con público y colaboradores. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.annie-bonnie.responsibilities.calendar` | Apoyo en estrategia de contenidos y calendario editorial. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.role` | Fotógrafa en Hoteles | Créditos / rol | P2 | Mayúsculas a la inglesa (Title Case). |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.discipline` | Fotografía · Retrato · Atención al cliente | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.period` | 2023 | Dato / etiqueta | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.summary` | Sesiones de retrato, edición y atención a clientes en hoteles. | Texto / descripción | — | No se renderiza. |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.context` | Estudio especializado en fotografía de retrato en entornos hoteleros y turísticos. | Texto / descripción | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.responsibilities.photoSessions` | Sesiones fotográficas con familias y niños. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.responsibilities.editing` | Edición profesional de imágenes. | Responsabilidad | P2 | «profesional» no aporta. |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.responsibilities.sales` | Venta de fotografías personalizadas. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.responsibilities.clientService` | Atención y asesoramiento al cliente. | Responsabilidad | OK | — |
| Experiencia (+ resumen en Inicio) | `Experience.items.isocero.responsibilities.fastPaced` | Trabajo en entornos dinámicos y orientados al cliente. | Responsabilidad | P1 | Relleno de CV («entornos dinámicos»): no es una responsabilidad. |
| Perfil | `Education.items.0.institution` | Universidad Rey Juan Carlos | Dato / etiqueta | OK | — |
| Perfil | `Education.items.0.program` | Periodismo y Comunicación Audiovisual | Dato / etiqueta | OK | — |
| Perfil | `Education.items.0.period` | 2021 — 2026 | Dato / etiqueta | OK | — |
| Perfil | `Languages.eyebrow` | Idiomas | Antetítulo | OK | — |
| Perfil | `Languages.items.0.code` | ES | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.0.name` | Español | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.0.level` | Nativo | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.1.code` | RU | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.1.name` | Ruso | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.1.level` | Nativo | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.2.code` | EN | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.2.name` | Inglés | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.2.level` | Avanzado | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.3.code` | VAL | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.3.name` | Valenciano | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.3.level` | Avanzado | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.4.code` | IT | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.4.name` | Italiano | Dato / etiqueta | OK | — |
| Perfil | `Languages.items.4.level` | Intermedio | Dato / etiqueta | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.eyebrow` | Contacto | Antetítulo | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.title` | ¿Hablamos? | Titular | OK* | Natural en ES. En EN («Shall we talk?») suena rígido. |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.body` | _(vacío)_ | Texto / descripción | — | No se renderiza. |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.email` | Email | Dato / etiqueta | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.linkedin` | LinkedIn | Botón / enlace / control | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.base` | Base | Dato / etiqueta | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.baseValue` | Madrid | Dato / etiqueta | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.contactPageEyebrow` | Contacto | Antetítulo | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.contactPageTitle` | ¿Hablamos? | Titular | OK* | Natural en ES. En EN («Shall we talk?») suena rígido. |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.contactPageText` | Para propuestas de trabajo, colaboraciones o preguntas sobre cualquiera de estas piezas, escríbeme. | Texto / descripción | P1 | «estas piezas»: en Contacto no hay piezas a la vista (deíctico roto). |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.copy` | Copiar email | Botón / enlace / control | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.copied` | Copiado | Botón / enlace / control | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.languages` | Idiomas | Dato / etiqueta | OK | — |
| Contacto (página + bloque en Inicio/Perfil) | `Contact.languagesValue` | Español · Ruso · Inglés · Valenciano · Italiano | Dato / etiqueta | OK | — |
| Pie | `Footer.location` | Madrid | Dato / etiqueta | OK | — |
| Pie | `Footer.copyright` | © 2026 Sofía Chernikova | Botón / enlace / control | OK | — |
| 404 | `NotFound.eyebrow` | 404 | Antetítulo | OK | — |
| 404 | `NotFound.title` | Página no encontrada | Titular | OK | — |
| 404 | `NotFound.body` | La página que buscas no existe o ha cambiado de dirección. | Texto / descripción | OK | — |
| 404 | `NotFound.home` | Volver al inicio | Botón / enlace / control | OK | — |
| Trabajo | `WorkRail.label` | Trabajo | Dato / etiqueta | OK | — |
| Trabajo | `WorkRail.reporting` | Reportajes | Dato / etiqueta | OK | — |
| Trabajo | `WorkRail.audiovisual` | Audiovisual | Dato / etiqueta | OK | — |
| Trabajo | `WorkRail.photography` | Fotografía | Dato / etiqueta | OK | — |
| Trabajo | `WorkRail.prev` | Proyecto anterior | Botón / enlace / control | OK | — |
| Trabajo | `WorkRail.next` | Proyecto siguiente | Botón / enlace / control | OK | — |

## Textos alternativos (ALT)

92 textos ALT. Criterio común: describen lo visible sin interpretar ni atribuir lugar, fecha o identidad. No se modifican.

| Serie / pieza | Nº ALT | Observación |
|---|---|---|
| 4-minutos | 1 | OK. |
| tras-el-sofa | 1 | OK. |
| version-beta | 1 | OK. |
| short-form-001 | 1 | OK. |
| short-form-002 | 1 | OK. |
| short-form-003 | 1 | OK. |
| short-form-004 | 1 | OK. |
| silver-praxis-condicion-perfecta | 1 | OK. |
| retrato-editorial | 14 | Cuatro genéricos («Retrato en localización urbana», «Retrato editorial en un entorno urbano»…). Mejorables con la imagen delante; P2. |
| musica-en-directo | 14 | Varios genéricos («Vista amplia de un concierto con público»). P2. |
| entre-tiendas-y-tambores | 38 | Detallados y neutrales. OK. |
| calle-documental | 8 | Dos genéricos. P2. |
| estudio-editorial | 10 | Seis genéricos («Retrato de estudio, encuadre cercano»). P2. |
