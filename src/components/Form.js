import React from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Form() {
  return (
   /*  <StarwarsContext.Consumer>
      {({ planets }) => (
        <ul>
          {planets.map(({ name }) => name)}
        </ul>
        
      )}
    </StarwarsContext.Consumer> */
    <h1>form</h1>
  );
}

export default Form;


{/* <form action="">
          <p>{planets[0]}</p>
          <label htmlFor="filter">
            Filtrar
            <input id="filter" type="text" data-testid='name-filter'/>
          </label>
        </form> */}