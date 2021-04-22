async function fetchPlanets() {
  const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets')
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
}

export default fetchPlanets;
