async function planetsDataAPI() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const result = await response.json();
  result.results.forEach((element) => delete element.residents);
  return result;
}

export default planetsDataAPI;
