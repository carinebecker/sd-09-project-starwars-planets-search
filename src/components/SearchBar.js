import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchBar() {
  const [query, setQuery] = useState({ filters: { filterByName: { search: '' } } });
  const [planet, setPlanet] = useState({ filter: { filteredPlanets: [] } });
  const { dataFromApi } = useContext(StarWarsContext);
  const { planets } = dataFromApi;

  const filterPlanets = () => {
    const { filters: { filterByName: { search } } } = query;
    const myReg = new RegExp(`${search}.*`, 'i');

    setPlanet({
      filter: { filteredPlanets: planets.results
        .filter((result) => myReg.test(result.name)),
      },
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setQuery({ filters: { filterByName: { [name]: value } } });
    filterPlanets();
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
