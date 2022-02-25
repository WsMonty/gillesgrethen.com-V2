'use strict';

if (module.hot) {
  module.hot.accept();
}

// selecting global elements
const links = document.querySelector('.list_links--left');
const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const allCards = document.querySelectorAll('.card');
const btnCloseCards = document.querySelector('.btn-card_close');

// Helper functions

const showElement = function (element) {
  element.classList.remove('hidden');
  element.setAttribute('data-state', 'active');
};
const hideElement = function (element) {
  element.classList.add('hidden');
  element.setAttribute('data-state', 'not-active');
};

// Cards functionality

let activeCard;

const showCards = function (e) {
  if (e.target.classList.contains('list_item')) return;
  // Hide all cards, so only 1 is active
  cards.forEach((card) => hideElement(card));
  activeCard = document.querySelector(`.card_${e.target.dataset.name}`);
  // show current card
  showElement(activeCard);
  // show overlay
  showElement(overlay);
};

const hideCards = function () {
  hideElement(activeCard);
  hideElement(overlay);
};

// Gallery (Slider in Quartet Card)
const gallery = function () {
  const btnLeft = document.querySelector('.btn_left');
  const btnRight = document.querySelector('.btn_right');
  const imgs = document.querySelectorAll('.img_quartet');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = imgs.length;

  const createDots = function () {
    imgs.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots_dot')
      .forEach((dot) => dot.classList.remove('dots_dot--active'));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add('dots_dot--active');
  };

  const goToSlide = function (slide) {
    imgs.forEach(
      (img, i) => (img.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide(); //like: if(e.key === 'Arrowleft') prevSlide;
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots_dot')) {
      const { slide } = e.target.dataset; //destructering, same as: const slide = e.target.dataset.slide
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
gallery();

// Event Hanlders

links.addEventListener('click', (e) => showCards(e));
overlay.addEventListener('click', hideCards);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.dataset.state === 'active') hideCards();
});
btnCloseCards.addEventListener('click', hideCards);
