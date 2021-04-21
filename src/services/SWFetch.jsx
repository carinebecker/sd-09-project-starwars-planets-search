const SW_BASE_API = 'https://swapi-trybe.herokuapp.com/api';

const getSWPlanets = async () => {
  const SWRequest = await fetch(`${SW_BASE_API}/planets`);
  const requestJson = await SWRequest.json();
  // console.log('SWFetch', requestJson.results);

  return requestJson.results;
};

export default getSWPlanets;
