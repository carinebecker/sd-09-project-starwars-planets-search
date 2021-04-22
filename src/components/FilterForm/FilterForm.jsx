import React, { useState } from 'react';

export default function FilterForm() {
  const [inputNameValue, setinputNameValue] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    setinputNameValue(value);
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Filtrar por nome:
        <input
          type="text"
          data-testid="name-filter"
          id="name-filter"
          onChange={ handleChange }
          value={ inputNameValue }
        />
      </label>
    </form>
  );
}
