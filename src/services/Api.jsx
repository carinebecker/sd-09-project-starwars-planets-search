async function fecthApi() {
  const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json())
    .then((data) => data.results);
  return result;
}

export default fecthApi;
