// html elements 
export const square0 = document.querySelector("[data-square='0']");
export const square1 = document.querySelector("[data-square='1']");
export const square2 = document.querySelector("[data-square='2']");
export const square3 = document.querySelector("[data-square='3']");
export const square4 = document.querySelector("[data-square='4']");
export const square5 = document.querySelector("[data-square='5']");
export const square6 = document.querySelector("[data-square='6']");
export const square7 = document.querySelector("[data-square='7']");
export const square8 = document.querySelector("[data-square='8']");
export const boardHtmlElements = [
  square0,
  square1,
  square2,
  square3,
  square4,
  square5,
  square6,
  square7,
  square8,
];

// Tic-Tac-Toe game board represented as an array
export const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

//players
function Player(name, symbol, score) {
  this.name = name;
  this.symbol = symbol;
  this.score = score;
}

export const humanPlayer = new Player("You", "x", "0");
export const cpuPlayer = new Player("CPU", "o", "0");

//game state module  checkWinner(), checkTie(), displayBoard(), newGame()
export const gameStateModule = () => {
  function checkWinner(player) {
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

  function checkTie() {
    return !board.includes(" ");
  }

  function newGame() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    // needs to change out all html to show empty.svg's
    // 
    //
    //
    //
    // boardHtmlElements.map(); is faster than for each but not enough elements to make a difference 
    //
    //
    //
  // boardHtmlElements.map();
  }

  return { newGame, checkTie, checkWinner };
};

//CPU movement module makeCpuMove() & Min-Max algorithm (no alpha beta pruning or depth) but may need for difficulty levels
//
//
// needs to make depth to be able to create difficulty levels **priority-high**
//
//
//
//
//
export const cpuMovementModule = () => {
  function makeCpuMove() {
    let _bestScore = -Infinity;
    let _bestMove;

    for (let index = 0; index <= 8; index++) {
      if (board[index] === " ") {
        board[index] = cpuPlayer.symbol;
        let _score = _minMax(board, depth, false);
        board[index] = " ";

        if (_score > _bestScore) {
          _bestScore = _score;
          _bestMove = index;
        }
      }
    }

    board[_bestMove] = cpuPlayer.symbol;
  }

  //Min-Max algorithm
  function _minMax(board, depth, maximizingPlayer) {
    if (depth === 0) {
      return 0;
    } // <-- not sure if needs value ?
    else if (gameStateModule().checkWinner(humanPlayer)) {
      return -1;
    } else if (gameStateModule().checkWinner(cpuPlayer)) {
      return 1;
    } else if (gameStateModule().checkTie()) {
      return 0;
    }

    if (maximizingPlayer) {
      let _maxEval = -Infinity;
      for (let index = 0; index <= 8; index++) {
        if (board[index] === " ") {
          // if open spot
          board[index] = cpuPlayer.symbol; // place marker
          let _eval = _minMax(board, depth - 1, false); //maximizingPlayer = false
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
          let _eval = _minMax(board, depth - 1, true); // maximizingPlayer = true
          board[index] = " ";
          _minEval = Math.min(_minEval, _eval);
        }
      }
      return _minEval;
    }
  }
  return { makeCpuMove };
};

// Human move module humanMove()
export const humanMovementModule = () => {
  function humanMove(move) {
    if (board[move] === " ") {
      board[move] = humanPlayer;

      if (gameStateModule().checkWinner(humanPlayer)) {
        console.log("You win!");
        gameStateModule().newGame();
        return;
      } else if (gameStateModule().checkTie()) {
        console.log("It's a tie!");
        gameStateModule().newGame();
        return;
      }

      cpuMovementModule().makeCpuMove();

      if (gameStateModule().checkWinner(cpuPlayer)) {
        console.log("CPU wins!");
        gameStateModule().newGame();
        return;
      } else if (gameStateModule().checkTie()) {
        console.log("It's a tie!");
        gameStateModule().newGame();
        return;
      }

      gameStateModule().displayBoard();
    } else {
      console.log("Invalid move. Try again.");
    }
  }
  return { humanMove };
};
