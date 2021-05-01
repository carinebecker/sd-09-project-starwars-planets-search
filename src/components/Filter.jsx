import React from 'react';
import { useFilters } from '../context/Planets';

const handleInputChange = (event, key, setFilters) => {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;

  setFilters({
    [name]: { [key]: value },
  });
};

const Filter = () => {
  const { setFilters } = useFilters();
  return (
    <input
      name="filterByName"
      placeholder="Filter by Name"
      onChange={ (event) => handleInputChange(event, 'name', setFilters) }
      data-testid="name-filter"
    />
  );
};

export default Filter;
