import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputSearch() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ target }) => {
    setInputValue(target.value);
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <section>
      <input
        type="text"
        placeholder="Enter the planet name"
        value={ inputValue }
        onChange={ handleChange }
        data-testid="name-filter"
      />
    </section>
  );
}

export default InputSearch;
