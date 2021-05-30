import React from 'react';
import Context from '../context/Context';

export default function Filters() {
  const { filters, removeFilter } = useContext(Context);
  const { filterByNumericValues } = filters;

  return (
    <section className="filters">
      {filterByNumericValues.map((filter, index) => (
        <p data-testid="filter" className="filter" key={ `${filter}-${index}` }>
          <span>{ filter.column }</span>
          <span>{ filter.comparison }</span>
          <span>{ filter.value }</span>
          <button type="button" value={ filter } onClick={ () => removeFilter(filter) }>
            X
          </button>
        </p>
      ))}
    </section>
  );
}
