const starWarsApiURL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fechStarWarsAPI = async () => {
  const reponse = await fetch(starWarsApiURL);
  const json = await reponse.json();
  return json;
};

export default fechStarWarsAPI;
