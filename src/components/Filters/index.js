import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const { filterByName, filterByNumericValues } = useContext(PlanetsContext);

  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const handleNameFilterChange = ({ target: { value } }) => {
    filterByName(value);
  };

  const handlerColumnChange = ({ target: { value } }) => {
    setFilter({
      ...filter,
      column: value,
    });
  };

  const handlerComparisonChange = ({ target: { value } }) => {
    setFilter({
      ...filter,
      comparison: value,
    });
  };

  const handlerValueChange = ({ target: { value } }) => {
    setFilter({
      ...filter,
      value,
    });
  };

  const handleButtonClick = () => {
    setFilters([...filters.concat(filter)]);
    filterByNumericValues(filters);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Digite um nome"
        onChange={ handleNameFilterChange }
      />
      <select data-testid="column-filter" onChange={ handlerColumnChange }>
        <option>{ filter.column }</option>
      </select>
      <select data-testid="comparison-filter" onChange={ handlerComparisonChange }>
        <option>{ filter.comparison }</option>
      </select>
      <input
        type="text"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ handlerValueChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButtonClick }
      >
        CLIQUE
      </button>
    </div>
  );
}

export default Filters;
