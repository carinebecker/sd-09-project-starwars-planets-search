import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function NumericFilters() {
const { filterTypes } = useContext(StarwarsContext);
const { filters: { filterByNumericValues } } = filterTypes;
// console.log(filterByNumericValues);
  return (
    <section>
      {filterByNumericValues.map(({ column, comparison, value }, index) => (
        <div key={ index }>
          <span>{`${column}, ${comparison} ${value} `}</span>
          <button>X</button>
        </div>
      ))}
    </section>
  );
}

export default NumericFilters;
