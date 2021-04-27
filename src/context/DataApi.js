import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import useInputValue from '../hooks/filterInputValueByName';
import fetchData from '../services/fetchData';

export const DataApiContext = createContext();

const DataApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filters, filterInputValueByName] = useInputValue();

  const getApiData = async () => {
    const apiData = await fetchData();
    setData(apiData);
    setIsFetching(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const context = {
    data,
    filters,
    filterInputValueByName,
    isFetching,
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
