/* eslint-disable import/no-unresolved */
import { useState } from 'react';

const useInputState = (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue('');
  };
  return [value, handleChange, reset];
};

export default useInputState;
