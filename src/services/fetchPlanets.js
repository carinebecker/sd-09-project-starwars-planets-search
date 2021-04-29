export const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const fetchPlanets = async () => {
  const dataFetched = await fetch(ENDPOINT)
    .then((response) => response.json());
  dataFetched.results.forEach((planet) => delete planet.residents);
  return dataFetched.results;
};
