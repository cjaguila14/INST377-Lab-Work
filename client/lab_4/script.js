let slidePosition = 0;
const btnNext = document.querySelector('#carousel-button--next');
const btnPrev = document.querySelector('#carousel-button--prev');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

btnNext
  .addEventListener('click', () => {
    btnNext.style.backgroundColor = 'orange';
    btnNext.style.borderColor = 'green';
    btnPrev.style.backgroundColor = '#fff';
    btnPrev.style.borderColor = 'black';
    moveToNextSlide();
  });
btnPrev
  .addEventListener('click', () => {
    btnPrev.style.backgroundColor = 'orange';
    btnPrev.style.borderColor = 'green';
    btnNext.style.backgroundColor = '#fff';
    btnNext.style.borderColor = 'black';
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel-item--visible');
    slide.classList.add('carousel-item--hidden');
  }

  slides[slidePosition].classList.add('carousel-item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}
