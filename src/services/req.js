async function req() {
  const fetchar = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await fetchar.json();
  return json.results;
}

export default req;
