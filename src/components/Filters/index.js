import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    addFilterByNumericValues, removeFilterByNumericValues } = useContext(PlanetsContext);

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

  const renderColumnFilter = () => {
    const allColumns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];

    const availableColumns = allColumns.filter((column) => !usedFilters.includes(column));
    console.log('avaiableColumns');
    console.log(availableColumns);

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
      { renderUsedFilters() }
    </div>
  );
}

export default Filters;
