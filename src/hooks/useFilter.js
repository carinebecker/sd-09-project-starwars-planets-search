import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { filterByName, filterByNumericValue } from '../utils';
import useAPI from './useAPI';

function useFilter() {
  const planets = useAPI();
  const { filter } = useContext(UserContext);

  const { isSearching } = filter;
  const planetsData = planets && [...planets.data.results];

  if (isSearching) {
    const resultsAfterFilters = filterByName(filter, planetsData)
      .filter((value) => filterByNumericValue(filter, planetsData).includes(value));
    return resultsAfterFilters;
  }

  return planetsData;
}

export default useFilter;
