import React, { useContext } from 'react';
import { StarWarsContext } from '../context/index';

const Table = () => {
  const {
    allPlanets,
    loading,
    planetsWithFilter,
    handleChange,
    columnsSelect,
    selectColumn,
    handleSelectCollumn,
    selectcomparison,
    comparison,
    handleComparisonSelect,
    inputValue,
    input,
    handleButton,
  } = useContext(StarWarsContext);

  const renderTable = (planets) => (
    <table>
      <thead>
        <tr>
          <th>Nome do Planeta</th>
          <th>Período de rotação</th>
          <th>Período orbital</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água da superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          id="name-filter"
          value={ input }
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="column-filter">
        Coluna
        <select
          value={ selectColumn }
          onChange={ handleSelectCollumn }
          id="column-filter"
          data-testid="column-filter"
        >
          {columnsSelect.map((column, i) => (
            <option key={ i } value={ column }>{ column }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação
        <select
          value={ selectcomparison }
          onChange={ handleComparisonSelect }
          id="comparison-filter"
          data-testid="comparison-filter"
        >
          {comparison.map((e, i) => (
            <option key={ i } value={ e }>{ e }</option>
          ))}
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          id="value-filter"
          name="value-filter"
          value={ inputValue }
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButton }
      >
        Filtrar
      </button>
      {(loading === false && planetsWithFilter.length === 0)
        ? renderTable(allPlanets)
        : renderTable(planetsWithFilter)}
    </div>
  );
};

export default Table;
