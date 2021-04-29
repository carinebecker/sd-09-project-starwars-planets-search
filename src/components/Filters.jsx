import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const { nameFilter } = useContext(TableContext);

  return (
    <div className="filters-container">
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Pesquisar planeta"
        onChange={ nameFilter }
      />
    </div>
  );
}

export default Filters;
