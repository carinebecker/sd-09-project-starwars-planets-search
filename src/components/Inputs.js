import React, { useContext } from 'react';
import planetsContext from '../context/Context';

function Input() {
  const { filterPlanets, filterOptions, filterByNumber } = useContext(planetsContext);
  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          name="name"
          type="text"
          onChange={ filterPlanets }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ filterOptions }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ filterOptions }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          data-testid="value-filter"
          name="number"
          onChange={ filterOptions }
        />
      </div>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterByNumber }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Input;
