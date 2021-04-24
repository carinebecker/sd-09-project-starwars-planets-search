import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetsContext = createContext();

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export function usePlanets() {
  const context = useContext(PlanetsContext);
  const { planets, setPlanets } = context;
  return { planets, setPlanets };
}

PlanetsProvider.propTypes = {
  children: PropTypes.ReactComponentLike,
}.isRequired;
