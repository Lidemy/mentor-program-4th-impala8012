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
    width: 350px;
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

function EditTodoForm({
  id, editTodo, task, toggleEditForm,
}) {
  const [value, handleChange, reset] = useInputState(task);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          editTodo(id, value);
          reset();
          toggleEditForm();
        }}
      >
        <input onChange={handleChange} value={value} />
      </Form>
    </div>
  );
}

export default EditTodoForm;
