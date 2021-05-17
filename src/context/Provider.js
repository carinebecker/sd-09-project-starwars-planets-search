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

  const filterByNameText = (value) => {
    const filtered = planets.filter(({ name }) => (
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
