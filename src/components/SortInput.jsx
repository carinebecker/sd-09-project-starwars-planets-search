import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const SortInput = () => {
  const { data, loading, getSortFilter } = useContext(StarWarsContext);
  const [sortFilter, selSortFilter] = useState({ column: 'name', sort: 'ASC' });

  const handleClick = () => getSortFilter(sortFilter);

  const handleChange = ({ target: { name, value } }) => {
    selSortFilter({ ...sortFilter, [name]: value });
  };

  const renderSelectSort = () => {
    const columnSort = Object.keys(data[0]);
    return (
      <label htmlFor="column-sort">
        Sort by:
        <select
          data-testid="column-sort"
          id="column-sort"
          name="column"
          onChange={ handleChange }
        >
          {columnSort.map((item) => (
            <option
              key={ item }
              value={ item }
            >
              { item }
            </option>))}
        </select>
      </label>
    );
  };

  const renderRadioSort = () => (
    <div>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          value="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          id="column-sort-input-asc"
          onChange={ handleChange }
        />
        ASC
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          value="DESC"
          name="sort"
          data-testid="column-sort-input-desc"
          id="column-sort-input-desc"
          onChange={ handleChange }
        />
        DESC
      </label>
    </div>
  );

  const renderButon = () => (
    <button
      type="button"
      onClick={ handleClick }
      data-testid="column-sort-button"
    >
      Sort
    </button>
  );

  return (
    <div>
      {!loading && renderSelectSort()}
      {!loading && renderRadioSort()}
      {!loading && renderButon()}
    </div>
  );
};

export default SortInput;
