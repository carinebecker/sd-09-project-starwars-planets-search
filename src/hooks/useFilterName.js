import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';

function useFilterName() {
  const { filter, setFilter } = useContext(UserContext);
  const { data: planets } = useContext(DataContext);

  const handleNameFilter = (name) => {
    setFilter((prevState) => {
      const searchTerm = new RegExp(name, 'i');
      const newState = name
        ? {
          ...prevState,
          isSearching: true,
          results: planets.data.results.filter(
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
          isSearching:
          prevState.filterByNumericValues.length > 0
          || prevState.filterByName.name !== '',
        };
      return newState;
    });
  };

  return { filter, handleNameFilter };
}

export default useFilterName;
