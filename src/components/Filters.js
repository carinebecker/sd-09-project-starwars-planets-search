import React, { useContext } from 'react';
import { Context } from '../context/Provider';

export default function Filters() {
  const { filters } = useContext(Context);
  const { filterByNumericValues } = filters;

  console.log(filters);
  return (
    <section>
      {filterByNumericValues.length && filterByNumericValues.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          <span>{filter.column}</span>
          <span>{filter.comparison}</span>
          <span>{filter.value}</span>
          <button type="button">x</button>
        </div>
      ))}
    </section>
  );
}
