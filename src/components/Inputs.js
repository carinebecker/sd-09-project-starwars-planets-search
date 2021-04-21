import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Inputs() {
  const { filterPlanets } = useContext(MyContext);
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por nome"
        onChange={ filterPlanets }
      />
    </div>
  );
}

export default Inputs;
