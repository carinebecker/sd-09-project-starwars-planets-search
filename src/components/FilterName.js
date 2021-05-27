import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const FilterName = () => {
  const { setFilter } = useContext(AppContext);
  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ ({ target }) => setFilter(target.value) }
    />
  );
};

export default FilterName;
