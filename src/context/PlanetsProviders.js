import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlanets().then((results) => {
      const filterResults = results.filter((result) => delete result.residents);
      setData([filterResults]);
    });
  }, []);

  const context = {
    data,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
