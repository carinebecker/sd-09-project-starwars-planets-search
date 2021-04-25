import React, { useContext } from 'react';
import Context from '../context/Context';

export default function FilterPlanets() {
  const { setName } = useContext(Context);

  return (
    <div>
      <label htmlFor="name-filter">
        Pesquisar planeta:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ (event) => setName(event.target.value) }
        />
      </label>
    </div>
  );
}
