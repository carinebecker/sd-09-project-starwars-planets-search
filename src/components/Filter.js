import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filter = () => {
  const { saveFilter, handleChangeFilter } = useContext(StarWarsContext);
  const namePlanets = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const valueRange = ['maior que', 'menor que', 'igual a'];
  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        onChange={ saveFilter }
      />
      <select
        id="column-filter"
        name="column"
        data-testid="column-filter"
        onChange={ saveFilter }
      >
        {namePlanets.map((planet) => (
          <option key={ planet }>
            { planet }
          </option>
        ))}
      </select>
      <select
        id="comparison-filter"
        name="comparison"
        data-testid="comparison-filter"
        onChange={ saveFilter }
      >
        {valueRange.map((v) => (
          <option key={ v }>
            { v }
          </option>
        ))}
      </select>
      <input
        type="number"
        id="value-filter"
        name="value"
        placeholder="Valor"
        data-testid="value-filter"
        onChange={ saveFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleChangeFilter }
      >
        Adicionar filtro
      </button>
    </form>
  );
};

export default Filter;
