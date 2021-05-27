export default async function API() {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await request.json();

  return data.results;
}
