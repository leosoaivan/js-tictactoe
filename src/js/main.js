'use strict';

const gameBoard = (() => {
  let gameBoardArray = Array(8).fill('');
})();

const displayController = (() => {
  const gameboard = document.querySelector('.gameboard');

  const _attachGameBoardBox = (div) => {
    gameboard.appendChild(div);
  };

  const createGameBoardBox = (num) => {
    for (let i = 0; i <= num; i++) {
      let newBox = document.createElement('div');
      newBox.classList.add('gameboard_box');
      _attachGameBoardBox(newBox);
    }
  };
  const createGameBoard = () => {
  };

  return {createGameBoardBox};
})();

displayController.createGameBoardBox(9);
