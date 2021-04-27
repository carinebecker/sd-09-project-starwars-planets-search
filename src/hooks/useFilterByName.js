import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/Context';

const useFilterByName = (initialName) => {
  const { allFilters, setAllFilters } = useContext(AppContext);
  const [name, setName] = useState(initialName);

  useEffect(() => {
    const byName = allFilters.filters.filterByName.name;

    if (byName !== name) {
      setAllFilters({
        ...allFilters,
        filters: { ...allFilters.filters, filterByName: { name } },
      });
    }
  }, [allFilters, name, setAllFilters]);

  return [name, setName];
};

export default useFilterByName;
