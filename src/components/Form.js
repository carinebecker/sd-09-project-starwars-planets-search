import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { namePlanets, handleNamePlanets, columnsOptions, comparisonOptions,
    preferenceFilter, handlePreferenceFilter,
    handleClickFilter } = useContext(PlanetsContext);
  return (
    <form>
      {/* Req 2 - Criação do input que vai alterar o estado no context */}
      <label htmlFor="name-filter" className="label">
        Nome:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          value={ namePlanets }
          onChange={ handleNamePlanets }
          className="input"
        />
      </label>
      {/* Req 3 - 3.1.1 - Criação do filtro de coluna */}
      <label htmlFor="column-filter" className="label">
        Filtro de coluna:
        <select
          name="columnFilter"
          id="column-filter"
          data-testid="column-filter"
          value={ preferenceFilter.columnFilter } // Req 3 - Deixo explicito que o valor é da coluna
          onChange={ handlePreferenceFilter } // Req 3 - Invoco a função que altera o valor
          className="select"
        >
          {/* Req 3 - 3.1.4 - O map preenche o dropdown de colunas */}
          {columnsOptions
            .map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>))}
        </select>
      </label>
      {/* Req 3 - 3.2 - Criação do filtro de comparação */}
      <label htmlFor="comparison-filter" className="label">
        Filtro de Comparação:
        <select
          name="comparisonFilter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ preferenceFilter.comparisonFilter } // Req 3 - Deixo explicito que o valor é da comparação
          onChange={ handlePreferenceFilter } // Req 3 - Invoco a função que altera o valor
          className="select"
        >
          {/* Req 3 - 3.2.4 - O map preenche o dropdown de comparação */}
          {comparisonOptions
            .map((column, index) => (
              <option key={ index } value={ column }>{column}</option>))}
        </select>
      </label>
      {/* Req 3 - 3.3 - Criação do filtro de valor */}
      <label htmlFor="value-filter" className="label">
        Filtro de valor:
        <input
          type="number"
          name="valueFilter"
          id="value-filter"
          data-testid="value-filter"
          value={ preferenceFilter.value } // Req 3 - Deixo explicito que é o valor
          onChange={ handlePreferenceFilter } // Req 3 - Invoco a função que altera o valor
          className="input is-small"
        />
      </label>
      {/* Req 3 - 3.4 - Criação do botão tipo submit */}
      <button type="button" data-testid="button-filter" onClick={ handleClickFilter }>
        Filtrar
      </button>
    </form>
  );
}

export default Form;
