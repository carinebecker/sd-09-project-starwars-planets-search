import React, { useContext } from 'react';
import planetsContext from '../context/Context';

function Input() {
  const { filterPlanets } = useContext(planetsContext);
  return (
    <div>
      <label htmlFor="filter">
        <input
          data-testid="name-filter"
          id="filter"
          type="text"
          onChange={ filterPlanets }
        />
      </label>
    </div>
  );
}

export default Input;
