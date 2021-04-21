import React, { useState, useContext } from 'react';
import context from '../context/context';

const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_FILTER = {
  column: '',
  comparison: '',
  value: '',
};

function FilterByNumber() {
  const { setFilter, filter } = useContext(context);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [numberFilters, setNumberFilters] = useState(INITIAL_FILTER);

  const handleChange = ({ target }) => {
    const newFilter = { ...numberFilters, [target.name]: target.value };
    setNumberFilters(newFilter);
  };

  const renderSelectColumn = () => (
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

  const renderSelectComparison = () => (
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

  const filterSetter = (fil, change = false) => {
    let numeric = [
      ...filter.filters.filterByNumericValues,
      fil,
    ];
    if (change) numeric = [fil];
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        filterByNumericValues: numeric,
      },
    });
  };

  const handleClick = () => {
    filterSetter(numberFilters);
    setColumns(columns.filter((column) => column !== numberFilters.column));
  };

  const handleColumns = (column) => {
    const newColumns = [...columns, column];
    setColumns(INITIAL_COLUMNS.filter((col) => newColumns.includes(col)));
    const newFilter = filter.filters.filterByNumericValues.filter((fil) => (
      fil.column !== column));
    if (newFilter.length > 0) filterSetter(newFilter, true);
    else filterSetter(INITIAL_FILTER, true);
  };

  const getFilters = () => (
    filter.filters.filterByNumericValues.map(({ column, comparison, value }) => (
      <div key={ column } data-testid="filter">
        <h4>Filtro</h4>
        <p>{ column }</p>
        <p>{ comparison }</p>
        <p>{ value }</p>
        <button type="button" onClick={ () => handleColumns(column) }>X</button>
      </div>
    ))
  );

  const arrayFilter = filter.filters.filterByNumericValues;

  return (
    <section>
      { renderSelectColumn() }
      { renderSelectComparison() }
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      { arrayFilter.length > 0 && getFilters() }
    </section>
  );
}

export default FilterByNumber;
