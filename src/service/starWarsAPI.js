// import data from './dataStarWars';

const planetsURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
const getPlanets = async () => {
  const planetsFetch = await fetch(planetsURL);
  const { results } = await planetsFetch.json();
  return results.map((result) => {
    delete result.residents;
    return result;
  });
};

// const TIMEOUT = 500;

// const simulateRequest = (response) => (callback) => {
//   setTimeout(() => {
//     callback(response);
//   }, TIMEOUT);
// };

// export const getPlanets = () => (
//   new Promise((resolve) => {
//     const planets = data.results;
//     simulateRequest(planets)(resolve);
//   })
// );

export default getPlanets;
