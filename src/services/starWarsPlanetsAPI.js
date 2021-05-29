const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
const urlName = 'https://swapi-trybe.herokuapp.com/api/planets/?search=';

// const fetchPlanets = () => {
//   const response = fetch(url)
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
//   return response;
// };

const fetchPlanets = async () => {
  try {
    const response = await fetch(url);
    const respJson = await response.json();
    // console.log(respJson);
    return respJson;
  } catch (error) {
    console.log(error);
  }
};

const fetchPlanetsByName = async (name) => {
  try {
    const response = await fetch(`${urlName}${name}`);
    const respJson = await response.json();
    console.log(respJson);
    return respJson;
  } catch (error) {
    console.log(error);
  }
};

export { fetchPlanets, fetchPlanetsByName };
