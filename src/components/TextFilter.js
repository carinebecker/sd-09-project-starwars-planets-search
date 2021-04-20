import React, { useContext } from 'react';
import { Context } from '../context/Provider';

const TextFilter = () => {
  const { filters, setFilters } = useContext(Context);
  const { filterByName: { name } } = filters;

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: { name: target.value },
    });
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Planet Name"
      value={ name }
      onChange={ handleChange }
    />
  );
};

export default TextFilter;
