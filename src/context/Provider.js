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
        column: 'Name',
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
    setFilteredPlanets(filtered);
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
      setFilteredPlanets(filtered);
    }
  };

  useEffect(() => {
    filterByNameText();
    filterNumericValues();
  }, [filterTypes]);

  const context = {
    planets,
    isFetching,
    tableHeaders,
    filterTypes,
    fetchPlanets,
    filteredPlanets,
    setFilterTypes,
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
