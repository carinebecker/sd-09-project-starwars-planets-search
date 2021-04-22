import React, { useState, useEffect } from 'react';

const defaultFilters = {
  filters:
  {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: 'maior que',
        value: '',
      },
    ],
  },
};

function InputFilters() {
  const [inputValue, setInputValue] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  useEffect(() => {
    const filterByName = () => {
      const filter = { ...filters, filterByName: { name: inputValue },
      };
      setFilters(filter);
    };

    filterByName();
  });

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ inputValue }
      onChange={ handleChange }
    />
  );
}

export default InputFilters;
