# living-newsroom

**Concepto.** Sala de control: Sofía en cámara es la protagonista. Monitor 9:16 (marco PGM, tally rojo, márgenes de seguridad, timecode) con el póster del reel activo y, al lado, una escaleta con los cuatro reels, todo en el primer viewport tanto en 1440 como en 390. Columna de presentación con su cargo real (Grupo Cadena Media, desde 2024) y las coberturas (estrenos, festivales, ruedas de prensa, entrevistas). Cine y foto quedan como accesos rápidos.

**Interacción implementada.** Pulsar un ítem de la escaleta cambia el póster, el alt, el timecode y el pie del monitor (`aria-pressed`, `aria-live`). El punto REC parpadea (se detiene con `prefers-reduced-motion`). **No hay reproducción de vídeo**: son pósters de Mux. Los TC mostrados corresponden al segundo del fotograma del póster, no a la duración.

**Fortalezas.** Es la única que muestra su cara y su oficio actual en el primer vistazo; humana y actual; la escaleta en móvil queda al lado del monitor (no apilada), así que se ve todo sin scroll.

**Riesgos.**
- Los reels 03 y 04 no tienen descripción real disponible; se rotulan "Reel 03/04 · Pieza vertical". Hace falta un título real para cada uno.
- La metáfora REC/PGM puede leerse como "en directo ahora" si se exagera; evitar textos tipo "en antena".
- Cine y foto quedan en segundo plano: un director de casting o una revista no ven su obra fotográfica sin scroll.
- Los subtítulos quemados del reel (p. ej. "ESTAR MUY ATENTOS") compiten con la UI.

**En 3 segundos dice:** "Reportera de televisión, cercana, trabajando ahora".
