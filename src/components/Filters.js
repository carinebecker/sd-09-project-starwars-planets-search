import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Filters() {
  const { filters, setFilters } = useContext(PlanetContext);

  const getSearchInput = ({ target }) => {
    const { value } = target;
    const filterObj = { ...filters, filterByName: { name: value } };
    setFilters(filterObj);
  };

  const searchInput = () => (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        name="name"
        placeholder="Pesquise pelo nome de um planeta"
        value={ filters.filterByName.name }
        onChange={ getSearchInput }
      />
    </label>
  );

  return (
    searchInput()
  );
}

export default Filters;
