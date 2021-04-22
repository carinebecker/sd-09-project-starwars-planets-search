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
    filterByNumericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  });

  async function getPlanets() {
    const apiResult = await fecthApi();
    setPlanets(apiResult);
    setPlanetsBkp(apiResult);
    setHeaders(Object.keys(apiResult[0]));
  }
  function handleNameChange({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  function handleValueChange({ target: { value, name } }) {
    setFilters({
      ...filters,
      filterByNumericValues: { ...filters.filterByNumericValues, [name]: value },
    });
  }

  function handleClick() {
    const { filterByNumericValues: { column, comparison, value } } = filters;
    let filtredPlanets = [];
    switch (comparison) {
    case 'maior que':
      filtredPlanets = planetsBkp
        .filter((planet) => (parseInt(planet[column], 10) > parseInt(value, 10)));
      break;
    case 'menor que':
      filtredPlanets = planetsBkp
        .filter((planet) => (parseInt(planet[column], 10) < parseInt(value, 10)));
      break;
    case 'igual a':
      filtredPlanets = planetsBkp
        .filter((planet) => (parseInt(planet[column], 10) === parseInt(value, 10)));
      break;
    default:
      break;
    }
    setPlanets(filtredPlanets);
  }

  useEffect(() => {
    getPlanets();
  }, []);
  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filtredPlanets = planetsBkp
      .filter(({ name: planetName }) => (planetName.includes(name)));
    setPlanets(filtredPlanets);
  }, [filters, planetsBkp]);

  return (
    <SwPlanetsContext.Provider
      value={ {
        planets,
        headers,
        filters,
        handleNameChange,
        handleValueChange,
        handleClick,
      } }
    >
      { children }
    </SwPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
