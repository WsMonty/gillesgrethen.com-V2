const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const centerContainer = document.querySelector('.container-center');
const rightContainer = document.querySelector('.container-right');
const youtube = document.querySelector('.youtube');
const btnOpenYoutube = document.querySelector('.btn_open-youtube');
const btnOpenSpotify = document.querySelector('.btn_open-spotify');

let activeCard;

// Helper functions

const showElement = function (element) {
  element.setAttribute('data-state', 'active');
  element.style.opacity = '1';
  if (element.classList.contains('card')) {
    element.style.height = '90%';
    element.style.width = '60%';
    element.style.padding = '4em';
  }
};
const hideElement = function (element) {
  element.style.opacity = '0';
  element.setAttribute('data-state', 'not-active');
  if (element.classList.contains('card')) {
    element.style.height = '0em';
    element.style.width = '0em';
    element.style.padding = '0em';
  }
};

// Cards functionality

export const showCards = function (e) {
  if (e.target.classList.contains('list_item')) return;
  // Hide main container
  centerContainer.style.display = 'none';
  // Hide all cards, so only 1 is active
  cards.forEach((card) => hideElement(card));
  activeCard = document.querySelector(`.card_${e.target.dataset.name}`);
  // show current card
  showElement(activeCard);
  // show overlay
  overlay.classList.remove('hidden');
  showElement(overlay);
};

export const hideCards = function () {
  hideElement(activeCard);
  overlay.classList.add('hidden');
  // Show main container
  centerContainer.style.display = 'block';
  hideElement(overlay);
};

export const openSpotify = function () {
  if (rightContainer.style.display === 'flex') {
    rightContainer.style.display = 'none';
    btnOpenSpotify.textContent = 'Listen on spotify!';
  } else {
    rightContainer.style.display = 'flex';
    btnOpenSpotify.textContent = 'Close spotify';
  }
};

export const closeSpotify = function () {
  rightContainer.style.display = 'none';
};

export const toggleYoutube = function () {
  youtube.classList.toggle('hidden');
  !youtube.classList.contains('hidden')
    ? (btnOpenYoutube.textContent = 'Close youtube')
    : (btnOpenYoutube.textContent = 'Check our live video!');
};
