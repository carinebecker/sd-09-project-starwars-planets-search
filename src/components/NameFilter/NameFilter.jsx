import React, { useState, useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';

export default function FilterForm() {
  const [name, setName] = useState('');
  const { setters: { setNameQuery } } = useContext(FiltersContext);

  function handleChange(e) {
    const { value } = e.target;
    setName(value);
    setNameQuery(value);
  }

  return (
    <label htmlFor="name-filter">
      Filtrar por nome:
      <input
        type="text"
        data-testid="name-filter"
        id="name-filter"
        onChange={ handleChange }
        value={ name }
      />
    </label>
  );
}
