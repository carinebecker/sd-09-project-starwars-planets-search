import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const [data, setPlanets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');

  const getData = async () => {
    const planets = await fetchAPI();
    setPlanets(planets);
    setFilteredData(planets);
  };

  const filterPlanets = ({ target }) => {
    const { value } = target;
    setName(value);
    const filtered = data.filter((planet) => planet.name.includes(value));
    setFilteredData(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  const context = { name, data, filteredData, filterPlanets };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
