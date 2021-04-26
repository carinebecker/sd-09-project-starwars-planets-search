import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fecthApi from '../services/Api';

export const SwPlanetsContext = createContext();

export function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [planetsBkp, setPlanetsBkp] = useState([]);
  const [columns, setColumns] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [comparisons, setComparisons] = useState(['maior que', 'menor que', 'igual a']);
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
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
    setFilter({ ...filter, [name]: value });
  }

  function handleClick() {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filter],
    });
    setColumns(columns.filter((column) => column !== filter.column));
    setComparisons(comparisons.filter((comparison) => comparison !== filter.comparison));
  }

  const filterPlanets = useCallback(() => {
    const { filterByNumericValues } = filters;
    const index = filterByNumericValues.length - 1;
    if (index >= 0) {
      const { column, comparison, value } = filterByNumericValues[index];
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
  }, [filters, planetsBkp]);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    setPlanets(planetsBkp
      .filter(({ name: planetName }) => (planetName.includes(name))));
  }, [filters, planetsBkp]);
  useEffect(() => {
    filterPlanets();
  }, [filters.filterByNumericValues, filterPlanets]);

  return (
    <SwPlanetsContext.Provider
      value={ {
        planets,
        headers,
        filters,
        filter,
        columns,
        comparisons,
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
