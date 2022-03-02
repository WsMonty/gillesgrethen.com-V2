import { gsap } from 'gsap';

const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const centerContainer = document.querySelector('.container-center');
const rightContainer = document.querySelector('.container-right');
const youtube = document.querySelector('.youtube');
const btnOpenYoutube = document.querySelector('.btn_open-youtube');
const btnOpenSpotify = document.querySelector('.btn_open-spotify');

let activeCard;

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
    card.style.transform = 'scaleY(0)';
  });
  activeCard = document.querySelector(`.card_${e.target.dataset.name}`);
  // show current card
  showElement(activeCard);
  // show overlay
  showElement(overlay);
  // Animate Card
  gsap.to(activeCard, {
    transform: 'scaleY(1)',
    duration: 2,
    ease: 'power2.out',
  });
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

const centerAnimation = gsap.to(centerContainer, {
  transform: 'scaleY(1)',
  duration: 2,
  ease: 'power2.out',
});
