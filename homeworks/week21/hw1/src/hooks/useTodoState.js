/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
import { useState, useRef } from 'react';

const useTodoState = (initailTodos) => {
  const [todos, setTodos] = useState(initailTodos);
  const [filter, setFilter] = useState('all');
  const id = useRef(1);
  const addTodo = (newTodoText) => {
    if (newTodoText === '') return;
    console.log(id);
    // 更新
    setTodos([
      ...todos,
      { id: id.current++, task: newTodoText, completed: false },
    ]);
  };

  // 刪除
  const removeTodo = (todoId) => {
    // 把要移除的todo filter out
    const updatedTodo = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodo);
  };

  const toggleTodo = (todoId) => {
    const UpdatedTodo = todos.map(todo => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
    setTodos(UpdatedTodo);
  };

  const editTodo = (todoId, newTask) => {
    const UpdatedTodo = todos.map(todo => (todo.id === todoId ? { ...todo, task: newTask } : todo));
    setTodos(UpdatedTodo);
  };

  const showAllTodo = () => setFilter('all');
  const showCompletedTodo = () => setFilter('completed');
  const showIncompletedTodo = () => setFilter('incompleted');
  const clearAll = () => setTodos([]);

  return {
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
  };
};

export default useTodoState;
