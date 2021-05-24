import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchBar() {
  const [query, setQuery] = useState({ filters: { filterByName: { search: '' } } });
  const { dataFromApi, setFilter } = useContext(StarWarsContext);
  const { planets } = dataFromApi;
  const { filters: { filterByName: { search } } } = query;

  const filterPlanets = () => {
    const filterByQuery = new RegExp(`^.*${search}.*`, 'i');

    setFilter({
      filteredPlanets: planets.results
        .filter((result) => filterByQuery.test(result.name)),
    });
  };

  useEffect(() => {
    filterPlanets();
  }, [search]);

  const handleChange = ({ target: { name, value } }) => {
    setQuery({ filters: { filterByName: { [name]: value } } });
  };

  return (
    <label htmlFor="search-bar">
      Pesquisar:

      <input
        type="text"
        name="search"
        id="search-bar"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </label>
  );
}

export default SearchBar;
