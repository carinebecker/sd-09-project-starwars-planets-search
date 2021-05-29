import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/Api';

function PlanetsProvider({ children }) {
  const INICIAL_FILTER = {
    filterByName: { name: '' },
    filterByNumericValues: [{
      column: '',
      comparison: '',
      value: '',
    }],
  };
  const INICIAL_DROPCOLUMN = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState({});
  const [tableHeader, setTableHeader] = useState([]);
  const [filters, setFilters] = useState(INICIAL_FILTER);
  const [columnOptions, setColumnOptions] = useState(INICIAL_DROPCOLUMN);

  const getPlanetsData = async () => {
    const planets = await fetchPlanets();
    setData(planets);
    setTableHeader(Object.keys(planets.results[0]));
  };

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
