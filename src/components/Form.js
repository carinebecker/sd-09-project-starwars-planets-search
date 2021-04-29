import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { namePlanets, handleNamePlanets } = useContext(PlanetsContext);
  return (
    <label htmlFor="name-filter">
      Name:
      <input
        type="text"
        id="name-filter"
        data-testid="name-filter"
        name={ namePlanets }
        onChange={ handleNamePlanets }
      />
    </label>
  );
}

export default Form;
