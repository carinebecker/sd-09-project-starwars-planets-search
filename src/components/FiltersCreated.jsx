import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FiltersCreated() {
  const {
    // data,
    // filteredPlanets,
    // setFilteredPlanets,
    filters,
    // setFilters,
  } = useContext(PlanetsContext);

  // const handleClickRemoveFilter = ({ target }) => {
  //   target.parentElement.innerText = '';
  //   console.log('implementar logica!!', target.parentElement.innerText);
  // };

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
