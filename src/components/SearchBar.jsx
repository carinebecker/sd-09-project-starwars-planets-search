import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

const SearchBar = () => {
  const { filter } = useContext(SWContext);

  return (
    <input
      data-testid="name-filter"
      onChange={ (event) => filter(event) }
      name="name"
      type="text"
    />
  );
};

export default SearchBar;
