import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';

function useNumericFilter() {
  const { filter, setFilter } = useContext(UserContext);
  const { data: planets } = useContext(DataContext);

  const filterByNumericValues = (lastResults, newFilter) => {
    console.log(newFilter);
    // const filteredResults = lastResults.map((planet) => {
    //   console.log(planet);
    // });
    return lastResults;
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
