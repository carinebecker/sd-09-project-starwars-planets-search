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
  const handleChangeByName = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
  };

  console.log(filters);

  const handleChangeByNumeric = ({ target }) => {
    const obj = { ...filters };
    obj.filterByNumericValues[0][target.name] = target.value;
    setFilters(obj);
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
      // filter by name
      const newPlanetsArrayFiltered = dataBaseCopy
        .filter((planet) => planet.name.includes((filters.filterByName.name)));
      if (!verifyEqualityOfArrays(filteredPlanets, newPlanetsArrayFiltered)) {
        setFilteredPlanets(newPlanetsArrayFiltered);
      }
    };

    applyFilter();
  }, [dataBaseCopy, filters, filteredPlanets, setFilteredPlanets]);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ filters.filterByName.name }
        onChange={ handleChangeByName }
      />
      <label htmlFor="column-filter">
        Column-filter
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleChangeByNumeric }
        >
          <option value="">select</option>
          <option value="orbital_period">orbital period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison-filter
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleChangeByNumeric }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
    </section>
  );
}

export default InputFilters;
