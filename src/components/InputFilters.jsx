import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const defaultFilters = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

const defaultNumericFilters = {
  column: 'population',
  comparison: 'maior que',
  value: '',
};

function InputFilters() {
  const { data, filteredPlanets, setFilteredPlanets } = useContext(PlanetsContext);
  const dataBaseCopy = [...data];
  const [allFilters, setAllFilters] = useState(defaultFilters);
  const [numericFilters, setNumericFilters] = useState(defaultNumericFilters);

  const handleChangeByName = ({ target }) => {
    setAllFilters({ ...allFilters, filterByName: { name: target.value } });
  };

  const handleChangeByNumeric = ({ target }) => {
    const obj = { ...numericFilters };
    obj[target.name] = target.value;
    setNumericFilters(obj);
  };

  const handleClickSubmitFilter = () => {
    const arrayOfFilters = [...allFilters.filterByNumericValues];
    arrayOfFilters.push(numericFilters);
    setAllFilters({ ...allFilters, filterByNumericValues: arrayOfFilters });
  };

  console.log(allFilters);

  useEffect(() => {
    const verifyEqualityOfArrays = (array1, array2) => {
      if (array1.length !== array2.length) return false;
      for (let index = 0; index < array1.length; index += 1) {
        if (array1[index].name !== array2[index].name) return false;
      }
      return true;
    };

    const applyFilterByName = () => {
      // filter by name
      const newPlanetsArrayFiltered = dataBaseCopy
        .filter((planet) => planet.name.includes((allFilters.filterByName.name)));
      if (!verifyEqualityOfArrays(filteredPlanets, newPlanetsArrayFiltered)) {
        setFilteredPlanets(newPlanetsArrayFiltered);
      }
    };

    applyFilterByName();
  }, [dataBaseCopy, allFilters, filteredPlanets, setFilteredPlanets]);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ allFilters.filterByName.name }
        onChange={ handleChangeByName }
      />
      <label htmlFor="column-filter">
        Column-filter
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleChangeByNumeric }
          value={ numericFilters.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
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
          value={ numericFilters.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        name="value"
        type="number"
        data-testid="value-filter"
        onChange={ handleChangeByNumeric }
        value={ numericFilters.value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickSubmitFilter }
      >
        apply filter
      </button>
    </section>
  );
}

export default InputFilters;
