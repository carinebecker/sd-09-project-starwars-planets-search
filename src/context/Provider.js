import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import fetchApiPlanets from '../services/fetchPlanet';

function Provider({ children }) {
  const filterByName = {
    filters: {
      filterByName: {
        name: '',
      },
    },
  };

  const filterByNumeric = {
    filterByNumeric: {
      column: '',
      comparison: '',
      value: 0,
    },
  };

  const [data, setData] = useState({});
  const [filteredByName, setFilteredByName] = useState(filterByName);
  const [filteredByNumeric, setFilteredByNumeric] = useState(filterByNumeric);

  async function getPlanets() {
    const apiResponse = await fetchApiPlanets();
    setData(apiResponse);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    filteredByName,
    setFilteredByName,
    filteredByNumeric,
    setFilteredByNumeric,
  };
  return (
    <StarwarsContext.Provider value={ contextValue }>
      {children}
    </StarwarsContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
