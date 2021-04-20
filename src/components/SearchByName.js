import React from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchByName() {
  return (
    <PlanetsContext.Consumer>
      {({ filters, setFilters }) => {
        function handleChange({ target: { value } }) {
          setFilters({ ...filters, ...{ filterByName: { name: value } } });
        }
        return (
          <label htmlFor="searchName">
            <input
              type="text"
              id="searchName"
              data-testid="name-filter"
              onChange={ handleChange }
              placeholder="Search by name"
            />
          </label>
        );
      }}
    </PlanetsContext.Consumer>
  );
}

export default SearchByName;
