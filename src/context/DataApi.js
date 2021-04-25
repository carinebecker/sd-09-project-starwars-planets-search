import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchData from '../services/fetchData';

export const DataApiContext = createContext();

const DataApiContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getApiData = async () => {
    setIsFetching(true);
    const data = await fetchData();
    setApiData(data);
    setIsFetching(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const context = {
    apiData,
    setApiData,
    isFetching,
    setIsFetching,
  };

  return (
    <DataApiContext.Provider value={ context }>
      {children}
    </DataApiContext.Provider>
  );
};

DataApiContextProvider.propTypes = {
  children: node,
}.isRequired;

export default DataApiContextProvider;
