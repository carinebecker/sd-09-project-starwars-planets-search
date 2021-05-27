import { useEffect } from 'react';

function useFilterByName(setFilteredPlanets, filterByName, planets) {
  useEffect(() => {
    function setFilter() {
      if (!filterByName) setFilteredPlanets(planets);
      else {
        const filter = planets.filter((planet) => planet.name.includes(filterByName));
        setFilteredPlanets(filter);
      }
    }

    setFilter();
  }, [setFilteredPlanets, filterByName, planets]);
}

export default useFilterByName;
