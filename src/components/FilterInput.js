import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const FilterInput = () => {
  const {
    handleNameFilter,
    addNumericFilter,
    activeFilters,
    selectedFilter,
    handleChange,
  } = useContext(PlanetsContext);

  let columnFilterList = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  if (activeFilters.length > 0) {
    columnFilterList = columnFilterList.filter(
      (columnFilter) => !activeFilters.includes(columnFilter),
    );
  }

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
          onChange={ ({ target }) => handleChange(target) }
          defaultValue={ selectedFilter.column }
        >
          { columnFilterList.map((columnFilter) => (
            <option key={ columnFilter } value={ columnFilter }>
              { columnFilter }
            </option>
          )) }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => handleChange(target) }
          value={ selectedFilter.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          placeholder="0"
          min="0"
          onChange={ ({ target }) => handleChange(target) }
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
