import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import fetchApiPlanets from '../services/fetchPlanet';

function Provider({ children }) {
  const filterByName = {
    filters: {
      filterByName: {
        name: '',
      },
    },
  };

  const filterByNumeric = {
    filterByNumeric: {
      column: '',
      comparison: '',
      value: 0,
    },
  };

  const [data, setData] = useState({});
  const [filteredByName, setFilteredByName] = useState(filterByName);
  const [filteredByNumeric, setFilteredByNumeric] = useState(filterByNumeric);
  const [numericFiltered, setNumericFiltered] = useState([]);
  async function getPlanets() {
    const apiResponse = await fetchApiPlanets();
    setData(apiResponse);
  }

  const filteredPlanets = (data.results)
    ? data.results.filter((planets) => (
      planets.name.includes(filteredByName.filters.filterByName.name)
    ))
    : '';

  const filterByNumericValues = () => {
    const searchColumn = filteredByNumeric.filterByNumeric.column;
    const searchValue = filteredByNumeric.filterByNumeric.value;
    const searchComparison = filteredByNumeric.filterByNumeric.comparison;
    console.log(searchColumn, searchComparison, searchValue, numericFiltered);

    if (data.results !== undefined) {
      const result = filteredPlanets.filter((planet) => {
        switch (searchComparison) {
        case 'maior que':
          return planet[searchColumn] > searchValue;
        case 'menor que':
          console.log(planet[searchColumn], " ", searchValue);
        return planet[searchColumn] < searchValue;
        case 'igual a':
          return planet[searchColumn] === searchValue;
        default:
          return console.log('Erro');
        }
      });
      setNumericFiltered(result);
    }
  };

  console.log(numericFiltered);
  useEffect(() => {
    getPlanets();
    filterByNumericValues();
  }, [filteredByNumeric,filteredByName]);

  const contextValue = {
    data,
    filteredPlanets,
    setFilteredByName,
    filteredByNumeric,
    setFilteredByNumeric,
    numericFiltered,
  };

  return (
    <StarwarsContext.Provider value={ contextValue }>
      {children}
    </StarwarsContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
