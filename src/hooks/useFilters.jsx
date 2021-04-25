import { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FiltersContext from '../context/FiltersContext';

export default function useFilters() {
  const { planets } = useContext(PlanetsContext);
  const {
    filters: { filterByNumericValues: numericFilters },
  } = useContext(FiltersContext);

  const [allFilters, setFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);

  useEffect(() => {
    if (planets.length) {
      const planetObj = planets[0];
      const numericColumns = Object.keys(planetObj).filter((column) => (
        !Number.isNaN(Number(planetObj[column]))
      ));
      const availableColumns = numericColumns.filter((column) => (
        (numericFilters.findIndex(({ column: usedColumn }) => column === usedColumn) < 0
        )));
      setAvailableFilters(availableColumns);
    }
  }, [numericFilters, planets]);

  useEffect(() => {
    if (planets.length) {
      const planetObj = planets[0];
      const columns = Object.keys(planetObj).filter((column) => (
        column !== 'url'
      ));
      setFilters(columns);
    }
  }, [planets]);

  return { availableFilters, allFilters };
}
