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

  const resetFilter = (newFilter) => {
    setFilters({ ...filters, filterByNumericValues: newFilter });
    setColumnOptions(columnFilter);
  };

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
    resetFilter,
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
