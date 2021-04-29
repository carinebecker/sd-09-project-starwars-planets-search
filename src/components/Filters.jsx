import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const { nameFilter, numericFilters } = useContext(TableContext);

  return (
    <div className="filters-container">
      <input
        type="text"
        id="name-filter"
        data-testid="name-filter"
        placeholder="Pesquisar planeta"
        onChange={ nameFilter }
      />
      <div className="numeric-filters">
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ numericFilters }
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation period</option>
          <option value="surface_water">Surface water</option>
        </select>
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ numericFilters }
        >
          <option value="greater">maior que</option>
          <option value="less">menor que</option>
          <option value="equal">igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          placeholder="Quantidade"
          onChange={ numericFilters }
        />
      </div>
      <button
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
