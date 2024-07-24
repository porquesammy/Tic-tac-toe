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

const menu = document.querySelector("[data='options-menu']");
const caret = document.querySelector("[data='options-caret']");
const dropdownParent = document.querySelector("[data='difficulty-settings']");
const dropdown = document.querySelector("[data='options-select']");
const dropdownAnchor = document.querySelector("[data='options-select'] a");
const modalOverlay = document.querySelector("[data='modal-overlay']");
const restartGameBtn = document.querySelector("[data='restart-btn']");

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
  if (
    event.target === dropdown ||
    event.target === dropdownAnchor ||
    event.target === caret
  ) {
    toggleDropdown();
    if (menu.classList.contains("--active")) {
      modalOverlay.classList.add("--active"); // add overlay to stop clicks on game tiles
    } else {
      closeModal();
    }
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

export const mouseEnterPreview = function (event) {
  if (event.target.alt === "empty") {
    let hoveredSquare = event.target.parentNode.dataset.square;
    event.target.replaceWith(ImgElementCreator(humanPlayer.symbol));
    let gridSquareImgs = document.querySelectorAll(
      '[data-img="gameBoardSquare"'
    );
    gridSquareImgs[hoveredSquare].addEventListener("click", playerMove);
    gridSquareImgs[hoveredSquare].addEventListener("mouseleave", function () {
      gridSquareImgs[hoveredSquare].replaceWith(ImgElementCreator("empty"));
      addMouseEnterListener();
      gridSquareImgs[hoveredSquare].addEventListener("click", playerMove);
    });
  }
};

// onmouseover change svg to "x" if the img is "empty.svg"
const addMouseEnterListener = function () {
  let gridSquareImgs = document.querySelectorAll('[data="empty"');
  gridSquareImgs.forEach(function (squareImg) {
    if (squareImg.alt === "empty") {
      squareImg.addEventListener("mouseenter", mouseEnterPreview);
    }
  });
};

restartGameBtn.addEventListener("click", function () {
  newGame();
  addMouseEnterListener();
});

const playerMove = function (event) {
  if (
    humanPlayer.turn === true &&
    board[event.target.parentNode.attributes["data-square"].value] === " "
  ) {
    board[event.target.parentNode.attributes[3].value] = humanPlayer.symbol;
    event.target.replaceWith(ImgElementCreator(humanPlayer.symbol));
    if (checkWinner(humanPlayer)) {
      humanPlayer.setScore("win");
      console.log("You win!");
      humanPlayer.turn = false;
      cpuPlayer.turn = false;
      return;
    } else if (checkTie()) {
      console.log("It's a tie!");
      humanPlayer.turn = false;
      cpuPlayer.turn = false;
      return;
    }
    humanPlayer.turn = false;
    cpuPlayer.turn = true;
    makeCpuMove(board);
  }
};

// on click if the square is empty  add player.symbol to  the board array and change the image to "x"
export const addPlayerMove = function () {
  let gridSquareImgs = document.querySelectorAll('[data="empty"');
  gridSquareImgs.forEach(function (squareImg) {
    squareImg.addEventListener("click", playerMove);
  });
};

newGame();
addMouseEnterListener();