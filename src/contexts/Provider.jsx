import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/starWarsAPI';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    number: 0,
    column: 'population',
    comparison: 'maior que',
  });

  const setData = async () => {
    const planets = await fetchPlanets();

    setPlanets(planets);
    setFilteredPlanets(planets);
  };

  const changeNameToBeFiltered = ({ target: { value } }) => {
    setFilters({
      ...filters,
      name: value,
    });
  };

  const changeNumericInfoToBeFiltered = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleButtonFilterClick = () => {
    const { number, column, comparison } = filters;

    const filteredData = data.filter((planet) => {
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

  useEffect(() => {
    setData();
  }, []);

  // useEffect(() => {
  //   const filteredData = data.filter(({ name }) => name.includes(filters.name));

  //   setFilteredPlanets(filteredData);
  // });

  const filterPlanetsByName = ({ target: { value } }) => {
    const filteredData = data.filter(({ name }) => name.includes(value));

    setFilteredPlanets(filteredData);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      number: 0,
      column: 'population',
      comparison: 'maior que',
    });

    setFilteredPlanets(data);
  };

  const contextValue = {
    changeNameToBeFiltered,
    filterPlanetsByName,
    filteredPlanets,
    changeNumericInfoToBeFiltered,
    handleButtonFilterClick,
    clearFilters,
    filters,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
