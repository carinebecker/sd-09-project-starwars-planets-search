import React, { useContext } from 'react';
import PlanetContext from '../context/planetContext';

function FilterForm() {
  const { filterPlanetsByName, filterPlanetsByNumber } = useContext(PlanetContext);

  return (
    <div>
      <form onSubmit={ filterPlanetsByNumber }>
        <input type="text" data-testid="name-filter" onChange={ filterPlanetsByName } />
        <select name="column-filter" data-testid="column-filter">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select name="comparison-filter" data-testid="comparison-filter">
          <option value="maior">maior que</option>
          <option value="menor">menor que</option>
          <option value="igual">igual a</option>
        </select>
        <input type="text" name="value-filter" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">Buscar</button>
      </form>
    </div>
  );
}

export default FilterForm;
