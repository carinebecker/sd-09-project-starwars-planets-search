import React, { useContext, useEffect, useState } from 'react';
import TablePlanets from './components/TablePlanets';
import myContext from './provider/StarWarsContext';

function NewApp() {
  const {
    planets,
    isLoading,
    columns,
    filter,
    filterByName,
    filterByNumericValues,
    setFilterName,
    buttonFilter,
    removeFilter,
    executeFilter,
    setFilterOrder,
  } = useContext(myContext);

  useEffect(executeFilter, [filter]);

  const isEmpty = planets.length === 0;

  const [filters, setFilters] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
  );

  const [sortFilter, setSortFilter] = useState(
    {
      column: 'name',
      sort: 'ASC',
    },
  );

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleChangeSort = ({ target }) => {
    const { name, value } = target;
    setSortFilter({
      ...sortFilter,
      [name]: value,
    });
  };

  if (isEmpty) return <p>Loading ...</p>;

  const details = Object.keys(planets[0]);
  delete details[9];

  return (
    <div>
      <section>
        <label htmlFor="filterName">
          Filter Name:
          <input
            type="text"
            id="filterName"
            name="filterName"
            value={ filterByName }
            onChange={ setFilterName }
            data-testid="name-filter"
          />
        </label>
        <label htmlFor="columnFilter">
          Column Filter:
          <select
            id="columnFilter"
            name="column"
            value={ filters.column }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            {columns.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Comparison Filter:
          <select
            id="comparisonFilter"
            name="comparison"
            value={ filters.comparison }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="valueFilter">
          Value Filter:
          <input
            type="number"
            id="valueFilter"
            name="value"
            value={ filters.value }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          onClick={ () => buttonFilter(filters) }
          data-testid="button-filter"
        >
          Button Filter
        </button>
      </section>
      <section>
        <div>
          <label htmlFor="sortColumn">
            Sort Column:
            <select
              id="sortColumn"
              name="column"
              value={ sortFilter.column }
              onChange={ handleChangeSort }
              data-testid="column-sort"
            >
              {details.map((detail) => (
                <option key={ detail } value={ detail }>{detail}</option>
              ))}
            </select>
          </label>
          <label htmlFor="radioASC">
            ASC
            <input
              type="radio"
              id="radioASC"
              value="ASC"
              name="sort"
              checked={ sortFilter.sort === 'ASC' }
              onChange={ handleChangeSort }
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="radioDESC">
            DESC
            <input
              type="radio"
              id="radioDESC"
              value="DESC"
              name="sort"
              checked={ sortFilter.sort === 'DESC' }
              onChange={ handleChangeSort }
              data-testid="column-sort-input-desc"
            />
          </label>
          <button
            type="button"
            onClick={ () => setFilterOrder(sortFilter) }
            data-testid="column-sort-button"
          >
            Sort Filter
          </button>
        </div>
      </section>
      <div>
        {filterByNumericValues.map((filterR, index) => (
          <div data-testid="filter" key={ index }>
            <p>{filterR.column}</p>
            <p>{filterR.comparison}</p>
            <p>{filterR.value}</p>
            <button
              type="button"
              onClick={ () => removeFilter(filterR) }
            >
              X
            </button>
          </div>
        ))}
      </div>
      {!isLoading && isEmpty && <h2>Did not find this planet</h2>}
      {!isLoading && !isEmpty && <TablePlanets />}
    </div>
  );
}

export default NewApp;
