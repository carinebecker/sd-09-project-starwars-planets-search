function numericFilter(planets, filterOption) {
  const { column, comparison, value } = filterOption;
  switch (comparison) {
  case ('maior que'):
    return planets
      .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
  case ('igual a'):
    return planets
      .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
  case ('menor que'):
    return planets
      .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
  default:
    return planets;
  }
}

export default numericFilter;
