/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import useTodoState from '../hooks/useTodoState';
import FilterTodo from './FilterTodo';

const Container = styled.div`
  margin: 20px auto;
  width: 600px;
  padding: 5px 10px 35px;
  background: #d7e684;
  color: white;

  h1 {
    font-size: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    text-align: center;
  }
`;

function TodoApp() {
  const initailTodos = JSON.parse(window.localStorage.getItem('todos') || '[]');
  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    filter,
    showAllTodo,
    showCompletedTodo,
    showIncompletedTodo,
    clearAll,
  } = useTodoState(initailTodos);
  // 當todo 有變動的時候重新呼叫 useEffect
  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <div>
        <h1>Todo List</h1>
        <FilterTodo
          filter={filter}
          showAllTodo={showAllTodo}
          showCompletedTodo={showCompletedTodo}
          showIncompletedTodo={showIncompletedTodo}
          clearAll={clearAll}
        />
        <TodoForm addTodo={addTodo} />
        <TodoList
          filter={filter}
          todos={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      </div>
    </Container>
  );
}

export default TodoApp;
