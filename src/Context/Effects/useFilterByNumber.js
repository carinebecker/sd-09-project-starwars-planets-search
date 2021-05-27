import { useEffect } from 'react';

function useFilterByNumber(setFilteredPlanets, filterByNumber, planets) {
  useEffect(() => {
    function setFilter() {
      if (!filterByNumber) setFilteredPlanets(planets);
      else {
        filterByNumber.forEach(({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            setFilteredPlanets(planets
              .filter((planet) => parseFloat(planet[column]) > parseFloat(value))); break;
          case 'menor que':
            setFilteredPlanets(planets
              .filter((planet) => parseFloat(planet[column]) < parseFloat(value))); break;
          case 'igual a':
            setFilteredPlanets(
              planets
                .filter((planet) => parseFloat(planet[column]) === parseFloat(value)),
            ); break;
          default: setFilteredPlanets(planets);
          }
        });
      }
    }

    setFilter();
  }, [setFilteredPlanets, filterByNumber, planets]);
}

export default useFilterByNumber;
