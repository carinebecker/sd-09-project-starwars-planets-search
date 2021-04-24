import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterInput() {
  const { handleInput,
    sortBy,
    setSortBy,
    handleFilteredInputs,
    columnOptions,
  } = useContext(StarWarsContext);

  const componentState = {
    column: 'population',
    comparison: '',
    value: '0',
  };

  const [state, setState] = useState(componentState);

  useEffect(() => {
    setState((last) => ({ ...last, column: columnOptions[0] }));
  }, [columnOptions]);

  function handleComponentState({ target }) {
    const { name, value } = target;
    setState((lastState) => ({
      ...lastState,
      [name]: value,
    }));
  }

  function setSortColumn({ target }) {
    const { value } = target;
    setSortBy({ ...sortBy, sortByColumn: value });
  }

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
          // value={ column }
          onChange={ handleComponentState }
        >
          {
            columnOptions
              .map((col) => <option key={ col } value={ col }>{col}</option>)
          }
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
          onChange={ handleComponentState }
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
        onChange={ handleComponentState }
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

  function createSortByFilter() {
    return (
      <label htmlFor="order-column">
        Ordernar por:
        <select
          data-testid="column-sort"
          id="order-column"
          name="sort-by"
          onChange={ setSortColumn }
        >
          <option value="name">Planet Name</option>
          <option value="population">Population</option>
        </select>
      </label>
    );
  }

  return (
    <div>
      {createNameFilterInput()}
      {createDropdownFilter()}
      {createComparisonSelect()}
      {createInputFilterValue()}
      {createFilteredButton()}
      {createSortByFilter()}
    </div>
  );
}

export default FilterInput;
