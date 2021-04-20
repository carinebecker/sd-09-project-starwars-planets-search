import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

const FilterInputs = () => {
  const { filters, setFilters } = useContext(starWarsContext);
  function filteredByName(event) {
    const { value } = event.target;
    setFilters({ ...filters, filterByName: { name: value } });
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar por nome"
        data-testid="name-filter"
        onChange={ filteredByName }
      />
    </div>
  );
};

export default FilterInputs;
