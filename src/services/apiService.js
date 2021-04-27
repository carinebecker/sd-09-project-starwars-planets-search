async function fetchPlanets() {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await request.json();
  const response = results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return response;
}

export default fetchPlanets;
