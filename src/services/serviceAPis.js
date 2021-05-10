const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

const reqPlanets = async () => {
  const api = await fetch(endPoint);
  const response = await api.json();
  const result = response.results;
  // delete é um 'operador' que deleta chaves de um obj em expecifico
  result.forEach((element) => delete element.residents);
  return result;
};

export default reqPlanets;
