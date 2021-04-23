import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterInput() {
  const componentState = {
    column: '',
    comparison: '',
    value: '0',
  };

  const [state, setState] = useState(componentState);

  function handleComponentState({ name, value }) {
    setState((lastState) => ({
      ...lastState,
      [name]: value,
    }));
  }

  const { handleInput,
    handleDropdownInput,
    filters,
    handleFilteredInputs } = useContext(StarWarsContext);

  function createNameFilterInput() {
    return (
      <label htmlFor="filter-by-name">
        Filtar por nome:
        <input
          id="filter-by-name"
          type="text"
          data-testid="name-filter"
          name="name"
          onChange={ ({ target }) => handleInput(target) }
          placeholder="Digite um nome..."
        />
      </label>
    );
  }

  function createDropdownFilter() {
    return (
      <label htmlFor="filter-column">
        Escolha uma opção:
        <select
          data-testid="column-filter"
          name="column"
          id="filter-column"
          onChange={ ({ target }) => handleComponentState(target) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
    );
  }

  function createComparisonSelect() {
    return (
      <label htmlFor="comparison-column">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison-column"
          onChange={ ({ target }) => handleComponentState(target) }
        >
          <option value="">--</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
    );
  }

  function createInputFilterValue() {
    return (
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        id="number-input"
        min="0"
        onChange={ ({ target }) => handleComponentState(target) }
      />
    );
  }

  function createFilteredButton() {
    return (
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleFilteredInputs(state) }
      >
        Filtrar
      </button>
    );
  }

  return (
    <div>
      {createNameFilterInput()}
      {createDropdownFilter()}
      {createComparisonSelect()}
      {createInputFilterValue()}
      {createFilteredButton()}
    </div>
  );
}

export default FilterInput;
