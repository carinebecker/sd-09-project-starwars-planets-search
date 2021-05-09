import React, { useState, useEffect } from 'react';
import { useFilters } from '../context/Planets';

const handleInputChange = (event, key, setState) => {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;

  setState((prevState) => ({ ...prevState, [name]: { [key]: value } }));
};

const removeFilter = (index, filters, setFilters) => {
  filters.filterByNumericValues.splice(index, 1);
  setFilters(filters);
};

const renderCurrentFilters = (filters, setFilters) => (
  filters.filterByNumericValues.map(({ column, comparison, value }, index) => (
    <div key={ index }>
      <span>{column}</span>
      <span>{comparison}</span>
      <span>{value}</span>
      <button
        type="button"
        onClick={ () => removeFilter(index, filters, setFilters) }
      >
        X
      </button>
    </div>
  )));

const renderNumericFilter = (setColumn, setComparison, setValue, currentFilters) => {
  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const appliedFilters = currentFilters.map((filter) => filter.column);
  const availableOptions = columnOptions
    .filter((option) => !appliedFilters.includes(option));
  if (!availableOptions.length) {
    setColumn(false);
    return (<span />);
  }
  setColumn(availableOptions[0]);
  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
        value={ availableOptions[0] }
      >
        {availableOptions.map((option, index) => (
          <option
            value={ option }
            key={ index }
          >
            {option}
          </option>))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        onChange={ ({ target }) => setValue(target.value) }
        data-testid="value-filter"
      />
    </div>
  );
};

const Filter = () => {
  const { filters, setFilters } = useFilters();
  const [column, setColumn] = useState(false);
  const [comparison, setComparison] = useState('maior que');
  const [appliedFilter, setAppliedFilter] = useState();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setAppliedFilter(renderNumericFilter(setColumn, setComparison, setValue,
      filters.filterByNumericValues));
  }, [filters]);

  const addNumericFilter = () => {
    if (!column) {
      return;
    }
    const newFilters = { ...filters };
    const numericFilter = {
      column,
      comparison,
      value,
    };
    newFilters.filterByNumericValues.push(numericFilter);
    setFilters(newFilters);
  };

  return (
    <div>
      <input
        type="text"
        name="filterByName"
        placeholder="Filter by Name"
        onChange={ (event) => handleInputChange(event, 'name', setFilters) }
        data-testid="name-filter"
      />
      <div>
        {renderCurrentFilters(filters, setFilters)}
        {appliedFilter}
        <button
          type="button"
          onClick={ () => addNumericFilter() }
          data-testid="button-filter"
        >
          Adicionar Filtro
        </button>
      </div>
    </div>
  );
};

export default Filter;
