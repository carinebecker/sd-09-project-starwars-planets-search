import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputFilter() {
  const {
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    resetFilter } = useContext(PlanetsContext);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const comparationOptions = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [{ column, comparison, value: valueFilter }] });
    const nextOptions = columnOptions.filter((option) => option !== column);
    setColumnOptions(nextOptions);
  };

  const renderOptions = (options) => (
    options.map((filter) => <option key={ filter } value={ filter }>{filter}</option>)
  );

  const revertFilterButton = () => (
    <button
      type="button"
      data-testid="filter"
      onClick={ resetFilter }
    >
      X
    </button>
  );

  return (
    <div>
      <label htmlFor="name-filter">
        Search Planet:
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <select data-testid="column-filter" onChange={ (e) => setColumn(e.target.value) }>
        {renderOptions(columnOptions)}
      </select>
      { revertFilterButton() }
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        {renderOptions(comparationOptions)}
      </select>
      { revertFilterButton() }
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      { revertFilterButton() }
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default InputFilter;
