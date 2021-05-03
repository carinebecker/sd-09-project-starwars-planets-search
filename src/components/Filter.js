const filterPlanets = (arrayPlanets, arrayFilters) => {
  let filtredPlanets = [];
  arrayFilters.forEach(({ column, comparison, value }) => {
    filtredPlanets = arrayPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        return +planet[column] > +value;
      } if (comparison === 'menor que') {
        return +planet[column] < +value;
      } if (comparison === 'igual a') {
        return +planet[column] === +value;
      }
      return planet;
    });
  });
  return arrayFilters.length > 0 ? filtredPlanets : arrayPlanets;
};

export default filterPlanets;
