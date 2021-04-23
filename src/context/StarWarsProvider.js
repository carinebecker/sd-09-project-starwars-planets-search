import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/StarWarsApi';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const context = { data };

  useEffect(() => {
    const fetchData = async () => {
      const planetsApi = await getPlanets();
      setData(planetsApi);
    };
    fetchData();
  }, []);

  return (
    <main>
      <StarWarsContext.Provider value={ context }>
        {children}
      </StarWarsContext.Provider>
    </main>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarWarsProvider;
