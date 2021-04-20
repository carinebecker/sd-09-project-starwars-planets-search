const requestApiStarWars = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch API');
  }
};

export default requestApiStarWars;
