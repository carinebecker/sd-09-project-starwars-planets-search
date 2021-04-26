import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';

function useFilterName() {
  const { filter, setFilter } = useContext(UserContext);
  const { data: planets } = useContext(DataContext);

  const handleNameFilter = (name) => {
    setFilter((prevState) => {
      const searchTerm = new RegExp(name, 'i');
      const resultsForFilter = prevState.isSearching
        ? prevState.results
        : planets.data.results;
      const newState = name
        ? {
          ...prevState,
          isSearching: true,
          results: resultsForFilter.filter(
            (planet) => searchTerm.test(planet.name),
          ),
          filterByName: {
            name,
          },
        }
        : {
          ...prevState,
          filterByName: {
            name,
          },
          results: planets.data.results,
          isSearching:
          prevState.filterByNumericValues.length > 0
          && prevState.filterByName.name !== '',
        };
      return newState;
    });
  };

  return { filter, handleNameFilter };
}

export default useFilterName;
