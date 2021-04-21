import { useContext, useEffect, useState } from 'react';
import { PlanetSearchContext } from '../context';

const handleComparison = ({ column, comparison, value }) => {
  switch (comparison) {
  case 'maior que':
    return ({ [column]: entryValue }) => Number(entryValue) > Number(value);
  case 'menor que':
    return ({ [column]: entryValue }) => Number(entryValue) < Number(value);
  case 'igual a':
    return ({ [column]: entryValue }) => entryValue === value;
  default:
    return () => true;
  }
};

const filterByValues = (filters, data) => filters.reduce(
  (filteredData, filter) => filteredData.filter(handleComparison(filter)),
  data,
);

const useFilters = () => {
  const {
    apiData,
    setPlanetsData,
    filters,
    data,
  } = useContext(PlanetSearchContext);

  useEffect(
    () => {
      const { filterByName: { name: typedName }, filterByNumericValues } = filters;
      const filteredData = apiData.filter(({ name }) => name.includes(typedName));
      const hasNumericFilters = filterByNumericValues.length > 0;
      setPlanetsData(
        hasNumericFilters
          ? filterByValues(filterByNumericValues, filteredData)
          : filteredData,
      );
    },
    [filters, apiData, setPlanetsData],
  );
  return [data];
};

const useValuesFilterFields = () => {
  const INITIAL_STATE = { column: '', comparison: '', value: '0' };
  const [valuesFilter, setValuesFilter] = useState(INITIAL_STATE);

  const handleFilterChanges = ({ target: { name, value } }) => {
    setValuesFilter((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  return [valuesFilter, handleFilterChanges];
};

export { useFilters, useValuesFilterFields };
