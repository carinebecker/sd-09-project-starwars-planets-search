import React, { useContext } from 'react';
import { Context } from '../context/Provider';

export default function Filters() {
  const { filters, setFilters } = useContext(Context);
  const { filterByNumericValues } = filters;

  function handleClick(column) {
    const filterToDelet = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilters({ ...filters, filterByNumericValues: filterToDelet });
  }

  return (
    <section>
      {filterByNumericValues.length && filterByNumericValues.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          <span>{filter.column}</span>
          <span>{filter.comparison}</span>
          <span>{filter.value}</span>
          <button type="button" onClick={ () => handleClick(filter.column) }>x</button>
        </div>
      ))}
    </section>
  );
}
