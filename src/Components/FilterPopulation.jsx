import React, { useContext } from 'react';
import fetchApiPlanetsContext from '../contexts/ApiContext/fetchApiPlanetsContext';

export default function FilterPopulation() {
  const one = 1;
  const { handleChange, handleClickFilterByNumber, checkFilters, handleClickResetFilters,
  } = useContext(fetchApiPlanetsContext);

  const options = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const filters = checkFilters.map(({ column }) => column);

  const filteredOptions = options.filter((option) => filters.indexOf(option) === -(one));

  return (
    <>
      <button
        onClick={ handleClickResetFilters }
        data-testid="filter"
        type="button"
      >
        x
      </button>
      <label htmlFor="column-filter">
        <select
          name="column"
          onChange={ handleChange }
          id="column-filter"
          data-testid="column-filter"
        >
          {filteredOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
      <button
        onClick={ handleClickResetFilters }
        data-testid="filter"
        type="button"
      >
        x
      </button>
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
      <button
        onClick={ handleClickResetFilters }
        data-testid="filter"
        type="button"
      >
        x
      </button>
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
