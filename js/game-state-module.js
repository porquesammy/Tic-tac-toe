// Tic-Tac-Toe game board represented as an array
export let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

// symbols available are x, o, empty
export function ImgElementCreator(symbol) {
  let imgEl = document.createElement("img");
  imgEl.setAttribute("src", `src/svg/${symbol}.svg`);
  imgEl.setAttribute("alt", `${symbol}`);
  imgEl.setAttribute("draggable", "false");
  imgEl.setAttribute("data", `${symbol}`);
  return imgEl;
}

//players
function Player(name, symbol, score) {
  this.name = name;
  this.symbol = symbol;
  this.score = score;
}

export const humanPlayer = new Player("You", "x", "0");
export const cpuPlayer = new Player("CPU", "o", "0");
// let difficulty
// cpuPlayer.difficulty = difficulty;

export function checkWinner(player) {
  let winCombos = [
    [0, 1, 2], // top row win
    [3, 4, 5], // middle row win
    [6, 7, 8], // bottom row win
    [0, 3, 6], // first col win
    [1, 4, 7], // second col win
    [2, 5, 8], // third col win
    [0, 4, 8], // top-left/bottom-right diag win
    [2, 4, 6], // top-right/bottom-left diag win
  ];

  for (let index = 0; index < winCombos.length; index++) {
    let [a, b, c] = winCombos[index]; //destructuring assignment
    if (
      board[a] === player.symbol &&
      board[b] === player.symbol &&
      board[c] === player.symbol
    ) {
      return true;
    }
  }
  return false;
}

export function checkTie() {
  return !board.includes(" ");
}

export function newGame() {
  board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  const _gridContainer = document.querySelector(".gameGridContainer");
  for (let index = 0; index <= _gridContainer.children.length - 1; index++) {
    _gridContainer
      .querySelectorAll("img")
      [index].replaceWith(ImgElementCreator("empty"));
  }
}
