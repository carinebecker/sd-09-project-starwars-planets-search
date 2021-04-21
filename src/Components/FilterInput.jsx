import React, { useContext } from 'react';
import fetchApiPlanetsContext from '../contexts/ApiContext/fetchApiPlanetsContext';

export default function FilterInput() {
  const { handleChange } = useContext(fetchApiPlanetsContext);

  return (
    <label htmlFor="name-filter">
      <input
        name="name"
        onChange={ handleChange }
        id="name-filter"
        data-testid="name-filter"
        type="text"
      />
    </label>
  );
}
