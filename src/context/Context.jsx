import React, { createContext, useState } from 'react';
import planetsDataAPI from '../services/StarWarsAPI';

export const Context = createContext({});

export function ContextProvider({ children }) {
  const initialStateFilters = {
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialStateFilters);

  const getData = async () => {
    const result = await planetsDataAPI();
    setData(result);
  };

  const nameFilter = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  return (
    <ContextProvider
      value={ {
        data,
        setData,
        getData,
        filters,
        setFilters,
        nameFilter,
      } }
    >
      { children }
    </ContextProvider>
  );
}

ContextProvider.propTypes = { children: React.ReactNode }.isRequired;
