import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function NumericFilters() {
  const { filterTypes, setFilterTypes, setColumnItems } = useContext(StarwarsContext);
  const { filters: { filterByNumericValues } } = filterTypes;

  const removeFilter = ({ column }) => {
    const result = filterByNumericValues.filter((filter) => filter.column !== column);
    return result;
  };

  const handleRemoveFilter = (filter) => {
    console.log(filter);
    setColumnItems((prevState) => [...prevState, filter.column]);
    setFilterTypes((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: removeFilter(filter),
      },
    }));
  };

  return (
    <section>
      {filterByNumericValues.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <span>{`${filter.column}, ${filter.comparison} ${filter.value} `}</span>
          <button type="button" onClick={ () => handleRemoveFilter(filter) }>X</button>
        </div>
      ))}
    </section>
  );
}

export default NumericFilters;
