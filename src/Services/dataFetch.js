const urlPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';

const dataFetch = async () => {
  const response = await fetch(urlPlanets);
  const result = await response.json();
  const { results } = result;
  const data = results.map((res) => {
    delete res.residents;
    return res;
  });
  return data;
};

export default dataFetch;
