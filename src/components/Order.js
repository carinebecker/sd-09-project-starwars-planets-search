import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

export default function Order() {
  const { tableHeader, setFilters, filters } = useContext(SWContext);
  const [columnToOrder, setColumnToOrder] = useState('name');
  const [order, setOrder] = useState('name');

  const renderOptions = () => (
    tableHeader.map((c) => <option key={ c }>{ c }</option>)
  );

  const handleClick = () => {
    setFilters({
      ...filters,
      order: { column: columnToOrder, sort: order } });
  };

  return (
    <>
      <select
        data-testid="column-sort"
        onChange={ (e) => setColumnToOrder(e.target.value) }
      >
        {renderOptions()}
      </select>
      <label htmlFor="column-sort-input-asc">
        ASC
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="order"
          value="ASC"
          onChange={ (e) => setOrder(e.target.value) }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        DESC
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="order"
          value="DESC"
          onChange={ (e) => setOrder(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </>
  );
}
