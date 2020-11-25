'use strict';

///////////////////////////////////////
// VARIABLES

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const lazyImages = document.querySelectorAll('.features__img');
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const slideDots = document.querySelector('.dots');

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

// Hero button scroll
btnScrollTo.addEventListener('click', function (event) {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

// Navigation 'to-section' scroll
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const idFromHref = event.target.getAttribute('href');
      document.querySelector(idFromHref).scrollIntoView({ behavior: 'smooth' });
    }
  });

// Operations tabs switching
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

// Menu fade animation
const menuFade = function (value, event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(elem => {
      if (elem !== link) {
        elem.style.opacity = `${value}`;
        logo.style.opacity = `${value}`;
      }
    });
  }
};
nav.addEventListener('mouseover', menuFade.bind(this, 0.5));
nav.addEventListener('mouseout', menuFade.bind(this, 1));

// Sticky navigation
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0.15,
});

lazyImages.forEach(img => imageObserver.observe(img));

// Slider
const slider = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Slider Functions
  const CreateDots = function () {
    slides.forEach(function (_, index) {
      slideDots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (current) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
      if (Number(dot.dataset.slide) === current) {
        dot.classList.add('dots__dot--active');
      }
    });
  };

  const goToSlide = function (s) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${(index - s) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = -1;
    }
    currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    }
    currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    CreateDots();
    activateDot(currentSlide);
    goToSlide(0);
  };

  init();
  // Event handlers
  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) nextSlide();
    if (event.keyCode == 37) prevSlide();
  });

  slideDots.addEventListener('click', function (event) {
    if (event.target.classList.contains('dots__dot')) {
      currentSlide = Number(event.target.dataset.slide);
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};

slider();
