import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function InputFilter() {
  const { setFilter } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <div>
      <label htmlFor="filter">
        <input
          type="text"
          name="filter"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}
