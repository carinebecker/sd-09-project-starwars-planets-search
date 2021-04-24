async function fetchApi() {
  const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
  const response = await endpoint.json();
  return response.results.map((api) => delete api.residents);
}

export default fetchApi;
