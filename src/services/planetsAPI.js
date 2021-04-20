const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

const requestPlanetList = async () => {
  try {
    const response = await fetch(endpoint);
    const planetList = await response.json();

    return planetList.results;
  } catch (error) {
    console.log(error);
  }
};

export default requestPlanetList;
