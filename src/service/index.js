const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsAPI = async () => {
  const results = await fetch(url).then((response) => response.json());
  return results;
};

export default planetsAPI;
