import React, { useState } from 'react';
// import FiltersContext from '../../context/FiltersContext';
import { useNumericFilters } from '../../hooks';
import Dropdown from '../Dropdown';

export default function InputGroup() {
  const availableNumericColumns = useNumericFilters();

  const [filterDescription, setFilterDescription] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  function updateFilterInfo(e) {
    const { value, name } = e.target;
    setFilterDescription({ ...filterDescription, [name]: value });
  }

  return (
    <>
      <Dropdown
        options={ availableNumericColumns }
        name="column"
        dataTestID="column-filter"
        value={ filterDescription.column }
        onHandleChange={ updateFilterInfo }
      />
      <Dropdown
        options={ ['maior que', 'igual a', 'menor que'] }
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
    </>
  );
}
