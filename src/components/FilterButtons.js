import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const FilterButtons = () => {
  const { filterByName } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="name-filter">
        Planeta :
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          placeholder="Digite Aqui o nome do planeta"
          onChange={ filterByName }
        />
      </label>

    </div>
  );
};

export default FilterButtons;
