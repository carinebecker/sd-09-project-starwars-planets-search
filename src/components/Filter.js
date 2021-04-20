import React, { useContext } from 'react';
import myContext from '../context/contextAPI';

function Filter() {
  const { setName } = useContext(myContext);
  return (
    <div>
      <label htmlFor="inputSearch">
        { 'Search: ' }
        <input
          data-testid="name-filter"
          id="inputSearch"
          onChange={ (evt) => setName(evt.target.value) }
          placeholder="Insert Planet"
        />
      </label>
    </div>
  );
}

export default Filter;
