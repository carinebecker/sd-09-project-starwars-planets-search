import React from 'react';
import FilterByName from './FilterByName';
import FilterByNumbers from './FilterByNumbers';

const SearchBar = () => (
  <div>
    <FilterByName />
    <FilterByNumbers />
  </div>
);

export default SearchBar;
