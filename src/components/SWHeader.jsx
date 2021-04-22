import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

export default function SWHeader() {
  const { setFilters } = useContext(SWContext);

  const handleChange = ({ target }) => {
    setFilters({
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <>
      <h1>StarWars Planets</h1>
      <label htmlFor="name-filter">
        <input
          type="text"
          placeholder="Digite aqui para filtrar"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
    </>
  );
}
