async function getPlanets() {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.results;
}

export default getPlanets;
