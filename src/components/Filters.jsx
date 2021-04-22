import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { setFilters } = useContext(MyContext);

  function handleInput({ target }) {
    setFilters({
      filterByName: {
        name: target.value,
      },
    });
  }
  return (
    <div>
      <label htmlFor="name-filter">
        Filter By Name:
        <input
          type="text"
          id="name-filter"
          placeholder="filter by name..."
          data-testid="name-filter"
          onChange={ handleInput }
        />
      </label>
    </div>
  );
}

export default Filters;
