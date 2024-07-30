import { playerMove, newGame } from "/js/game-state-module.js";

const _menu = document.querySelector("[data='options-menu']");
const _caret = document.querySelector("[data='options-caret']");
const _dropdownParent = document.querySelector("[data='difficulty-settings']");
const _dropdown = document.querySelector("[data='options-select']");
const _dropdownAnchor = document.querySelector("[data='options-select'] a");
const _modalOverlay = document.querySelector("[data='modal-overlay']");
const _restartGameBtn = document.querySelector("[data='restart-btn']");

// dropdown difficulty menu
function toggleDropdown() {
  _menu.classList.toggle("--active");
  _caret.classList.toggle("--rotate");
}

function closeDropdown() {
  _menu.classList.remove("--active");
  _caret.classList.toggle("--rotate");
}

function closeModal() {
  _modalOverlay.classList.remove("--active");
  _restartGameBtn.removeAttribute("tabindex");
}

_dropdownParent.addEventListener("click", function (event) {
  if (
    event.target === _dropdown ||
    event.target === _dropdownAnchor ||
    event.target === _caret
  ) {
    toggleDropdown();
    if (_menu.classList.contains("--active")) {
      _modalOverlay.classList.add("--active"); // add overlay to stop clicks on game tiles
      _restartGameBtn.setAttribute("tabindex", "-1"); // make restart game button un-tabbable when options are being selected
    } else {
      closeModal();
    }
  }
});

// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (
    _modalOverlay.contains(event.target) &&
    _menu.classList.contains("--active")
  ) {
    closeDropdown();
    closeModal();
  }
});

// symbols available are x, o, empty
export function ImgElementCreator(symbol) {
  let _imgEl = document.createElement("img");
  _imgEl.setAttribute("src", `src/svg/${symbol}.svg`);
  _imgEl.setAttribute("alt", `${symbol}`);
  _imgEl.setAttribute("draggable", "false");
  _imgEl.setAttribute("data", `${symbol}`);
  _imgEl.setAttribute("data-img", "gameBoardSquare");
  return _imgEl;
}


_restartGameBtn.addEventListener("click", function () {
  newGame();
});

// on click if the square is empty  add player.symbol to  the board array and change the image to "x"
export const addPlayerMove = function () {
  let _gridSquareImgs = document.querySelectorAll('[data="empty"');
  _gridSquareImgs.forEach(function (squareImg) {
    squareImg.addEventListener("click", playerMove);
  });
};

newGame();
