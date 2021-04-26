import React, { useContext, useState } from 'react';
import { MyContext } from '../context/Planets';

export default function TableFiltered() {
  const { filters, setFilters } = useContext(MyContext);
  const [select, getSelect] = useState({});

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        [target.name]: target.value,
      },
    });
  };

  const handleFilters = ({ target }) => {
    getSelect({
      ...select,
      [target.name]: target.value,
    });
  };

  function updateContextWithFilters() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, select],
    });
  }

  return (
    <>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          placeholder="Digite o planeta que deseja filtrar"
          name="name"
          type="text"
          onChange={ handleChange }
        />
      </label>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleFilters }
      >
        <option value="orbital_period">orbital_period</option>
        <option value="population">population</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleFilters }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ updateContextWithFilters }
      >
        Adicionar Filtro
      </button>
    </>
  );
}
