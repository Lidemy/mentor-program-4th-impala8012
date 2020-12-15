/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import useToggleState from './hooks/useToggleState';
import EditTodoForm from './EditTodoForm';

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  nackground: rgba(255, 255, 255, 0.1);
  margin-top: 15px;

  .todo__content {
    width: 50%;
    margin-top: 5px;

    li {
      display: block;
      list-style: none;
      font-size: 24px;
      :hover {
        cursor: pointer;
      }

      &.completed {
        text-decoration: line-through;
      }
    }
  }

  .todo__btn button {
    font-size: 18px;
    outline: none;
    color: red;
    border-radius: 5px;
    margin-left: 10px;
    }
  }
`;

function Todo({
  task, completed, id, removeTodo, toggleTodo, editTodo,
}) {
  const [isEditing, toggleisEditing] = useToggleState(false);
  return (
    <TodoItem>
      {isEditing ? (
        <EditTodoForm
          editTodo={editTodo}
          id={id}
          task={task}
          toggleEditForm={toggleisEditing}
        />
      ) : (
        <>
          <div className="todo__content" onClick={() => toggleTodo(id)}>
            <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
              {task}
            </li>
          </div>
          <div className="todo__btn">
            <button onClick={toggleisEditing}>Edit 📝</button>
            <button onClick={() => removeTodo(id)}>Delete 🗑️</button>
          </div>
        </>
      )}
    </TodoItem>
  );
}

export default Todo;
