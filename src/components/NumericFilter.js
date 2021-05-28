import React, { useContext, useState } from 'react';
import { Context } from '../context/Provider';

const NumericFilter = () => {
  const { filters, setFilters } = useContext(Context);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  function onChange({ target }) {
    if (target.name === 'column') {
      setColumn(target.value);
    } else if (target.name === 'comparison') {
      setComparison(target.value);
    } else {
      setValue(target.value);
    }
  }

  function handleClick() {
    const { filterByNumericValues } = filters;
    filterByNumericValues.push({ column, comparison, value });
    setFilters({ ...filters, filterByNumericValues });
  }

  const filterColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparisonColumn = [
    'maior que',
    'menor que',
    'igual a',
  ];

  function getSearchColumns() {
    const usedColumns = filters.filterByNumericValues.map((filter) => filter.column);
    const nonUsedColumns = filterColumn.filter((filter) => !usedColumns.includes(filter));
    return nonUsedColumns;
  }

  return (
    <div className="numericFilters-content">
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (event) => onChange(event) }
      >
        {
          getSearchColumns()
            .map((filter) => <option key={ filter } value={ filter }>{filter}</option>)
        }
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (event) => onChange(event) }
      >
        {comparisonColumn.map((comparator) => (
          <option key={ comparator } value={ comparator }>{comparator}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ (event) => onChange(event) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtra
      </button>
    </div>
  );
};

export default NumericFilter;
