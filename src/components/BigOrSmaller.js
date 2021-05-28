import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const BigOrSmaller = () => {
  const { setComparison, setActivateButton } = useContext(AppContext);
  return (
    <div>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => {
          setComparison(target.value);
        } }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
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

export default BigOrSmaller;
