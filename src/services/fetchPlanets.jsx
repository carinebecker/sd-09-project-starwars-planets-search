export default async function fetchPlanets() {
  const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets')
    .then((response) => response.json());
  //   const response = await fetch(endpoint);
  // const data = await response.json();
  return data;
}
