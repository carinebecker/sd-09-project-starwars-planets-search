async function fetchApi() {
  const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
  const response = await endpoint.json();
  response.results.map((api) => delete api.residents);
  setData(response);
}

export default fetchApi;
