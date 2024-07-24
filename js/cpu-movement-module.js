import {
  board,
  ImgElementCreator,
  humanPlayer,
  cpuPlayer,
  checkWinner,
  checkTie,
} from "/js/game-state-module.js";

function _evalBoard() {
  if (checkWinner(cpuPlayer)) {
    return 10;
  } else if (checkWinner(humanPlayer)) {
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

  if (checkWinner(cpuPlayer)) {
    cpuPlayer.setScore("win");
    console.log("CPU wins!");
    cpuPlayer.turn = false; 
    humanPlayer.turn = false; 
  } else if (checkTie()) {
    console.log("It's a tie!");
    cpuPlayer.turn = false; 
    humanPlayer.turn = false; 
  } else {
    cpuPlayer.turn = false;
    humanPlayer.turn = true;
  }
}
