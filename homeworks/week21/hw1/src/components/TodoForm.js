/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import useInputState from '../hooks/useInputState';

const Form = styled.form`
  text-align: center;

  input {
    outline: none;
    width: 450px;
    height: 25px;
    margin: 0 5px;
    border-radius: 5px;
  }
  button {
    color: red;
    border-radius: 10px;
    outline: none;
  }
`;

function TodoForm({ addTodo }) {
  const [value, handleChange, reset] = useInputState('');
  return (
    <div className="form">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(value);
          reset();
        }}
      >
        <input
          value={value}
          onChange={handleChange}
          placeholder="add new todo"
        />
      </Form>
    </div>
  );
}

export default TodoForm;
