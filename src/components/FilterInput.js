import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterInput() {
  const { setFilteredByName } = useContext(StarwarsContext);
  function HandleChange({ target }) {
    setFilteredByName({
      filters: {
        filterByName: {
          name: target.value,
        },
      },
    });
  }
  return (
    <input type="text" data-testid="name-filter" onChange={ HandleChange } />
  );
}

export default FilterInput;
