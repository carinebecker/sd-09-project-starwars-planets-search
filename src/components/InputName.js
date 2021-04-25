import React from 'react';
import useFilter from '../hooks/useFilter';

function InputName() {
  const { nameFilter, handleNameFilter: setFilterName } = useFilter();
  return (
    <input
      type="text"
      name="filter"
      id="filter"
      data-testid="name-filter"
      value={ nameFilter }
      onChange={ setFilterName }
    />
  );
}

export default InputName;
