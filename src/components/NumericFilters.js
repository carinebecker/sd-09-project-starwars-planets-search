import React, { useState } from 'react';
import PropTypes from 'prop-types';

const COLUMN_FILTERS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function NumericFilters({ onClick }) {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
  const [enabledColumnFilters, setEnabledColumnFilters] = useState(COLUMN_FILTERS);

  function handleOnClick() {
    onClick({ column, comparison, value });
    setEnabledColumnFilters(enabledColumnFilters.filter((name) => name !== column));
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {enabledColumnFilters.map(
          (name) => (<option key={ name } value={ name }>{name}</option>),
        )}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleOnClick }
      >
        Filtrar
      </button>
    </div>
  );
}

NumericFilters.propTypes = {
  onClick: PropTypes.func.isRequired,
};
