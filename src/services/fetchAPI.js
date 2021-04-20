export const requestPlanets = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const currencies = await response.json();
    return currencies;
  } catch (error) {
    return Error(error);
  }
};

export default requestPlanets;
