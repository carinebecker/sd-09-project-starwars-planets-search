import React, { useContext, useState } from 'react';
import { Context } from '../context/Provider';

export default function Orderer() {
  const { data, filters, setFilters } = useContext(Context);
  const [column, setColumn] = useState('name');
  const [sort, setSort] = useState('ASC');

  function handleChange({ target }) {
    if (target.name === 'column') {
      setColumn(target.value);
    }
    if (target.name === 'sort') {
      setSort(target.value);
    }
  }

  function handleClick() {
    setFilters({ ...filters, order: { column, sort } });
  }

  const headers = Object.keys(data[0]);
  const filteredHeaders = headers.filter((header) => header !== 'residents');
  return (
    <div>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ (event) => handleChange(event) }
      >
        {
          filteredHeaders.map((header) => <option key={ header }>{header}</option>)
        }
      </select>
      <div onChange={ (event) => handleChange(event) }>
        <input
          type="radio"
          id="ASC"
          data-testid="column-sort-input-asc"
          name="sort"
          value="ASC"
        />
        ASC
        <input
          type="radio"
          id="DESC"
          data-testid="column-sort-input-desc"
          name="sort"
          value="DESC"
        />
        DESC
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
}
