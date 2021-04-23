import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

function Inputs() {
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filtersObject, setFiltersObject] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const {
    filters,
    setFilters,
  } = useContext(TableContext);
  function inputNameHandleChange({ target }) {
    setFilters(
      {
        ...filters,
        filterByName: {
          name: target.value,
        },
      },
    );
  }

  function filtersInputHandleChange({ target }) {
    setFiltersObject(
      {
        ...filtersObject,
        [target.name]: target.value,
      },
    );
  }

  function removeColumnItem(column) {
    setColumns(columns.filter((element) => element !== column));
  }

  function handleClick() {
    setFilters(
      {
        ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues,
          filtersObject,
        ],
      },
    );
    console.log(filtersObject.column);
    removeColumnItem(filtersObject.column);
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ inputNameHandleChange }
        />
      </label>
      <br />
      <label htmlFor="column-filter">
        Informe a coluna:
        <select
          data-testid="column-filter"
          onChange={ filtersInputHandleChange }
          name="column"
        >
          {columns.map((column) => <option key={ column }>{column}</option>)}
        </select>
      </label>
      <br />
      <label htmlFor="comparison-filter">
        Informe a comparação a ser feita:
        <select
          data-testid="comparison-filter"
          onChange={ filtersInputHandleChange }
          name="comparison"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <br />
      <label htmlFor="value-filter">
        indome o valor a ser comparado:
        <input
          type="number"
          data-testid="value-filter"
          onChange={ filtersInputHandleChange }
          name="value"
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Aplicar filtro
      </button>
    </form>
  );
}

export default Inputs;
