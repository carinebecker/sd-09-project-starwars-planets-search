export default {
  filterByName: (arr = [], text) => {
    const planets = arr;
    return planets.filter((planet) => planet
      .name
      .toLowerCase()
      .includes(text.toLowerCase()));
  },
};
