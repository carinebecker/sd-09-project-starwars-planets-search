const SWAPI = 'https://swapi-trybe.herokuapp.com/api';

export const fetchPlanets = () => (
  fetch(`${SWAPI}/planets/`).then((response) => response.json().then((data) => data))
    .catch((error) => error)
);

export const fetchStarships = () => (
  fetch(`${SWAPI}/starships/`).then((response) => response.json().then((data) => data))
    .catch((error) => error)
);
