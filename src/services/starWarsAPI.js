const fetchPlanets = async () => {
  try {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const request = await fetch(endpoint);
    const { results } = await request.json();

    return results;
  } catch (error) {
    return Error(error);
  }
};

export { fetchPlanets };
