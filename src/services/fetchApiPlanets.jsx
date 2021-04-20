async function fetchApiPlanets() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const object = await response.json();
  return object;
}

export default fetchApiPlanets;
