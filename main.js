/* =============================================================
   Blume · Floristería — comportamiento de la demo (sin librerías)
   -------------------------------------------------------------
   1. Marca de JS        3. Galería: tira deslizable
   2. Horario de hoy     4. Visor de fotos
                         5. Utilidades
   Todo es mejora progresiva: sin JS se ve todo el contenido, cada
   foto de la galería se abre como enlace y el horario sale completo.
   ============================================================= */


/* 1. Marca de JS ----------------------------------------------
   Este archivo se carga en <head> sin defer para poner la clase antes
   de pintar (la animación de la portada depende de ella). El resto
   espera a que el documento esté listo. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  marcarHoy();
  const enlacesFotos = iniciarGaleria();
  iniciarVisor(enlacesFotos);
});


/* 2. Horario de hoy -------------------------------------------
   Marca la fila del día actual con la hora de Errenteria (Europe/Madrid),
   aunque quien mira esté en otra zona horaria. No dice «abierto» ni
   «cerrado»: los festivos no los sabemos. */
function marcarHoy() {
  const filas = document.querySelectorAll('.horario tr[data-dias]');
  if (!filas.length) return;

  let dia;
  try {
    const nombre = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Europe/Madrid' }).format(new Date());
    dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(nombre);
  } catch {
    dia = new Date().getDay();
  }

  filas.forEach((fila) => {
    if (!fila.dataset.dias.split(' ').includes(String(dia))) return;
    fila.classList.add('es-hoy');
    const etiqueta = document.createElement('span');
    etiqueta.className = 'horario__hoy';
    etiqueta.textContent = 'Hoy';
    fila.querySelector('th').append(etiqueta);
  });
}


/* 3. Galería: tira deslizable ---------------------------------
   La tira se desliza sola con el dedo (scroll nativo con imán). Las
   flechas son para ratón y teclado: avanzan casi una pantalla. */
function iniciarGaleria() {
  const pista = document.querySelector('[data-pista]');
  if (!pista) return [];

  const enlaces = [...pista.querySelectorAll('[data-foto]')];
  const flechas = document.querySelector('[data-flechas]');
  const anterior = document.querySelector('[data-pista-anterior]');
  const siguiente = document.querySelector('[data-pista-siguiente]');
  const progreso = document.querySelector('[data-progreso]');
  if (!flechas || !anterior || !siguiente) return enlaces;

  // aria-disabled en vez de disabled: así el foco no se pierde al llegar al final
  const actualizar = () => {
    const maximo = pista.scrollWidth - pista.clientWidth;
    flechas.hidden = maximo <= 2;
    anterior.setAttribute('aria-disabled', String(pista.scrollLeft <= 2));
    siguiente.setAttribute('aria-disabled', String(pista.scrollLeft >= maximo - 2));

    // Raya de progreso: su tramo oscuro mide lo que se ve y avanza con la tira
    if (progreso) {
      progreso.hidden = maximo <= 2;
      const visible = pista.clientWidth / pista.scrollWidth;
      const avance = maximo > 0 ? pista.scrollLeft / maximo : 0;
      const barra = progreso.firstElementChild;
      barra.style.setProperty('--visible', `${visible * 100}%`);
      barra.style.setProperty('--avance', `${avance * (1 / visible - 1) * 100}%`);
    }
  };
  let pendiente = false;
  const alDesplazar = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; actualizar(); });
  };

  const mover = (sentido) => {
    const suave = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    pista.scrollBy({ left: sentido * pista.clientWidth * 0.8, behavior: suave ? 'smooth' : 'instant' });
  };

  anterior.addEventListener('click', () => { if (anterior.getAttribute('aria-disabled') !== 'true') mover(-1); });
  siguiente.addEventListener('click', () => { if (siguiente.getAttribute('aria-disabled') !== 'true') mover(1); });
  pista.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', retrasar(actualizar, 150));
  actualizar();

  return enlaces;
}


/* 4. Visor de fotos -------------------------------------------
   <dialog> modal: Esc cierra, el foco queda dentro y vuelve a la foto
   de la que se partió. Flechas del teclado, botones y deslizar con el
   dedo (la foto sigue al dedo y, si se suelta lejos, pasa a la otra). */
