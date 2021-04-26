import React, { useContext, useState } from 'react';
import Context from '../context/Context';

export default function FilterPlanets() {
  const [columnValues] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const {
    inputFilter,
    setColumn,
    setComparison,
    setValue,
    buttonFilter,
    filters,
  } = useContext(Context);
  const { filterByNumericValues } = filters;
  const filterColumn = () => {
    buttonFilter();
  };

  return (
    <div>
      <form>
        <label htmlFor="name-filter">
          Pesquisar planeta:
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            onChange={ (event) => inputFilter(event.target.value) }
          />
        </label>
        <label htmlFor="collumn">
          Selecione sua coluna
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            onChange={ (event) => setColumn(event.target.value) }
          >
            {columnValues.filter((col) => (
              !filterByNumericValues.some((filterObj) => (
                col === filterObj.column
              ))
            ))
              .map((columnValue) => (
                <option key={ columnValue } value={ columnValue }>
                  { columnValue }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="value-range">
          Faixa de Valor
          <select
            name="value-range"
            id="value-range"
            data-testid="comparison-filter"
            onChange={ (event) => setComparison(event.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor
          <input
            id="value-filter"
            data-testid="value-filter"
            type="number"
            onChange={ (event) => setValue(event.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterColumn() }
        >
          Localizar
        </button>
      </form>
      {filterByNumericValues.length > 0
      && filterByNumericValues.map((element) => (
        <div key={ element } data-testid="filter">
          <p>{`${element.column}| ${element.comparison} | ${element.value}`}</p>
          <button type="button" onClick={ () => {} }>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
