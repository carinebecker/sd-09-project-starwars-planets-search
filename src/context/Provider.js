import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const [data, setPlanets] = useState([]);

  const getData = async () => {
    const planets = await fetchAPI();
    setPlanets(planets);
  };

  useEffect(() => {
    getData();
  }, []);

  const context = { data };

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
