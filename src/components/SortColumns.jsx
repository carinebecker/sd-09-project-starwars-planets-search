import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const initialColumns = ['name', 'rotation_period', 'orbital_period', 'diameter',
  'surface_water', 'population'];

const initialState = {
  column: 'name',
  sort: 'ASC',
};

function SortColumns() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const [sortColumn, setSortColumn] = useState(initialState);
  const { column, sort } = sortColumn;

  const handleChange = ({ target: { value, name } }) => {
    setSortColumn({
      ...sortColumn,
      [name]: value,
    });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  return (
    <section>
      <h3>Order the Planets</h3>
      <select
        name="column"
        value={ column }
        data-testid="column-sort"
        onChange={ handleChange }
      >
        {
          initialColumns.map((item) => (
            <option key={ item }>{ item }</option>
          ))
        }
      </select>
      <div>
        <label htmlFor="column-sort-input-asc">
          Ascending Order
          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descending Order
          <input
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            id="column-sort-input-desc"
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
    </section>
  );
}

export default SortColumns;
