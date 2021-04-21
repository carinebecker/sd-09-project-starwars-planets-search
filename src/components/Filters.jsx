import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filters = () => {
  const { filters: { filterByNumericValues },
    deleteNumercFilter } = useContext(StarWarsContext);

  const handleClick = (filter) => {
    deleteNumercFilter(filterByNumericValues.filter((item) => item !== filter));
  };

  return (
    <div>
      {filterByNumericValues.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          <p>{ filter.column }</p>
          <p>{ filter.comparison }</p>
          <p>{ filter.value }</p>
          <button type="button" onClick={ () => handleClick(filter) }>X</button>
        </div>))}
    </div>
  );
};

export default Filters;
