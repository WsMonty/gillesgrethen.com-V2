const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const centerContainer = document.querySelector('.container-center');

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
