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
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
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

  function filterByName(name) {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  }

  function filterByNumericValues(filter) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        filter,
      ],
    });
  }

  function removeFilter(name) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues.filter((filter) => filter.column !== name),
      ],
    });
  }

  function orderBy({ column = filters.order.column, sort = filters.order.sort }) {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  }

  const contextValue = {
    data,
    isLoading,
    setIsLoading,
    filters,
    filterByName,
    filterByNumericValues,
    removeFilter,
    orderBy,
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
