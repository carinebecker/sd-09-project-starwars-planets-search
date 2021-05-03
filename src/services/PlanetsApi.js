export default async function fetchPlanetApi() {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const promisse = await fetch(endPoint);
  const planetsObj = await promisse.json();
  planetsObj.results.forEach((planet) => delete planet.residents);
  // planetsObj.results.forEach(({ films }) => films
  //   .forEach(async (EP) => ((await (await fetch(EP)).json()).title)));
  // trecho acima recupera nome dos filmes
  return planetsObj;
}
