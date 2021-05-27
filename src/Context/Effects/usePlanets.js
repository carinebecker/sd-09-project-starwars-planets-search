import { useEffect } from 'react';

function usePlanets(setPlanets, setLoading) {
  useEffect(() => {
    async function getPlanets() {
      const API = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planetList = await fetch(API)
        .then((response) => response.json())
        .then((json) => json.results);
      setPlanets(planetList);
      setLoading(false);
    }

    getPlanets();
  }, [setPlanets, setLoading]);
}

export default usePlanets;
