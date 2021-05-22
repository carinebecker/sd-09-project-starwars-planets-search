import React from 'react';
import NumericFilters from './NumericFilters';
import NumericFilOptions from './NumericFilOptions';
import TextFilter from './TextFilter';

function SearchBar() {
  return (
    <main>
      <TextFilter />
      <NumericFilOptions />
      <NumericFilters />
    </main>
  );
}

export default SearchBar;
