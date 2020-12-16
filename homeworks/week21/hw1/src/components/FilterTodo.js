/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Filter = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: 0 10px 10px 10px;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
  }
`;
function FilterTodo({
  showAllTodo,
  showCompletedTodo,
  showIncompletedTodo,
  clearAll,
}) {
  return (
    <div>
      <Filter>
        <button onClick={showAllTodo}>全部</button>
        <button onClick={showCompletedTodo}>已完成</button>
        <button onClick={showIncompletedTodo}>未完成</button>
        <button onClick={clearAll}>刪除全部</button>
      </Filter>
    </div>
  );
}

export default FilterTodo;
