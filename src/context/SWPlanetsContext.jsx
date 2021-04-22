import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fecthApi from '../services/Api';

export const SwPlanetsContext = createContext();

export function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);

  async function getPlanets() {
    const apiResult = await fecthApi();
    setPlanets(apiResult);
    setHeaders(Object.keys(apiResult[0]));
  }
  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <SwPlanetsContext.Provider value={ { planets, headers } }>
      { children }
    </SwPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
