import React, { useContext } from 'react';
import context from '../context/contextApi';

function Filter() {
  const { setName } = useContext(context);
  return (
    <div>
      <input
        data-testid="name-filter"
        onChange={ (event) => setName(event.target.value) }
      />
    </div>
  );
}

export default Filter;
