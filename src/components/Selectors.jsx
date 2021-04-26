import React, { useContext } from 'react';
import Context from '../context/Context';

function Selectors() {
  const { filters, filterByColumn, filterByNumber, handleClick } = useContext(Context);
  const { column, comparison, value } = filters.filterByNumericValues[0];
  return (
    <section>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => filterByColumn('column', target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (event) => filterByColumn('comparison', event.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ filterByNumber }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Acionar filtro
      </button>
    </section>
  );
}

export default Selectors;
