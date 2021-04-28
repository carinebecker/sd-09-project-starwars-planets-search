import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { contextValue: { filters, setFilterName } } = useContext(StarWarsContext);

  const searchName = ({ target }) => {
    const { value } = target;
    console.log(value);
    setFilterName({
      ...filters, filterByName: { name: value },
    });
  };

  /* function filter() {

  } */

  return (
    <div>
      <label htmlFor="name">
        Pesquisar por nome:
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          // value={ filters }
          onChange={ searchName }
        />
      </label>
    </div>
  );
}

export default Filters;
