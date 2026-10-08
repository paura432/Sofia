# CREATIVE_DIRECTION — "Sala de control"

Fecha: 2026-10-08 · Rama `feat/sofia-creative-engineering-v3`

## 1. Tres direcciones estudiadas

Prototipos HTML estáticos con assets reales y capturas (escritorio 1440 y móvil 390) en `docs/creative-engineering/prototypes/`.

| | A · Cinematic editorial | B · Living newsroom | C · Visual storytelling |
|---|---|---|---|
| Home | Fotograma a sangre, banda 2.39:1, titulación grande | "Monitor" 9:16 + escaleta de los 4 reels en el primer viewport, piloto rojo, timecodes | Retrato + extracto de ensayo fotográfico, composición asimétrica tipo revista |
| Work | Secuencia de fotogramas | Reportajes primero, acceso rápido | Ritmo editorial, pausas |
| Fotografía | Gran formato | Secundaria | Protagonista |
| Qué dice de Sofía en 3 s | "Cineasta" (no se la ve) | "Reportera de TV, en activo" | "Autora con tres oficios" |
| Riesgo | Esconde a la protagonista; en móvil el 16:9 recortado queda vacío | Puede sentirse "herramienta" | Menos inmediata para quien contrata reporterismo |
| Móvil | El más débil | El mejor: monitor + escaleta caben en 844 px | Bueno |

**Elegida: B como primer pantallazo + la banda cinematográfica de A para el audiovisual + la hoja de contactos/ensayo de C para fotografía.** Es la única combinación que responde a la vez "quién es" (reportera, en cámara, con voz) y "qué más sabe hacer" sin tres clics.

Se descartó la recomendación de las referencias (`CREATIVE_REFERENCES.md`, principio 1) de *autoplay silenciado* de los reels: el brief prohíbe inicializar todos los reproductores y la voz es parte del trabajo. Se usa póster primero y reproducción con sonido tras un clic explícito.

## 2. Sistema visual

- **Tipografía**: Literata (variable, eje óptico, cursiva, **con cirílico**) para display; Onest (grotesca con cirílico) para interfaz. Sustituyen a Newsreader/Geist-latin, que dejaban el ruso en fuentes del sistema. El nombre se compone en dos voces: "Sofía" redonda, "Chernikova" cursiva.
- **Color**: tinta cálida `#0e0d0c`, papel `#f3eee6`, y un solo acento: el rojo del piloto de grabación (`--tally #ff3b22`, `--accent #ff5a3c`). Tema claro en papel `#f4efe7` con rojo `#b8290f` (contraste ≥ 5:1 en texto).
- **Motivos del oficio** (discretos, nunca decorativos sin función): punto REC en etiquetas "en el aire", marcas de visor alrededor del monitor y del retrato, timecodes tabulares para duraciones e índices.
- **Retícula**: contenedor 1440 px, cabeceras alineadas a la izquierda de la retícula (antes, columna centrada de 980 px).
- **Formatos**: reels 9:16, obras 16:9 (la principal en banda 2.39:1), portadas fotográficas 4:5 con punto focal por serie.

## 3. Gramática de movimiento

| Momento | Cómo | Duración |
|---|---|---|
| Entrada de titulares (hero, perfil) | `HeroEntrance` existente: opacidad + 14 px | ≤ 800 ms total |
| Aparición de secciones | `Reveal` existente (IntersectionObserver, sin JS = visible) | 520 ms |
| Portada al pasar el puntero | escala 1,03–1,035 | 650 ms |
| Abrir vídeo | el póster se funde y monta Mux con sonido | 240 ms |
| Cambiar de pieza en el monitor | clic en la escaleta → misma pantalla, nueva pieza | inmediato |
| Navegar Trabajo → detalle | `<ViewTransition>` morph de la portada; header fijo | 440 ms |
| Cambio de página genérico | fundido raíz | 200 ms |
| Visor de fotos | fundido + escala 0,985 → 1; swipe táctil | 420 ms |
| Piloto REC | pulso de opacidad | 2,4 s, se detiene con reduced motion |

Prohibido: scroll hijacking, preloaders, parallax, cursores propios, texto animado por letras. Todo se anula con `prefers-reduced-motion`.

## 4. Estructura de pantallas

```
/            Hero (nombre · oficio · lede · CTA)  +  Monitor con 4 reels
             Detrás de la cámara (obra principal 2.39:1 + 3 filas)
             Fotografía (5 portadas 4:5)
             Trayectoria (4 filas) → Experiencia / Perfil
             Contacto
/trabajo     Navegación de secciones fija con contadores
             #reporting (4 reels con descripción) · #audiovisual (filmografía) · #photography (5 series + Archivo 74)
/trabajo/[slug]   detalle con barra de contexto (Trabajo / Sección · ← n/N →)
/trabajo/fotografia/archivo   74 imágenes
/sobre-mi    Retrato + bio · Lo que hago (3 oficios con enlace a pruebas) · ficha (formación, idiomas, herramientas, base)
/experiencia Cronología ordenada (en curso → fin → inicio)
/contacto    Email visible + copiar · LinkedIn · base · idiomas
```

Rutas eliminadas con redirección 308 a su ancla: `/trabajo/reportajes`, `/trabajo/audiovisual`, `/trabajo/fotografia` (y equivalentes EN/RU).
