import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const ActiveFilters = () => {
  const { filterByValues,
    setFilterByValues } = useContext(StarWarsContext);
  function removeFilter(filtered) {
    setFilterByValues(filterByValues.filter((filter) => filter !== filtered));
  }

  const renderActiveFilters = () => (
    <fieldset>
      <legend>Filtros adicionados</legend>
      <ul>
        {filterByValues.map((filter, index) => (
          <li
            data-testid="filter"
            key={ index }
          >
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              type="button"
              onClick={ () => removeFilter(filter) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );

  return (
    <div>
      {filterByValues.length > 0 && renderActiveFilters()}
    </div>
  );
};

export default ActiveFilters;
