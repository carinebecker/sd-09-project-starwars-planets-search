import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';

const Search = () => {
  const context = useContext(PlanetSearchContext);
  return (
    <div>Search bar</div>
  );
};

export default Search;
