import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/Api';

function PlanetsProvider({ children }) {
  const INITIAL_STATE = {
    filterByName: { name: '' },
    filterByNumericValues: [],
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(INITIAL_STATE);

  const getPlanets = async () => {
    const planetsFromApi = await fetchPlanets();
    setData(planetsFromApi);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const context = {
    data, setData, loading, filters, setFilters,
  };

  return (
    <PlanetsContext.Provider
      value={ context }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
