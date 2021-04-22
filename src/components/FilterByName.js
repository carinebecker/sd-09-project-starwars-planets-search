import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterByName() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  return (
    <label htmlFor="name">
      <input
        type="text"
        name="name"
        onChange={ handleChange }
        data-testid="name-filter"
      />
    </label>
  );
}
