import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [tableHeaders, setTableHeaders] = useState();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: '',
    comparison: '',
    value: '0',
  });

  useEffect(() => {
    async function planetsFromAPI() {
      const results = await fetchPlanets();
      setPlanets(results);
      setTableHeaders(results);
      setLoading(false);
    }
    planetsFromAPI();
  }, []);

  const context = {
    planets,
    tableHeaders,
    loading,
    filterByName,
    setFilterByName,
    columns,
    setColumns,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
