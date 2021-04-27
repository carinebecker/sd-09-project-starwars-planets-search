import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchStarWarsAPI';

export default function Provider({ children }) {
  const INITIAL_FILTER = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };
  const [filters, setFilter] = useState(INITIAL_FILTER);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const result = await fetchPlanets();
      setData(result);
    })();
  }, []);

  const context = {
    data,
    filters,
    setFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};
