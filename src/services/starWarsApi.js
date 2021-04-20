const planetApiRequest = async () => {
  try {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const apiFetch = await fetch(endpoint);
    const { results } = await apiFetch.json();
    return results.map((result) => {
      delete result.residents;
      return result;
    });
  } catch (error) {
    console.log(error);
  }
};

export default planetApiRequest;
