import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import dataFetch from '../Services/dataFetch';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterName: {
      name: '',
    },
  });

  useEffect(() => {
    const fetchApi = async () => {
      const dataResult = await dataFetch();
      setData(dataResult);
    };
    fetchApi();
  }, []);

  function filterName(filter) {
    setFilters({
      ...filters,
      filterName: {
        name: filter,
      },
    });
  }

  const context = {
    data,
    setData,
    filterName,
    filters,
  };

  return (
    <ApiContext.Provider value={ context }>
      {children}
    </ApiContext.Provider>
  );
};

ApiContextProvider.propTypes = {
  children: node,
}.isRequired;

export default ApiContextProvider;
