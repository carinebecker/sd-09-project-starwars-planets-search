import React, { useContext, useState } from 'react';
import context from '../context/context';

function SortData() {
  const { data, setFilter, filter } = useContext(context);
  const [orders, setOrders] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const handleChange = ({ target }) => {
    const sortedOrders = { ...orders, [target.name]: target.value };
    setOrders(sortedOrders);
  };

  const sortedFilter = () => {
    setFilter({
      ...filter,
      filters: {
        ...filter.filters,
        order: orders,
      },
    });
  };

  return (
    <div className="sortData">
      <p>Order by:</p>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChange }
      >
        { Object.keys(data[0]).map((column) => {
          if (column === 'residents') return null;
          return <option key={ column }>{ column }</option>;
        }) }
      </select>
      <div>
        <label htmlFor="sort">
          ASC
          <input
            type="radio"
            name="sort"
            value="ASC"
            onChange={ handleChange }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="sort">
          Desc
          <input
            type="radio"
            name="sort"
            value="DESC"
            onChange={ handleChange }
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortedFilter }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortData;
