export default {
  filterByName: (arr = [], text) => {
    const planets = arr;
    return planets.filter((planet) => planet
      .name
      .toLowerCase()
      .includes(text.toLowerCase()));
  },

  filterByNumbers: (arr = [], numFilters = []) => {
    const planets = arr;
    const filters = numFilters;
    let filteredPlanets = [];
    filters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filteredPlanets = [...planets
          .filter((planet) => Number(planet[filter.column]) > Number(filter.value))];
      }
      if (filter.comparison === 'menor que') {
        filteredPlanets = [...planets
          .filter((planet) => Number(planet[filter.column]) < Number(filter.value))];
      }
      if (filter.comparison === 'igual a') {
        filteredPlanets = [...planets
          .filter((planet) => Number(planet[filter.column]) === Number(filter.value))];
      }
    });
    return filteredPlanets;
  },
};
