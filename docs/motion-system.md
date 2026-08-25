# Motion system

Lenguaje de movimiento del portfolio: editorial, sobrio y al servicio del texto.

## Principles

- **Content first.** El HTML sale del servidor visible. El movimiento se añade
  en cliente y nunca condiciona que algo se pueda leer o indexar.
- **Subtle motion.** Recorridos de 2 a 14px, sin escalados de titulares, sin
  rebotes ni overshoot.
- **Fast interaction.** Hover y navegación por debajo de 240ms. Nada de esperas.
- **Reduced motion.** Si el sistema lo pide, no se oculta nada en ningún momento.
- **Una idea por sección.** Línea + secuencia, o reveal, pero no las dos cosas
  más un tercer efecto.

## Components

Viven en `src/components/motion/`.

| Componente | Uso |
|---|---|
| `Reveal` | Bloque editorial que aparece al entrar en viewport. Props: `delay`, `distance`, `direction`, `once`, `as`, `className`. |
| `StaggerGroup` | Secuencia corta de hijos directos. Prop `step` en ms (40–80). El retraso lo aplica CSS por `nth-child`, con tope en el sexto elemento. |
| `AnimatedLine` | Divisor editorial que crece con `scaleX`. Sustituye al `border-top` en Practice, Experience, Work, About y footer. |
| `MotionLink` | Link con subrayado y flecha. Server Component: el hover es CSS. |
| `MediaReveal` | Envoltorio de fotografía o vídeo. Máscara `clip-path` al entrar y contención del zoom de hover. |
| `ScrollProgress` | Barra de lectura. **No montada todavía**: espera a `/work/[slug]`. |
| `MotionProvider` | Carga diferida del runtime de Motion (`LazyMotion` + `domAnimation`). |
| `HeroEntrance` | Entrada del hero al montar, sin esperar al scroll. |

Los reveals no usan la librería: se resuelven con `IntersectionObserver` y
transiciones CSS, así que no añaden JavaScript al bundle. Motion se carga solo
para el menú móvil y, en el futuro, el scroll progress.

## Durations

Tokens en `:root` (`src/app/globals.css`):

| Token | Valor | Uso |
|---|---|---|
| `--motion-fast` | 180ms | Hover de links, flechas, cierre del menú. |
| `--motion-interface` | 240ms | Hover de Practice, apertura del menú, skip link. |
| `--motion-reveal` | 420ms | Secuencias y entrada del hero. |
| `--motion-editorial` | 520ms | Reveals de bloque y líneas. |
| `--motion-media` | 650ms | Máscara y zoom de media. |
| `--motion-stagger` | 50ms | Separación por defecto de las secuencias. |

Distancias: `--motion-distance-sm` (4px) para microinteracciones,
`--motion-distance-md` (8px) para metadatos, `--motion-distance-reveal` (14px)
para bloques. En móvil bajan a 8px y las duraciones a 420ms.

Curva única: `--ease-out-editorial`.

## Usage

```tsx
<Reveal className="container page-hero-inner">…</Reveal>

<StaggerGroup as="article" className="trajectory-row" step={30}>…</StaggerGroup>

<AnimatedLine tone="strong" />

<MotionLink href="/work">Ver trabajo</MotionLink>
```

Cuando haya fotografía o vídeo reales, `MediaReveal` ya envuelve
`PortfolioImage` y el póster de `PortfolioVideo`. Para la transición compartida
entre la portada de Work y el hero de un proyecto se usaría `layoutId` de Motion
sobre `MediaReveal`; no se implementa hasta que existan proyectos publicados,
porque no hay contenido con el que evaluarla.

## Do not

- No animar `width`, `height`, `margin` ni `padding`.
- No usar `transition: all`.
- No poner `will-change` de forma preventiva.
- No hacer split de texto carácter a carácter ni retrasos según longitud (rompe
  la paridad entre castellano e inglés).
- No añadir pantallas de carga, overlays entre páginas ni `viewTransition`.
- No animar más de tres o cuatro grupos en el primer viewport.
- No hacer que el hover sea imprescindible: en táctil todo debe entenderse igual.
