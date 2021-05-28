import { useEffect } from 'react';

function useSort(setFilteredPlanets, order, planets) {
  const bigger = 1;
  const smaller = -1;
  useEffect(() => {
    function alphabeticalSort(planetA, planetB) {
      if (order.sort === 'ASC') {
        return (planetA[order.column] > planetB[order.column]) ? bigger : smaller;
      }
      return (planetB[order.column] > planetA[order.column]) ? bigger : smaller;
    }
    function setSort() {
      const sortedPlanets = [...planets].sort((planetA, planetB) => {
        if (order.column === 'name') return alphabeticalSort(planetA, planetB);
        if (order.sort === 'ASC') {
          return parseFloat(planetA[order.column]) - parseFloat(planetB[order.column]);
        }
        return parseFloat(planetB[order.column]) - parseFloat(planetA[order.column]);
      });

      setFilteredPlanets(sortedPlanets);
    }

    setSort();
  }, [setFilteredPlanets, order, planets, smaller, bigger]);
}

export default useSort;
