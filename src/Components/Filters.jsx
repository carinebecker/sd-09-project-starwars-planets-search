import React, { useContext, useState } from 'react';
import { ApiContext } from '../Context/DataApi';

function Filters() {
  const { filterName } = useContext(ApiContext);
  const [filterInputs, setFilterInputs] = useState({
    byName: '',
  });

  function handleFilterInputs({ target: { name, value } }) {
    setFilterInputs({
      ...filterInputs,
      [name]: value,
    });
    filterName(value);
  }

  return (
    <label htmlFor="filter-name">
      Filter Name:
      <input
        id="filter-name"
        name="byName"
        value={ filterInputs.byName }
        onChange={ handleFilterInputs }
        data-testid="name-filter"
      />
    </label>
  );
}

export default Filters;
