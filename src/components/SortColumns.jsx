import React, { useContext, useState } from 'react';
import DataApiContext from '../context/DataApiContext';

const SortColumns = () => {
  const [ascOrDesc, setAscOrDesc] = useState('ASC');
  const [selectedColumn, setSelectedColumn] = useState('Name');
  const { sortColumn, setSortColumn, allColumns } = useContext(DataApiContext);

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'column-sort') {
      setSelectedColumn(value);
    }
    if (value === 'DESC') {
      setAscOrDesc('DESC');
    }
    if (value === 'ASC') {
      setAscOrDesc('ASC');
    }
  };

  const handleClick = () => {
    setSortColumn({
      ...sortColumn,
      order: {
        column: selectedColumn,
        sort: ascOrDesc,
      },
    });
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column-sort"
        onChange={ handleChange }
      >
        {
          allColumns.map((eachColumn) => (
            <option
              key={ eachColumn }
              value={ eachColumn }
            >
              { eachColumn }
            </option>
          ))
        }
      </select>
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        name="sort-input"
        value="ASC"
        onChange={ handleChange }
      />
      Ordem ascendente
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort-input"
        value="DESC"
        onChange={ handleChange }
      />
      Ordem descendente
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
};

export default SortColumns;
