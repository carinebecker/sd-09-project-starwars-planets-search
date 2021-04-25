import React, { useContext } from 'react';
import { MyContext } from '../context/Planets';

export default function TableFiltered() {
  const { setFilters } = useContext(MyContext);

  const handleChange = ({ target }) => {
    setFilters({
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <label htmlFor="name-filter">
      <input
        data-testid="name-filter"
        placeholder="Digite o planeta que deseja"
        type="text"
        onChange={ handleChange }
      />
    </label>
  );
}
