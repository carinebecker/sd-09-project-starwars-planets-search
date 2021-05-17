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

const allColumns = [
  'Name',
  'Rotation_period',
  'Orbital_period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface_water',
  'Population',
  'Films',
];

const INITIAL_STATE_2 = {
  filterByName:
      { name: '' },
  filterByNumericValues: [],
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

const DataApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [columnDropdown, setColumnDropdown] = useState(INITIAL_STATE);
  const [filters, setFilters] = useState(INITIAL_STATE_2);
  const [sortColumn, setSortColumn] = useState(INITIAL_STATE_2);

  const getApiData = async () => {
    const apiData = await fetchData();
    setData(apiData);
    setIsFetching(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const sortPlanetsByStringTypeColumn = () => {
    const { order: { sort, column } } = sortColumn;
    const lowCaseColumn = column.toLowerCase();
    let sorteredPlanets = [];
    if (sort === 'ASC') {
      sorteredPlanets = data
        .sort((a, b) => a[lowCaseColumn].localeCompare(b[lowCaseColumn]));
    } else {
      sorteredPlanets = data
        .sort((a, b) => b[lowCaseColumn].localeCompare(a[lowCaseColumn]));
    }
    return sorteredPlanets;
  };

  const sortPlanetsByNumberTypeColumn = () => {
    const { order: { sort, column } } = sortColumn;
    const lowCaseColumn = column.toLowerCase();
    let sorteredPlanets = [];
    if (sort === 'ASC') {
      sorteredPlanets = data.sort((a, b) => a[lowCaseColumn] - b[lowCaseColumn]);
    } else {
      sorteredPlanets = data.sort((a, b) => b[lowCaseColumn] - a[lowCaseColumn]);
    }
    return sorteredPlanets;
  };
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

  const context = {
    data,
    allColumns,
    filters,
    setFilters,
    isFetching,
    columnDropdown,
    setColumnDropdown,
    sortColumn,
    setSortColumn,
    sortPlanetsByStringTypeColumn,
    sortPlanetsByNumberTypeColumn,
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
