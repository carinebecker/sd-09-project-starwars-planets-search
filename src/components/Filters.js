import React, { useState, useContext } from 'react';
import context from '../context/context';

const INITIAL_HEADERS = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const INITIAL_FILTERS = {
  column: '',
  comparison: '',
  value: '',
};

function Filters() {
  const { setFilter, filter } = useContext(context);
  const [columns, setColumns] = useState(INITIAL_HEADERS);
  const [numberFilters, setNumberFilters] = useState(INITIAL_FILTERS);

  const filterHandler = ({ target }) => {
    setFilter({
      ...filter,
      filters: {
        ...filter.filters, filterByName: { name: target.value },
      },
    });
  };

  const handleChange = ({ target }) => {
    const newFilter = { ...numberFilters, [target.name]: target.value };
    setNumberFilters(newFilter);
  };

  const createColumns = () => (
    <select
      data-testid="column-filter"
      name="column"
      onChange={ handleChange }
    >
      { columns.map((column) => (
        <option key={ column }>{ column }</option>
      )) }
    </select>
  );

  const createComparison = () => (
    <select
      data-testid="comparison-filter"
      name="comparison"
      onChange={ handleChange }
    >
      <option>maior que</option>
      <option>menor que</option>
      <option>igual a</option>
    </select>
  );

  const filterSetter = (value, change = false) => {
    let num = [
      ...filter.filters.filterByNumericValues,
      value,
    ];
    if (change) num = [value];
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        filterByNumericValues: num,
      },
    });
  };

  const clickHandler = () => {
    filterSetter(numberFilters);
    setColumns(columns.filter((column) => column !== numberFilters.column));
  };

  const handleColumns = (column) => {
    const newColumns = [...columns, column];
    setColumns(INITIAL_HEADERS.filter((col) => newColumns.includes(col)));
    const newFilter = filter.filters.filterByNumericValues.filter((fil) => (
      fil.column !== column));
    if (newFilter.length > 0) filterSetter(newFilter, true);
    else filterSetter(INITIAL_FILTERS, true);
  };

  const createFilter = () => (
    filter.filters.filterByNumericValues.map(({ column, comparison, value }) => (
      <div className="appliedFilter" key={ column } data-testid="filter">
        <p>Filtro</p>
        <p>{ column }</p>
        <p>{ comparison }</p>
        <p>{ value }</p>
        <button type="button" onClick={ () => handleColumns(column) }>X</button>
      </div>
    ))
  );

  const arrayFilter = filter.filters.filterByNumericValues;

  return (
    <div className="filters">
      <input
        type="text"
        data-testid="name-filter"
        onChange={ filterHandler }
      />
      <form>
        { createColumns() }
        { createComparison() }
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ clickHandler }
        >
          Search
        </button>
        { arrayFilter.length > 0 && createFilter() }
      </form>
    </div>
  );
}

export default Filters;
