const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsAPI = async () => {
  try {
    const getApi = await fetch(ENDPOINT);
    const results = await getApi.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default planetsAPI;
