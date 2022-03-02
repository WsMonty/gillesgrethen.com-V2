import { gsap } from 'gsap';

const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const centerContainer = document.querySelector('.container-center');
const rightContainer = document.querySelector('.container-right');
const youtube = document.querySelector('.youtube');
const btnOpenYoutube = document.querySelector('.btn_open-youtube');
const btnOpenSpotify = document.querySelector('.btn_open-spotify');
const navLinks = document.querySelectorAll('.list_item');

//// Helper functions

const showElement = function (element) {
  element.classList.remove('hidden');
  element.setAttribute('data-state', 'active');
};
const hideElement = function (element) {
  element.classList.add('hidden');
  element.setAttribute('data-state', 'not-active');
};

//// Cards functionality

export const showCards = function (e) {
  if (e.target.classList.contains('list_item')) return;
  // Hide main container
  hideElement(centerContainer);
  // Hide all cards, so only 1 is active
  cards.forEach((card) => {
    hideElement(card);
  });
  activeCard = document.querySelector(`.card_${e.target.dataset.name}`);
  // show current card
  showElement(activeCard);
  // show overlay
  showElement(overlay);
};

export const hideCards = function () {
  hideElement(activeCard);
  hideElement(overlay);
  // Show main container
  showElement(centerContainer);
  hideElement(overlay);
};

export const openSpotify = function () {
  rightContainer.classList.toggle('hidden');
  btnOpenSpotify.textContent = 'Close spotify';
};

export const closeSpotify = function () {
  hideElement(rightContainer);
  btnOpenSpotify.textContent = 'Listen on spotify!';
};

export const toggleYoutube = function () {
  youtube.classList.toggle('hidden');
  !youtube.classList.contains('hidden')
    ? (btnOpenYoutube.textContent = 'Close youtube')
    : (btnOpenYoutube.textContent = 'Check our live video!');
};

//// Cards animation

// const centerAnimation = gsap.to(centerContainer, {
//   transform: 'scaleY(1)',
//   duration: 2,
//   ease: 'power2.out',
// });

let activeCard;

export const initAnimation = function () {
  const tl = gsap.timeline({ defaults: { opacity: 0 } });

  tl.from(navLinks, { duration: 1.5, y: -500, stagger: 0.5 }).from(
    centerContainer,
    {
      duration: 1,
      y: 100,
    },
    '-=1.5'
  );
};

export const cardAnimationIn = function (e) {
  const tl = gsap.timeline();
  if (!activeCard) {
    activeCard = document.querySelector(`.card_${e.target.dataset.name}`);

    tl.to(centerContainer, { y: 500, opacity: 0, duration: 1 })
      .call(hideElement, [centerContainer])
      .call(showElement, [activeCard])
      .fromTo(
        activeCard,
        { opacity: 0, y: 500 },
        { opacity: 1, y: 0, duration: 1, ease: 'bounce' }
      );
    showElement(overlay);
  } else {
    hideElement(activeCard);
    hideElement(centerContainer);
    activeCard = document.querySelector(`.card_${e.target.dataset.name}`);
    showElement(activeCard);
    tl.from(activeCard, { opacity: 0, duration: 1.5 });
  }
};

export const cardAnimationOut = function () {
  hideElement(activeCard);
  activeCard = '';
  hideElement(overlay);
  showElement(centerContainer);
  const tl = gsap.timeline();

  tl.to(centerContainer, { y: 0, opacity: 1, duration: 1 });
};
