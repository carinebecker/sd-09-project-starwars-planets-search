import React, { useContext } from 'react';
import { DataApiContext } from '../context/DataApi';

const Filters = () => {
  const { filterInputValueByName } = useContext(DataApiContext);

  return (
    <div>
      <h3>Busca:</h3>
      <label
        htmlFor="name-filter"
      >
        Digite um nome:
        <input
          type="text"
          name="name"
          id="name-filter"
          onChange={ filterInputValueByName }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
};

export default Filters;
