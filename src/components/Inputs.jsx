import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Inputs() {
  const { setFilters } = useContext(TableContext);
  function inputNameHandleChange({ target }) {
    setFilters(
      {
        filterByName: {
          name: target.value,
        },
      },
    );
  }
  return (
    <form>
      <label htmlFor="name-filter">
        Nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ inputNameHandleChange }
        />
      </label>
    </form>
  );
}

export default Inputs;
