import React from 'react';
import useNumericFilters from '../../hooks/useNumericFilters';

const DropFilters = ({ filters }) => {
  const { deleteNumericFilter } = useNumericFilters();
  return filters.map(({ column, comparison, numericSearchTerm }, index) => (
    <div key={ numericSearchTerm + index } data-testid="filter">
      <p>{column}</p>
      <p>{comparison}</p>
      <p>{numericSearchTerm}</p>
      <button type="button" onClick={ () => deleteNumericFilter(column) }>
        X
      </button>
    </div>
  ));
};

export default DropFilters;
