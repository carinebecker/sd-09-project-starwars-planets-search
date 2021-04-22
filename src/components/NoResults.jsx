import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NoResults() {
  const { setFilter, filters } = useContext(PlanetsContext);
  return (
    <>
      <h1>Nothing to see here ...</h1>
      <input
        type="search"
        placeholder="Filter by Name"
        // data-testid="name-filter"
        onChange={ (event) => setFilter({
          ...filters, filterByName: event.target.value,
        }) }
      />
    </>
  );
}
