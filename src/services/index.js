export default {
  fetchData: async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const request = await fetch(url);
    const requestJSON = request.json();
    return requestJSON;
  },
};
