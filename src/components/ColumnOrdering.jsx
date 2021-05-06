import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const INITIAL_STATE = {
  column: 'name',
  sort: 'ASC',
};

const INITIAL_COLUMN = ['name', 'rotation_period', 'orbital_period', 'diameter',
  'surface_water', 'population'];

function ColumnOrdering() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const [sortColumn, setSortColumn] = useState(INITIAL_STATE);

  function handleChange({ target }) {
    const { name, value } = target;
    setSortColumn({ ...sortColumn, [name]: value });
  }

  // function sortButton() {
  //   ordenation(orderByFilters);
  // }
  function handleClick() {
    const { column, sort } = sortColumn;
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  }

  return (
    <div>
      <select
        name="column"
        value={ sortColumn.column }
        data-testid="column-sort"
        onChange={ handleChange }
      >
        { INITIAL_COLUMN.map((columnOption) => (
          <option key={ columnOption }>{ columnOption }</option>
        ))}
        {/* {Object.keys(data.results[0]).map((columnOption) => (
          <option key={ columnOption }>
            { columnOption }
          </option>
        ))} */}
      </select>
      <div>
        <label htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente
          <input
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChange }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Sort
      </button>
    </div>
  );
}

export default ColumnOrdering;
