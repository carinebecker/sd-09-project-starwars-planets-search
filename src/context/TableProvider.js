import React from 'react';
import { Children } from 'react';
import TableContext from './TableContext';

function TableProvider() {
  return (
    <TableContext.Provider value={}>
      {Children}
    </TableContext.Provider>
  );
}

export default TableProvider;
