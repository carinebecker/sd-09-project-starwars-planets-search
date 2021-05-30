import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const { filterByName, filterByNumericValues } = useContext(PlanetsContext);

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
    filterByNumericValues(filter);
  };

  const renderColumnFilter = () => {
    const columnsFilter = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    return (
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleFilterChange }
      >
        { columnsFilter.map((column) => <option key={ column }>{ column }</option>) }
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
    </div>
  );
}

export default Filters;
