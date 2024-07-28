import { humanPlayer, cpuPlayer, board } from "./game-state-module.js";
import { makeCpuMove } from "./cpu-movement-module.js";
//set turns  -- need to work on different scenarios

export const setTurns = function () {
  const humanPlayerOClass = document.getElementsByClassName(
    "--humanPlayerSymbol-o"
  );
  const humanPlayerXClass = document.getElementsByClassName(
    "--humanPlayerSymbol-x"
  );
  if (humanPlayer.symbol === "x") {
    humanPlayer.turn = true;
    cpuPlayer.turn = false;
    //remove class if it is on the container
    if (humanPlayerOClass) {
      document
        .querySelector(".gameGridContainer")
        .classList.remove("--humanPlayerSymbol-o");
    }
    //add class
    document
      .querySelector(".gameGridContainer")
      .classList.add("--humanPlayerSymbol-x");
    console.log("uhh");
  } else if (humanPlayer.symbol === "o") {
    humanPlayer.turn = false;
    cpuPlayer.turn = true;
    //remove class if it is on the container
    if (humanPlayerXClass) {
      document
        .querySelector(".gameGridContainer")
        .classList.remove("--humanPlayerSymbol-x");
    }
    //add class
    document
      .querySelector(".gameGridContainer")
      .classList.add("--humanPlayerSymbol-o");
    console.log("wtf");
    //make cpu move first if cpuSymbol is 'x'
    makeCpuMove(board);
  } else {
    console.error("Error: setTurns() unexpected result");
  }
};

// clear board, change symbol, and set turns
// default will be player set to "o"

export function changePlayerSymbols(selection) {
  if (selection === "x" && humanPlayer.symbol === "o") {
    humanPlayer.symbol = "x";
    cpuPlayer.symbol = "o";
    humanPlayer.score = 0;
    cpuPlayer.score = 0;
    setTurns();
  } else if (selection === "o" && humanPlayer.symbol === "x") {
    humanPlayer.symbol = "o";
    cpuPlayer.symbol = "x";
    humanPlayer.score = 0;
    cpuPlayer.score = 0;
    setTurns();
  }
}
