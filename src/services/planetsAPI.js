const PLANETS_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const planetsRequest = await fetch(PLANETS_API_URL);
  const planetsJson = await planetsRequest.json();
  planetsJson.results.forEach((planet) => delete planet.residents);
  const planets = planetsJson.results;
  // const tableHeaders = Object.keys(planets[0]);
  // console.log(tableHeaders);
  return planets;
};

export default getPlanets;
