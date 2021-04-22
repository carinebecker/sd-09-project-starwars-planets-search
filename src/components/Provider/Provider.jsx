import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import PlanetsContext from '../../context/PlanetsContext';
import { usePlanets } from '../../hooks';

export default function Provider({ children }) {
  const [loading, isLoading] = useState(true);

  const { planets, getPlanets, error } = usePlanets();

  const value = { loading, planets, error };

  useEffect(() => {
    if (!planets.length) {
      getPlanets();
      isLoading(false);
    }
  }, [planets, getPlanets]);

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: shape(),
}.isRequired;
