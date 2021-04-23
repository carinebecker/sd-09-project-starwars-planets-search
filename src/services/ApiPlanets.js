async function loadPlanets() {
  // const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const url = 'https://star-api-wars.herokuapp.com/';
  const returnArray = [];

  const planets = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  planets.results.forEach((planet) => {
    delete planet.residents;
    returnArray.push(planet);
  });

  return returnArray;
}

export default loadPlanets;
