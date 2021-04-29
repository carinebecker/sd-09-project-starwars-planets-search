const fetchPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';
  try {
    const response = await fetch(endpoint);
    const planets = await response.json();
    return planets.results;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPlanets;
