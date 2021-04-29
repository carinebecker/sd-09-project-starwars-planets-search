import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [namePlanets, setNamePlanets] = useState('');
  const [filterPlanets, setFilterPlanets] = useState('');

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
    });
  }, []);

  const handleNamePlanets = ({ target: { value } }) => {
    setNamePlanets(value);
  };

  useEffect(() => {
    const planetsForFilters = [...planets];
    const planetsFilters = planetsForFilters
      .filter((planet) => planet.name.includes((namePlanets)));
    setFilterPlanets(planetsFilters);
  }, [planets, namePlanets]);

  const contextValue = {
    planets,
    namePlanets,
    handleNamePlanets,
    filterPlanets,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
