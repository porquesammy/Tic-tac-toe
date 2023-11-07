import { humanMove } from "/js/player-movement-module.js";
import { makeCpuMove } from "/js/cpu-movement-module.js";
import {
  board,
  ImgElementCreator,
  humanPlayer,
  cpuPlayer,
  checkWinner,
  checkTie,
  newGame,
} from "/js/game-state-module.js";

const menu = document.querySelector(".options__menu");
const caret = document.querySelector(".options__caret");
const dropdownParent = document.querySelector(".options__select");
const modalOverlay = document.querySelector(".modal-overlay");
const restartGameBtn = document.querySelector(".restart-game__btn");

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

// gameStateModule.newGame()

restartGameBtn.addEventListener("click", () => {
  newGame();
});
