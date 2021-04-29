import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const { nameFilter } = useContext(TableContext);

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
          id="column-filter"
          data-testid="column-filter"
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation period</option>
          <option value="surface_water">Surface water</option>
        </select>
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
        >
          <option value="greater">maior que</option>
          <option value="less">menor que</option>
          <option value="equal">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="Quantidade"
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
