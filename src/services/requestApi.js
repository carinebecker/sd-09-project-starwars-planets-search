const fetchPlanets = (endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/') => {
  const planets = fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.results);
  return planets;
};

export default fetchPlanets;
