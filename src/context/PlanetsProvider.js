import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/apiService';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    types: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    allFilters: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const planetsList = await fetchPlanets();
      setData(planetsList);
      setFilteredPlanets(planetsList);
    };
    if (data.length === 0) {
      getPlanets();
    }
  }, [data]);

  const context = {
    data, filteredPlanets, setFilteredPlanets, filters, setFilters };
  return (
    <main>
      <PlanetsContext.Provider value={ context }>
        { children }
      </PlanetsContext.Provider>
    </main>
  );
}

PlanetsProvider.propTypes = { children: PropTypes.element }.isRequired;

export default PlanetsProvider;
