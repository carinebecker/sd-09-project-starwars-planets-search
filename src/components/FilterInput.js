import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterInput() {
  const { setFilteredContent, filteredContent } = useContext(StarwarsContext);
  function HandleChange({ target }) {
    setFilteredContent({
      ...filteredContent,
      filterByName: {
        name: target.value,
      },
    });
  }
  return (
    <input type="text" data-testid="name-filter" onChange={ HandleChange } />
  );
}

export default FilterInput;
