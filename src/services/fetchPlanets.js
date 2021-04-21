async function fetchPlanets() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const result = await response.json();
  const planets = await result.results;
  return planets;
}

export default fetchPlanets;
