import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function Provider({ children }) {
  const [apiResult, setApiResult] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    number: 0,
    column: 'population',
    comparison: 'maior que',
  });

  useEffect(() => {
    async function getPlanets() {
      try {
        const fetchResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const response = await fetchResponse.json();
        const data = response.results;
        setApiResult(data);
        setFilteredPlanets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlanets();
  }, []);

  const changefilteredByName = ({ target: { value } }) => {
    setFilters({
      ...filters,
      name: value,
    });
  };

  const changefilteredByNumber = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleButtonFilterClick = () => {
    const { number, column, comparison } = filters;

    const filteredData = apiResult.filter((planet) => {
      if (comparison === 'maior que') {
        return parseInt(planet[column], 10) > parseInt(number, 10);
      }

      if (comparison === 'menor que') {
        return parseInt(planet[column], 10) < parseInt(number, 10);
      }

      return parseInt(planet[column], 10) === parseInt(number, 10);
    });
    setFilteredPlanets(filteredData);
  };

  const filterPlanetsByName = ({ target: { value } }) => {
    const filteredData = apiResult.filter(({ name }) => name.includes(value));

    setFilteredPlanets(filteredData);
  };

  const contextValue = {
    apiResult,
    filters,
    filteredPlanets,
    filterPlanetsByName,
    changefilteredByName,
    changefilteredByNumber,
    handleButtonFilterClick,
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
