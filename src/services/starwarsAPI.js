const ROOT_RESOURCE_URL = 'https://swapi-trybe.herokuapp.com/api';

export const abortController = new AbortController();

async function getStarsData(endpoint = 'planets') {
  const request = await fetch(`${ROOT_RESOURCE_URL}/${endpoint}`, {
    signal: abortController.signal,
  });
  const response = await request.json();
  return response;
}

export default getStarsData;
