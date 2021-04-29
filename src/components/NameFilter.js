import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function NameFilter() {
  const { filters, setFilters } = useContext(TableContext);

  const handleNameFilter = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  return (
    <label htmlFor="name">
      Name:
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        onChange={ handleNameFilter }
      />
    </label>
  );
}

export default NameFilter;
