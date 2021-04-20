export const requestPlanets = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    return results;
  } catch (error) {
    return Error(error);
  }
};

export default requestPlanets;
