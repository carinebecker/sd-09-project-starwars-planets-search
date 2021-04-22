import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/starWarsAPI';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    subject: 'population',
    name: '',
    operator: 'maior que',
    number: '',
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

  const contextValue = { changeNameToBeFiltered, filterPlanetsByName, filteredPlanets };

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
