const getPlanets = async () => {
  const newUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
  // const newUrl = 'https://star-api-wars.herokuapp.com/';
  const result = await fetch(newUrl).then((response) => response.json());
  return result;
};

export default getPlanets;
