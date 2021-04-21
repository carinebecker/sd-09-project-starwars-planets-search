const fetchPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const planetsFromApi = await response.json();
  const planet = planetsFromApi.results.map((item) => {
    delete item.residents;
    return item;
  });
  return planet;
};

export default fetchPlanets;
