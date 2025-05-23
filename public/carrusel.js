// Función para mover los carruseles hacia la izquierda o derecha
function moveCarousel(category, direction) {
    // Obtener el carrusel
    const carousel = document.querySelector(`.${category}`);
    
    // Calcular el desplazamiento
    const scrollAmount = 220; // Ajusta el desplazamiento
    const totalItems = carousel.children.length;  // Total de elementos en el carrusel
    
    // Guardamos la posición de scroll actual
    let currentPos = carousel.scrollLeft;
    
    // Si se mueve a la izquierda
    if (direction === -1) {
      if (currentPos === 0) {
        carousel.scrollLeft = carousel.scrollWidth - carousel.offsetWidth; // Volver al final
      } else {
        carousel.scrollLeft -= scrollAmount; // Mover a la izquierda
      }
    }
    // Si se mueve a la derecha
    else if (direction === 1) {
      if (currentPos + carousel.offsetWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0; // Volver al principio
      } else {
        carousel.scrollLeft += scrollAmount; // Mover a la derecha
      }
    }
  }
  