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
  const [columnSelect, setColumnSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const getPlanets = async () => {
    const planetsFromApi = await fetchPlanets();
    setData(planetsFromApi);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const context = {
    data, setData, loading, filters, setFilters, columnSelect, setColumnSelect,
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
