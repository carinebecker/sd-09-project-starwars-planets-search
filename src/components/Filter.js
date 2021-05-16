import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const context = useContext(StarWarsContext);
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diametr</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
    </div>
  );
}
