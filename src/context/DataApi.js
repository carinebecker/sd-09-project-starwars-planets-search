import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchData from '../services/fetchData';
import DataApiContext from './DataApiContext';

const INITIAL_STATE = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE_2 = {
  filterByName:
      { name: '' },
  filterByNumericValues: [],
};

const DataApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [columnDropdown, setColumnDropdown] = useState(INITIAL_STATE);
  const [filters, setFilters] = useState(INITIAL_STATE_2);

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
    columnDropdown,
    setColumnDropdown,
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
