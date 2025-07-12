const slides = [
  {
    src: "imagenes/pre.png",
    titulo: "LA DIFERENCIA ESTÁ EN LOS DETALLES",
    cuerpo: "Más que productos, creamos experiencias, fabricados con los mejores materiales para garantizar tu satisfacción.",
  },
  {
    src: "imagenes/gar.webp",
    titulo: "TU TRANQUILIDAD, NUESTRO COMPROMISO",
    cuerpo: "Cada producto cuenta con nuestro total respaldo.",
  },
  {
    src: "imagenes/efi.jpg",
    titulo: "INTELIGENCIA QUE SE TRADUCE EN AHORRO",
    cuerpo: "Nuestra tecnología de eficiencia energética cuida tu bolsillo y el planeta.",
  },
  {
    src: "imagenes/seg.jpeg",
    titulo: "CALIDAD DE CLASE MUNDIAL, CERTIFICADA",
    cuerpo: "Cada producto supera las más estrictas normas internacionales de calidad y seguridad.",
  },
];

let indice = 0;
let touchStartX = 0; 
let touchEndX = 0;   

const imgElemento = document.querySelector("#img img");
const tituloElemento = document.querySelector("#texto h3");
const parrafoElemento = document.querySelector("#texto p");
const btnAtras = document.getElementById("atras");
const btnAdelante = document.getElementById("adelante");
const carruselContenido = document.querySelector(".contenido-carrusel"); 


const puntosContainer = document.getElementById("puntos-carrusel");


function actualizarCarrusel() {
  const slideActual = slides[indice];
  imgElemento.src = slideActual.src;
  tituloElemento.textContent = slideActual.titulo;
  parrafoElemento.innerHTML = slideActual.cuerpo;

  actualizarPuntos();
}


function actualizarPuntos() {
  const todosLosPuntos = document.querySelectorAll('.punto');
  todosLosPuntos.forEach((punto, i) => {
    if (i === indice) {
      punto.classList.add('punto-activo');
    } else {
      punto.classList.remove('punto-activo');
    }
  });
}

function crearPuntos() {
  slides.forEach((_, i) => {
    const punto = document.createElement('div');
    punto.classList.add('punto');

    punto.addEventListener('click', () => {
      indice = i;
      actualizarCarrusel();
    });

    puntosContainer.appendChild(punto);
  });
}


btnAtras.addEventListener("click", () => {
  indice = (indice - 1 + slides.length) % slides.length;
  actualizarCarrusel();
});


btnAdelante.addEventListener("click", () => {
  indice = (indice + 1) % slides.length;
  actualizarCarrusel();
});

// --- Lógica para el SWIPE ---
carruselContenido.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carruselContenido.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const minSwipeDistance = 50; // Distancia mínima en píxeles para considerar un swipe

    if (touchEndX < touchStartX - minSwipeDistance) {
        // Swipe hacia la izquierda (adelante)
        indice = (indice + 1) % slides.length;
        actualizarCarrusel();
    } else if (touchEndX > touchStartX + minSwipeDistance) {
        // Swipe hacia la derecha (atrás)
        indice = (indice - 1 + slides.length) % slides.length;
        actualizarCarrusel();
    }
}
// --- FIN Lógica para el SWIPE ---


document.addEventListener("DOMContentLoaded", () => {
  crearPuntos();
  actualizarCarrusel();
});