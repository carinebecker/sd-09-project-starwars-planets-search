const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const requestPlanets = async () => {
  const requestApi = await fetch(END_POINT);
  const requestJson = await requestApi.json();
  return requestJson;
};

export default requestPlanets;
