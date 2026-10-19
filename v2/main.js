/* =============================================================
   Blume · Floristería — v2: comportamiento (sin librerías)
   -------------------------------------------------------------
   1. Marca de JS        4. Galería: filtros por categoría
   2. Menú en móvil      5. Visor de fotos
   3. Horario de hoy
   Todo es mejora progresiva: sin JS se ven todas las páginas, el menú
   sale como una fila de enlaces, la galería enseña todas las fotos (cada
   una se abre como enlace) y el horario sale completo.
   ============================================================= */


/* 1. Marca de JS ----------------------------------------------
   Este archivo se carga en <head> sin defer para poner la clase antes
   de pintar (la animación de la portada y el menú dependen de ella).
   El resto espera a que el documento esté listo. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  iniciarMenu();
  marcarHoy();
  iniciarFiltros();
  iniciarVisor();
});


/* 2. Menú en móvil --------------------------------------------
   Por debajo de 900 px los enlaces se recogen en un panel que abre el
   botón redondo de la cabecera. Esc, tocar fuera o salir con el
   tabulador lo cierran. El botón de llamar queda siempre a la vista. */
function iniciarMenu() {
  const cabecera = document.querySelector('[data-cabecera]');
  const boton = document.querySelector('[data-menu-boton]');
  const menu = boton && document.getElementById(boton.getAttribute('aria-controls'));
  if (!cabecera || !boton || !menu) return;

  boton.hidden = false;
  const estaAbierto = () => boton.getAttribute('aria-expanded') === 'true';
  const poner = (abrir) => {
    boton.setAttribute('aria-expanded', String(abrir));
    cabecera.classList.toggle('cabecera--abierta', abrir);
  };

  boton.addEventListener('click', () => {
    poner(!estaAbierto());
    // Al abrir, el foco pasa al primer enlace para seguir con el tabulador
    if (estaAbierto()) menu.querySelector('a').focus();
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierto()) {
      poner(false);
      boton.focus();
    }
  });

  document.addEventListener('click', (evento) => {
    if (estaAbierto() && !cabecera.contains(evento.target)) poner(false);
  });

  cabecera.addEventListener('focusout', (evento) => {
    if (estaAbierto() && evento.relatedTarget && !cabecera.contains(evento.relatedTarget)) poner(false);
  });

  // En escritorio los enlaces van en la propia cabecera: el panel sobra
  matchMedia('(min-width: 900px)').addEventListener('change', (evento) => {
    if (evento.matches) poner(false);
  });
}


/* 3. Horario de hoy -------------------------------------------
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


/* 4. Galería: filtros por categoría ---------------------------
   Cada foto lleva sus categorías en data-categorias (una foto puede ser
   a la vez «ramos» y «seca»). Los botones son interruptores con
   aria-pressed y un aviso oculto cuenta las fotos que se ven. */
function iniciarFiltros() {
  const grupo = document.querySelector('[data-filtros]');
  const items = [...document.querySelectorAll('[data-categorias]')];
  const estado = document.querySelector('[data-filtro-estado]');
  if (!grupo || !items.length) return;

  grupo.hidden = false;
  const botones = [...grupo.querySelectorAll('[data-filtro]')];

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const filtro = boton.dataset.filtro;
      botones.forEach((otro) => otro.setAttribute('aria-pressed', String(otro === boton)));

      let cuantas = 0;
      items.forEach((item) => {
        const entra = filtro === 'todas' || item.dataset.categorias.split(' ').includes(filtro);
        item.hidden = !entra;
        if (!entra) return;
        cuantas++;
        item.classList.remove('aparece');
        void item.offsetWidth; // reinicia la animación de entrada
        item.classList.add('aparece');
      });

      if (estado) {
        const fotos = `${cuantas} ${cuantas === 1 ? 'foto' : 'fotos'}`;
        estado.textContent = filtro === 'todas' ? `Se ven las ${fotos}.` : `${fotos} de ${boton.textContent.trim()}.`;
      }
    });
  });
}


/* 5. Visor de fotos -------------------------------------------
   <dialog> modal: Esc cierra, el foco queda dentro y vuelve a la foto
   de la que se partió. Flechas del teclado, botones y deslizar con el
   dedo (la foto sigue al dedo y, si se suelta lejos, pasa a la otra).
   Solo recorre las fotos que se ven con el filtro elegido. */
function iniciarVisor() {
  const visor = document.querySelector('[data-visor]');
  const enlaces = [...document.querySelectorAll('[data-foto]')];
  if (!visor || !enlaces.length || typeof visor.showModal !== 'function') return;

  const figura = visor.querySelector('.visor__figura');
  const img = visor.querySelector('[data-visor-img]');
  const texto = visor.querySelector('[data-visor-texto]');
  const cuenta = visor.querySelector('[data-visor-cuenta]');

  const datos = (enlace) => {
    const miniatura = enlace.querySelector('img');
    return {
      src: enlace.getAttribute('href'),
      alt: miniatura.alt,
      ancho: miniatura.getAttribute('width'),
      alto: miniatura.getAttribute('height'),
    };
  };

  let fotos = [];
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

  const abrir = (enlace) => {
    const visibles = enlaces.filter((e) => !e.closest('[hidden]'));
    fotos = visibles.map(datos);
    origen = enlace;
    mostrar(Math.max(visibles.indexOf(enlace), 0), false);
    visor.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      abrir(enlace);
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

  // Un toque en el fondo (fuera de la foto y de los botones) cierra
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
