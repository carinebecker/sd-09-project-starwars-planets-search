import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';

function useNumericFilter() {
  const { filter, setFilter } = useContext(UserContext);
  const { data: planets } = useContext(DataContext);

  const whatsIsMyOperator = (operator) => {
    const comparisonOperator = {
      'maior que': 'greater',
      'igual a': 'equals',
      'menor que': 'less',
    };
    return comparisonOperator[operator];
  };

  const filterByNumericValues = (
    lastResults,
    { column, comparison, numericSearchTerm },
  ) => {
    const comparisonOperator = {
      greater: (n, planetData) => parseInt(planetData, 10) > parseInt(n, 10),
      equals: (n, planetData) => parseInt(planetData, 10) === parseInt(n, 10),
      less: (n, planetData) => parseInt(planetData, 10) < parseInt(n, 10),
    };
    const filteredResults = lastResults.filter(
      (planet) => comparisonOperator[whatsIsMyOperator(comparison)](
        numericSearchTerm,
        planet[column],
      ),
    );
    return filteredResults;
  };

  const setNumericFilter = (newFilter) => {
    setFilter((prevState) => {
      const resultsForFilter = prevState.isSearching
        ? prevState.results
        : planets.data.results;
      const newState = newFilter
        ? {
          ...prevState,
          results: filterByNumericValues(resultsForFilter, newFilter),
          isSearching: true,
          filterByNumericValues: [
            ...prevState.filterByNumericValues,
            { ...newFilter },
          ],
        }
        : {
          ...prevState,
          results: filterByNumericValues(resultsForFilter),
          isSearching:
              prevState.filterByNumericValues.length > 0
              || prevState.filterByName.name !== '',
        };

      return newState;
    });
  };

  return { filter, setNumericFilter };
}

export default useNumericFilter;
