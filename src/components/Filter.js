import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { handleName } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      type="text"
      placeholder="Filtrar por Nome"
      onChange={ handleName }
    />
  );
}

export default Filter;
