const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsAPI = async () => {
  const response = await fetch(PLANETS_API);
  const { results } = await response.json();
  const newResults = results.map((result) => {
    delete result.residents;
    return result;
  });
  return newResults;
};

export default getPlanetsAPI;
