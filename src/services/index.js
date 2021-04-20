const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsData = async () => (fetch(API_URL).then((response) => response.json()));

export default fetchPlanetsData;
