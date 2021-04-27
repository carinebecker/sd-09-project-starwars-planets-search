import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/Context';

const useFilterByName = (initialName) => {
  const { allPlanets, setData, objectFilters, setObjectFilters } = useContext(AppContext);
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setData(allPlanets.filter((planet) => planet.name.includes(name)));
  }, [allPlanets, name, setData]);

  useEffect(() => {
    const byName = objectFilters.filters.filterByName.name;

    if (byName !== name) {
      setObjectFilters({
        ...objectFilters,
        filters: { ...objectFilters.filters, filterByName: { name } },
      });
    }
  }, [name, objectFilters, setObjectFilters]);

  return [name, setName];
};

export default useFilterByName;
