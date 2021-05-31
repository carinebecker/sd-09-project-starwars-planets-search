// const AND_POINT_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
// const getPlanetsData = () => (
//   fetch(AND_POINT_API)
//     .then((response) => (
//       response
//         .json()
//         .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
//     ))
// );

// export default getPlanetsData;

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsAPI = async () => {
  const results = await fetch(url).then((response) => response.json());
  return results;
};

export default planetsAPI;
