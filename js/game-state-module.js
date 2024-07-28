import { addPlayerMove, ImgElementCreator } from "./main.js";
import { setTurns } from "./setTurns.js";
import { makeCpuMove } from "/js/cpu-movement-module.js";

// Tic-Tac-Toe game board represented as an array
export let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

//player Constructor to create and handle player state
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

Player.prototype.score = 0;
Player.prototype.turn = false;

Player.prototype.setScore = function (outcome) {
  if (outcome.toLowerCase() === "win") {
    return (this.score += 1);
  } else return this.score;
};

export const humanPlayer = new Player("You", "x");
export const cpuPlayer = new Player("CPU", "o");

export const playerMove = function (event) {
  if (
    humanPlayer.turn === true &&
    board[event.target.parentNode.attributes["data-square"].value] === " "
  ) {
    board[event.target.parentNode.attributes[3].value] = humanPlayer.symbol;
    event.target.replaceWith(ImgElementCreator(humanPlayer.symbol));
    if (checkWinner(humanPlayer).win) {
      humanPlayer.setScore("win");
      console.log("You win!");
      humanPlayer.turn = false;
      cpuPlayer.turn = false;
      let winSquareCombo = checkWinner(humanPlayer).squareIndex;
      for (let i = 0; i < 3; i++) {
        let winningSquareEl = document.querySelector(
          `[data-square='${winSquareCombo[i]}']`
        );
        winningSquareEl.classList.add("--winner");
      }
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

export function checkWinner(player) {
  const winCombos = [
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
      //pass on winning combination in an abject for use in highlighting wins and losses
      const winningCombination = {
        squareIndex: [a, b, c],
        playerSymbol: player.symbol,
        win: true,
      };

      return winningCombination;
    }
  }
  return false;
}

export function checkTie() {
  if (!board.includes(" ")) {
    return true;
  }
}

export function newGame() {
  board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; //clear board
  //clear all game symbol images from divs
  const _gridContainer = document.querySelector('[data="game-grid-container"]');
  const _lossClass = document.getElementsByClassName("--loss");
  const _winnerClass = document.getElementsByClassName("--winner");
  for (let index = 0; index < _gridContainer.children.length; index++) {
    _gridContainer
      .querySelectorAll('[data-img="gameBoardSquare"]')
      [index].replaceWith(ImgElementCreator("empty"));
    _gridContainer
      .querySelectorAll('[data-img="gameBoardSquare"]')
      [index].addEventListener("click", addPlayerMove);
    //clear --winner and --loss classes from gameGridContainer__square divs
    if (_lossClass.length > 0) {
      _lossClass[0].classList.remove("--loss");
    }
    if (_winnerClass.length > 0) {
      _winnerClass[0].classList.remove("--winner");
    }
  }
  setTurns();
  addPlayerMove();
}
