import React, { useContext } from 'react';
import SWContext from '../StarWarsContext';

function TableFilters() {
  const context = useContext(SWContext);
  const { setFilters } = context;

  const handleNameFilter = ({ target }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByName: {
        name: target.value,
      },
    }));
  };

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (event) => handleNameFilter(event) }
      />
    </form>
  );
}

export default TableFilters;
