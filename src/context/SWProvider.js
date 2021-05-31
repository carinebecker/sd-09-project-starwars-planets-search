import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import API from '../services/API';

export default function SWProvider({ children }) {
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const columnFilter = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [columnOptions, setColumnOptions] = useState(columnFilter);
  const [tableHeader, setTableHeader] = useState([]);
  const [data, setData] = useState({});

  const getPlanets = async () => {
    const planets = await API();
    setData(planets);
    setTableHeader(Object.keys(planets.results[0]));
  };

  const cleanFilter = (newFilter) => {
    setFilters({ ...filters, filterByNumericValues: newFilter });
    setColumnOptions(columnFilter);
  };

  function setOrder(tableData, c, sort) {
    let orderedData = tableData;
    const menosUm = -1;
    if (c === 'name') {
      orderedData = tableData.sort((a, b) => {
        if (a[c] > b[c]) {
          return 1;
        }
        return menosUm;
      });
    } else {
      orderedData = tableData.sort((a, b) => +(a[c]) - +(b[c]));
    }
    if (sort === 'DESC') {
      orderedData = orderedData.reverse();
    }
    return orderedData;
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const values = {
    data,
    tableHeader,
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    cleanFilter,
    setOrder,
  };

  return (
    <SWContext.Provider value={ values }>
      {children}
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
