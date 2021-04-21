import React, { useContext } from 'react';
import fetchApiPlanetsContext from '../contexts/ApiContext/fetchApiPlanetsContext';

export default function FilterPopulation() {
  const { handleChange, handleClickFilterByNumber } = useContext(fetchApiPlanetsContext);

  return (
    <>
      <label htmlFor="column-filter">
        <select
          name="column"
          onChange={ handleChange }
          id="column-filter"
          data-testid="column-filter"
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison"
          onChange={ handleChange }
          id="comparison-filter"
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          name="value"
          onChange={ handleChange }
          id="value-filter"
          data-testid="value-filter"
          type="number"
        />
      </label>
      <button
        onClick={ handleClickFilterByNumber }
        data-testid="button-filter"
        type="button"
      >
        Filtrar

      </button>
    </>
  );
}
