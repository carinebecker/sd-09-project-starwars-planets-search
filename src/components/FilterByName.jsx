import React, { useContext } from 'react';
import context from '../context/context';

function Filter() {
  const { setFilter } = useContext(context);

  const handleFilter = ({ target }) => {
    setFilter({
      filters: {
        filterByName: {
          name: target.value,
        },
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
