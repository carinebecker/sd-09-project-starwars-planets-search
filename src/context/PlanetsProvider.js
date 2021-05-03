import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchPlanetApi from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

const initialFilters = {
  filterByName: { name: '' },
  filterByNumericValues: [],
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(initialFilters);

  const getData = async () => setData(await fetchPlanetApi());
  useEffect(() => { getData(); }, []);

  function handleName({ target: { value, name } }) {
    setFilters({ ...filters, filterByName: { [name]: value.toLowerCase() } });
  }

  function handleNum(values) {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, values] });
  }

  const value = {
    data,
    filters,
    handleName,
    handleNum,
  };

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = { children: node }.isRequired;

export default PlanetsProvider;
