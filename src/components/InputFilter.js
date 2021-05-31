import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

export default function InputFilter() {
  const [comparison, setComparison] = useState('');
  const [column, setColumn] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const comparationOptions = ['maior que', 'menor que', 'igual a'];

  const {
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    resetFilter } = useContext(SWContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const renderOptions = (options) => (
    options.map((filter) => <option key={ filter } value={ filter }>{filter}</option>)
  );

  const newFilter = (c) => {
    const result = filters.filterByNumericValues
      .filter((filter) => filter.column !== c);
    resetFilter(result);
  };

  const changeFilter = () => (
    filters.filterByNumericValues.map((filter) => (
      <p key={ filter.column } data-testid="filter">
        <button
          type="button"
          onClick={ () => newFilter(filter.column) }
        >
          X
        </button>
      </p>
    ))
  );

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        { column, comparison, value: valueFilter }] });
    const nextOptions = columnOptions.filter((option) => option !== column);
    setColumnOptions(nextOptions);
  };

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          type="text"
          placeholder="search"
          data-testid="name-filter"
          name="nameFilter"
          onChange={ handleChange }
        />
      </label>

      <select data-testid="column-filter" onChange={ (e) => setColumn(e.target.value) }>
        {renderOptions(columnOptions)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        {renderOptions(comparationOptions)}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      { changeFilter() }
    </div>
  );
}
