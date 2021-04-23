import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filters } = useContext(PlanetsContext);

  return (
    filters.filterByNumericValues.map((obj, index) => (
      <div key={ index }>
        <p>{obj.column}</p>
        <p>{obj.comparison}</p>
        <p>{obj.value}</p>
      </div>))
  );
}
