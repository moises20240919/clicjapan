document.addEventListener("DOMContentLoaded", function () {

  // mantém o efeito infinito do slider inferior
  const track = document.getElementById('slider-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  // novo: alternância das imagens da lateral
  const slides = document.querySelectorAll(".slider-patrocinador img");

  if (slides.length > 1) {
    let index = 0;

    setInterval(() => {
      slides[index].classList.remove("ativo");
      index = (index + 1) % slides.length;
      slides[index].classList.add("ativo");
    }, 4000);
  }

});

