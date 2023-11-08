import {
  board,
  ImgElementCreator,
  humanPlayer,
  cpuPlayer,
  checkWinner,
  checkTie,
} from "/js/game-state-module.js";

export function makeCpuMove(difficultyDepth) {
  let _bestScore = -Infinity;
  let _bestMove;
  let _squareEl;

  for (let index = 0; index <= 8; index++) {
    if (board[index] === " ") {
      board[index] = cpuPlayer.symbol;
      let _score = _minMax(board, difficultyDepth, false);
      board[index] = " ";

      if (_score > _bestScore) {
        _bestScore = _score;
        _bestMove = index;
      }
    }
  }

  board[_bestMove] = cpuPlayer.symbol;
  _squareEl = document.querySelector(`[data-square=${_bestMove}']`);
  _squareEl.removeChild(_squareEl.querySelector("img"));
  _squareEl.append(ImgElementCreator(`${cpuPlayer.symbol}}`));
}

//Min-Max algorithm
function _minMax(board, difficultyDepth, maximizingPlayer) {
  if (difficultyDepth === 0) {
    return 0;
  } // <-- not sure if needs value ?
  else if (checkWinner(humanPlayer)) {
    return -1;
  } else if (checkWinner(cpuPlayer)) {
    return 1;
  } else if (checkTie()) {
    return 0;
  }

  if (maximizingPlayer) {
    let _maxEval = -Infinity;
    for (let index = 0; index <= 8; index++) {
      if (board[index] === " ") {
        // if open spot
        board[index] = cpuPlayer.symbol; // place marker
        let _eval = _minMax(board, difficultyDepth - 1, false); //maximizingPlayer = false
        board[index] = " ";
        _maxEval = Math.max(_maxEval, _eval);
      }
    }
    return _maxEval;
  } else {
    let _minEval = Infinity;
    for (let index = 0; index <= 8; index++) {
      if (board[index] === " ") {
        board[index] = humanPlayer.symbol;
        let _eval = _minMax(board, difficultyDepth - 1, true); // maximizingPlayer = true
        board[index] = " ";
        _minEval = Math.min(_minEval, _eval);
      }
    }
    return _minEval;
  }
}
