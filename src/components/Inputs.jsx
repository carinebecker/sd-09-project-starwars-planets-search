import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
// import useFilter from '../effects/useFilter';

function Inputs() {
  const { filters, setFilters } = useContext(SWContext);
  return (
    <label htmlFor="name-input">
      Filter by name:
      <input
        id="name-input"
        data-testid="name-filter"
        value={ filters.filters.filterByName.name }
        onChange={
          ({ target: { value } }) => (
            setFilters({ filters: { filterByName: { name: value } } }))
        }
      />
    </label>
  );
}

export default Inputs;
