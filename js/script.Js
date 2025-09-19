const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${100 * (idx - i)}%)`;
  });
  dots.forEach(dot => dot.classList.remove('active'));
  dots[i].classList.add('active');
}

prev.addEventListener('click', () => {
  index = (index > 0) ? index - 1 : slides.length - 1;
  showSlide(index);
});

next.addEventListener('click', () => {
  index = (index < slides.length - 1) ? index + 1 : 0;
  showSlide(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});

// Inicializar
showSlide(index);