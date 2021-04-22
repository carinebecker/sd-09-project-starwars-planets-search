export default function requestAPI() {
  // const endpointPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const endpointPlanets = 'https://star-api-wars.herokuapp.com/';
  return fetch(endpointPlanets)
    .then((response) => response.json());
}
