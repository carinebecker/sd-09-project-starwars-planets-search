import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import planetApiRequest from '../services/starWarsApi';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const planets = await planetApiRequest();
    setData(planets);
  };
  useEffect(() => {
    getData();
  }, []);

  const contextValue = { data };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.element),
}.isRequired;

export default Provider;
