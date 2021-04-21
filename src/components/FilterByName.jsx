import React, { useContext } from 'react';
import context from '../context/context';

function Filter() {
  const { setFilter, filter } = useContext(context);

  const handleFilter = ({ target }) => {
    setFilter({
      ...filter,
      filters: {
        ...filter.filters, filterByName: { name: target.value },
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleFilter }
      />
    </div>
  );
}

export default Filter;
