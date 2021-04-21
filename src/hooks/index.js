import { useContext, useEffect } from 'react';
import { PlanetSearchContext } from '../context';

const useFilters = () => {
  const {
    apiData,
    setPlanetsData,
    filters,
    data,
  } = useContext(PlanetSearchContext);

  useEffect(
    () => {
      const { filterByName: { name: typedName } } = filters;
      const filteredData = apiData.filter(({ name }) => name.includes(typedName));
      setPlanetsData(filteredData);
    },
    [filters, apiData, setPlanetsData],
  );
  return [data];
};

export default useFilters;
