import {
  board,
  humanPlayer,
  checkWinner,
  checkTie,
} from "/js/game-state-module.js";

//need to program for clicking next **high importance**
export function humanMove(move) {
  if (board[move] === " ") {
    board[move] = humanPlayer;

    if (checkWinner(humanPlayer)) {
      // console.log("You win!");
      return;
    } else if (checkTie()) {
      // console.log("It's a tie!");
      return;
    }
  }
}

