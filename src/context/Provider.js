import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import getPlanets from '../services/planetListAPI';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [filtered, setFiltered] = useState([]);

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

  const filterByNameText = (array, value) => {
    const filtered = array.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())
    ));
    setFilteredByName(filtered);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterByName({ name: value });
    filterByNameText(value)
  };
  
  const filterTypes = {
    filters: {
      filterByName,
      filterByNumericValues,
    }
  }

  const filterNumericValues = () => {
    const { filters: { filterByNumericValues } } = filterTypes;
    const { column, comparison, value } = filterByNumericValues;
    const result = planets.filter((planet) => {
      switch (comparison) {
        case 'maior que':
          return planet[column] > value;
        case 'menor que':
          return planet[column] < value;
        case 'igual a':
          return planet[column] === value;
        default:
          return planet;
      }
    });
    return result;
  }

  const filterPlanets = () => {
    const { filters: { filterByName, filterByNumericValues} } = filterTypes;
    if (filterByName.name === '' && filterByNumericValues === []) {
      return planets;
    } else if (filterByName.name !== '' && filterByNumericValues === []) {
      return filterByNameText(planets, filterByName.name);
    } else if (filterByName.name === '' && filterByNumericValues.length > 0) {
      return filterNumericValues();
    } else {
      const numericFilter = filterNumericValues();
      return filterByNameText(numericFilter, filterByName.name);
    }
  }

  // console.log(filterTypes);

  const context = {
    planets,
    isFetching,
    tableHeaders,
    filterTypes,
    filteredByName,
    fetchPlanets,
    handleChange,
    setFilterByNumericValues,
  };

  return (
    <StarwarsContext.Provider value={context}>
      { children}
    </StarwarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
