const fetchData = async () => {
  const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
  console.log(results);
  return results;
};

export default fetchData;
