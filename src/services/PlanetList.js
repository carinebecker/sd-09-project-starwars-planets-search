const getPlanetList = async () => {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const result = await fetch(endPoint)
    .then((response) => response.json())
    .then((json) => json);

  return result;
};

export default getPlanetList;
