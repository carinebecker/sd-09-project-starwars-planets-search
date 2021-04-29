import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

function NumericFilters() {
  const { filters, setFilters } = useContext(TableContext);

  const [currentFilters, setCurrentFilters] = useState({
    column: '',
    comparison: 'maior que',
    value: '',
  });

  const columnFilterOptions = ['rotation_period', 'orbital_period', 'diameter',
    'surface_water', 'population'];

  const handleColumnFilter = ({ target: { value } }) => {
    setCurrentFilters({ ...currentFilters, column: value });
  };

  const handleComparisonFilter = ({ target: { value } }) => {
    setCurrentFilters({ ...currentFilters, comparison: value });
  };

  const handleValueFilter = ({ target: { value } }) => {
    setCurrentFilters({ ...currentFilters, value });
  };

  const handleSubmitFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [currentFilters],
    });
  };

  return (
    <div>
      <label htmlFor="column-filter">
        Column:
        <select
          name="column-filter"
          data-testid="column-filter"
          onChange={ handleColumnFilter }
        >
          {columnFilterOptions.map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison:
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleComparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value">
        Value:
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleValueFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleSubmitFilter() }
      >
        Add Filter
      </button>
    </div>
  );
}

export default NumericFilters;
