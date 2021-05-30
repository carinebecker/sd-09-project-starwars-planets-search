import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext';

export default function FilterByNumber() {
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [numberValue, setNumberValue] = useState();
  const {
    data,
    filteredData,
    setFilteredData,
    filters: { filterByNumericValues: number },
    setNumber,
  } = useContext(MyContext);

  // const filterArray = [
  //   'population',
  //   'orbital_period',
  //   'diameter',
  //   'rotation_period',
  //   'surface_water'];

  // useEffect(() => {
  //   console.log('Effect called');
  //   number.map((filter) => {
  //     setFilteredData(data.filter((item) => item[filter.column] > filter.value));
  //     return null;
  //   });
  // }, []);

  function handleChangeColumn({ target: { value } }) {
    setColumn(value);
  }

  function handleChangeComparison({ target: { value } }) {
    setComparison(value);
  }

  function handleChangeImput({ target: { value } }) {
    setNumberValue(value);
  }

  function filterData(filter) {
    console.log('filterData called!');
    console.log('Column:', filter.column);
    console.log('Comparison:', filter.comparison);
    console.log('Value:', filter.value);
    setFilteredData(data);
    if (filter.comparison === 'maior que') {
      setFilteredData(filteredData
        .filter((item) => Number(item[filter.column]) > filter.value));
    }
    if (filter.comparison === 'menor que') {
      setFilteredData(filteredData
        .filter((item) => Number(item[filter.column]) < filter.value));
    }
    if (filter.comparison === 'igual a') {
      setFilteredData(filteredData
        .filter((item) => item[filter.column] === filter.value));
    }
  }

  function handleFilter() {
    const numberFilters = number;
    numberFilters.push({
      column,
      comparison,
      value: numberValue,
    });
    setNumber(numberFilters);
    number.map((filter) => {
      console.log('Map called!');
      filterData(filter);
      return null;
    });
  }
  return (
    <>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChangeColumn }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChangeComparison }
      >
        <option value="">selecione comparação</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleChangeImput }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </>
  );
}
