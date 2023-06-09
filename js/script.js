// Tic-Tac-Toe game board represented as an array
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

//players
const humanPlayer = "X";
const aiPlayer = "O";

//game state module  checkWinner(), checkTie(), displayBoard(), newGame()
const gameStateModule = () => {
  function checkWinner(player) {
    let winCombos = [
      [6, 7, 8], // row
      [0, 1, 2], // row
      [3, 4, 5], // row
      [2, 5, 8], // col
      [0, 3, 6], // col
      [1, 4, 7], // col
      [2, 4, 6], // diag
      [0, 4, 8], // diag
    ];

    for (let i = 0; i < winCombos.length; i++) {
      let [a, b, c] = winCombos[i]; //destructuring assignment
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  }

  function checkTie() {
    return !board.includes(" ");
  }

  //for console.log use only
  function displayBoard() {
    console.log(board[0] + " | " + board[1] + " | " + board[2]);
    console.log("---------");
    console.log(board[3] + " | " + board[4] + " | " + board[5]);
    console.log("---------");
    console.log(board[6] + " | " + board[7] + " | " + board[8]);
  }

  function newGame() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    displayBoard();
  }

  return { newGame, displayBoard, checkTie, checkWinner };
};

// AI movement module makeAImove() & Min-Max algorithm (no alpha beta pruning or depth) 
const aiMovementModule = () => {
  function makeAIMove() {
    let _bestScore = -Infinity;
    let _bestMove;

    for (let i = 0; i < 9; i++) {
      if (board[i] === " ") {
        board[i] = aiPlayer;
        let _score = _minMax(board, false);
        board[i] = " ";

        if (_score > _bestScore) {
          _bestScore = _score;
          _bestMove = i;
        }
      }
    }

    board[_bestMove] = aiPlayer;
  }

  //Min-Max algorithm
  function _minMax(board, maximizingPlayer) {
    if (gameStateModule().checkWinner(humanPlayer)) {
      return -1;
    } else if (gameStateModule().checkWinner(aiPlayer)) {
      return 1;
    } else if (gameStateModule().checkTie()) {
      return 0;
    }

    if (maximizingPlayer) {
      let _maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === " ") {
          board[i] = aiPlayer;
          let _eval = _minMax(board, false);
          board[i] = " ";
          _maxEval = Math.max(_maxEval, _eval);
        }
      }
      return _maxEval;
    } else {
      let _minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === " ") {
          board[i] = humanPlayer;
          let _eval = _minMax(board, true);
          board[i] = " ";
          _minEval = Math.min(_minEval, _eval);
        }
      }
      return _minEval;
    }
  }

  return { makeAIMove };
};

// Human move module humanMove()
const humanMovementModule = () => {
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

      aiMovementModule().makeAIMove();

      if (gameStateModule().checkWinner(aiPlayer)) {
        console.log("AI wins!");
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





//      to do list
//single player & multi player -> player names (use a factory function for object creation)
// ai settings  easy/medium/unbeatable
// UI 