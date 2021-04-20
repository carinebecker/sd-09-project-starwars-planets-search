const requestPlanetsApi = async () => {
  try {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const resp = await request.json();
    return resp.results;
  } catch (error) {
    console.log(error);
  }
};

export default requestPlanetsApi;
