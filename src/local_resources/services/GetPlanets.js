async function GetPlanets() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';
  try {
    const apiResults = await fetch(url);
    const planets = await apiResults.json();
    return planets;
  } catch (error) {
    return console.log(error.message);
  }
}
export default GetPlanets;
