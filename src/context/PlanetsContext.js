import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/api';

export const ContextPlanets = createContext();

function PlanetsContext(props) {
  const { children } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const connect = async () => {
      const results = await getPlanets();
      setData(results);
    };
    connect();
  }, []);

  return (
    <ContextPlanets.Provider value={ data }>
      { children }
    </ContextPlanets.Provider>
  );
}

PlanetsContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsContext;
