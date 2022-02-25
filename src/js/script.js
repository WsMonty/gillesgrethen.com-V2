'use strict';

// if (module.hot) {
//   module.hot.accept();
// }

const links = document.querySelector(
  '.list_links--left'
);
const cards = document.querySelectorAll('.card');

links.addEventListener('click', (e) => {
  if (e.target.classList.contains('list_item'))
    return;

  cards.forEach((card) =>
    card.classList.add('hidden')
  );
  const curCard = document.querySelector(
    `.card_${e.target.dataset.name}`
  );

  curCard.classList.remove('hidden');
});

// Gallery (GG4tet)
const gallery = function () {
  const btnLeft =
    document.querySelector('.btn_left');
  const btnRight =
    document.querySelector('.btn_right');
  const imgs = document.querySelectorAll(
    '.img_quartet'
  );
  const dotContainer =
    document.querySelector('.dots');

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
      .forEach((dot) =>
        dot.classList.remove('dots_dot--active')
      );

    document
      .querySelector(
        `.dots_dot[data-slide="${slide}"]`
      )
      .classList.add('dots_dot--active');
  };

  const goToSlide = function (slide) {
    imgs.forEach(
      (img, i) =>
        (img.style.transform = `translateX(${
          (i - slide) * 100
        }%)`)
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

  document.addEventListener(
    'keydown',
    function (e) {
      e.key === 'ArrowLeft' && prevSlide(); //like: if(e.key === 'Arrowleft') prevSlide;
      e.key === 'ArrowRight' && nextSlide();
    }
  );

  dotContainer.addEventListener(
    'click',
    function (e) {
      if (
        e.target.classList.contains('dots__dot')
      ) {
        const { slide } = e.target.dataset; //destructering, same as: const slide = e.target.dataset.slide
        goToSlide(slide);
        activateDot(slide);
      }
    }
  );
};
gallery();
