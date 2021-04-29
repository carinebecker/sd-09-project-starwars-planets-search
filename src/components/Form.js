import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { namePlanets, handleNamePlanets, columnsOptions, comparisonOptions,
    preferenceFilter, handlePreferenceFilter,
    handleClickFilter } = useContext(PlanetsContext);
  return (
    <form>
      <label htmlFor="name-filter" className="label">
        Nome:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          value={ namePlanets }
          onChange={ handleNamePlanets }
          className="input"
        />
      </label>
      <label htmlFor="column-filter" className="label">
        Filtro de coluna:
        <select
          name="columnFilter"
          id="column-filter"
          data-testid="column-filter"
          value={ preferenceFilter.column }
          onChange={ handlePreferenceFilter }
          className="select"
        >
          {columnsOptions
            .map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>))}
        </select>
      </label>
      <label htmlFor="comparison-filter" className="label">
        Filtro de Comparação:
        <select
          name="comparisonFilter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ preferenceFilter.comparison }
          onChange={ handlePreferenceFilter }
          className="select"
        >
          {comparisonOptions
            .map((column, index) => (
              <option key={ index } value={ column }>{column}</option>))}
        </select>
      </label>
      <label htmlFor="value-filter" className="label">
        Filtro de valor:
        <input
          type="number"
          name="valueFilter"
          id="value-filter"
          data-testid="value-filter"
          value={ preferenceFilter.value }
          onChange={ handlePreferenceFilter }
          className="input is-small"
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ handleClickFilter }>
        Filtrar
      </button>
    </form>
  );
}

export default Form;
