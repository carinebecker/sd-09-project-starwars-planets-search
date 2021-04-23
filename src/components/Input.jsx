import React, { useContext } from 'react';
import Context from '../context/Context';

function Input() {
  const { searchPlanetByName } = useContext(Context);

  return (
    <div>
      Nome do Planeta
      <input
        data-testid="name-filter"
        type="text"
        onChange={ searchPlanetByName }
      />
    </div>
  );
}
export default Input;
