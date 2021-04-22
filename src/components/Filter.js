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

function renderListFilters(list, setFilters) {
  return list.map((filter) => (
    <div className="container-list-filters" data-testid="filter" key={ filter.column }>
      <p>{ `- ${filter.column} ${filter.comparison} ${filter.value} ` }</p>
      <button
        className="btn-delete-filter"
        onClick={ () => setFilters(list.filter((item) => item.column !== filter.column)) }
        type="button"
      >
        X
      </button>
    </div>
  ));
}

function renderFilters(setFiltersValues, filters, filtersInputs, setFiltersInputs) {
  const { column, comparison, value } = filtersInputs;
  const { filterByNumericValues } = filters;
  const listSelectColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <fieldset className="setfield-filter">
      <legend>Filters</legend>
      <div className="container-inputs">
        <label htmlFor="select-column">
          { 'Column ' }
          <select
            value={ column }
            onChange={ (evt) => setFiltersInputs(
              { ...filtersInputs, column: evt.target.value },
            ) }
            data-testid="column-filter"
            id="select-column"
          >
            { listSelectColumn
              .filter((item) => !(filterByNumericValues
                .some((filter) => filter.column === item)))
              .map((itemColumn) => <option key={ itemColumn }>{ itemColumn }</option>) }
          </select>
        </label>
        <label htmlFor="select-comparison">
          { 'Comparison ' }
          <select
            value={ comparison }
            onChange={ (evt) => setFiltersInputs(
              { ...filtersInputs, comparison: evt.target.value },
            ) }
            data-testid="comparison-filter"
            id="select-comparison"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="input-filter">
          { 'Value: '}
          <input
            value={ value }
            onChange={ (evt) => setFiltersInputs(
              { ...filtersInputs, value: evt.target.value },
            ) }
            data-testid="value-filter"
            id="input-filter"
            type="number"
          />
        </label>
        <button
          data-testid="button-filter"
          disabled={ (!column || !comparison || !value) }
          onClick={ () => {
            setFiltersValues([...filterByNumericValues, filtersInputs]);
            setFiltersInputs({
              column: listSelectColumn
                .filter((item) => !([...filterByNumericValues, filtersInputs]
                  .some((filter) => filter.column === item)))[0],
              comparison: 'maior que',
              value: '' });
          } }
          type="button"
        >
          Filtrar
        </button>
      </div>
      { renderListFilters(filterByNumericValues, setFiltersValues) }
    </fieldset>
  );
}

function Filter() {
  const [filtersInputs, setFiltersInputs] = useState(
    { column: 'population', comparison: 'maior que', value: '' },
  );
  const { setName, setFiltersValues, filters } = useContext(myContext);
  return (
    <div className="container-filters">
      { renderInputSearch(setName) }
      { renderFilters(setFiltersValues, filters, filtersInputs, setFiltersInputs) }
    </div>
  );
}

export default Filter;
