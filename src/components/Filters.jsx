import React, { useContext } from 'react';

import FilterByName from './FilterByName';
import FilterByValue from './FilterByValue';
import FilterByColumn from './FilterByColumn';
import FilterByComparison from './FilterByComparison';
import StarWars from '../context/StarWarsContext';

const Filters = () => {
  const { setFilters, filterValue, filterColumn,
    filterComparison } = useContext(StarWars);

  const addFilters = () => {
    setFilters({
      filters: {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [
          {
            column: filterColumn,
            comparison: filterComparison,
            value: filterValue,
          },
        ],
      },
    });
  };

  return (
    <div>
      <FilterByName />
      <FilterByColumn />
      <FilterByComparison />
      <FilterByValue />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilters }
      >
        Adicionar Filtro
      </button>
    </div>
  );
};

export default Filters;
