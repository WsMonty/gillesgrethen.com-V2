import * as card from './card.js';
import { gallery } from './gallery.js';

// if (module.hot) {
//   module.hot.accept();
// }

// selecting global elements
const links = document.querySelector('.list_links--left');
const overlay = document.querySelector('.overlay');
const btnOpenSpotify = document.querySelector('.btn_open-spotify');
const btnCloseSpotify = document.querySelector('.btn_close-spotify');
const btnOpenYoutube = document.querySelector('.btn_open-youtube');

// Gallery (Slider in Quartet Card)
gallery();

// Event Hanlders for Cards opening and closing
links.addEventListener('click', (e) => card.showCards(e));
overlay.addEventListener('click', card.hideCards);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.dataset.state === 'active')
    card.hideCards();
});
window.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-card_close');
  if (!btn) return;
  card.hideCards();
});
btnOpenSpotify.addEventListener('click', card.openSpotify);
btnCloseSpotify.addEventListener('click', card.closeSpotify);
btnOpenYoutube.addEventListener('click', card.toggleYoutube);
