import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const defaultFilters = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: 'maior que',
      value: '',
    },
  ],
};

function InputFilters() {
  const { data, filteredPlanets, setFilteredPlanets } = useContext(PlanetsContext);
  const dataBaseCopy = [...data];
  const [filters, setFilters] = useState(defaultFilters);
  const handleChange = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
  };

  useEffect(() => {
    const verifyEqualityOfArrays = (array1, array2) => {
      if (array1.length !== array2.length) return false;
      for (let index = 0; index < array1.length; index += 1) {
        if (array1[index].name !== array2[index].name) return false;
      }
      return true;
    };
    const applyFilter = () => {
      const newPlanetsArrayFiltered = dataBaseCopy
        .filter((planet) => planet.name.includes((filters.filterByName.name)));
      // filter by name
      if (!verifyEqualityOfArrays(filteredPlanets, newPlanetsArrayFiltered)) {
        setFilteredPlanets(newPlanetsArrayFiltered);
      }
    };

    applyFilter();
  }, [dataBaseCopy, filters, filteredPlanets, setFilteredPlanets]);

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ filters.filterByName.name }
      onChange={ handleChange }
    />
  );
}

export default InputFilters;
