import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/planetsAPI';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const getPlanets = async () => {
    const data = await fetchPlanets();
    setPlanets(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const filterChangeHandler = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const context = {
    planets,
    isLoading: loading,
    filters,
    filterChangeHandler,
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
