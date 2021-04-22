import { useState } from 'react';
import fetchPlanetsList from '../services';

export default function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = '';
  async function getPlanets() {
    try {
      const planetsList = await fetchPlanetsList();
      setPlanets(planetsList);
    } catch (err) {
      setError(err.message);
    }
  }

  return { planets, getPlanets, error };
}
