import React, { useContext } from 'react';
import { ContextPlanets } from '../../context/PlanetsContext';

function Filters() {
  const { filterByName } = useContext(ContextPlanets);

  const handleChange = ({ target: { value } }) => {
    filterByName(value);
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Digite um nome"
      onChange={ handleChange }
    />
  );
}

export default Filters;
