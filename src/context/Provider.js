import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import planetApiRequest from '../services/starWarsApi';

const Provider = ({ children }) => {
  const INITIAL_STATE = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);

  const getData = async () => {
    const planets = await planetApiRequest();
    setData(planets);
  };
  useEffect(() => {
    getData();
  }, []);

  const contextValue = {
    data,
    filters,
    setData,
    setFilters,
  };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
