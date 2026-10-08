# cinematic-editorial

**Concepto.** La Home como un plano de apertura: fotograma real de *4 MINUTOS* a sangre, rotulación Literata a gran escala (romana + itálica) y unas máscaras negras que se cierran hasta 2.39:1 (única animación, CSS). Debajo, una "Secuencia" horizontal (scroll-snap) con los cuatro fotogramas 16:9 recortados a 2.39:1, y una coda de tres líneas: televisión, fotografía, contacto.

**Interacción implementada.** Animación de entrada de las máscaras (CSS, desactivada con `prefers-reduced-motion`), carrusel horizontal nativo con scroll-snap, zoom leve en hover. Sin reproducción de vídeo.

**Fortalezas.** Muy poco texto, la imagen manda; tono de autora/cine; la pieza más rápida de entender visualmente; muy ligera (1 imagen LCP + 4 lazy).

**Riesgos.**
- El hero muestra a los actores de *4 MINUTOS*, no a Sofía: posiciona "directora" y oculta "reportera de TV", que es su trabajo principal y actual.
- En 390px el recorte 16:9 → vertical deja sobre todo pared; necesita un fotograma o encuadre específico para móvil.
- El hueco negro bajo el hero en desktop (máscara + padding) se lee como vacío.
- Los fotogramas de Mux en B/N + oscuro: contraste de texto OK sobre degradado, pero depende de la imagen elegida.

**En 3 segundos dice:** "Cineasta con mirada". No dice "periodista de televisión".
