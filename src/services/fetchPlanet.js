const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApiPlanets = async () => {
  const request = await fetch(url).then((response) => response.json());
  return request.results;
};

export default fetchApiPlanets;
