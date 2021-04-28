import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './Context';

function Provider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState('');

  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setPlanets(results);
    setFilteredPlanets(results);
  }

  const filterPlanets = ({ target }) => {
    const { value } = target;
    const filtered = planets.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    planets,
    filterPlanets,
    filteredPlanets,
  };

  return (
    <planetsContext.Provider value={ data }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
