const fetchPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const planetsObj = await response.json();
  return planetsObj;
};
export default fetchPlanets;
