# Presentación editorial de Work y reporting

`/work` (`/trabajo`) funciona como índice editorial: presenta una selección
breve por disciplina y deriva a colecciones completas, sin montar el archivo
fotográfico. Reporting, audiovisual y fotografía tienen índices propios;
`/work/photography/archive` conserva el archivo completo de 74 imágenes y sus
controles existentes.

Reporting es una familia editorial: **Reporter Reel**, **Selected Reporting**
(3–6 coberturas) y **Short-form Reporting**. El formato se indica con
`reportingFormat`, no se deduce del aspect ratio. Short-form no requiere detalle
individual. Las piezas restantes usan una lista compacta enlazada a su fuente,
sin inventar póster o página de proyecto.

Los proyectos solo se muestran si superan las guardas de publicación y medios
existentes. Sin una pieza real, publicada y renderizable, el índice no muestra
un placeholder ni aparece en la navegación; el acceso directo a reporting no
publicado devuelve 404. La Home no cambia en esta refactorización.

Las rutas nuevas tienen slugs ES/EN/RU, metadata localizada, canonical/hreflang
y sitemap. Las páginas de detalle mantienen las rutas actuales; su navegación
prev/next se limita a proyectos detallados de la misma disciplina. El rail
contextual enlaza a las colecciones disponibles.
