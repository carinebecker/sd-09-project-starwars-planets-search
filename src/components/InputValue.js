import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const InputValue = () => {
  const { setValue, setActivateButton } = useContext(AppContext);
  return (
    <div>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="filter"
        onClick={ () => setActivateButton(false) }
      >
        x
      </button>
    </div>
  );
};

export default InputValue;
