# Fase 3 · Reescritura editorial: del cuestionario al portfolio

Fecha: 2026-10-11 · Rama: `content/editorial-review-final` (sobre `d210b59`, Fase 2) · `main` intacto.

Cambio de regla respecto a las fases anteriores, por instrucción del propietario: el Word y `SOFIA_SOURCE_RESPONSES.md` siguen siendo intocables como fuente, pero la web deja de reproducir párrafos literales y pasa a texto editorial que respeta los hechos y la personalidad de Sofía. Toda frase en primera persona que no sea literal queda listada en §5 para que Sofía la apruebe.

## 1. Qué cambia

| | Fase 2 | Fase 3 |
|---|---|---|
| Estructura | 40 bloques pregunta/respuesta («Con mis palabras») | 0 preguntas. Prosa breve por función de página |
| Componente | `story-blocks.tsx` (encabezado + párrafos) | `prose.tsx` (solo párrafos) |
| Palabras en `messages/es.json` (sin ALT) | 6 169 | 4 358 |
| Perfil (escritorio 1280) | 3 222 px | 2 626 px |
| Experiencia (escritorio) | 4 839 px | 2 361 px |
| 4 MINUTOS (escritorio) | 3 336 px | 2 613 px |
| Contacto (escritorio) | 1 523 px | 1 170 px |

Cadenas que quedan con signo de interrogación en los tres idiomas: solo «¿Hablamos?», título de Contacto, anterior a la ficha.

## 2. Decisiones por página

**Perfil.** La cabecera conserva las dos frases literales de Sofía (`bio` P0012, `bioMore` P0013) porque son su mejor presentación. Debajo, «Lo que hago» (tres tarjetas, sin cambios) y una sección nueva «Cómo trabajo» de cuatro párrafos cortos: cámara, entrevista, edición, y su rechazo a «multidisciplinar». Está construida casi entera con sus propias frases, enlazadas y sin las preguntas. No repite nada de Experiencia: ni empresas, ni cargos, ni anécdotas. Se retira definitivamente lo que era autoevaluación («Me gusta todo», «¿Qué trabajos enseñarías primero?»).

**Experiencia.** Las listas de responsabilidades (verificadas en fases anteriores) son la información principal. Cada puesto lleva ahora un único apunte en prosa, sin etiqueta, de 25 a 50 palabras, solo con lo que diferencia: Grupo Cadena Media (ritmo de las coberturas, C. Tangana, Jon Favreau), URJCmun (el año de preparación: 150 entrevistas, formaciones, feed, plan mensual), Annie Bonnie (MWC Madrid, dashboard semanal, Madring con Iker Casillas), Isocero (sesiones, Lightroom, venta). Desaparecen las respuestas «Sí, aunque añadiría…» y todo lo que repetía la lista.

**Audiovisual (4 MINUTOS, Tras el sofá, VERSIÓN BETA, Condición Perfecta).** Orden: vídeo, ficha (rol, formato, año), «Contexto» (qué es la obra, 30–55 palabras), «Cómo se hizo» (el papel de Sofía y una o dos decisiones, 35–70 palabras), créditos. Las descripciones de listado de 4 MINUTOS, Tras el sofá y VERSIÓN BETA se reescriben para decir de qué va cada pieza en vez de su género. Lo que era explicación completa del rodaje queda reducido a lo que un espectador no puede ver en el vídeo: el plano único y el estabilizador sin batería; las cuatro horas de plató y el equipo de diez; el pitch de un minuto y por qué Pedro Aguado; los cinco días, el dron pilotado por ella y la ausencia de guion técnico.

**Vídeos verticales.** Mismo esquema con menos texto (25–60 palabras por campo). «Madrid a pie» conserva más voz porque es su pieza personal: la idea de las «antifotos» y «explica bastante bien cómo miro». En las piezas de Yoigo se escribe «producida en Annie Bonnie» en lugar de «durante mis prácticas», porque la denominación del puesto sigue pendiente de confirmación.

**Fotografía.** Entre tiendas y tambores: dos frases de contexto (dónde, cuándo, qué miraba). Retrato y Estudio: una frase cada una. Música en directo y Calle y documental: sin introducción, porque no hay contexto verificado para ellas. Los 111 ALT no se tocan.

**Contacto.** Invitación existente («Si tienes una propuesta de trabajo…») y un único párrafo «Qué busco» con lo que un empleador necesita: tipo de trabajo, interés cultural y musical, contrato o freelance, Madrid o fuera.

**Portada y Trabajo.** Sin cambios de texto salvo la frase de Audiovisual ajustada en Fase 2.

## 3. Lo que no se ha hecho

