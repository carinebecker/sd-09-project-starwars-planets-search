const fetchApi = async () => {
  const urlStar = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(urlStar);
  const response = await request.json();
  return response.results;
};

export default fetchApi;
