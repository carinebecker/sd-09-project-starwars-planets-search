import React, { useContext } from 'react';
import { savePlanets } from '../context/contextPlanets';

export default function FilterPlanetsByName() {
  const { searchByName, setSearchByName } = useContext(savePlanets);
  return (
    <div className="search-box">
      <input
        className="form-control search-box"
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setSearchByName(e.target.value) }
        placeholder="Busca por Nome"
        value={ searchByName }
      />
    </div>
  );
}
