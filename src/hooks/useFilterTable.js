import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/Context';

const useFilterTable = () => {
  const { data, allFilters } = useContext(AppContext);
  const {
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
  } = allFilters;
  const [planetsFilter, setPlanetsFilter] = useState(data);
  const [filtersLength, setFiltersLength] = useState(0);

  useEffect(() => {
    setPlanetsFilter(data.filter((planet) => planet.name.includes(name)));
  }, [data, name]);

  useEffect(() => {
    if (filtersLength !== filterByNumericValues.length) {
      setFiltersLength(filterByNumericValues.length);

      filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          setPlanetsFilter(planetsFilter.filter(
            (planet) => planet[column] > parseInt(value, 10),
          ));
          break;
        case 'menor que':
          setPlanetsFilter(planetsFilter.filter(
            (planet) => planet[column] < parseInt(value, 10),
          ));
          break;
        case 'igual a':
          setPlanetsFilter(planetsFilter.filter(
            (planet) => planet[column] === value,
          ));
          break;
        default:
          setPlanetsFilter(planetsFilter);
          break;
        }
      });
    }
  }, [filterByNumericValues, filtersLength, planetsFilter]);

  return [planetsFilter];
};

export default useFilterTable;
