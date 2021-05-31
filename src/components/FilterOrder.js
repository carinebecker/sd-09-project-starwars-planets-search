import React, { useContext, useState } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterOrder() {
  const { setFilteredContent,
    filteredContent, comparisonValues } = useContext(StarwarsContext);
  const [columnOrder, setColumnOrder] = useState('name');
  const [order, setOrder] = useState('name');

  const submitOrder = () => {
    setFilteredContent({
      ...filteredContent,
      order: {
        column: columnOrder,
        sort: order,
      },
    });
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={ (e) => setColumnOrder(e.target.value) }
      >
        {comparisonValues.map((item) => <option key={ item }>{item}</option>)}
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
        onClick={ submitOrder }
      >
        Ordenar
      </button>
    </div>
  );
}
export default FilterOrder;
