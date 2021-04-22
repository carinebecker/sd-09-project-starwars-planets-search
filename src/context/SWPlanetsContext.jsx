import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fecthApi from '../services/Api';

export const SwPlanetsContext = createContext();

export function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [planetsBkp, setPlanetsBkp] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  async function getPlanets() {
    const apiResult = await fecthApi();
    setPlanets(apiResult);
    setPlanetsBkp(apiResult);
    setHeaders(Object.keys(apiResult[0]));
  }

  useEffect(() => {
    getPlanets();
  }, []);
  useEffect(() => {
    const { filterByName: { name } } = filters;
    if (name.length > 0) {
      const filtredPlanets = planetsBkp
        .filter(({ name: planetName }) => (planetName.includes(name)));
      setPlanets(filtredPlanets);
    } else {
      setPlanets(planetsBkp);
    }
  }, [filters, planetsBkp]);

  return (
    <SwPlanetsContext.Provider value={ { planets, headers, filters, setFilters } }>
      { children }
    </SwPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
