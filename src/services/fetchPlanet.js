async function fetchApiPlanets() {
  try {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await request.json();
    response.results.forEach((element) => delete element.residents);
    return response;
  } catch (error) {
    console.log(error, 'fetch planets');
  }
}

export default fetchApiPlanets;
