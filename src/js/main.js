'use strict';

const gameBoard = (() => {
  let contents = Array(9).fill('');

  const isEmptyAtIndex = (ind) => {
    return (contents[ind] === '' ? true : false );
  };

  return {
    contents,
    isEmptyAtIndex,
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
  let player1 = playerFactory('X');
  let player2 = playerFactory('O');
  let turnCount = 1;

  const loadSquares = () => {
    gameBoardSquares.forEach((square) => {
      square.onclick = () => {
        _modifySquare(square);
      };
    });
  };
  
  const _modifySquare = (square) => {
    let indexToModify = square.getAttribute('data-board-index');

    if (!gameBoard.isEmptyAtIndex(indexToModify)) {
      return;
    } else {
      if (_isEven(turnCount)) {
        gameBoard.contents[indexToModify] = player2.symbol;
      } else {
        gameBoard.contents[indexToModify] = player1.symbol;
      }
  
      turnCount++;
      displayController.displayGameBoardContents();
    }
  };

  const _isEven = (int) => {
    return (int % 2 === 0 ? true : false);
  };

  return {
    loadSquares,
  };
};

let game = gameFactory();
game.loadSquares();
