import React, { useContext } from 'react';
import { MyContext } from '../MyContext';

const TableFiltered = () => {
  const { serchInput } = useContext(MyContext);

  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ serchInput }
    />
  );
};

export default TableFiltered;
