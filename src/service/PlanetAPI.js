const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function planetAPI() {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export default planetAPI;
