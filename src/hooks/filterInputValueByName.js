import { useState } from 'react';

const useInputValue = () => {
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  const filterInputValueByName = (event) => {
    const { value, name } = event.target;
    setFilters({ ...filters, filterByName: { [name]: value } });
  };
  return [filters, filterInputValueByName];
};

export default useInputValue;
