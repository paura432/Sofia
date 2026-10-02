# Presentación editorial de Work y reporting

`/work` (`/trabajo`) funciona como índice editorial: presenta una selección
breve por disciplina y deriva a colecciones completas, sin montar el archivo
fotográfico. Reporting, audiovisual y fotografía tienen índices propios;
`/work/photography/archive` conserva el archivo completo de 74 imágenes y sus
controles existentes.

Reporting es una familia editorial, no una red social. Su orden público es:
**Reporter Reel → Short-form Reporting → Selected Reporting → More Reporting**.
El Reporter Reel es la pieza recopilatoria principal; Short-form agrupa piezas
periodísticas verticales; Selected Reporting reúne coberturas principales más
profundas; More Reporting enlaza el resto de la cobertura publicada mediante
una lista compacta.

Short-form se identifica con `reportingFormat: "short-form"`; no se deduce del
aspect ratio ni crea una disciplina o ruta independiente. La selección prioriza
calidad y diversidad profesional sobre la fecha: `featured` primero, luego
`order` editorial, y después el orden editorial existente. No se añade un flag
Short-form redundante. Se muestran ocho piezas inicialmente y, si hay más, un
control accesible expande el resto sin montar esas piezas antes de la acción.

El criterio editorial de las primeras cuatro, cuando haya material verificado,
es demostrar facetas distintas (cámara/reporting, entrevista, cobertura de
eventos y cultura/entretenimiento/moda u otra faceta diferenciada), sin imponer
categorías técnicas ni ordenar cronológicamente. Short-form no requiere detalle
individual. Las piezas restantes usan una lista compacta enlazada a su fuente,
sin inventar póster o página de proyecto.

Los proyectos solo se muestran si superan las guardas de publicación y medios
existentes. Sin una pieza real, publicada y renderizable, el índice no muestra
un placeholder ni aparece en la navegación; el acceso directo a reporting no
publicado devuelve 404. La Home no cambia en esta refactorización. Los fixtures
de Reporting viven únicamente en `/dev/media` durante `next dev` y nunca
modifican datos de publicación.

Las rutas nuevas tienen slugs ES/EN/RU, metadata localizada, canonical/hreflang
y sitemap. Las páginas de detalle mantienen las rutas actuales; su navegación
prev/next se limita a proyectos detallados de la misma disciplina. El rail
contextual enlaza a las colecciones disponibles.
