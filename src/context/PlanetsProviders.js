import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

const initialState = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: '',
      value: '',
    },
  ],
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialState);
  const [planetsResults, setPlanetsResults] = useState([]);

  useEffect(() => {
    getPlanets().then((results) => {
      setData(results.filter((result) => delete result.residents));
    });
  }, []);

  const context = {
    data,
    filters,
    setFilters,
    planetsResults,
    setPlanetsResults,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
