import React, { useState, useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';
import { useFilters } from '../../hooks';
import Dropdown from '../Dropdown';

export default function InputGroup() {
  const comparisons = ['maior que', 'igual a', 'menor que'];

  const { availableFilters } = useFilters();

  const [filterDescription, setFilterDescription] = useState({
    column: availableFilters[0],
    comparison: comparisons[0],
    value: 0,
  });

  const { setters: { addNewNumericFilter } } = useContext(FiltersContext);

  function updateFilterInfo(e) {
    const { value, name } = e.target;
    setFilterDescription({ ...filterDescription, [name]: value });
  }

  function addFilter() {
    addNewNumericFilter(filterDescription);
  }

  function renderInputGroup() {
    return (
      <>
        <Dropdown
          options={ availableFilters }
          name="column"
          dataTestID="column-filter"
          value={ filterDescription.column }
          onHandleChange={ updateFilterInfo }
        />
        <Dropdown
          options={ comparisons }
          name="comparison"
          dataTestID="comparison-filter"
          value={ filterDescription.comparison }
          onHandleChange={ updateFilterInfo }
        />
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ filterDescription.value }
          onChange={ updateFilterInfo }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ addFilter }
        >
          Filtrar
        </button>
      </>
    );
  }

  return (
    availableFilters.length > 0
      && renderInputGroup()

  );
}
