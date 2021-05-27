import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const InputValue = () => {
  const { setValue } = useContext(AppContext);
  return (
    <input
      type="number"
      data-testid="value-filter"
      onChange={ ({ target }) => setValue(target.value) }
    />
  );
};

export default InputValue;
