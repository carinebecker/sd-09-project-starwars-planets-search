import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';

export default function Filters() {
  const { filters, fetchPlanetsFromApi,
    setFilterByNumericValues } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;
  function handleClick(positionFilter) {
    fetchPlanetsFromApi();
    setFilterByNumericValues((prev) => (
      prev
        .filter((_, index) => index !== positionFilter)));
  }

  return (
    filterByNumericValues.length > 0
      ? filterByNumericValues.map((elem, index) => (
        <section
          key={ index }
          className="filtersCard"
        >
          <section>
            {`${elem.column} | ${elem.comparison} | ${elem.value}`}
          </section>
          <button
            onClick={ () => handleClick(index) }
            type="button"
            data-testid="filter"
          >
            X
          </button>
        </section>
      ))
      : <p className="filtersCard">No filter</p>
  );
}
