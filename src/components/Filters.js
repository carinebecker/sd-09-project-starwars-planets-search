import React, { useContext } from 'react';
import { Context } from '../Context';

function Filters() {
  const { filters: { filterByNumericValues } } = useContext(Context);
  return (
    <section>
      {filterByNumericValues.map((filter, index) => (
        <p data-testid="filter" key={ `${filter}-${index}` }>
          <span>{ filter.column }</span>
          <span>{ filter.comparison }</span>
          <span>{ filter.value }</span>
          <button type="button" value={ filter }>
            X
          </button>
        </p>
      ))}
    </section>
  );
}

export default Filters;
