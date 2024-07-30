import {
  humanPlayer,
  cpuPlayer,
  checkWinner,
  checkTie,
} from "/js/game-state-module.js";

import { ImgElementCreator } from "/js/main.js";

function _evalBoard() {
  if (checkWinner(cpuPlayer).win) {
    return 10;
  } else if (checkWinner(humanPlayer).win) {
    return -10;
  }
  return 0; //no win - tie
}

function _miniMax(board, depth, isMaxing) {
  let score = _evalBoard();
  if (score === 10) {
    return score - depth;
  }
  if (score === -10) {
    return score + depth;
  }
  if (checkTie()) {
    return 0;
  }

  if (isMaxing) {
    let bestScore = -Infinity;

    for (let index = 0; index < 9; index++) {
      if (board[index] === " ") {
        board[index] = cpuPlayer.symbol;
        let score = _miniMax(board, depth + 1, false);
        board[index] = " ";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    //minimizing player
    let bestScore = Infinity;
    for (let index = 0; index < 9; index++) {
      if (board[index] === " ") {
        board[index] = humanPlayer.symbol;
        let score = _miniMax(board, depth + 1, true);
        board[index] = " ";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function makeCpuMove(board) {
  //if board is empty, make cpu choose a random square to make game more interesting/ less robotic
  if (!board.includes("x") && !board.includes("o")) {
    let randomMoveSquare = Math.floor(Math.random() * (8 + 1));
    let squareEl = document.querySelector(
      `[data-square='${randomMoveSquare}']`
    );
    board[randomMoveSquare] = cpuPlayer.symbol;
    //setting a slight timeout to make it look more natural and hint to user that it is their turn
    setTimeout(() => {
      squareEl.replaceChild(
        ImgElementCreator(cpuPlayer.symbol),
        squareEl.children[0]
      );
      cpuPlayer.turn = false;
      humanPlayer.turn = true;
    }, 200);
  } else {
    let bestScore = -Infinity;
    let bestMove = undefined;

    for (let index = 0; index < 9; index++) {
      if (board[index] === " ") {
        board[index] = cpuPlayer.symbol;
        let moveEval = _miniMax(board, 0, false);
        board[index] = " ";
        if (moveEval > bestScore) {
          bestScore = moveEval;
          bestMove = index;
        }
      }
    }

    let squareEl = document.querySelector(`[data-square='${bestMove}']`);
    squareEl.replaceChild(
      ImgElementCreator(cpuPlayer.symbol),
      squareEl.children[0]
    );

    board[bestMove] = cpuPlayer.symbol;

    //check for end of game state
    if (checkWinner(cpuPlayer).win) {
      cpuPlayer.setScore("win");
      console.log("CPU wins!");
      cpuPlayer.turn = false;
      humanPlayer.turn = false;
      // add --loss class so css can highlight losing combination 
      let winSquareCombo = checkWinner(cpuPlayer).squareIndex;
      for (let i = 0; i < 3; i++) {
        let winningSquareEl = document.querySelector(
          `[data-square='${winSquareCombo[i]}']`
        );
        winningSquareEl.classList.add("--loss");
      }
      //update scoreboard
      const _lossesScoreSpan = document.querySelector('.score-wrapper__losses span')
      _lossesScoreSpan.firstChild.data = cpuPlayer.score;
    } else if (checkTie()) {
      console.log("It's a tie!");
      cpuPlayer.turn = false;
      humanPlayer.turn = false;
    } else {
      cpuPlayer.turn = false;
      humanPlayer.turn = true;
    }
  }
}
