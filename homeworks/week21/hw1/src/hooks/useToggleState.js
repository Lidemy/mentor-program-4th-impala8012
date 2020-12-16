/* eslint-disable import/no-unresolved */
import { useState } from 'react';

function useToggle(initialVal = false) {
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };
  // 回傳 state 還有 toggle function
  return [state, toggle];
}

export default useToggle;
