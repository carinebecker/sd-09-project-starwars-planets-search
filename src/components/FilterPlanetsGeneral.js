import React, { useContext } from 'react';
import { savePlanets } from '../context/contextPlanets';

export default function FilterPlanetsGeneral() {
  const { options, height, filterOptions, handleClick } = useContext(savePlanets);
  return (
    <div>
      <select data-testid="column-filter" onChange={ filterOptions }>
        {options.map((key) => (
          <option key={ key } value={ key }>{ key }</option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ filterOptions }>
        {height.map((key) => (
          <option key={ key } value={ key }>{key}</option>
        ))}
      </select>
      <input type="number" data-testid="value-filter" onChange={ filterOptions } />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </div>
  );
}
