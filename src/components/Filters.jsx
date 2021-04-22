import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { handleChange } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="name">
        Search for text:
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          onChange={ ({ target }) => handleChange(target) }
        />
      </label>
    </div>
  );
}

export default Filters;
