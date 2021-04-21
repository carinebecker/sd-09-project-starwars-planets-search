import React, { useContext, useState } from 'react';
import myContext from '../context/contextAPI';

function renderInputSearch(setName) {
  return (
    <label htmlFor="inputSearch">
      { 'Search: ' }
      <input
        data-testid="name-filter"
        id="inputSearch"
        onChange={ (evt) => setName(evt.target.value) }
        placeholder="Insert Planet"
      />
    </label>
  );
}

function renderFilters(setFiltersValues, filters, setFilters) {
  return (
    <fieldset className="setfield-filter">
      <legend>Filtros</legend>
      <label htmlFor="select-column">
        { 'Coluna: ' }
        <select
          onChange={ (evt) => setFilters(
            { ...filters, column: evt.target.value },
          ) }
          data-testid="column-filter"
          id="select-column"
        >
          <option>{ null }</option>
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="select-comparison">
        { 'Comparação: ' }
        <select
          onChange={ (evt) => setFilters(
            { ...filters, comparison: evt.target.value },
          ) }
          data-testid="comparison-filter"
          id="select-comparison"
        >
          <option>{ null }</option>
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="input-filter">
        { 'Value: '}
        <input
          onChange={ (evt) => setFilters(
            { ...filters, value: evt.target.value },
          ) }
          data-testid="value-filter"
          id="input-filter"
          type="number"
        />
      </label>
      <button
        data-testid="button-filter"
        onClick={ () => setFiltersValues(filters) }
        type="button"
      >
        Filtrar
      </button>
    </fieldset>
  );
}

function Filter() {
  const [filters, setFilters] = useState({ column: '', comparison: '', value: '' });
  const { setName, setFiltersValues } = useContext(myContext);
  return (
    <div className="container-filters">
      { renderInputSearch(setName) }
      { renderFilters(setFiltersValues, filters, setFilters) }
    </div>
  );
}

export default Filter;
