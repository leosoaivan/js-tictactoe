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
  const updateSquare = (index) => {
    let square = document.querySelector(`[data-board-index="${index}"]`);

    square.innerHTML = gameBoard.contents[index];
  };

  return {
    updateSquare,
  };
})();

const playerFactory = (symbol) => {
  return {symbol};
};

const gameFactory = (() => {
  const gameBoardSquares = [...document.querySelectorAll('.square')];
  let player1 = playerFactory('X');
  let player2 = playerFactory('O');
  let turnCount = 0;
  let gameOver = false;

  const loadSquares = () => {
    gameBoardSquares.forEach((square) => {
      square.onclick = () => {
        _modifySquare(square);
      };
    });
  };
  
  const _modifySquare = (square) => {
    let indexToModify = square.getAttribute('data-board-index');

    if (!gameBoard.isEmptyAtIndex(indexToModify) || gameOver === true) {
      return;
    } else {
      _executeMove(indexToModify);
      displayController.updateSquare(indexToModify);
      _checkWinner();
    }
  };
  
  const _executeMove = (index) => {
    _updateBoard(_currentPlayer(), index);
    turnCount++;
  };

  const _updateBoard = (player, index) => {
    gameBoard.contents[index] = player.symbol;
  };

  const _currentPlayer = () => {
    return (turnCount % 2 === 0 ? player1 : player2);
  };

  const _checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    if (turnCount >= 5) {
      winConditions.forEach((c) => {
        if (gameBoard.contents[c[0]] === '') {
          return;
        } else if (
          gameBoard.contents[c[0]] === gameBoard.contents[c[1]] &&
          gameBoard.contents[c[0]] === gameBoard.contents[c[2]]
        ) {
          gameOver = true;
          console.log('We have a winner!');
        }
      });
    }
  };

  return {
    loadSquares,
  };
})();

gameFactory.loadSquares();
