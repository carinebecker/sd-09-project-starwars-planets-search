import React, { useContext, useState } from 'react';
import planetsContext from '../Context/planetsContext';

function SortFilter() {
  const { setOrder, loading, planets } = useContext(planetsContext);
  const [column, setColumn] = useState('name');
  const [sort, setSort] = useState('ASC');

  const handleSort = () => {
    setOrder({ column, sort });
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        {!loading && Object.keys(planets[0])
          .filter((item) => item !== 'residents')
          .map((item) => <option key={ item }>{item}</option>)}
      </select>
      <label htmlFor="column-sort-input-asc">
        Ascendente:
        <input
          type="radio"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          onClick={ (e) => setSort(e.target.value) }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        Descendente:
        <input
          type="radio"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          onClick={ (e) => setSort(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Sort
      </button>
    </div>
  );
}

export default SortFilter;
