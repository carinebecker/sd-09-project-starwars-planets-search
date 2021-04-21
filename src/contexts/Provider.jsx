import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/starWarsAPI';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);

  const planetList = async () => {
    const planets = await fetchPlanets();

    setPlanets(planets);
  };

  useEffect(() => {
    planetList();
  }, []);

  const contextValue = { data };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;
