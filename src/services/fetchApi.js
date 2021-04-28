const fetchApi = async () => {
  const endPoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
  const response = await endPoint.json();
  return response;
};

export default fetchApi;
