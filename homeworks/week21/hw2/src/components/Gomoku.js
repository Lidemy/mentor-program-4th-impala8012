/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import useBoard from '../useBoard';

const Container = styled.div`
  margin: auto;
  width: 500px;
`;

const Title = styled.h1`
  color: black;
  text-align: center;
  margin-top: 32px;
  font-weight: bold;
`;
const Status = styled.div`
  display: flex;
  justify-content: space-around;

  & div {
    margin-right: 10px;
    color: black;
  }
`;

const Button = styled.button`
  width: 100px;
  background-color: #003c9d;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #003c9d;
    background-color: #fff;
    border: 2px #003c9d solid;
  }
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);

  .content {
    font-size: 32px;
    color: white;
    text-align: center;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s;
    }
  }
`;

const Gomoku = () => {
  const {
    status,
    winner,
    board,
    isBlack,
    handleClickSquare,
    handleRestart,
  } = useBoard();
  return (
    <Container>
      <Title>GomokoGame 五子棋</Title>
      {winner ? (
        <Cover>
          <div className="content">
            <div>
              {status}
!!!
            </div>
            <Button onClick={handleRestart}>再玩一次</Button>
          </div>
        </Cover>
      ) : (
        <Status>
          <div>{status}</div>
          <Button onClick={handleRestart}>重新開始</Button>
        </Status>
      )}
      <Board
        board={board}
        isBlackNext={isBlack}
        handleClickSquare={handleClickSquare}
      />
      {/* <Button onClick={handleRestart}>重新開始</Button> */}
    </Container>
  );
};

export default Gomoku;
