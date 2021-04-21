export default async function fetchApiPlanetList() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const object = await response.json();
  object.results.map((result) => delete result.residents);
  return object;
}
