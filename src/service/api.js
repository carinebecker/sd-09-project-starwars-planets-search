const planetsAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const planets = await response.json();

  delete planets.residents;

  return planets;
};

export default planetsAPI;
