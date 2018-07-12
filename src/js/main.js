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
  const updateSquare = (array) => {
    for (let index of array) {
      let square = document.querySelector(`[data-board-index="${index}"]`);

      square.innerHTML = gameBoard.contents[index];
    }
  };

  const colorSquares = (array) => {
    for (let index of array) {
      let square = document.querySelector(`[data-board-index="${index}"]`);

      square.classList.add('winner');
    }
  };

  return {
    updateSquare,
    colorSquares,
  };
})();

const playerFactory = (symbol, name) => {
  return {
    symbol,
    name,
  };
};

const gameFactory = (() => {
  const gameBoardSquares = [...document.querySelectorAll('.square')];
  let player1 = playerFactory('X', 'Player 1');
  let player2 = playerFactory('O', 'Player 2');
  let turnCount = 1;
  let gameOver = false;

  const loadSquares = () => {
    gameBoardSquares.forEach((square) => {
      square.onclick = () => {
        _modifySquare(square);
        _checkWinner();
        turnCount++;
      };
    });
  };
  
  const _modifySquare = (square) => {
    let indexToModify = square.getAttribute('data-board-index');
    console.log(gameBoard.contents);

    if (!gameBoard.isEmptyAtIndex(indexToModify) || gameOver === true) {
      return;
    } else {
      _executeMove(indexToModify);
      displayController.updateSquare([indexToModify]);
    }
  };
  
  const _executeMove = (index) => {
    _updateBoard(_currentPlayer(), index);
  };

  const _updateBoard = (player, index) => {
    gameBoard.contents[index] = player.symbol;
  };

  const _currentPlayer = () => {
    return (turnCount % 2 === 0 ? player2 : player1);
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

    if (turnCount >= 4) {
      winConditions.forEach((c) => {
        if (gameBoard.contents[c[0]] === '') {
          return;
        } else if (
          gameBoard.contents[c[0]] === gameBoard.contents[c[1]] &&
          gameBoard.contents[c[0]] === gameBoard.contents[c[2]]
        ) {
          gameOver = true;
          displayController.colorSquares(c);
          let restartConfirmation = confirm(
            `${_currentPlayer().name} won! Play again?`
          );
          _askForRestart(restartConfirmation);
        } else {
        }
      });
    }
  };

  const _askForRestart = (boolean) => {
    if (boolean === false) {
      return;
    } else {
      _restartGame();
    }
  };

  const _restartGame = () => {
    gameOver = false;
    turnCount = 0;
    for (let i = 0; i < gameBoard.contents.length; i++) {
      gameBoard.contents[i] = '';
    }
    displayController.updateSquare(Array(9).keys());
    _removeStyling();
  };

  const _removeStyling = () => {
    gameBoardSquares.forEach((square) => {
      square.classList.remove('winner');
    });
  };

  return {
    loadSquares,
  };
})();

gameFactory.loadSquares();
