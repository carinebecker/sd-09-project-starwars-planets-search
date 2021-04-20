const andPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

function planetsApi() {
  return fetch(andPoint).then((response) => (response.json()
    .then((data) => (data))))
    .catch((error) => (console.log(error)));
}

export default planetsApi;
