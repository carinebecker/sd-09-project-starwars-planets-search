async function fetchApi() {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const object = await response.json();
    delete object.residents;
    return object;
  } catch (error) {
    console.log(error);
  }
}

export default fetchApi;
