import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/Api';

function PlanetsProvider({ children }) {
  const INITIAL_FILTER = {
    filterByName: { name: '' },
    filterByNumericValues: [{
      column: '',
      comparison: '',
      value: '',
    }],
    order: { column: 'name', sort: 'ASC' },
  };
  const INITIAL_DROPCOLUMN = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState({});
  const [tableHeader, setTableHeader] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const [columnOptions, setColumnOptions] = useState(INITIAL_DROPCOLUMN);

  const getPlanetsData = async () => {
    const planets = await fetchPlanets();
    setData(planets);
    setTableHeader(Object.keys(planets.results[0]));
  };

  const resetFilter = () => {
    setFilters(INITIAL_FILTER);
    setColumnOptions(INITIAL_DROPCOLUMN);
  };

  function setOrder(tableData, column, sort) {
    let orderedData = tableData;
    const magicNumber = -1;
    if (column === 'name') {
      orderedData = tableData.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        }
        return magicNumber;
      });
    } else {
      orderedData = tableData.sort((a, b) => +(a[column]) - +(b[column]));
    }
    if (sort === 'DESC') {
      orderedData = orderedData.reverse();
    }
    return orderedData;
  }

  useEffect(() => {
    getPlanetsData();
  }, []);

  const context = {
    data,
    tableHeader,
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    resetFilter,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
