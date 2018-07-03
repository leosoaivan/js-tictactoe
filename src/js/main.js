'use strict';

const gameBoard = (() => {
  let contents = Array(9).fill('');

  return {
    contents,
  };
})();

const displayController = (() => {
  const displayGameBoardContents = () => {
    let contents = gameBoard.contents;

    for (let i = 0; i < contents.length; i++) {
      let boardSquare = document.querySelector(`[data-board-index="${i}"]`);

      boardSquare.innerHTML = contents[i];
    }
  };

  return {
    displayGameBoardContents,
  };
})();

const playerFactory = (symbol) => {
  return {symbol};
};

const gameFactory = () => {
  const gameBoardSquares = [...document.querySelectorAll('.square')];

  const loadSquares = () => {
    gameBoardSquares.forEach((square) => {
      square.onclick = () => {
        _modifySquare(square);
      };
    });
  };
  
  const _modifySquare = (square) => {
    let indexToModify = square.getAttribute('data-board-index');
    
    gameBoard.contents[indexToModify] = 'x';
    displayController.displayGameBoardContents();
  };

  return {
    loadSquares,
  };
};

let game = gameFactory();
game.loadSquares();
