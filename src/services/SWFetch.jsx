const SW_BASE_API = 'https://swapi-trybe.herokuapp.com/api';

const getSWPlanets = async (callback) => {
  try {
    const SWRequest = await fetch(`${SW_BASE_API}/planets`);
    const requestJson = await SWRequest.json();
    callback(requestJson.results);
  } catch (error) {
    console.log(error);
  }
};

export default getSWPlanets;
