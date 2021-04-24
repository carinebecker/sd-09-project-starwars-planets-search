import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const FilterInput = () => {
  const { handleFilter } = useContext(PlanetsContext);

  return (
    <label htmlFor="name-filter">
      Filtrar:
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target }) => handleFilter(target) }
      />
    </label>
  );
};

export default FilterInput;
