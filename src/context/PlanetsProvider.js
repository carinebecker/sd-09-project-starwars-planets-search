import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/planetsAPI';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlanets = async () => {
    const data = await fetchPlanets();
    setPlanets(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const context = {
    planets,
    isLoading: loading,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
