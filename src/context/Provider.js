import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import getPlanets from '../services/planetListAPI';

const Provider = ({ children }) => {
  // state principal
  const [filterTypes, setFilterTypes] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });
  // planetas fornecidos pela API
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  // state com o array filtrado
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  // state com as colunas a serem filtradas
  const [columnItems, setColumnItems] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const removeResidentsKey = (planetsArray) => {
    planetsArray.forEach((planet) => {
      delete planet.residents;
    });
  };

  const filterTableHeads = (planetsHeaders) => {
    const headers = Object.keys(planetsHeaders[0]);
    setTableHeaders(headers);
  };

  const orderPlanets = (array) => {
    const { filters: { order: { column, sort } } } = filterTypes;

    function compareString(a, b) {
      const equal = 0;
      const bigger = 1;
      const smaller = -1;

      if (a[column] > b[column]) return bigger;
      if (a[column] < b[column]) return smaller;
      return equal;
    }

    function compareNumbers(a, b) {
      const equal = 0;
      const bigger = 1;
      const smaller = -1;

      const firstElement = parseInt(a[column], 10);
      const secondElement = parseInt(b[column], 10);

      if (firstElement > secondElement) return bigger;
      if (firstElement < secondElement) return smaller;
      return equal;
    }

    if (column === 'rotation_period'
      || column === 'orbital_period'
      || column === 'diameter') {
      array.sort(compareNumbers);
    } else {
      array.sort(compareString);
    }

    if (sort === 'DESC') {
      array.reverse();
    }

    return array;
  };

  const fetchPlanets = async () => {
    setIsFetching(true);
    try {
      const response = await getPlanets();
      removeResidentsKey(response);
      filterTableHeads(response);
      orderPlanets(response);
      setPlanets(response);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByNameText = () => {
    const { filters: { filterByName: { name: value } } } = filterTypes;
    const filtered = planets.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())
    ));
    const ordered = orderPlanets(filtered);
    setFilteredPlanets(ordered);
  };

  const numericFilter = (array, filterRule) => {
    const { column, comparison, value } = filterRule;
    const result = array.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return parseFloat(planet[column]) > parseFloat(value);
      case 'menor que':
        return parseFloat(planet[column]) < parseFloat(value);
      case 'igual a':
        return parseFloat(planet[column]) === parseFloat(value);
      default:
        return planet;
      }
    });
    return result;
  };

  const filterNumericValues = () => {
    const { filters: { filterByNumericValues } } = filterTypes;
    if (filterByNumericValues.length > 0) {
      let filtered = [...planets];
      filterByNumericValues.forEach((filter) => {
        filtered = numericFilter(filtered, filter);
      });
      const ordered = orderPlanets(filtered);
      setFilteredPlanets(ordered);
    }
  };

  useEffect(() => {
    filterByNameText();
    filterNumericValues();
    // orderPlanets();
  }, [filterTypes]);

  const context = {
    planets,
    isFetching,
    tableHeaders,
    filterTypes,
    fetchPlanets,
    filteredPlanets,
    setFilterTypes,
    columnItems,
    setColumnItems,
    orderPlanets,
  };

  return (
    <StarwarsContext.Provider value={ context }>
      { children }
    </StarwarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
