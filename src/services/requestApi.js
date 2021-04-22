const fetchPlanets = (endpoint) => {
  const planets = fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.results);

  return planets;
};

export default fetchPlanets;
