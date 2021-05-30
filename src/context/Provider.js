import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import { fetchPlanets } from '../services/starWarsPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const contextValue = {
    data,
    setData,
    filteredData,
    setFilteredData,
    filters: {
      filterByName: name,
      filterByNumericValues: number,
    },
    setName,
    setNumber,
    isFetching,
    setIsFetching,
    options,
    setOptions,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
