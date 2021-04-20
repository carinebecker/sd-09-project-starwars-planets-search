import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import requestPlanetsApi from './services/planetsAPI';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fecthData() {
      const request = await requestPlanetsApi();
      setData(request);
    }
    fecthData();
  }, [setData]);

  const contextValue = {
    data,
    setData,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: node.isRequired,
};
