const requestApiStarWars = async () => {
  const urlApi = 'https://swapi-trybe.herokuapp.com/api';
  try {
    const response = await fetch(`${urlApi}/planets/`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error('Failed to fetch API');
  }
};

export default requestApiStarWars;
