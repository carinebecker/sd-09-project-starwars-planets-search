import React, { useContext, useState } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Order = () => {
  const { tableHeaders, setFilterTypes } = useContext(StarwarsContext);
  const [order, setOrder] = useState({
    column: 'Name',
    sort: 'ASC',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setOrder((prevState) => ({...prevState, [name]: value }));
  };

  const handleSendOrder = () => {
    setFilterTypes((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        order,
      },
    }));
  };

  return (
    <div>
      <p>Ordenar por:</p>
      <select
        name="column"
        onChange={ handleChange }
        value={ order.column }
        data-testid="column-sort"
      >
        {tableHeaders.map((value, index) => <option key={ index }>{ value }</option>)}
      </select>
      <div>
        <label htmlFor="asc">
          ASC
          <input
            type="radio"
            name="sort"
            value="ASC"
            id="asc"
            checked={ order.sort === 'ASC' }
            onChange={ handleChange }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="desc">
          DESC
          <input
            type="radio"
            name="sort"
            value="DESC"
            id="desc"
            checked={ order.sort === 'DESC' }
            onChange={ handleChange }
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={ handleSendOrder }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </div>
  );
};

export default Order;
