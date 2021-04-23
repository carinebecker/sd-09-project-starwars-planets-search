import { useContext, useCallback } from 'react';
import Context from '../context/Context';

export default function useLogic() {
  const { data, filters, setTableContent } = useContext(Context);
  const filteredPlanets = useCallback(() => {
    const planetsAfterNameFilter = (planetData) => {
      const {
        filterByName: { name },
      } = filters;
      const nameFilter = planetData.filter((item) => item.name.toLowerCase()
        .includes(name.toLowerCase()));
      return nameFilter;
    };
    const planetsAfterNumericFilter = () => {
      const { filterByNumericValues } = filters;
      if (filterByNumericValues.length) {
        const numericFilteredPlanets = filterByNumericValues.map((item) => {
          switch (item.comparison) {
          case 'maior que':
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] > parseInt(item.value, 10),
            );
          case 'menor que':
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] < parseInt(item.value, 10),
            );
          case 'igual a':
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] === item.value,
            );
          default:
            return planetsAfterNameFilter(data);
          }
        });
        return numericFilteredPlanets[0];
      }
      return planetsAfterNameFilter(data);
    };

    const planetsAfterOrderFilter = () => {
      if (filters.order.sort === 'ASC') {
        return planetsAfterNumericFilter().sort((a, b) => a[filters.order.column]
          .localeCompare(b[filters.order.column]));
      }
      return planetsAfterNumericFilter().sort((a, b) => b[filters.order.column]
        .localeCompare(a[filters.order.column]));
    };

    setTableContent(planetsAfterOrderFilter());
  }, [data, filters, setTableContent]);

  return {
    filteredPlanets,
  };
}
