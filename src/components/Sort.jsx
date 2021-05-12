import React, { useState } from 'react';
import { useFilters } from '../context/Planets';

const Sort = () => {
  const { filters, setFilters } = useFilters();
  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [column, setColum] = useState('population');
  const [order, setOrder] = useState('ASC');
  const sortTable = () => {
    const newFilters = { ...filters };
    newFilters.order.column = column;
    newFilters.order.sort = order;
    setFilters(newFilters);
  };
  return (
    <form>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setColum(target.value) }
      >
        {columnOptions.map((element, index) => (
          <option key={ index } value={ element }>{element}</option>))}
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          value="ASC"
          id="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setOrder(target.value) }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          value="DESC"
          id="DESC"
          name="sort"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setOrder(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortTable() }
      >
        Ordenar
      </button>
    </form>
  );
};

export default Sort;
