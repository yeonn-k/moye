import { useState } from 'react';

const useInputValue = (initial: string = '') => {
  const [inputValue, setInputValue] = useState(initial);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return [inputValue, handleInputChange] as const;
};

export default useInputValue;
