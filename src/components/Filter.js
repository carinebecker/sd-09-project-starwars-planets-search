import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filter = () => {
  const { saveFilterName, namePlanets,
    saveAllFilters, saveCustomFilter } = useContext(StarWarsContext);

  const valueRange = ['maior que', 'menor que', 'igual a'];

  const handleChange = () => {
    saveAllFilters();
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        onChange={ saveFilterName }
      />
      <select
        id="column-filter"
        name="column"
        data-testid="column-filter"
        onChange={ saveCustomFilter }
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
        onChange={ saveCustomFilter }
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
        onChange={ saveCustomFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleChange }
      >
        Adicionar filtro
      </button>
    </form>
  );
};

export default Filter;
