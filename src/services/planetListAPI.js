// import data from '../testData';
/* const getPlanets = async () => {
  return data.results;
}; */
const getPlanets = async () => {
  const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  try {
    const response = await fetch(ENDPOINT);
    if (response.ok) {
      const planets = await response.json();
      return planets.results;
    }
    throw new Error('Falha na busca por planetas!');
  } catch (error) {
    return error;
  }
};

export default getPlanets;
