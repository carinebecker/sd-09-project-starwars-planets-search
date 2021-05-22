import React from 'react';
import NumericFilters from './NumericFilters';
import NumericFilOptions from './NumericFilOptions';
import TextFilter from './TextFilter';
import OrdersOptions from './OrdersOptions';

function SearchBar() {
  return (
    <main>
      <TextFilter />
      <NumericFilOptions />
      <NumericFilters />
      <OrdersOptions />
    </main>
  );
}

export default SearchBar;
