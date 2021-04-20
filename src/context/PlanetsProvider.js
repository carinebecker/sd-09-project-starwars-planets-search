import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import planetsApi from '../services/starWarsApi';

function PlanetsProvider({ children }) {
  const [dataStarWarts, setDataStarWarts] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [planetsGeted, setPlanetsGeted] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  useEffect(() => {
    planetsApi()
      .then((data) => setDataStarWarts(data.results));
  }, []);

  const residentsDeleted = dataStarWarts.map((planet) => {
    delete planet.residents;
    return planet;
  });

  function setPlanetsState() {
    setPlanets(residentsDeleted);
    setPlanetsGeted(true);
  }

  if (!planetsGeted && residentsDeleted.length > 0) {
    setPlanetsState();
  }

  function filter(planetsToFilter, allFilters) {
    const { filterByName: { name } } = allFilters;
    const data = planetsToFilter.filter((planet) => planet.name.toUpperCase()
      .includes(name.toUpperCase()));

    return data;
  }

  const data = [...filter(planets, filters)];

  const context = {
    data,
    filters,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>);
}

export default PlanetsProvider;
