import React, { useContext } from 'react';
import { savePlanets } from '../context/contextPlanets';

export default function FilterPlanetsGeneral() {
  const { options, height, filterOptions, handleClick } = useContext(savePlanets);
  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ filterOptions }
        className="form-control"
      >
        {options.map((key) => (
          <option key={ key } value={ key }>
            {key}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ filterOptions }
        className="form-control"
      >
        {height.map((key) => (
          <option value={ key } key={ key }>
            {key}
          </option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ filterOptions }
        className="form-control"
        placeholder="Digite um valor"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
        className="btn btn-dark"
      >
        Filtrar
      </button>
    </div>
  );
}