- No se han añadido hechos, fechas, créditos ni cargos que no estén en la ficha o en el portfolio verificado. Siguen fuera los mismos datos bloqueados de Fase 1 (16/18 reporteros, URJCmun 2027, OPPO/vivo, festival de los conciertos, permisos, créditos pendientes).
- No se han atribuido a Sofía frases entrecomilladas. Todo el texto nuevo va en la primera persona habitual de la web, y por eso se somete a su aprobación (§5).
- No hay rediseño ni dependencias nuevas: un componente de párrafos sustituye al de preguntas y el CSS correspondiente se reduce.

## 4. Revisión EN/RU

Las tres versiones se han escrito a mano a partir del español, no por paridad mecánica. Criterios: mismo nivel de registro (coloquial, sin solemnidad), mismos hechos, nombres propios sin traducir (Grogu, Hermano Mayor, Sueños y pan, MWC Madrid, Madring, MyMUN), transliteración rusa de Jon Favreau e Iker Casillas, «guion técnico» como *shot list* / «раскадровка». Ninguna versión añade información. Comprobadas en pantalla: Perfil EN, Tras el sofá RU, Condición Perfecta EN, vivo X300 Pro EN móvil, Contacto RU móvil, Experiencia RU.

## 5. Frases a aprobar por Sofía

Cada frase pública nueva en español, con su origen en la ficha. «Literal» = coincide con su texto; «Reformulada» = conserva una secuencia suya de al menos cinco palabras y se ha acortado o enlazado; «Nueva» = redacción nuestra sobre hechos que ella escribió. Las etiquetas (eyebrows) no se listan.

