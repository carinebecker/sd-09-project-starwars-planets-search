import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    addFilterByNumericValues,
    removeFilterByNumericValues,
    changeOrder,
  } = useContext(PlanetsContext);

  const [orderFilters, setOrderFilters] = useState({
    column: 'Name',
    sort: 'ASC',
  });

  const [usedFilters, setUsedFilters] = useState([]);
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const handleNameFilterChange = ({ target: { value } }) => {
    filterByName(value);
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleAddFilterClick = () => {
    addFilterByNumericValues(filter);
    setUsedFilters([...usedFilters, filter.column]);
  };

  const handleRemoveFilterClick = ({ target: { name } }) => {
    removeFilterByNumericValues(name);
    setUsedFilters([...usedFilters.filter((usedFilter) => usedFilter !== name)]);
  };

  const handlerOrderFilterChange = ({ target: { name, value } }) => {
    setOrderFilters({
      ...orderFilters,
      [name]: value,
    });
  };

  const handleOrderFilterClick = () => {
    changeOrder(orderFilters);
  };

  const renderColumnFilter = () => {
    const allColumns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];

    const availableColumns = allColumns.filter((column) => !usedFilters.includes(column));

    return (
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleFilterChange }
      >
        { availableColumns.map((column) => <option key={ column }>{ column }</option>) }
      </select>
    );
  };

  const renderComparisonFilter = () => {
    const comparisonsFilter = ['maior que', 'menor que', 'igual a'];
    return (
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleFilterChange }
      >
        { comparisonsFilter.map(
          (comparison) => <option key={ comparison }>{ comparison }</option>,
        ) }
      </select>
    );
  };

  const renderUsedFilters = () => (
    <div>
      { usedFilters.map((usedFilter) => (
        <h3 data-testid="filter" key={ usedFilter }>
          { usedFilter }
          <button
            type="button"
            name={ usedFilter }
            onClick={ handleRemoveFilterClick }
          >
            X
          </button>
        </h3>
      ))}
    </div>
  );

  const renderColumOrder = () => {
    const planetsTitle = [
      'climate', 'created', 'diameter', 'edited', 'films',
      'gravity', 'name', 'orbital_period', 'population',
      'rotation_period', 'surface_water', 'terrain', 'url'];

    return (
      <div>
        <label htmlFor="input-select-column-sort">
          Ordernar por:
          <select
            data-testid="column-sort"
            id="input-select-column-sort"
            name="column"
            onChange={ handlerOrderFilterChange }
          >
            { planetsTitle.map((title) => <option key={ title }>{ title }</option>)}
          </select>
        </label>
        <label htmlFor="input-radio-sort-desc">
          ASC:
          <input
            type="radio"
            id="input-radio-sort-desc"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handlerOrderFilterChange }
          />
        </label>
        <label htmlFor="input-radio-sort-desc">
          <input
            type="radio"
            id="input-radio-sort-desc"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handlerOrderFilterChange }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleOrderFilterClick }
        >
          Ordenar
        </button>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Digite um nome"
        onChange={ handleNameFilterChange }
      />
      { renderColumnFilter() }
      { renderComparisonFilter() }
      <input
        type="text"
        name="value"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ handleFilterChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleAddFilterClick }
      >
        Adicionar Filtro
      </button>
      { renderColumOrder() }
      { renderUsedFilters() }
    </div>
  );
}

export default Filters;
