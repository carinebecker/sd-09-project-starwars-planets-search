import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filterByName } = useContext(StarWarsContext);
  const [filterInputs, setFilterInputs] = useState({
    byName: '',
  });

  function handleFilterInputs({ target: { name, value } }) {
    setFilterInputs({
      ...filterInputs,
      [name]: value,
    });
    filterByName(value);
  }

  return (
    <label htmlFor="filter-by-name">
      Filter by Name:
      <input
        id="filter-by-name"
        name="byName"
        value={ filterInputs.byName }
        onChange={ handleFilterInputs }
        data-testid="name-filter"
      />
    </label>
  );
}

export default Filters;
