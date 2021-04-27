import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FiltersCreated() {
  const {
    filters,
  } = useContext(PlanetsContext);

  return (
    <div>
      {filters ? filters.allFilters.map((filter) => (
        <span key={ filter.column }>
          {filter.column}
          <button type="button">x</button>
        </span>
      )) : <p>nada</p>}
    </div>
  );
}

export default FiltersCreated;
