import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function RenderSelect({ data }) {
  const { filters, setFilters } = useContext(MyContext);
  const arrayDelete = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const dataFilter = arrayDelete.map((e) => Object.keys(data[0]).filter((d) => e === d));
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);

  function handleClick() {
    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        filterByNumericValues: {
          column,
          comparison,
          value,
        },
      },
    });
  }

  return (
    <div>
      <label htmlFor="column-filter">
        Filtrar:
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          { dataFilter.map((r) => (
            <option key={ r } value={ r }>{ r }</option>))}
        </select>
      </label>
      <label htmlFor="filter">
        Filtrar:
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

RenderSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderSelect;
