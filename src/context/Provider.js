import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import fetchApiPlanets from '../services/fetchPlanet';

function Provider({ children }) {
  const filterResults = {
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
  };

  const [data, setData] = useState({});
  const [filteredByName, setFilteredByName] = useState(filterResults);

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
