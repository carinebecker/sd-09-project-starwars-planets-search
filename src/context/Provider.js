import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchPlanetsList from '../services/fecthPlanetsList';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function getPlanetsfromAPI() {
      const response = await fetchPlanetsList();
      setPlanets(response);
    }
    getPlanetsfromAPI();
  }, []);

  return (
    <MyContext.Provider value={ { planets } }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
