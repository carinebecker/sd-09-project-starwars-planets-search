import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';

function filterResidents(data) {
  return data.map((planet) => {
    delete planet.residents;
    return planet;
  });
}

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    async function fetchStarWarsApi() {
      try {
        const fetchResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const result = await fetchResponse.json();
        const newData = filterResidents(result.results);
        setData(newData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStarWarsApi();
  }, []);

  function filterByName(filter) {
    setFilters({
      ...filters,
      filterByName: {
        name: filter,
      },
    });
  }

  const contextValue = {
    data,
    isLoading,
    setIsLoading,
    filters,
    filterByName,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
