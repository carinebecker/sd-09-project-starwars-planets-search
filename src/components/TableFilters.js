import React from 'react';
import NameFilter from './NameFilter';
import NumericFilters from './NumericFilters';

function TableFilters() {
  return (
    <form>
      <NameFilter />
      <NumericFilters />
    </form>
  );
}

export default TableFilters;
