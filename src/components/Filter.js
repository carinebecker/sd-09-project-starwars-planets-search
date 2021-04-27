import React, { useContext } from 'react';
import context from '../context/contextApi';

function Filter() {
  const { setName } = useContext(context);
  return (
    <form>
      <input
        data-testid="name-filter"
        onChange={ ({ target }) => setName(target.value) }
      />
    </form>
  );
}

export default Filter;
