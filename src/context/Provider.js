import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import planetsData from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await planetsData();
      setData(results);
    };
    fetchPlanets();
  }, []);

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
