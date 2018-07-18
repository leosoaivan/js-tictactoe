'use strict';

const gameBoard = (() => {
  let contents = Array(9).fill('');

  const isEmptyAtIndex = (ind) => {
    return (!Boolean(contents[ind]));
  };

  const reset = () => {
    for (let i = 0; i < contents.length; i++) {
      contents[i] = '';
    }
  };

  return {
    contents,
    isEmptyAtIndex,
    reset,
  };
})();

const displayController = (() => {
  const clearSquares = () => {
    let squares = document.querySelectorAll('.square');

    for (let square of squares) {
      _deletePlayerIcon(square);
      _removeStyling(square);
    }
  };

  const colorSquares = (array) => {
    for (let index of array) {
      let square = document.querySelector(`[data-board-index="${index}"]`);

      square.children[1].classList.add('winner');
    }
  };

  const _deletePlayerIcon = (square) => {
    square.children[1].innerHTML = '';
  };

  const _removeStyling = (square) => {
    square.children[1].classList.remove('winner');
    square.classList.remove('is-flipped');
  };

  return {
    colorSquares,
    clearSquares,
  };
})();

const playerFactory = (int, symbol, imgsrc) => {
  name = prompt(`You are Player ${int}. What is your name?`);
  
  return {
    symbol,
    name,
    imgsrc,
  };
};

const gameFactory = (() => {
  const gameBoardSquares = [...document.querySelectorAll('.square')];
  let player1 = playerFactory(1, 'X', 'images/Letter-X.png');
  let player2 = playerFactory(2, 'O', 'images/Letter-O.png');
  let turnCount = 0;
  let gameOver = false;

  const loadGame = () => {
    gameBoardSquares.forEach((square) => {
      square.onclick = () => {
        _initiateTurn(square);
        _checkGameOver();
      };
    });
  };
  
  const _initiateTurn = (square) => {
    let indexToModify = square.getAttribute('data-board-index');

    if (!gameBoard.isEmptyAtIndex(indexToModify) || gameOver === true) {
      return;
    } else {
      turnCount++;
      _executeMove(indexToModify);
      _flipSquare(square);
    }
  };
  
  const _executeMove = (index) => {
    gameBoard.contents[index] = _currentPlayer().symbol;
  };

  const _flipSquare = (square) => {
    _addPlayerIcon(square);
    square.classList.add('is-flipped');
  };

  const _addPlayerIcon = (square) => {
    let backFace = square.children[1];
    let playerIcon = document.createElement('img');

    playerIcon.src = _currentPlayer().imgsrc;
    backFace.appendChild(playerIcon);
  };

  const _currentPlayer = () => {
    return (turnCount % 2 === 0 ? player2 : player1);
  };

  const _checkGameOver = () => {
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
          displayController.colorSquares(c);
          _askForRestart(`${_currentPlayer().name} won! Play again?`);
        }
      });
    }

    if (!gameBoard.contents.includes('')) {
      gameOver = true;
      _askForRestart('The game tied. Play again?');
    }
  };

  const _askForRestart = (message) => {
    if (confirm(message)) {
      _restartGame();
    } else {
      return;
    }
  };

  const _restartGame = () => {
    gameOver = false;
    turnCount = 0;
    gameBoard.reset();
    displayController.clearSquares();
  };

  return {
    loadGame,
  };
})();

gameFactory.loadGame();
