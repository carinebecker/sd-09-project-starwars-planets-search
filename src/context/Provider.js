import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchPlanetsList from '../services/fecthPlanetsList';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  useEffect(() => {
    async function getPlanetsfromAPI() {
      const response = await fetchPlanetsList();
      setPlanets(response);
    }
    getPlanetsfromAPI();
  }, []);

  return (
    <MyContext.Provider value={ { planets, filters, setFilters } }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
