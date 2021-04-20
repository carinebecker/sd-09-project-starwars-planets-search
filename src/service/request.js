const requestAPI = () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  fetch(URL)
    .then((r) => r.json());
};

export default requestAPI;
