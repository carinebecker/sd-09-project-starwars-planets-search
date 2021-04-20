import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/PlanetsApi';

function PlanetsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    setLoading(true);
    const planetsFromApi = await fetchPlanets();
    setPlanets(planetsFromApi);
    setLoading(false);
  };

  return (
    <PlanetsContext.Provider
      value={ { loading, setLoading, planets, setPlanets, getPlanets } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.element).isRequired,
};

export default PlanetsProvider;
