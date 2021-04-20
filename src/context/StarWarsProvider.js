import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/PlanetsAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState();

  const getPlanetsData = async () => {
    const planetData = await fetchPlanets();
    setData(planetData);
  };

  useEffect(() => {
    getPlanetsData();
  }, []);

  const context = {
    data,
    setData,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = { children: PropTypes.node.isRequired };

export default StarWarsProvider;
