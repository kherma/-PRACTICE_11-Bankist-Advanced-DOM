'use strict';

///////////////////////////////////////
// VARIABLES

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

///////////////////////////////////////
// CODE - BEGINNING

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(elem => elem.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// CODE - ADDED

btnScrollTo.addEventListener('click', function (event) {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const idFromHref = event.target.getAttribute('href');
      document.querySelector(idFromHref).scrollIntoView({ behavior: 'smooth' });
    }
  });

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove activ from button
  tabs.forEach(btn => btn.classList.remove('operations__tab--active'));

  // Active clicked button
  clicked.classList.add('operations__tab--active');

  // Remove active from content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Add active to choosen content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
