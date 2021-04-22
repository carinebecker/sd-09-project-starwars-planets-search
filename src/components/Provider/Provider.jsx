import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import PlanetsContext from '../../context/PlanetsContext';
import fetchPlanetsList from '../../services';

export default function Provider({ children }) {
  const [loading, isLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = '';

  const value = { loading, planets, error };

  async function getPlanets() {
    const planetsList = await fetchPlanetsList();
    setPlanets(planetsList);
  }

  useEffect(() => {
    if (planets.length) {
      isLoading(false);
    } else {
      try {
        getPlanets();
      } catch (err) {
        setError(err.message);
      }
    }
  }, [loading, planets.length]);

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: shape(),
}.isRequired;
