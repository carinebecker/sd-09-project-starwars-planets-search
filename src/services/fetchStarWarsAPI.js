export default async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets';
  const response = await fetch(endpoint);
  const planets = await response.json();
  planets.results.forEach((result) => delete result.residents);
  return planets;
}
