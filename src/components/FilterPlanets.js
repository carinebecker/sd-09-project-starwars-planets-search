import React, { useContext } from 'react';
import { savePlanets } from '../context/contextPlanets';

export default function FilterPlanets() {
  const { searchByName, setSearchByName } = useContext(savePlanets);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setSearchByName(e.target.value) }
        placeholder="Busca por Nome"
        value={ searchByName }
      />
    </div>
  );
}
