import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const InputValue = () => {
  const { setValue } = useContext(AppContext);
  return (
    <div>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setValue(target.value) }
      />
    </div>
  );
};

export default InputValue;
