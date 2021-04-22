const PLANET_ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsList = async () => {
  try {
    const planetsHTTP = await fetch(PLANET_ENDPOINT);
    if (!planetsHTTP.ok) {
      throw new Error('Failed to fetch planets list.');
    }
    const planetsJSON = await planetsHTTP.json();
    return planetsJSON.results;
  } catch (e) {
    return {
      message: e.message,
      results: [],
    };
  }
};

export default fetchPlanetsList;
