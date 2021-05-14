import React, { useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const { filterTypes, handleChangeText } = useContext(StarwarsContext);
  const { filters: { filterByName: { name } } } = filterTypes;

  const columns = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparison = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <form action="">
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            value={ name }
            onChange={ handleChangeText }
            data-testid="name-filter"
          />
        </label>
        <select name="columns" id="columns" data-testid="column-filter">
          {columns.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <select name="comparison" id="comparison" data-testid="comparison-filter">
          {comparison.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <input
          type="number"
          value={ name }
          // onChange={ handleChangeText }
          data-testid="value-filter"
        />
        <button type="button" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default Form;
