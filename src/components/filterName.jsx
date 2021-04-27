import React, { useContext } from 'react';
import AppContext from '../context';

const FilterName = () => {
  const { handleChange } = useContext(AppContext);

  return (
    <label htmlFor="filter-name">
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        onChange={ ({ target }) => handleChange(target) }
        placeholder="Search for a planet..."
      />
    </label>
  );
};

export default FilterName;
