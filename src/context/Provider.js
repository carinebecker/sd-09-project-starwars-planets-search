import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './Context';

function Provider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState('');

  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setPlanets(results);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    planets,
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
