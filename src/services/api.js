export default async function fetchAPI() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  data.results.forEach((result) => { delete result.residents; });
  return data;
}
