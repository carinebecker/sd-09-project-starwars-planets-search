import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { search, setSearch } = useContext(MyContext);

  const handleChangeSearch = ({ target }) => {
    const { value } = target;
    setSearch({
      ...search,
      filterByName: {
        name: value,
      },
    });
  };

  const handleChangeColumnFilter = ({ target }) => {
    const { value } = target;
    setSearch({
      ...search,
      filterByColumn: {
        select: value,
      },
    });
  };

  const handleChangeComparisonFilter = ({ target }) => {
    const { value } = target;
    setSearch({
      ...search,
      filterComparison: {
        select: value,
      },
    });
  };

  const handleChangeValueFilter = ({ target }) => {
    const { value } = target;
    setSearch({
      ...search,
      filterValue: {
        name: value,
      },
    });
  };

  return (
    <section>
      <label htmlFor="name-filter">
        Search Planet
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ handleChangeSearch }
        />
      </label>
      <label htmlFor="column-filter">
        Column filter
        <select
          data-testid="column-filter"
          id="column-filter"
          onChange={ handleChangeColumnFilter }
        >
          <option value="">Select</option>
          <option value="population">Population</option>
          <option value="orbital-period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation-period">Rotation period</option>
          <option value="surface-water">Surface water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison filter
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          onChange={ handleChangeComparisonFilter }
        >
          <option value="">Select</option>
          <option value="maior">maior que</option>
          <option value="igual">igual a</option>
          <option value="menor">menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Type number
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          onChange={ handleChangeValueFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick=""
      >
        Filter
      </button>
    </section>
  );
}

export default Filters;
