import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import fetchApi from '../services/requestApi';
import contextSW from './contextSW';

export default function Provider({ children }) {
  const INITIAL_FILTERS = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [{
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
    {
      column: 'diameter',
      comparison: 'menor que',
      value: '8000',
    }],
  };

  const [data, setData] = useState({});
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    const planets = fetchApi();
    setData(planets);
  }, []);

  const context = {
    data,
    filters,
    setFilters,
  };

  return (
    <contextSW.Provider value={ context }>
      {children}
    </contextSW.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};
