import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import fetchAPI from './services/api';

const Context = createContext();

const INITIAL_FILTERS = {
  filterByName: { name: '' },
  filterByNumericValues: [],
  order: { column: '', sort: 'ASC' },
};

const Provider = ({ children }) => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const getData = async () => {
    const result = await fetchAPI();
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
      filterByNumericValues: filters.filterByNumericValues.filter((el) => el !== filter),
    });
  };

  useEffect(() => { getData(); }, []);

  const contextValue = {
    data, filters, nameFilter, changeFilters, removeFilter,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
