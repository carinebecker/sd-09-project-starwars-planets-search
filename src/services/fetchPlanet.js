const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApiPlanets = async () => {
  try {
    const request = await fetch(url).then((response) => response.json());
    console.log(request);
    const planetsApi = request;
    return planetsApi;
  } catch (error) {
    console.log(error);
  }
};

export default fetchApiPlanets;
