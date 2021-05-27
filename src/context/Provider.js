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

  const orderPlanets = (array) => {
    const { filters: { order: { column } } } = filterTypes;
    // let ordered = filteredPlanets.length > 0 ? [...filteredPlanets] : [...planets];
    // console.log(ordered);
    const equal = 0;
    const bigger = 1;
    const smaller = -1;
    array.sort(function (a, b) {
      if (a[column] > b[column]) {
        return bigger;
      }
      if (a[column] < b[column]) {
        return smaller;
      }
      return equal;
    });
    console.log(array);
    // setFilteredPlanets(array);
    return array;
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
