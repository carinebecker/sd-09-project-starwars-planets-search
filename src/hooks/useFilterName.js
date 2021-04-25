import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';

function useFilterName() {
  const { filter, setFilter } = useContext(UserContext);
  const { data: planets } = useContext(DataContext);

  const handleNameFilter = ({ target: { value: name } }) => {
    const isSearching = name.length > 0;
    setFilter((prevState) => {
      const searchTerm = new RegExp(name, 'i');
      const newState = planets
        ? {
          ...prevState,
          isSearching,
          results: planets.data.results.filter(
            (planet) => searchTerm.test(planet.name),
          ),
          filterByName: {
            name,
          },
        }
        : prevState;
      return newState;
    });
  };

  return { filter, handleNameFilter };
}

export default useFilterName;
