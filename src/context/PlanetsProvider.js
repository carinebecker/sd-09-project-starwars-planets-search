import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import planetsApi from '../services/starWarsApi';

function PlanetsProvider({ children }) {
  const [dataStarWarts, setDataStarWarts] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [planetsGeted, setPlanetsGeted] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '',
      },
    ],
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

  function filterByNumbers(data, column, comparison, value) {
    switch (comparison) {
    case 'maior que':
      return data.filter((planet) => (Number(planet[column]) > Number(value)));
    case 'menor que':
      return data.filter((planet) => (Number(planet[column]) < Number(value)));
    case 'igual a':
      return data.filter((planet) => (Number(planet[column]) === Number(value)));
    default: return '';
    }
  }

  function filter(planetsToFilter, allFilters) {
    const { filterByName: { name } } = allFilters;
    const { filterByNumericValues: [{ column, comparison, value }] } = allFilters;
    let data = planetsToFilter.filter((planet) => planet.name.toUpperCase()
      .includes(name.toUpperCase()));

    if (value) data = filterByNumbers(data, column, comparison, value);
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

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
