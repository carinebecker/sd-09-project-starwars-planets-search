import React, { useState, useContext, useEffect } from 'react';
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
    options,
    setOptions,
  } = useContext(MyContext);
  const filterArray = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  function handleOptions() {
    setOptions(filterArray);
    let updOptions = options;
    number.map((filter) => {
      updOptions = updOptions.filter((item) => item !== filter.column);
      return null;
    });
    setOptions(updOptions);
  }

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
    console.log('2');
    if (filter.comparison === 'maior que') {
      console.log('3');
      setFilteredData(filteredData
        .filter((item) => Number(item[filter.column]) > filter.value));
    }
    if (filter.comparison === 'menor que') {
      console.log('3');
      setFilteredData(filteredData
        .filter((item) => Number(item[filter.column]) < filter.value));
    }
    if (filter.comparison === 'igual a') {
      console.log('3');
      setFilteredData(filteredData
        .filter((item) => item[filter.column] === filter.value));
    }
  }

  function handleFilter() {
    setFilteredData(data);
    const numberFilters = number;
    numberFilters.push({
      column,
      comparison,
      value: numberValue,
    });
    setNumber(numberFilters);
    console.log('1');
    number.map((filter) => {
      console.log('Map called!');
      filterData(filter);
      return null;
    });
    handleOptions();
  }

  function handleDelete(filter) {
    setFilteredData(data);
    const filters = number;
    setNumber(filters.filter((item) => item !== filter));
    handleOptions();
    return null;
  }

  useEffect(() => {
    number.map((f) => {
      console.log('Map called!');
      filterData(f);
      return null;
    });
    handleOptions();
  }, [number]);

  function renderFilterCards() {
    return (
      <ul>
        {number.map((filter, index) => (
          <li data-testid="filter" key={ index }>
            {`${filter.column} | ${filter.comparison} | ${filter.value}`}
            <button onClick={ () => handleDelete(filter) } type="button">X</button>
          </li>))}
      </ul>
    );
  }

  return (
    <>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChangeColumn }
      >
        {options.map((item) => <option key={ item }>{item}</option>)}
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
      {renderFilterCards()}
    </>
  );
}
