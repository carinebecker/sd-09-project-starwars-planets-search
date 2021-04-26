import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Filter() {
  const {
    changefilteredByName,
    filterPlanetsByName,
    changefilteredByNumber,
    handleButtonFilterClick,
    filters,
  } = useContext(StarWarsContext);

  return (
    <form action="">
      <fieldset>
        <legend>Filtrar por Nome</legend>
        <input
          type="text"
          name=""
          id=""
          data-testid="name-filter"
          onChange={ (event) => {
            filterPlanetsByName(event);
            changefilteredByName(event);
          } }
        />
      </fieldset>
      <fieldset>
        <legend>Filtrar por valores</legend>
        <select
          name="column"
          id=""
          data-testid="column-filter"
          onChange={ changefilteredByNumber }
          value={ filters.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          id=""
          data-testid="comparison-filter"
          onChange={ changefilteredByNumber }
          value={ filters.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          onChange={ changefilteredByNumber }
          value={ filters.number }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonFilterClick }
        >
          Filtrar
        </button>
      </fieldset>
    </form>
  );
}
