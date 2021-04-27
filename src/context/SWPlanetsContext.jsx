import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fecthApi from '../services/Api';

export const SwPlanetsContext = createContext();

const ONE_NEGATIVE = -1;
const ONE = 1;
const ZERO = 0;

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
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  function sortAsc(itemA, itemB) {
    const { order: { column } } = filters;
    if (/^[0-9]*$/.test(itemA[column])) {
      if (parseInt(itemA[column], 10) < parseInt(itemB[column], 10)) return ONE_NEGATIVE;
      if (parseInt(itemA[column], 10) > parseInt(itemB[column], 10)) return ONE;
    } else {
      if (itemA[column] < itemB[column]) return ONE_NEGATIVE;
      if (itemA[column] > itemB[column]) return ONE;
    }
    return ZERO;
  }

  function sortDesc(itemA, itemB) {
    const { order: { column } } = filters;
    if (/^[0-9]*$/.test(itemA[column])) {
      if (parseInt(itemA[column], 10) > parseInt(itemB[column], 10)) return ONE_NEGATIVE;
      if (parseInt(itemA[column], 10) < parseInt(itemB[column], 10)) return ONE;
    } else {
      if (itemA[column] > itemB[column]) return ONE_NEGATIVE;
      if (itemA[column] < itemB[column]) return ONE;
    }
    return ZERO;
  }

  async function getPlanets() {
    const apiResult = await fecthApi();
    apiResult.sort((itemA, itemB) => {
      if (itemA.name < itemB.name) return ONE_NEGATIVE;
      if (itemA.name > itemB.name) return ONE;
      return ZERO;
    });
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

  function handleSortChange({ target: { value, name } }) {
    const { order } = filters;
    setFilters({ ...filters, order: { ...order, [name]: value } });
  }

  function handleSortClick() {
    const { order: { sort } } = filters;
    if (sort === 'DESC') {
      setPlanets(planets.sort(sortDesc));
      setPlanetsBkp(planets.sort(sortDesc));
    }
    if (sort === 'ASC') {
      setPlanets(planets.sort(sortAsc));
      setPlanetsBkp(planets.sort(sortAsc));
    }
  }

  function handleFilterClick() {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filter],
    });
    setColumns(columns.filter((column) => column !== filter.column));
    setComparisons(comparisons.filter((comparison) => comparison !== filter.comparison));
  }

  function handleRemoveClick() {
    setPlanets(planetsBkp);
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
        handleFilterClick,
        handleRemoveClick,
        handleSortChange,
        handleSortClick,
      } }
    >
      { children }
    </SwPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
