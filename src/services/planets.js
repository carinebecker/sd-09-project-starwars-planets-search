const getPlanets = async () => (
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
);

export default getPlanets;
