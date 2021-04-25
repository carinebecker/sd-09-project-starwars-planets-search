async function dataApi() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const fetchResponse = await fetch(url);
  const response = await fetchResponse.json();
  const { results } = response;
  const data = results.map((eachResult) => {
    delete eachResult.residents;
    return eachResult;
  });
  return data;
}

export default dataApi;
