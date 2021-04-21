async function getPlanets() {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    data.results.map((planet) => delete planet.residents);
    return data.results;
    // remover a chave residents
  } catch (error) {
    console.log(error);
  }
}

export default getPlanets;
