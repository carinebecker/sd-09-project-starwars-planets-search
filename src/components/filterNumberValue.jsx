import React, { useContext, useState } from 'react';
import AppContext from '../context';

const FilterNumberValue = () => {
  const { handleDropdown } = useContext(AppContext);
  const initialState = {
    column: '',
    comparison: '',
    value: '',
  };
  const [filter, setFilter] = useState(initialState);

  const columnFilter = (target) => {
    setFilter((prevState) => ({
      ...prevState,
      column: target,
    }));
  };

  const compareFilter = (target) => {
    setFilter((prevState) => ({
      ...prevState,
      comparison: target,
    }));
  };

  const numberFilter = (target) => {
    setFilter((prevState) => ({
      ...prevState,
      value: target,
    }));
  };

  const dofilter = () => {
    handleDropdown(filter);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        id="filter-column"
        onClick={ ({ target }) => columnFilter(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="compare"
        onClick={ ({ target }) => compareFilter(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        onClick={ ({ target }) => numberFilter(target.value) }
      />

      <button
        data-testid="button-filter"
        onClick={ () => dofilter() }
        type="button"
      >
        Filtrar
      </button>
    </div>
  );
};

export default FilterNumberValue;
