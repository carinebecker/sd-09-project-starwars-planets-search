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
  const {
    data,
    filteredPlanets,
    setFilteredPlanets,
    filters,
    setFilters,
  } = useContext(PlanetsContext);
  const dataBaseCopy = [...data];
  const [filterByName, setFilterByName] = useState(defaultFilters);
  const [numericFilters, setNumericFilters] = useState(defaultNumericFilters);

  const handleChangeByName = ({ target }) => {
    setFilterByName({ ...filterByName, filterByName: { name: target.value } });
  };

  const handleChangeByNumeric = ({ target }) => {
    const obj = { ...numericFilters };
    obj[target.name] = target.value;
    setNumericFilters(obj);
  };

  const handleClickSubmitFilter = () => {
    const filtersCopy = { ...filters };
    const newTypes = filtersCopy.types.filter((type) => type !== numericFilters.column);
    filtersCopy.types = newTypes;
    filtersCopy.allFilters.push(numericFilters);
    setFilters(filtersCopy);
    const { comparison, value } = numericFilters;
    setNumericFilters({ column: filtersCopy.types[0], comparison, value });
  };

  console.log('previne loophero');

  // filter by name
  useEffect(() => {
    const verifyEqualityOfArrays = (array1, array2) => {
      if (array1.length !== array2.length) return false;
      for (let index = 0; index < array1.length; index += 1) {
        if (array1[index].name !== array2[index].name) return false;
      }
      return true;
    };

    const applyFilterByName = () => {
      const newPlanetsArrayFiltered = dataBaseCopy
        .filter((planet) => planet.name.includes((filterByName.filterByName.name)));
      if (!verifyEqualityOfArrays(filteredPlanets, newPlanetsArrayFiltered)) {
        setFilteredPlanets(newPlanetsArrayFiltered);
      }
    };

    applyFilterByName();
  }, [dataBaseCopy, filterByName, filteredPlanets, setFilteredPlanets]);

  useEffect(() => {

  }, [filters, setFilters]);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterByName.filterByName.name }
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
          {filters.types.map((type) => (
            <option key={ type } value={ type }>{type}</option>))}
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
