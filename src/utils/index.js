export const filterByName = (filter, data) => {
  const searchTerm = new RegExp(filter.filterByName.name, 'i');
  const filtered = data.filter((planet) => searchTerm.test(planet.name));
  return filtered;
};

export const filterByNumericValue = (filter, data) => {
  const whatsIsMyOperator = (operator) => {
    const namesComparisonOperator = {
      'maior que': 'larger',
      'igual a': 'equals',
      'menor que': 'less',
    };
    return namesComparisonOperator[operator].toString();
  };

  const getFilterByNumericValues = (
    lastResults,
    { column, comparison: operator, numericSearchTerm },
  ) => {
    const comparison = {
      larger: (n, planetData) => parseInt(planetData, 10) > parseInt(n, 10),
      equals: (n, planetData) => parseInt(planetData, 10) === parseInt(n, 10),
      less: (n, planetData) => parseInt(planetData, 10) < parseInt(n, 10),
    };
    const filteredResults = lastResults.filter(
      (planet) => comparison[whatsIsMyOperator(operator)](
        numericSearchTerm,
        planet[column],
      ),
    );
    return filteredResults;
  };

  const results = filter.filterByNumericValues.reduce((resultsNumeric, filterNumeric) => {
    resultsNumeric = getFilterByNumericValues(resultsNumeric, filterNumeric);
    return resultsNumeric;
  }, data);

  return results;
};
