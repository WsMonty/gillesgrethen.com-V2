import { showCards, hideCards } from './card.js';
import { gallery } from './gallery.js';
// import img from '../imgs/gilles-lookSide.jpg';
// import replaceImg from '../imgs/bg-replacement.jpg';

// if (module.hot) {
//   module.hot.accept();
// }

// selecting global elements
const links = document.querySelector('.list_links--left');
const overlay = document.querySelector('.overlay');

// Gallery (Slider in Quartet Card)
gallery();

// Event Hanlders for Cards opening and closing
links.addEventListener('click', (e) => showCards(e));
overlay.addEventListener('click', hideCards);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.dataset.state === 'active') hideCards();
});
window.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-card_close');
  if (!btn) return;
  hideCards();
});

// const setBackground = function () {
//   document.body.style.backgroundImage = `url(${replaceImg})`;

//   // /Users/gillesgrethen/Desktop/New Website/src/imgs
// };
// setBackground();
