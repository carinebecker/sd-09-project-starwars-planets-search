import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';


function FiltersCreated() {
  const {
    data,
    filteredPlanets,
    setFilteredPlanets,
    filters,
    setFilters,
  } = useContext(PlanetsContext);

  const handleClickRemoveFilter = ({ target }) => {
    console.log(target);
    // ver target.parentNode -> escrever função para remover da lista
  };

  return (
    <div>
      {filters ? filters.allFilters.map((filter) => (
        <span key={ filter.column }>
          {filter.column}
          <button type="button" onClick={ handleClickRemoveFilter }>x</button>
        </span>
      )) : <p>nada</p>}
    </div>
  );
}

export default FiltersCreated;
