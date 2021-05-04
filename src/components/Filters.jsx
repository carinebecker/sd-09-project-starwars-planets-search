import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const INITIAL_STATE = {
    column: 'population',
    comparsion: 'maior que',
    value: '0',
  };
  const { filters, setFilters } = useContext(StarWarsContext);
  const [filtersByNumber, setFiltersByNumber] = useState(INITIAL_STATE);

  /* function filterPlanets() {
    const { name } = filters;
    const planetFilter = data
      .filter((planet) => planet.name.includes(name));

    return planetFilter;
  }
 */

  const searchName = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters, filterByName: { [name]: value },
    });
  };

  const handleChangeFilters = ({ target }) => {
    const { name, value } = target;
    setFiltersByNumber({
      ...filtersByNumber,
      [name]: value,
    });
  };

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, filtersByNumber],
    });
  }

  return (
    <div>
      <label htmlFor="name">
        Pesquisar por nome:
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ searchName }
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ handleChangeFilters }
        name="column"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ handleChangeFilters }
        data-testid="comparison-filter"
        name="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ handleChangeFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
