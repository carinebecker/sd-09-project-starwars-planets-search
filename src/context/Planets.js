import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetContext = createContext();

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  return (
    <PlanetContext.Provider value={ { planets, setPlanets } }>
      { children }
    </PlanetContext.Provider>
  );
}

export function usePlanet() {
  const context = useContext(PlanetContext);
  const { planets, setPlanets } = context;
  return { planets, setPlanets };
}

PlanetProvider.propTypes = {
  children: PropTypes.ReactComponentLike,
}.isRequired;
