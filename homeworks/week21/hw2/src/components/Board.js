/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  margin: 20px auto;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Square = styled.div`
  background: #fdc91f;
  border: 1px solid black;
  width: 25px;
  height: 25px;
`;

const Piece = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.color};
`;

const Board = ({ board, handleClickSquare }) => (
  <BoardWrapper>
    {board.map((row, y) => (
      <BoardRow key={y}>
        {row.map((col, x) => (
          <Square key={x} onClick={handleClickSquare(y, x)}>
            <Piece color={board[y][x]} />
          </Square>
        ))}
      </BoardRow>
    ))}
  </BoardWrapper>
);

export default Board;
