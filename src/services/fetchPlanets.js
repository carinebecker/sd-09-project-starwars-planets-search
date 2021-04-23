async function fetchPlanets() {
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const dataAPI = await fetch(END_POINT)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return dataAPI;
}

export default fetchPlanets;
