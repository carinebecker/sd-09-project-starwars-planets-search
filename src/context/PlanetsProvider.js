import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/apiService';

const defaultFilters = {
  filters:
  {
    filterByName: {
      name: ''
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: 'maior que',
        value: '',
      }
    ]
  }
}


function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const context = { filteredPlanets, filters, setFilters };
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
