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

  const changeFilters = (value) => {
    setFilters(
      { ...filters, filterByNumericValues: [...filters.filterByNumericValues, value] },
    );
  };

  const removeFilter = (filter) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters
        .filterByNumericValues
        .filter((element) => element !== filter),
    });
  };

  const changeOrder = (value) => {
    setFilters({ ...filters, order: value });
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
        changeFilters,
        removeFilter,
        changeOrder,
      } }
    >
      { children }
    </ContextProvider>
  );
}

ContextProvider.propTypes = { children: React.ReactNode }.isRequired;
