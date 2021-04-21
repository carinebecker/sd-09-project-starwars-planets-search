import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanets from '../services/starwarsApi';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const context = {
    data,
    loading,
  };

  const getData = async () => {
    const { results } = await getPlanets();
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <PlanetContext.Provider value={ context }>
        {children}
      </PlanetContext.Provider>
    </main>

  );
}
PlanetProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.element),
}.isRequired;
export default PlanetProvider;
