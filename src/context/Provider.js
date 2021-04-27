import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import planetsData from '../services';

function Provider({ children }) {
  const [allPlanets, setAllPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [objectFilters, setObjectFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const [selectColumn, setSelectColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const providerValues = {
    allPlanets,
    data,
    setData,
    objectFilters,
    setObjectFilters,
    selectColumn,
    setSelectColumn,
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await planetsData();
      setData(results);
      setAllPlanets(results);
    };
    fetchPlanets();
  }, []);

  return (
    <AppContext.Provider value={ providerValues }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
