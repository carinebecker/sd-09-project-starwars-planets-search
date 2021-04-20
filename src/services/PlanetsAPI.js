const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanets = async () => {
  const planetList = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.results);
  return planetList;
};

export default fetchPlanets;
