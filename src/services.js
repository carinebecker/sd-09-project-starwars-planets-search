export default function requestAPI() {
  const endpointPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(endpointPlanets)
    .then((response) => response.json());
}