function iniciarVisor(enlaces) {
  const visor = document.querySelector('[data-visor]');
  if (!visor || !enlaces.length || typeof visor.showModal !== 'function') return;

  const figura = visor.querySelector('.visor__figura');
  const img = visor.querySelector('[data-visor-img]');
  const texto = visor.querySelector('[data-visor-texto]');
  const cuenta = visor.querySelector('[data-visor-cuenta]');

  const fotos = enlaces.map((enlace) => {
    const miniatura = enlace.querySelector('img');
    return {
      src: enlace.getAttribute('href'),
      alt: miniatura.alt,
      ancho: miniatura.getAttribute('width'),
      alto: miniatura.getAttribute('height'),
    };
  });

  let actual = 0;
  let origen = null;

  // La descripción no se ve en pantalla: va oculta en el pie (con aria-live)
  // para los lectores de pantalla, junto al contador. La imagen lleva alt=""
  // para no leerla dos veces.
  const mostrar = (indice, animar = true) => {
    actual = (indice + fotos.length) % fotos.length;
    const foto = fotos[actual];
    img.loading = 'eager';
    img.width = foto.ancho;
    img.height = foto.alto;
    img.src = foto.src;
    texto.textContent = foto.alt;
    cuenta.textContent = `${actual + 1} de ${fotos.length}`;
    if (animar) {
      img.classList.remove('entra');
      void img.offsetWidth; // reinicia la animación
      img.classList.add('entra');
    }
    // Precarga las vecinas para que deslizar sea inmediato
    [actual + 1, actual - 1].forEach((n) => {
      new Image().src = fotos[(n + fotos.length) % fotos.length].src;
    });
  };

  const abrir = (indice, enlace) => {
    origen = enlace;
    mostrar(indice, false);
    visor.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  enlaces.forEach((enlace, i) => {
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      abrir(i, enlace);
    });
  });

  visor.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    img.style.transform = '';
    img.style.opacity = '';
    if (origen) origen.focus();
  });

  visor.querySelector('[data-visor-cerrar]').addEventListener('click', () => visor.close());
  visor.querySelector('[data-visor-anterior]').addEventListener('click', () => mostrar(actual - 1));
  visor.querySelector('[data-visor-siguiente]').addEventListener('click', () => mostrar(actual + 1));

  visor.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') { evento.preventDefault(); mostrar(actual - 1); }
    if (evento.key === 'ArrowRight') { evento.preventDefault(); mostrar(actual + 1); }
  });

  // Un toque en el fondo oscuro (fuera de la foto y de los botones) cierra
  visor.addEventListener('click', (evento) => {
    if (evento.target === visor || evento.target === figura) visor.close();
  });

  // Deslizar con el dedo: la foto acompaña al dedo mientras se arrastra
  let x0 = null;
  let y0 = 0;
  let dx = 0;
  let horizontal = null;

  const soltar = () => {
    if (x0 === null) return;
    x0 = null;
    img.style.transition = 'transform .2s ease-out, opacity .2s ease-out';
    img.style.transform = '';
    img.style.opacity = '';
    if (horizontal && Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1));
  };

  figura.addEventListener('touchstart', (evento) => {
    if (evento.touches.length !== 1) return;
    x0 = evento.touches[0].clientX;
    y0 = evento.touches[0].clientY;
    dx = 0;
    horizontal = null;
    img.style.transition = 'none';
  }, { passive: true });

  figura.addEventListener('touchmove', (evento) => {
    if (x0 === null) return;
    const mx = evento.touches[0].clientX - x0;
    const my = evento.touches[0].clientY - y0;
    if (horizontal === null && (Math.abs(mx) > 8 || Math.abs(my) > 8)) horizontal = Math.abs(mx) > Math.abs(my);
    if (!horizontal) return;
    dx = mx;
    img.style.transform = `translateX(${dx}px)`;
    img.style.opacity = String(1 - Math.min(Math.abs(dx) / 700, 0.35));
  }, { passive: true });

  figura.addEventListener('touchend', soltar);
  figura.addEventListener('touchcancel', () => { dx = 0; soltar(); });
}


/* 5. Utilidades ----------------------------------------------- */
function retrasar(funcion, espera) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcion(...args), espera);
  };
}
