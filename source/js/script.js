//main navigation
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.page-header__toggle');

  navMain.classList.remove('main-nav--nojs');
  navToggle.classList.remove('page-header__toggle--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--close')) {
      navMain.classList.remove('main-nav--close');
      navMain.classList.add('main-nav--open');
      navToggle.classList.remove('page-header__toggle--close');
      navToggle.classList.add('page-header__toggle--open');
    } else {
      navMain.classList.add('main-nav--close');
      navMain.classList.remove('main-nav--open');
      navToggle.classList.add('page-header__toggle--close');
      navToggle.classList.remove('page-header__toggle--open');
    }
  });
