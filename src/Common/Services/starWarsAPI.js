export async function fetchPlanets(url) {
  const resolvePlanets = await fetch(url);
  const retrievedPlanets = await resolvePlanets.json();
  return retrievedPlanets.results;
}

export const StarWars = 'StarWars';
