import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import reqPlanets from '../services/serviceAPis';

const StarWarsContext = createContext();

function Provider({ children }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await reqPlanets();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = { data };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export { StarWarsContext, Provider };
