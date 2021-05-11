/* eslint-disable indent */
import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filtered, setFilterName } = useContext(Context);

  return (
    <div>
      <label htmlFor="filterName">
        Filtrar por Nome:
        <br />
        <input
          className="filterName"
          data-testid="name-filter"
          id="filterName"
          onChange={ setFilterName }
          type="text"
          value={ filtered.filters.filterByName.name }
        />
      </label>
    </div>
  );
}

export default Filters;
