/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import Todo from './Todo';

function TodoList({
  todos, removeTodo, toggleTodo, editTodo, filter,
}) {
  return (
    <div>
      {todos
        .filter((todo) => {
          if (filter === 'all') return todo;
          return filter === 'completed' ? todo.completed : !todo.completed;
        })
        .map(todo => (
          <Todo
            id={todo.id}
            filter={filter}
            task={todo.task}
            key={todo.id}
            completed={todo.completed}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        ))}
    </div>
  );
}

export default TodoList;
