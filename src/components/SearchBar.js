import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import FilterSearch from './FilterSearch';

function SearchBar() {
  const {
    dataFromApi,
    setPlanetsFilter,
    inputFilter,
    setInputFilter,
  } = useContext(StarWarsContext);
  const { planets } = dataFromApi;
  const { filters: { filterByName: { search } } } = inputFilter;

  const filterPlanets = () => {
    const filterByQuery = new RegExp(`^.*${search}.*`, 'i');

    setPlanetsFilter({
      filteredPlanets: planets.results
        .filter((result) => filterByQuery.test(result.name)),
    });
  };

  useEffect(() => {
    filterPlanets();
  }, [search]);

  const handleChange = ({ target: { name, value } }) => {
    setInputFilter({
      filters: { ...inputFilter.filters, filterByName: { [name]: value } },
    });
  };

  return (
    <>
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
      <FilterSearch />
    </>
  );
}

export default SearchBar;
