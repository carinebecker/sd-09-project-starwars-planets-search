import React from 'react';
import useFilter from '../hooks/useFilterName';

function InputName() {
  const { filter: nameFilter, handleNameFilter: setFilterName } = useFilter();
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
