export default async function fetchPlanets() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await response.json();
  results.forEach((result) => delete result.residents);
  return results;
}
