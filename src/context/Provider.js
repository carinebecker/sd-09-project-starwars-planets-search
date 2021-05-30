import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/api';

import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  });

  useEffect(() => {
    const connect = async () => {
      const results = await getPlanets();
      setPlanets(results);
    };
    connect();
  }, []);

  const filterByName = (name) => {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  };

  const filterByNumericValues = (numericValues) => {
    setFilters({
      ...filters,
      filterByNumericValues: numericValues,
    });
  };

  const contextValue = {
    planets,
    filters,
    filterByName,
    filterByNumericValues,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
