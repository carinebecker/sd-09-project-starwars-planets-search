import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function useFilterName() {
  const { filter, setFilter } = useContext(UserContext);

  const handleNameFilter = (name) => {
    setFilter((prevState) => {
      const newState = name
        ? {
          ...prevState,
          isSearching: true,
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
          && prevState.filterByName.name !== '',
        };
      return newState;
    });
  };

  return { filter, handleNameFilter };
}

export default useFilterName;
