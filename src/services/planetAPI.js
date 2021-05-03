export default async function fetchPlanets() {
  const planets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const result = await planets.json();
  return result;
}
