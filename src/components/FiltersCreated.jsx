import React, { useContext } from 'react';
import AppContext from '../context/Context';

function FiltersCreated() {
  const { allFilters } = useContext(AppContext);
  const { filters: { filterByNumericValues } } = allFilters;

  return (
    <div>
      {filterByNumericValues && filterByNumericValues
        .map(({ column, comparison, value }, index) => (
          <button type="button" key={ index }>
            <span>{`${column} | ${comparison} | ${value}`}</span>
            <span>X</span>
          </button>
        ))}
    </div>
  );
}

export default FiltersCreated;
