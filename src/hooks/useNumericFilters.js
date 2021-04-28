import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function useNumericFilter() {
  const { filter, setFilter } = useContext(UserContext);

  const setNumericFilter = (newFilter) => {
    setFilter((prevState) => {
      const newState = newFilter
        ? {
          ...prevState,
          isSearching: true,
          filterByNumericValues: [
            ...prevState.filterByNumericValues,
            { ...newFilter },
          ],
        }
        : {
          ...prevState,
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
