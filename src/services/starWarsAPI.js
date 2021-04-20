const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  try {
    const response = await fetch(url);
    const { results } = await response.json();
    return results.map((planet) => {
      delete planet.residents;
      return planet;
    });
  } catch (error) {
    console.log(error);
  }
};

export default getPlanets;
