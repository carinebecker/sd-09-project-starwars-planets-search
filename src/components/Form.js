import React, { useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const { filterTypes, handleChangeText } = useContext(StarwarsContext);
  const { filters: { filterByName: { name } } } = filterTypes;
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
      </form>
    </div>
  );
}

export default Form;
