export default async function API() {
  const resp = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await resp.json();
  data.results.forEach((e) => delete e.residents);

  return data;
}
