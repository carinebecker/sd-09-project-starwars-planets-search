import React, { useState, useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

export default function FilterByNumber() {
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [numberValue, setNumberValue] = useState();
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });
  const {
    data,
    filteredData,
    setFilteredData,
    filters: { filterByNumericValues: number },
    setNumber,
    options,
    setOptions,
    setIsFetching,
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

  function handleSortSelect({ target: { value } }) {
    setOrder({ ...order, column: value });
  }

  function handleSortRadio({ target: { value } }) {
    setOrder({ ...order, sort: value });
  }

  function sortTable(columnN, sortN) {
    setIsFetching(true);
    const minus1 = -1;
    const originalOrder = filteredData;
    // let sortedData = [];
    if (sortN === 'ASC') {
      // sortedData = originalOrder
      //   .sort((a, b) => (a[columnN] > b[columnN] ? 1 : -1));
      // console.log(sortedData);
      setFilteredData([...originalOrder
        .sort((a, b) => (a[columnN] > b[columnN] ? 1 : minus1))]);
    }
    if (sortN === 'DESC') {
      // sortedData = originalOrder
      //   .sort((a, b) => (a[columnN] < b[columnN] ? 1 : -1));
      // console.log(sortedData);
      setFilteredData([...originalOrder
        .sort((a, b) => (Number(a[columnN]) < Number(b[columnN]) ? 1 : minus1))]);
    }
    setIsFetching(false);
  }

  useEffect(() => {
    sortTable(order.column, order.sort);
  }, []);

  function renderOrderOptions() {
    return (
      <>
        <select onChange={ handleSortSelect } data-testid="column-sort">
          <option>name</option>
          <option>rotation_period</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>climate</option>
          <option>gravity</option>
          <option>terrain</option>
          <option>surface_water</option>
          <option>population</option>
        </select>
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          onChange={ handleSortRadio }
        />
        ASC
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          onChange={ handleSortRadio }
        />
        DESC
        <button
          onClick={ () => sortTable(order.column, order.sort) }
          data-testid="column-sort-button"
          type="button"
        >
          Sort
        </button>
      </>
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
      <div>
        {renderOrderOptions()}
      </div>
      {renderFilterCards()}
    </>
  );
}
