import { useContext, useState } from 'react';
import AppContext from '../context/Context';

const useFilterByNumericValues = (initialValue) => {
  const {
    allPlanets, setData,
    objectFilters, setObjectFilters,
    selectColumn, setSelectColumn,
  } = useContext(AppContext);

  const [fields, setFields] = useState(initialValue);
  const { column, comparison, value } = fields;

  const getComparisonArrayFiltered = () => {
    let filterByNumericValues = [];

    switch (comparison) {
    case 'maior que':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[column] > parseInt(value, 10),
      );
      break;
    case 'menor que':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[column] < parseInt(value, 10),
      );
      break;
    case 'igual a':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[column] === value,
      );
      break;

    default:
      filterByNumericValues = allPlanets;
      break;
    }

    return filterByNumericValues;
  };

  const handleChangeFields = ({ name, value: valueField }) => {
    setFields({ ...fields, [name]: valueField });
  };

  const handleSubmitFilter = (event) => {
    event.preventDefault();

    const planetsFiltered = getComparisonArrayFiltered();
    const { filterByNumericValues: arrayNumericValues } = objectFilters.filters;

    selectColumn.splice(selectColumn.indexOf(column), 1);
    setSelectColumn([...selectColumn]);

    setData(planetsFiltered);

    if (arrayNumericValues) {
      const findFilter = arrayNumericValues
        .some((filter) => filter.column === column
        && filter.comparison === comparison
        && filter.value === value.toString());
      console.log('findFilter', findFilter);

      if (!findFilter) {
        setObjectFilters({
          ...objectFilters,
          filters: {
            ...objectFilters.filters,
            filterByNumericValues: [
              ...objectFilters.filters.filterByNumericValues,
              { column, comparison, value: value.toString() },
            ],
          },
        });
      }
    } else {
      setObjectFilters({
        ...objectFilters,
        filters: {
          ...objectFilters.filters,
          filterByNumericValues: [
            { column, comparison, value: value.toString() },
          ],
        },
      });
    }

    setFields({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  return [fields, selectColumn, handleChangeFields, handleSubmitFilter];
};

export default useFilterByNumericValues;