| Ubicación | Frase publicada (ES) | Tipo | Fuente en la ficha |
|---|---|---|---|
| Perfil · Cómo trabajo | Delante de cámara estoy cómoda. | Nueva (hechos de la ficha) | P0022 |
| Perfil · Cómo trabajo | No me gusta demasiado actuar, pero sí estar: hablarle a alguien aunque haya una cámara entre medias, improvisar, reaccionar, equivocarme un poco y seguir. | Reformulada | P0024 |
| Perfil · Cómo trabajo | Cuando todo está demasiado preparado se pierde la sensación de que está pasando de verdad. | Reformulada | P0024 |
| Perfil · Cómo trabajo | En una entrevista intento que la persona se olvide un poco de que está siendo entrevistada. | Reformulada | P0028 |
| Perfil · Cómo trabajo | No me interesa coleccionar respuestas perfectas; prefiero una que se escape un poco. | Reformulada | P0029 |
| Perfil · Cómo trabajo | Y escuchar más que esperar mi turno para hacer la siguiente pregunta. | Literal | P0030 |
| Perfil · Cómo trabajo | Después está editar, que es otra manera de mirar: horas de material y decidir qué queda, qué sobra y dónde empieza realmente la historia. | Reformulada | P0019 |
| Perfil · Cómo trabajo | No me gusta demasiado decir que soy “multidisciplinar”. | Literal | P0039 |
| Perfil · Cómo trabajo | Creo que soy más sencilla que eso: me gusta mirar dos veces, hacer preguntas, meterme donde están pasando cosas y encontrar historias donde, en principio, no parecía haber ninguna. | Reformulada | P0041 |
| grupo-cadena-media · note | Hay coberturas con dos minutos para conseguirlo todo y otras en las que acabo hablando diez con alguien. | Reformulada | P0054 |
| grupo-cadena-media · note | Dos que recuerdo: C. Tangana, al que llevo escuchando desde la adolescencia, y Jon Favreau en el estreno de Grogu. | Nueva (hechos de la ficha) | P0058, P0060 |
| urjcmun · note | Un año de preparación antes de cada congreso: 150 entrevistas para seleccionar el equipo, dos formaciones, el diseño del feed de Instagram y un plan de contenidos mensual. | Reformulada | P0076 |
| urjcmun · note | Durante la semana del congreso, repartir coberturas y revisar el trabajo del equipo mientras más de mil personas pasan por los comités. | Nueva (hechos de la ficha) | P0075, P0078 |
| annie-bonnie · note | Un puesto transversal: artículos para el blog, TikToks, edición de vídeo, entrevistas y coberturas, también en MWC Madrid. | Nueva (hechos de la ficha) | P0088 |
| annie-bonnie · note | Cada semana, un dashboard con el rendimiento de las cuentas y lo que hacía la competencia. | Reformulada | P0089 |
| annie-bonnie · note | Y un evento de Madring en el que entrevisté a los invitados, Iker Casillas incluido. | Reformulada | P0095 |
| isocero · note | Reportajes de 50 a 100 fotografías a familias en la piscina del hotel por la mañana, edición en Lightroom a mediodía y venta en el stand por la tarde. | Nueva (hechos de la ficha) | P0104–P0108 |
| 4-minutos · description | Dos chicos de barrio pasan el rato y acaban hablando de cosas más grandes. | Nueva (hechos de la ficha) | P0231 |
| 4-minutos · description | Un plano secuencia en blanco y negro. | Nueva (hechos de la ficha) | P0236 |
| 4-minutos · context | Trabajo de último año de Comunicación Audiovisual. | Literal | P0231 |
| 4-minutos · context | Dos chicos de barrio pasan el rato, fuman y dicen tonterías hasta que la conversación se va a sitios más grandes: ¿qué puede pasar en cuatro minutos? | Reformulada | P0232 |
| 4-minutos · context | Robar una moto, decirle a alguien que le quieres, tomar una decisión que te cambie la vida. | Reformulada | P0232 |
| 4-minutos · context | Inspirado en Sueños y pan. | Nueva (hechos de la ficha) | P0232 |
| 4-minutos · process | Escribí el diálogo, planteé la puesta en escena y dirigí a los dos actores; también grabé y monté. | Reformulada | P0236 |
| 4-minutos · process | Toda la historia va en un solo plano, sin cortes, para dejar espacio a los silencios y a los cambios de tono entre la broma y algo más serio. | Reformulada | P0241 |
| 4-minutos · process | Cuando los personajes se marchan, la cámara se queda mirando el espacio vacío. | Literal | P0241 |
| 4-minutos · process | El estabilizador se quedó sin batería a mitad de rodaje y tocó improvisar. | Reformulada | P0241 |
| tras-el-sofa · description | Un accidente en casa, un secreto y una novia que lo descubre. | Nueva (hechos de la ficha) | P0253 |
| tras-el-sofa · description | Rodado en plató en cuatro horas. | Nueva (hechos de la ficha) | P0253 |
| tras-el-sofa · context | Proyecto de último año: seis minutos de ficción rodados en un plató, en cuatro horas y sin salir de él. | Nueva (hechos de la ficha) | P0253 |
| tras-el-sofa · context | Una chica mata a su hermano sin querer y la novia de él descubre lo ocurrido; la tensión está en quién sabe qué y cuándo. | Reformulada | P0253 |
| tras-el-sofa · process | Dirigí y monté la pieza con un equipo de diez personas. | Nueva (hechos de la ficha) | P0257, P0266 |
| tras-el-sofa · process | Con un solo espacio, todo dependía de la colocación de los actores y de cómo se revelaba lo ocurrido; hubo que prescindir de planos por falta de tiempo y resolver la continuidad en montaje para que el descubrimiento tuviera peso. | Nueva (hechos de la ficha) | P0261 |
| version-beta · description | Pitch en un minuto de una serie documental sobre jóvenes etiquetados como problemáticos, con Pedro Aguado. | Nueva (hechos de la ficha) | P0274 |
| version-beta · context | Pitch para una asignatura de Producción: presentar en un minuto el concepto de una serie documental sobre jóvenes considerados problemáticos, acercándose a sus historias. | Reformulada | P0274 |
| version-beta · context | Pedro Aguado, presentador de Hermano Mayor, conduce la pieza junto a varios jóvenes que a primera vista encajan en la etiqueta. | Nueva (hechos de la ficha) | P0274, P0278 |
| version-beta · process | Contacté con Pedro Aguado, gestioné la localización, grabé a los jóvenes y monté el vídeo: producción y coordinación además del trabajo de cámara y edición. | Nueva (hechos de la ficha) | P0278 |
| version-beta · process | El montaje es rápido a propósito, para transmitir la energía de la serie en muy poco tiempo. | Reformulada | P0274 |
| silver-praxis-condicion-perfecta · context | Videoclip para Silver Praxis, de la escena del rap underground: varias localizaciones y situaciones que acompañan el tema con movimiento y una estética ligada al universo del artista. | Reformulada | P0297 |
| silver-praxis-condicion-perfecta · process | Cinco días de rodaje y el montaje completo. | Nueva (hechos de la ficha) | P0301 |
| silver-praxis-condicion-perfecta · process | Planos dentro de un coche y tomas aéreas con un dron que piloté yo misma. | Reformulada | P0301 |
| silver-praxis-condicion-perfecta · process | No había guion técnico, así que el montaje salió de varias horas de probar combinaciones hasta encontrar el ritmo del tema. | Nueva (hechos de la ficha) | P0309 |
| short-form-001 · context | Pieza personal, sin encargo detrás. | Nueva (hechos de la ficha) | P0123, P0144 |
| short-form-001 · context | La idea era sencilla: salir a hacer fotos de los lugares más turísticos del centro y buscar justo aquello que normalmente no queremos enseñar. | Reformulada | P0122 |
| short-form-001 · context | No la Puerta del Sol perfecta, sino lo que queda cuando dejas de mirar hacia arriba: basura, desperfectos, rincones abandonados, pequeñas escenas que normalmente no miramos. | Reformulada | P0138 |
| short-form-001 · process | Lo hice todo yo: la idea y el recorrido, el vídeo, las fotografías, hablar a cámara y el montaje. | Reformulada | P0131 |
| short-form-001 · process | Me interesa el detalle que hace que vuelvas a mirar una segunda vez, y esta pieza explica bastante bien cómo miro. | Reformulada | P0143 |
| short-form-002 · context | Pieza para las redes sociales de Yoigo, producida en Annie Bonnie y grabada en el decorado de la serie 9‑1‑1, en la estación de Chamartín. | Reformulada | P0207 |
| short-form-002 · process | Salgo como reportera, micrófono en mano: presento el lugar y entrevisto al creador de contenido @telocuentosinspoilers para explicar de qué va la serie y en qué se basa su acción. | Reformulada | P0163 |
| short-form-002 · process | También ayudé a editar el vídeo. | Nueva (hechos de la ficha) | P0163 |
| short-form-003 · context | Vertical para las redes de URJCmun que explica MyMUN, la aplicación con la que los participantes consultaban la información del congreso. | Nueva (hechos de la ficha) | P0203 |
| short-form-003 · context | Está pensado para quien la abre por primera vez y piensa “vale, ¿y ahora qué hago?”: grabación de pantalla, grafismos y explicación directa. | Reformulada | P0207 |
| short-form-003 · process | Planteé y estructuré el contenido, lo explico a cámara y participé en la grabación y en la edición, combinando las pantallas de la aplicación con grafismos. | Reformulada | P0213 |
| short-form-004 · context | Pieza para la cuenta de TikTok de Yoigo, producida en Annie Bonnie: probar una función concreta del teléfono y enseñar en cámara qué se puede hacer con ella. | Reformulada | P0192 |
| short-form-004 · process | Preparé el contenido y soy una de las personas que aparece en cámara. | Reformulada | P0189 |
| short-form-004 · process | El reto era que la explicación no pareciera una explicación, y aprenderme las frases en cuestión de un minuto, porque había poco tiempo. | Reformulada | P0193 |
| entre-tiendas-y-tambores · context | Segundo día de la acampada en Sol, en Madrid, durante las movilizaciones por el derecho a la vivienda. | Reformulada | P0380 |
| entre-tiendas-y-tambores · context | Más que la reivindicación, la vida que se construía alrededor: las tiendas, las pancartas, las conversaciones, la gente organizándose y compartiendo espacio. | Reformulada | P0384 |
| retrato-editorial · context | Retratos hechos principalmente para una revista de moda y actualidad. | Reformulada | P0365 |
| estudio-editorial · context | Sesiones de estudio con DJ y cantantes para sus propios proyectos. | Nueva (hechos de la ficha) | P0350 |
| Contacto · Qué busco | Oportunidades como reportera, en entrevistas y coberturas, y también proyectos audiovisuales, rodajes, documentales o contenidos para medios y redes; especialmente los culturales y musicales. | Reformulada | P0397 |
| Contacto · Qué busco | Contrato, freelance o colaboración, en Madrid o fuera, también si implica viajar. | Nueva (hechos de la ficha) | P0403 |

