import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import dataAPI from '../services';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  const handleDataSuccess = (response) => {
    setData(response.results);
  };

  const getData = () => {
    dataAPI()
      .then(handleDataSuccess);
  };

  useEffect(getData, []);

  const contextValue = {
    data,
    getData,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
