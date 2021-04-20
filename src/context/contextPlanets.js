import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from './getPlanets';

export const savePlanets = createContext();

function ContextPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [searchByName, setSearchByName] = useState([]);

  useEffect(() => {
    async function myPlanets() {
      const planetList = await getPlanets();
      setPlanets(planetList);
      setFilters(planetList);
    }
    myPlanets();
  }, []);

  useEffect(() => {
    let filterName = [];
    filterName = planets.filter((planet) => planet.name.includes((searchByName)));
    setFilters(filterName);
  }, [planets, searchByName]);

  const data = { searchByName, setSearchByName, filters };
  return (
    <savePlanets.Provider value={ data }>
      { children }
    </savePlanets.Provider>
  );
}

ContextPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextPlanets;
