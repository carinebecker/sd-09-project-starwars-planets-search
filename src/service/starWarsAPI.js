const planetsURL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const planetsFetch = await fetch(planetsURL);
  const { results } = await planetsFetch.json();
  return results.map((result) => {
    delete result.residents;
    return result;
  });
};

export default getPlanets;
