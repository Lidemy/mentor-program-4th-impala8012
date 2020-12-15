/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import findWinner from './findWinner';

const useBoard = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [isBlack, setIsBlack] = useState(true);
  const winner = findWinner(board);

  let status;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = `Player : ${isBlack ? 'Black' : 'White'}`;
  }

  const updateBoard = (y, x, newBoard) => {
    setBoard(
      board.map((row, currentY) => {
        if (currentY !== y) return row;
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newBoard;
        });
      }),
    );
  };
  const handleClickSquare = (y, x) => () => {
    console.log(board[y][x]);
    if (findWinner(board) || board[y][x]) return;
    updateBoard(y, x, isBlack ? 'Black' : 'White');
    setIsBlack(!isBlack);
  };

  const handleRestart = () => {
    window.location.reload();
  };
  return {
    status,
    winner,
    board,
    isBlack,
    handleClickSquare,
    handleRestart,
  };
};

export default useBoard;
