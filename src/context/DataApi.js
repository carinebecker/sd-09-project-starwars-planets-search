import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchData from '../services/fetchData';
import DataApiContext from './DataApiContext';

const INITIAL_COLUMN_DROPDOWN_STATE = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_FILTERS_STATE = {
  filterByName:
  { name: '' },
  filterByNumericValues: [],
};

const INITIAL_SORT_COLUMN_STATE = {
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

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

const DataApiContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [columnDropdown, setColumnDropdown] = useState(INITIAL_COLUMN_DROPDOWN_STATE);
  const [filters, setFilters] = useState(INITIAL_FILTERS_STATE);
  const [sortColumn, setSortColumn] = useState(INITIAL_SORT_COLUMN_STATE);

  const getApiData = async () => {
    const apiData = await fetchData();
    setData(apiData);
    setIsFetching(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const sortPlanets = () => {
    const { order: { sort, column } } = sortColumn;
    // console.log(column);
    const lowCaseColumn = column.toLowerCase();
    let sorteredPlanets = [];
    sorteredPlanets = data.sort((a, b) => {
      const value1 = sort === 'ASC' ? a : b;
      const value2 = sort === 'ASC' ? b : a;
      // console.log(value1[lowCaseColumn]);
      if (Number.isNaN(+value1[lowCaseColumn])) {
        return value1[lowCaseColumn].localeCompare(value2[lowCaseColumn]);
      }
      return (+value1[lowCaseColumn]) - (+value2[lowCaseColumn]);
    });
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
    sortPlanets,
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
