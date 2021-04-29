export default function getPlanetsData() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((result) => result.json());
}
