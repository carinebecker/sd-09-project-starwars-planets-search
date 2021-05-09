const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const data = await fetch(PLANETS_API);
  const { results } = await data.json();
  console.log(results);
  return results;
};

export default getPlanets;
