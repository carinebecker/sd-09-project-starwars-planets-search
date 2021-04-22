import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/Api';

import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const getPlanets = async () => {
    const planets = await planetsAPI();
    const { results } = planets;
    setData(results);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={ { data } }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
