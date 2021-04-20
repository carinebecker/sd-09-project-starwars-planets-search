import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchAPI from './services/api';

const Context = createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState(Context);

  const getData = async () => {
    const result = await fetchAPI();
    setData(result);
  };

  useEffect(() => { getData(); }, []);

  const value = { data };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isReuired;

export { Context, Provider };
