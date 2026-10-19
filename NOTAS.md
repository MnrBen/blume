# Notas de la demo · Blume Floristería

Lo que hay que revisar antes de convertir la demo en una web real. La demo está
en `index.html` (una sola página) y lleva `noindex` mientras lo sea.

**Estado:** demo completada (etiqueta `demo-final`). Colores: fondos rosa y
crema alternos, titulares y texto en tinta, y el verde del logotipo solo como
acento (botones, enlaces, teléfono, palmeras, iconos y el borde del bloque de
pedido).

## Datos que faltan

| Dato | Dónde se nota | Qué se ha hecho |
|---|---|---|
| **Logotipo en vectorial** (SVG o PDF) | Cabecera, pie, antetítulos e icono | Se usa el de su foto de perfil de Instagram (`imagenes/logo.webp`, 1400 × 1229, fondo transparente). De él salen `logo-horizontal.webp` (cabecera: palmera + nombre, como el vinilo del escaparate, sin el subtítulo), `logo-pie.webp` (pie), `logo-hoja.webp` (palmera de los antetítulos) e `icono.png` (pestaña). Para la versión real, pedir el original en vectorial y confirmar que la versión horizontal les vale. |
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

## Versión 2 (carpeta `v2/`)

Ampliación a varias páginas con la misma identidad de la demo final, que no se
toca (sigue en la raíz y en la etiqueta `demo-final`). La v2 tiene su propio
`styles.css` y `main.js` y comparte las fotos de `imagenes/`.

- **Inicio** (`v2/index.html`): portada igual; servicios igual, con «Ver más en
  la galería»; adelanto de la galería en rejilla rota ligera; franja final con
  «Llamar» y «Cómo llegar» (lleva a Contacto).
- **Galería** (`v2/galeria.html`): 11 fotos con filtros (Ramos y centros, Flor
  seca y preservada, Plantas, Coronas) y visor.
- **Conócenos** (`v2/conocenos.html`): quiénes son, con datos confirmados, y
  seis reseñas literales.
- **Contacto** (`v2/contacto.html`): «Pide tus flores», cómo pedir, horario,
  dirección, redes y el mapa más grande. El mapa de Google solo se carga aquí.
- **Legal** (`v2/legal.html`): pendiente, como en la demo.

### Fotos en la v2

| Foto | Dónde | Observaciones |
|---|---|---|
| `exterior2` | Portada de Inicio | No va en la galería: ya es la portada y en la foto entera se ven las pegatinas de otro cartel. |
| `interior1`, `ramo-deco1`, `flores-secas2` | Servicios de Inicio y Galería | Sin problemas. |
| `exterior1`, `ramo-deco2`, `flores-secas3`, `plantas1`, `flores-secas1` | Adelanto de Inicio y Galería | `plantas1` solo sale en el adelanto desde 600 px. |
| `ramo-boda1`, `ramo-boda3` | Galería | Mano con pulsera / persona de cuerpo parcial, sin cara. |
| `corona-floral1` | Galería (última, filtro «Coronas») | Las hacen (confirmado). Persona desenfocada al fondo. |
| `ramo-boda2` | Conócenos | **Se supone que es Susana: confirmarlo** y pedir permiso (tatuaje visible). El texto alternativo no dice que sea ella. |
| `corona-floral2` | No usada | Dedicatoria personal legible en la cinta; recortarla destroza la foto. |
| `ramo-deco3` | No usada | Interior de una vivienda particular. |

### Reseñas citadas

Seis, completas y literales, sin fechas: Ainhoa K., Idoia S., Nerea A.,
Esteban R., Eneko M. y Elene O. (apellidos reducidos a la inicial). Se han
dejado fuera las incompletas, las traducidas y la que habla de precios «más
económicos de la zona». Antes de publicar: **permiso de Susana** y confirmar la
plataforma (parecen de Google) si se quiere nombrar o enlazar.

### Extras para cobrar (los datos los tiene el cliente)

- Enlace a **Instagram**: el sitio está preparado en Contacto, con marcador.
- **WhatsApp**, **email**, **zona y condiciones de reparto**.
- **Más fotos** y a mayor resolución (la destacada «#etiquetastories» de Instagram).
