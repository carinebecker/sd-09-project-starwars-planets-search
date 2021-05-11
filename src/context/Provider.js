import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import dataAPI from '../services';

const FILTER = {
  filters: {
    filterByName: {
      name: '',
    },
  },
};

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filtered, setFilter] = useState(FILTER);

  const handleDataSuccess = (response) => {
    setData(response.results);
  };

  const getData = () => {
    dataAPI()
      .then(handleDataSuccess);
  };

  useEffect(getData, []);

  const setFilterName = ({ target }) => {
    const { value } = target;
    setFilter({
      ...filtered,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  };

  const contextValue = {
    data,
    getData,
    filtered,
    setFilterName,
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
