import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const FilterInput = () => {
  const {
    handleNameFilter,
    createNumericFilter,
    addNumericFilter,
  } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="name-filter">
        Filtrar por nome:
        <input
          data-testid="name-filter"
          type="text"
          name="name-filter"
          onChange={ ({ target }) => handleNameFilter(target) }
        />
      </label>
      <label htmlFor="column-filter">
        Filtrar por coluna:
        <select
          data-testid="column-filter"
          name="column"
          onChange={ ({ target }) => createNumericFilter(target) }
          defaultValue="coluna"
        >
          <option disabled hidden>coluna</option>
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => createNumericFilter(target) }
          defaultValue="comparação"
        >
          <option disabled hidden>comparação</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          placeholder="0"
          min="0"
          onChange={ ({ target }) => createNumericFilter(target) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ addNumericFilter }
        >
          Filtrar
        </button>
      </label>
    </div>
  );
};

export default FilterInput;
