import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import planetsData from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [allFilters, setAllFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const [selectColumn, setSelectColumn] = useState([
    { option: 'population', enabled: true },
    { option: 'orbital_period', enabled: true },
    { option: 'diameter', enabled: true },
    { option: 'rotation_period', enabled: true },
    { option: 'surface_water', enabled: true },
  ]);

  const providerValues = {
    data,
    setData,
    allFilters,
    setAllFilters,
    selectColumn,
    setSelectColumn,
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await planetsData();
      setData(results);
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
