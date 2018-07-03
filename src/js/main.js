'use strict';

const gameBoard = (() => {
  let contents = Array(9).fill('X');
  return {
    contents,
  };
})();

const displayController = (() => {
  const displayGameBoardContents = () => {
    let contents = gameBoard.contents;

    for (let i = 0; i < gameBoardContents.length; i++) {
      let boardSquare = document.querySelector(`[data-board-index="${i}"]`);

      boardSquare.innerHTML = gameBoardContents[i];
    }
  };
  return {
    displayGameBoardContents,
  };
})();

const PlayerFactory = (symbol) => {
  return {symbol};
};

displayController.displayGameBoardContents();
