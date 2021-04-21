import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

const FilterInputs = () => {
  const INITIAL_STATE = {
    column: 'population',
    comparsion: 'maior que',
    value: '0',
  };
  const { filters, setFilters } = useContext(starWarsContext);
  const [filtersByNumber, setFiltersByNumber] = useState(INITIAL_STATE);

  function filteredByName(event) {
    const { value } = event.target;
    setFilters({ ...filters, filterByName: { name: value } });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFiltersByNumber({
      ...filtersByNumber,
      [name]: value,
    });
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, filtersByNumber],
    });
  }

  function nameFilterInput() {
    return (
      <input
        type="text"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        onChange={ filteredByName }
      />
    );
  }

  function filterByNumericValuesInput() {
    return (
      <div>
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="comparsion"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
    );
  }

  return (
    <fieldset>
      <legend>Filtros</legend>
      {nameFilterInput()}
      {filterByNumericValuesInput()}
    </fieldset>
  );
};

export default FilterInputs;
