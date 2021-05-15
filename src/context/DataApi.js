import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchData from '../services/fetchData';
import DataApiContext from './DataApiContext';

const INITIAL_STATE = {
  filterByName:
      { name: '' },
  filterByNumericValues: [],
};

const DataApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState(INITIAL_STATE);

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
    setFilters,
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
