import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';
import fetchApiPlanets from '../services/fetchPlanet';

function Provider({ children }) {
  const [data, setData] = useState([]);

  async function getPlanets() {
    const apiResponse = await fetchApiPlanets();
    setData(apiResponse);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  console.log(data);
  const contextValue = {
    data,
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
