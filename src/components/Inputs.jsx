import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Inputs() {
  const { changeNameToBeFiltered, filterPlanetsByName } = useContext(StarWarsContext);

  return (
    <form action="">
      <input
        type="text"
        name=""
        id=""
        data-testid="name-filter"
        onChange={ (event) => {
          changeNameToBeFiltered(event);
          filterPlanetsByName(event);
        } }
      />
    </form>
  );
}

export default Inputs;
