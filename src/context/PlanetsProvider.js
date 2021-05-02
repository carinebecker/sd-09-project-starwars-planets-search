import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchPlanetApi from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

const initialFilters = { filterByName: { name: '' } };

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(initialFilters);

  const getData = async () => setData(await fetchPlanetApi());
  useEffect(() => { getData(); }, []);

  const handleName = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value.toLowerCase() } });
  };

  const value = { data, filters, handleName };

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = { children: node }.isRequired;

export default PlanetsProvider;
