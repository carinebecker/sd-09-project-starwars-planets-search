import React, { useContext } from 'react';
import PlanetContext from '../context/planetContext';

function FilterForm() {
  const { filterPlanetsByName, filterPlanetsByNumber,
    saveNumericInput } = useContext(PlanetContext);

  return (
    <div>
      <form>
        <input type="text" data-testid="name-filter" onChange={ filterPlanetsByName } />
        <select
          name="column"
          data-testid="column-filter"
          onChange={ saveNumericInput }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ saveNumericInput }
        >
          <option value="maior">maior que</option>
          <option value="menor">menor que</option>
          <option value="igual">igual a</option>
        </select>
        <input
          type="text"
          name="value"
          data-testid="value-filter"
          onChange={ saveNumericInput }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterPlanetsByNumber }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
