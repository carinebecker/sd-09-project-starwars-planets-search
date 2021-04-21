import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import fetchAPI from './services/api';

const Context = createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  const getData = async () => {
    const result = await fetchAPI();
    setData(result);
  };

  const nameFilter = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  useEffect(() => { getData(); }, []);

  const state = { data, filters, nameFilter };

  return (
    <Context.Provider value={ state }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isReuired;

export { Context, Provider };
