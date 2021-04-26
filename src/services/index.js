const BASE_API = 'https://swapi-trybe.herokuapp.com';

async function dataAPI() {
  const response = await fetch(`${BASE_API}/api/planets/`);
  const result = await response.json();
  return result;
}

export default dataAPI;
