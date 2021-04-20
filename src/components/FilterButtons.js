import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const FilterButtons = () => {
  const { filterByName,
    changeCustomFilter,
    filterPlanetsByNumericValue,
    customFilter,
    optionsArray,
    sendToState,
  } = useContext(StarWarsContext);

  const handleButtonClick = () => {
    sendToState();
    filterPlanetsByNumericValue(customFilter);
  };

  return (
    <div>
      <fieldset>
        <legend>Busca Por Nome</legend>
        <label htmlFor="name-filter">
          Planeta :
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            placeholder="Digite aqui o nome do planeta"
            onChange={ filterByName }
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Busca por Dados Numéricos</legend>
        <label htmlFor="column-filter">
          Coluna :
          <select
            data-testid="column-filter"
            id="column-filter"
            name="column"
            onChange={ changeCustomFilter }
          >
            {optionsArray.map((option) => (
              <option key={ option }>{ option }</option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="comparison-filter">
          Tipo de Comparação :
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            name="comparison"
            onChange={ changeCustomFilter }
          >
            <option key=">">maior que</option>
            <option key="=">igual a</option>
            <option key="<">menor que</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="coloque aqui o numero desejado"
          name="value"
          onChange={ changeCustomFilter }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonClick }
        >
          Adicionar filtro
        </button>
      </fieldset>
    </div>
  );
};

export default FilterButtons;
