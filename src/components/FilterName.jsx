import React, { useContext } from 'react';
import AppContext from '../context/Context';

function FilterName() {
  const {
    allPlanets,
    setData,
    filters,
    setFilters,
  } = useContext(AppContext);

  const handleChange = ({ target: { value } }) => {
    setData(allPlanets.filter((planet) => planet.name.includes(value)));
    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        filterByName: { name: value },
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Procure um planeta"
        onChange={ handleChange }
      />
    </div>
  );
}

export default FilterName;
