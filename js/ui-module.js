import {
  board,
  humanPlayer,
  cpuPlayer,
  cpuMovementModule,
  humanMovementModule,
  gameStateModule,
  square0,
  square1,
  square2,
  square3,
  square4,
  square5,
  square6,
  square7,
  square8,
  boardHtmlElements
} from "/js/game-module.js";
// ui module
const menu = document.querySelector(".options__menu");
const caret = document.querySelector(".options__caret");
const dropdownParent = document.querySelector(".options__select");
const modalOverlay = document.querySelector(".modal-overlay");

// dropdown difficulty menu
function toggleDropdown() {
  menu.classList.toggle("--active");
  caret.classList.toggle("--rotate");
}

function closeDropdown() {
  menu.classList.remove("--active");
  caret.classList.toggle("--rotate");
}

function closeModal() {
  modalOverlay.classList.remove("--active");
}

dropdownParent.addEventListener("click", function (event) {
  event.stopPropagation();
  toggleDropdown();
  if (menu.classList.contains("--active")) {
    modalOverlay.classList.add("--active"); // add overlay to stop clicks on game tiles
  } else {
    closeModal();
  }
});

// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (
    modalOverlay.contains(event.target) &&
    menu.classList.contains("--active")
  ) {
    closeDropdown();
    closeModal();
  }
});
