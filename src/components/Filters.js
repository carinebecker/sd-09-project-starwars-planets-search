import '../styles/App.css';
import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filtered, setFilterName, btnFilter, filterColumn } = useContext(Context);

  useEffect(filterColumn, [filtered]);

  const [columnFilter, setColumnFilter] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
  );

  const columns = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setColumnFilter({
      ...columnFilter,
      [name]: value,
    });
  };

  return (
    <div className="main-filter">
      <div className="filter">
        <label htmlFor="filterName">
          Filtrar por Nome:
          <br />
          <input
            className="filterName"
            data-testid="name-filter"
            id="filterName"
            onChange={ setFilterName }
            type="text"
            value={ filtered.filters.filterByName.name }
          />
        </label>
      </div>
      <div className="filter">
        <label htmlFor="filterColumn">
          Filtrar por Coluna:
          <br />
          <select
            className="filterColumn"
            data-testid="column-filter"
            id="filterColumn"
            name="column"
            onChange={ handleChange }
            value={ columnFilter.column }
          >
            {columns.map((col) => (
              <option key={ col } value={ col }>{col}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter">
        <label htmlFor="filterComparison">
          Faixa de Valor:
          <br />
          <select
            className="filterComparison"
            data-testid="comparison-filter"
            id="filterComparison"
            name="comparison"
            onChange={ handleChange }
            value={ columnFilter.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
      </div>
      <div className="filter">
        <label htmlFor="filterValue">
          Faixa de Valor:
          <br />
          <input
            className="filterValue"
            data-testid="value-filter"
            id="filterValue"
            name="value"
            onChange={ handleChange }
            value={ columnFilter.value }
            type="number"
          />
        </label>
      </div>
      <div className="filter">
        <button
          data-testid="button-filter"
          onClick={ () => btnFilter(columnFilter) }
          type="button"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Filters;
