import React, { useContext } from 'react';
import { SwPlanetsContext } from '../context/SWPlanetsContext';

function Form() {
  const {
    filters,
    filters: { filterByName: { name } },
    setFilters,
  } = useContext(SwPlanetsContext);

  function handleChange({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        name="filter"
        value={ name }
        onChange={ handleChange }
      />
    </form>
  );
}

export default Form;
