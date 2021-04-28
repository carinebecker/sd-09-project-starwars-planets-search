import React from 'react';
import useInputName from '../hooks/useFilterName';

function InputName() {
  const { filter: nameFilter, handleNameFilter: setFilterName } = useInputName();
  return (
    <input
      type="text"
      name="filter"
      id="filter"
      data-testid="name-filter"
      value={ (nameFilter && nameFilter.filterByName.name) || '' }
      onChange={ (e) => setFilterName(e.target.value) }
    />
  );
}

export default InputName;
