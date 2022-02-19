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



// const feedbackLink = document.querySelector(".feedback-button");
// const feedbackPopup = document.querySelector(".modal-message");
// const feedbackClose = feedbackPopup.querySelector(".modal-close");
// const feedbackForm = feedbackPopup.querySelector(".modal-form");
// const feedbackLogin = feedbackPopup.querySelector(".modal-name input");
// const feedbackMail = feedbackPopup.querySelector(".modal-mail input");
// const feedbackMessage = feedbackPopup.querySelector(".modal-textarea")

// let isStorageSupport = true;
// let storage = "";

// try {
//   storage = localStorage.getItem("name");
// } catch (err) {
//   isStorageSupport = false;
// }

// feedbackLink.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   feedbackPopup.classList.add("modal-show");

//   if (storage) {
//     feedbackLogin.value = storage;
//     feedbackMail.focus();
//   } else {
//     feedbackLogin.focus();
//   }
// });

// feedbackClose.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   feedbackPopup.classList.remove("modal-show");
//   feedbackPopup.classList.remove("modal-error");
// });

// feedbackForm.addEventListener("submit", function (evt) {
//   if (!feedbackLogin.value || !feedbackMail.value || !feedbackMessage.value) {
//     evt.preventDefault();
//     feedbackPopup.classList.remove("modal-error");
//     feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
//     feedbackPopup.classList.add("modal-error");
//   } else {
//     if (isStorageSupport) {
//         localStorage.setItem("name", feedbackLogin.value);
//       }
//     }
// });

// window.addEventListener("keydown", function (evt) {
//   if (evt.keyCode === 27) {
//     if (feedbackPopup.classList.contains("modal-show")) {
//       evt.preventDefault();
//       feedbackPopup.classList.remove("modal-show");
//       feedbackPopup.classList.remove("modal-error");
//     }
//   }
// });