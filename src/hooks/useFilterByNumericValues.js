import { useContext, useState } from 'react';
import AppContext from '../context/Context';

const useFilterByNumericValues = (initialValue) => {
  const {
    allFilters, setAllFilters,
    selectColumn, setSelectColumn,
  } = useContext(AppContext);

  const [fields, setFields] = useState(initialValue);
  const { column, comparison, value } = fields;

  const handleChangeFields = ({ name, value: valueField }) => {
    setFields({ ...fields, [name]: valueField });
  };

  const handleSubmitFilter = (event) => {
    event.preventDefault();

    const { filterByNumericValues: arrayNumericValues } = allFilters.filters;

    selectColumn.splice(selectColumn.indexOf(column), 1);
    setSelectColumn([...selectColumn]);

    const findFilter = arrayNumericValues
      .some((filter) => filter.column === column
        && filter.comparison === comparison
        && filter.value === value.toString());

    if (!findFilter) {
      setAllFilters({
        ...allFilters,
        filters: {
          ...allFilters.filters,
          filterByNumericValues: [
            ...allFilters.filters.filterByNumericValues,
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
