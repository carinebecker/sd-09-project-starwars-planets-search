import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Inputs() {
  const {
    changeNameToBeFiltered,
    filterPlanetsByName,
    changeNumericInfoToBeFiltered,
    handleButtonFilterClick,
    filters,
    clearFilters,
  } = useContext(StarWarsContext);

  const clearFiltersButton = (
    <button type="button" onClick={ clearFilters } data-testid="filter">
      X
    </button>
  );

  return (
    <form action="">
      <fieldset>
        <legend>Filtrar por nome</legend>
        <input
          type="text"
          name=""
          id=""
          data-testid="name-filter"
          onChange={ (event) => {
            changeNameToBeFiltered(event);
            filterPlanetsByName(event);
          } }
        />
      </fieldset>
      <fieldset>
        <legend>Filtrar por valores</legend>
        <select
          name="column"
          id=""
          data-testid="column-filter"
          onChange={ changeNumericInfoToBeFiltered }
          value={ filters.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        {clearFiltersButton}
        <select
          name="comparison"
          id=""
          data-testid="comparison-filter"
          onChange={ changeNumericInfoToBeFiltered }
          value={ filters.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        {clearFiltersButton}
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          onChange={ changeNumericInfoToBeFiltered }
          value={ filters.number }
        />
        {clearFiltersButton}
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonFilterClick }
        >
          Filtrar
        </button>
      </fieldset>
    </form>
  );
}

export default Inputs;
