import React from 'react';
// import StarwarsContext from '../context/StarwarsContext';

function Form() {
  return (
    <div>
      <form action="">
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            data-testid='name-filter'
            />
        </label>
      </form>
    </div>
  );
}

export default Form;
