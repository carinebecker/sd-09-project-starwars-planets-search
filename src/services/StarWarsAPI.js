async function planetsDataAPI() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const result = response.json();
  result.results.forEach((element) => delete element.residents);
  return result;
}

export default planetsDataAPI;
