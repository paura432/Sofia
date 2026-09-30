# Content inventory — Reporting

Registro interno de coberturas potenciales detectadas en el reporter reel de Sofía Chernikova.
**No son proyectos verificados.** No se publican hasta completar verificación, archivo y derechos.

Relacionado: [`content-intake.md`](content-intake.md) (tabla operativa por pieza).

## Estado global

| Campo | Valor |
|---|---|
| Reporter Reel | Proyecto interno no publicado; URL y archivo definitivos pendientes |
| URL de cobertura | No hay URLs de piezas en el inventario ni en `src/content/` |
| Proyecto en `projects.ts` | `reporter-reel`, `published: false` |
| Status por defecto | `pending-piece-verification` |

## URL audit

No publicar ningún candidato de abajo: el inventario no contiene su URL de origen,
poster autorizado ni rol verificado. La única URL de LinkedIn en `src/content/profile.ts`
es un perfil, no una publicación de cobertura; no se cuenta como pieza y su acceso
público no se ha comprobado.

| URL | Provider | Tipo / acceso | Contenido / rol | Verificación | Decisión |
|---|---|---|---|---|---|
| https://www.linkedin.com/in/sofia-chernikova | LinkedIn | Perfil; fetch respondió HTTP 429 | No identifica una pieza | No verificable | Excluir de coberturas |

## Reglas

1. Sin dato confirmado → celda vacía. Nunca inferir.
2. Una fila por cobertura potencial.
3. `published: true` solo con `rights.verified: true` y créditos cerrados.
4. Ver [`profile-content-source.md`](profile-content-source.md) para fuentes verificadas del perfil.

---

# Reporter Reel — Potential Stories

| Title | Event | Date | Location | Organisation | Interviewee | Role | Video source | Photos | Original publication | Credits | Rights | Verification status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Premios Anillos de Oro | Premios Anillos de Oro | | | | | | | | | | | pending-piece-verification |
| Premios ALMA | Premios ALMA | | | | | | | | | | | pending-piece-verification |
| Espectáculo flamenco / Teatro Gran Vía | Espectáculo flamenco / Teatro Gran Vía | | | | | | | | | | | pending-piece-verification |
| Un hombre de verdad | Un hombre de verdad | | | | | | | | | | | pending-piece-verification |
| Evento Disney | Evento Disney | | | | | | | | | | | pending-piece-verification |
| La más grande / Rocío Jurado | La más grande / Rocío Jurado | | | | | | | | | | | pending-piece-verification |
| Scalpers / Fashion Week 2025 | Scalpers / Fashion Week 2025 | | | | | | | | | | | pending-piece-verification |
| Evento/cabaret años 30 | Evento/cabaret de ambientación años 30 | | | | | | | | | | | pending-piece-verification |
| Zootrópolis 2 | Zootrópolis 2 | | | | | | | | | | | pending-piece-verification |
| Evento/premios de moda | Evento/premios relacionados con moda | | | | | | | | | | | pending-piece-verification |
| Mágicas Navidades | Mágicas Navidades | | | | | | | | | | | pending-piece-verification |
| Los mejores años de nuestra vida / Hombres G | Los mejores años de nuestra vida / Hombres G | | | | | | | | | | | pending-piece-verification |
| A todos lados de la cama | A todos lados de la cama | | | | | | | | | | | pending-piece-verification |
| Nota Blue | Nota Blue | | | | | | | | | | | pending-piece-verification |
