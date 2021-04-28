import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/Api';

import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const INITIAL_STATE = {
    filterByName: { name: '' },
  };

  const [data, setData] = useState([]);
  const [filters, setFilterName] = useState(INITIAL_STATE);

  const getPlanets = async () => {
    const planets = await planetsAPI();
    const { results } = planets;
    setData(results);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    filters,
    setFilterName,
  };

  return (
    <StarWarsContext.Provider value={ { contextValue } }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
