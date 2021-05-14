import React, { useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const { filterTypes, handleChangeText } = useContext(StarwarsContext);
  const { filters: { filterByName: { name } } } = filterTypes;

  const colums = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
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
        <select name="colums" id="colums" data-testid="column-filter">
          {colums.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
      </form>
    </div>
  );
}

export default Form;
