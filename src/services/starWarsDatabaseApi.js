const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets';

const getPlanets = async () => {
  const planetsPromisse = await fetch(endpoint);
  const planetsJson = await planetsPromisse.json();
  return planetsJson;
};

export default getPlanets;
