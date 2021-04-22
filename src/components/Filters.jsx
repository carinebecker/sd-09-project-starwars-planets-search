import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Filters.css';

function Filters() {
  const { handleChange, handleDropdown } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="filter-name">
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          id="nameInput"
          onChange={ ({ target }) => handleChange(target) }
          placeholder="Search for text..."
        />
      </label>

      <label htmlFor="filter-column">
        <select
          data-testid="column-filter"
          name="column"
          id="filter-column"
          onClick={ ({ target }) => handleDropdown(target) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="filter-comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="filter-comparison"
          onClick={ ({ target }) => handleDropdown(target) }
        >
          <option value="menor que">menor que</option>
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="filter-value">
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="filter-value"
          min="0"
          onChange={ ({ target }) => handleChange(target) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        id="filter-button"
      >
        Filter
      </button>
    </div>
  );
}

export default Filters;
