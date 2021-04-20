async function requestAPI() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const repo = await fetch(URL);
  const data = await repo.json();
  const planets = data.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return planets;
}

export default requestAPI;
