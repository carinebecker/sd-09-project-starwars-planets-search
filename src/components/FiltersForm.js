import React, { useContext } from 'react';
import PlanetContext from '../context/planetContext';

function FilterForm() {
  const { filterPlanetsByName, filterPlanetsByNumber,
    setSaveColumn, setSaveComparison,
    setSaveValue } = useContext(PlanetContext);

  return (
    <div>
      <form onSubmit={ filterPlanetsByNumber }>
        <input type="text" data-testid="name-filter" onChange={ filterPlanetsByName } />
        <select
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => setSaveColumn(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setSaveComparison(target.value) }
        >
          <option value="maior">maior que</option>
          <option value="menor">menor que</option>
          <option value="igual">igual a</option>
        </select>
        <input
          type="text"
          name="value-filter"
          data-testid="value-filter"
          onChange={ ({ target }) => setSaveValue(target.value) }
        />
        <button type="submit" data-testid="button-filter">Buscar</button>
      </form>
    </div>
  );
}

export default FilterForm;
