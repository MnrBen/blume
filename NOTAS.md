# Notas de la demo · Blume Floristería

Lo que hay que revisar antes de convertir la demo en una web real. La demo está
en `index.html` (una sola página) y lleva `noindex` mientras lo sea.

## Datos que faltan

| Dato | Dónde se nota | Qué se ha hecho |
|---|---|---|
| **Logotipo original** (SVG o PNG) | Cabecera y pie | Marca provisional: «BLUME» con Gloock y una hoja de palmera dibujada a partir del rótulo que se ve en las fotos. Marcador visible en el pie. |
| Textos legales (aviso legal, privacidad, cookies) | `legal.html` | Página marcada como pendiente. No se ha redactado nada. |
| Email | — | No aparece en la web. |
| ¿El teléfono tiene WhatsApp? | — | Es un fijo (943), así que la acción principal es «Llamar». No se ha puesto WhatsApp. |
| Enlace al perfil de Instagram | — | `NEGOCIO.md` menciona las historias de Instagram pero no da el enlace. No hay iconos de redes. |
| Zona, plazos y precio de la entrega a domicilio | Servicios | Solo se dice que hay entrega a domicilio. No se promete nada más. |
| Festivos y vacaciones | Horario | El horario marca el día de hoy, pero no dice «abierto/cerrado» porque no sabemos los festivos. |
| ¿Hace bodas y coronas/funerales como servicio? | — | Hay fotos de ramos de novia y de coronas, pero `NEGOCIO.md` no lo lista como servicio. El ramo de novia sale en la galería como foto; las coronas se han dejado fuera. |

Menor: `NEGOCIO.md` dice que las fotos están en `fotos-blume/`, pero están en `imagenes/`.

## Fotos

Origen: historias destacadas de Instagram de la tienda. **Confirmar con Susana el
permiso para usarlas** (y si alguna es de un fotógrafo).

Todas son pequeñas (la mayor, 926 px de ancho). Por eso ninguna se muestra a
pantalla completa en escritorio: la portada va a media pantalla y la galería a
27 rem de alto. Si hay originales más grandes, conviene pedirlos.

| Foto | Uso | Observaciones |
|---|---|---|
| `exterior2` | Portada | Escaparate de noche con el rótulo. Las pegatinas de otro cartel (esquina superior izquierda) quedan fuera del encuadre: la web recorta 55 px por la izquierda sin tocar el archivo. |
| `interior1` | Servicios · plantas | Sin problemas. |
| `ramo-deco1` | Servicios · ramos y centros | Sin problemas. |
| `flores-secas2` | Servicios · flor seca (última tarjeta) | Sin problemas. |
| `exterior1` | Galería (1.ª) | El expositor de la entrada a pleno color. Caja con la palabra «Holland» (es la marca de la caja, no otro negocio). |
| `ramo-deco2`, `plantas1`, `flores-secas3` | Galería | Sin problemas. |
| `ramo-boda2` | Galería (última) | Brazo con un **tatuaje visible**: puede identificar a la persona. Pedir permiso o cambiarla. |
| `flores-secas1`, `ramo-boda1` | No usadas | Poco vistosas en la revisión con el cliente. `ramo-boda1`: mano con pulsera y reflejo del interior en el cristal. |
| `ramo-boda3` | No usada | Muy parecida a `ramo-boda2`; persona de cuerpo parcial. |
| `ramo-deco3` | No usada | Es el **interior de una vivienda particular** (privacidad) y repite el centro de `ramo-deco2`. |
| `corona-floral1` | No usada | Servicio funerario no confirmado. Persona desenfocada al fondo. |
| `corona-floral2` | No usada | La cinta lleva una **dedicatoria personal legible** («Para siempre tus chicas del Touring»). No usar. |

## Privacidad y terceros

- **Google Fonts** (Gloock y Albert Sans) y **Google Maps** (iframe del mapa)
  hacen peticiones a Google desde el navegador del visitante (se envía su IP).
  Revisar en la política de privacidad/cookies. Alternativas para la versión
  real: alojar las fuentes en el propio servidor y cargar el mapa solo al pulsar.
- Las reseñas de Google no se citan en la web; solo se han usado para el tono
  (trato cercano, asesoramiento, el gusto de Susana). Citarlas exigiría permiso,
  texto literal y sin fechas relativas.

## Ampliaciones para la reunión (no están en la demo, a propósito)

- **Susana**: una sección con su foto y su forma de trabajar. Es lo que más
  repiten las reseñas y la mejor candidata a «apuesta» de la versión completa.
- **Opiniones de clientes** (5/5 en 21 reseñas), literales y con permiso.
- **Ramos de novia** como página propia, si lo confirma como servicio.
- **Coronas y flor para despedidas**, con tono sobrio y poco protagonismo, si lo confirma.
- Una página por servicio: plantas, flor seca y preservada, ramos y centros.
- Encargos por WhatsApp o formulario, si quiere recibirlos así.
- Enlace o muestra de su Instagram.
- Versión en euskera.
- Logotipo en vectorial y fotos a mayor resolución.
