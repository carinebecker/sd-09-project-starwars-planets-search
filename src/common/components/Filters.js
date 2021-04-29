import React, { useContext, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';
import GenericFilterInput from './GenericFilterInput';

const Filters = () => {
  const { contextValue, setFilterClicked, filterClicked, setFilterByValues } = useContext(PlanetContext);
  const { setName, setColumn, setComparison, setValue, filters, setFilterByNumericValues } = contextValue;
  const { filterByNumericValues } = filters;
  const [ numericValues, setNumericValues ] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  function handleClick () {
    setFilterByNumericValues([...filterByNumericValues, numericValues]);
  }

  return (
    <>
      <h1>Filtros:</h1>
      <section>
        <h2>Nome</h2>
        <GenericFilterInput
          label="Nome do planeta"
          dataTestId="name-filter"
          set={ setName }
          htmlFor="name"
        />
      </section>
      <section>
        <h2>Numérico</h2>
        <select
          data-testid="column-filter"
          onChange={ (event) => setNumericValues({
            ...numericValues,
            column: event.target.value,
          })}
        >
          <option selected value="vazio">vazio</option>
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => setNumericValues({
            ...numericValues,
            comparison: event.target.value,
          })}
        >
          <option selected value="vazio">vazio</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label>
          <input
            data-testid="value-filter"
            type="number"
            onChange={ (event) => setNumericValues({
              ...numericValues,
              value: event.target.value,
            })}
          />
        </label>
        <button
          data-testid="button-filter"
          onClick={ () => handleClick() }
        >
          Filtrar
        </button>
      </section>
    </>
  );
};

export default Filters;
