function fetchApiStarwars() {
  const endpoint = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json())
    .then((data) => data.results);
  return endpoint;
}

export default fetchApiStarwars;
