import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import getPlanets from '../services/starWarsDatabaseApi';

export const StarWarsContext = createContext();

const getPlanetsFromApi = async (setPlanets, setLoading) => {
  const planets = await getPlanets();
  setPlanets(planets);
  setLoading(false);
};

export const StarWarsProvider = ({ children }) => {
  const [planets, setPlanets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlanetsFromApi(setPlanets, setLoading);
  }, []);
  const contextValue = { planets, loading };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: node.isRequired,
};
