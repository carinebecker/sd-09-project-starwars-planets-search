import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function FilterDelete() {
  const { filters, setFilters } = useContext(starWarsContext);
  const { filterByNumericValues } = filters;

  function handleClick(column, comparsion, value) {
    const filterRemoved = filterByNumericValues
      .filter((filter) => (filter.column !== column)
         || (filter.comparsion !== comparsion)
         || (filter.value !== value));
    setFilters({
      ...filters,
      filterByNumericValues: [...filterRemoved],
    });
  }

  function showFiltersInserted() {
    const filterMapRender = filterByNumericValues.map((filter, index) => (
      <p key={ index } data-testid="filter">
        {`${filter.column} ${filter.comparsion} ${filter.value}`}
        <button
          type="button"
          onClick={ () => handleClick(filter.column, filter.comparsion, filter.value) }
        >
          X
        </button>
      </p>
    ));
    if (filterByNumericValues.length > 0) {
      return filterMapRender;
    }
  }

  return (
    <fieldset>
      <legend>Deletar Filtros</legend>
      {showFiltersInserted()}
    </fieldset>
  );
}

export default FilterDelete;
