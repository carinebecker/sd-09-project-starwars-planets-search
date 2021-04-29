const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanets = () => {
  const response = fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return response;
};

export default fetchPlanets;
