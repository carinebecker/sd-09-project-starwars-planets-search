async function requestAPI() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const repo = await fetch(URL);
  const data = await repo.json();
  return data;
}

export default requestAPI;
