import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filters, setFilters,
    columnSelect, setColumnSelect } = useContext(PlanetsContext);

  const handleClick = (column) => {
    setColumnSelect([...columnSelect, column]);
    const newFilter = filters.filterByNumericValues
      .filter((obj) => obj.column !== column);
    setFilters({ ...filters, filterByNumericValues: newFilter });
  };

  return (
    filters.filterByNumericValues.map((obj, index) => (
      <div key={ index } data-testid="filter">
        <p>{obj.column}</p>
        <p>{obj.comparison}</p>
        <p>{obj.value}</p>
        <button type="button" onClick={ () => handleClick(obj.column) }>X</button>
      </div>))
  );
}
