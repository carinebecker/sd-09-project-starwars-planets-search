const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const getStarWarsData = async () => {
  try {
    const response = await fetch(URL);
    const { results } = await response.json();
    return results;
  } catch (error) {
    return Error(error);
  }
};

export default getStarWarsData;