Totales: {'NUEVA': 23, 'REFORMULADA': 35, 'LITERAL': 4}

## 6. QA

| Comprobación | Resultado |
|---|---|
| `pnpm lint` / `pnpm typecheck` / `pnpm build` | 0 errores · 64 páginas estáticas |
| Paridad estructural ES/EN/RU | 0 diferencias |
| Claves `heading` o `story` restantes en `messages/*.json` | 0 |
| Cadenas que empiezan por «¿», «Sí, aunque», «Porque» (y equivalentes EN/RU), excluidos ALT | 0 salvo «¿Hablamos?» |
| Capturas (1280 y 390, claro y oscuro, ES/EN/RU) | 22 páginas, sin solapes ni cortes |
| ALT de fotografías | sin cambios respecto a Fase 1 (111 revisados) |

Limitaciones: Chromium sin interfaz, sin Safari ni dispositivos reales, sin lector de pantalla; los vídeos se comprueban como póster.

## 7. Lectura como visitante nuevo

Portada: nombre, oficio, un vídeo que se reproduce, los tipos de trabajo, empleadores y contacto en una pantalla y media. Trabajo: reportajes, audiovisual, fotografía. Proyecto: la obra arriba, tres datos, dos párrafos, créditos. Perfil: dos frases suyas, tres tarjetas, cuatro párrafos sobre cómo trabaja, ficha de formación. Experiencia: cuatro puestos con lista y un apunte. Contacto: correo y un párrafo. En ningún punto hace falta entender que hubo un cuestionario.

## 8. Recomendación

Lista para revisión humana. Lo que debe aprobar Sofía es la tabla de §5; lo que debe decidir el propietario es si «Cómo trabajo» se queda en Perfil o se acorta a dos párrafos. Sin merge ni despliegue.
