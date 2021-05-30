import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const ClearFilter = () => {
  const { setActivateButton } = useContext(AppContext);
  return (
    <div data-testid="filter">
      <button
        type="button"
        onClick={ () => setActivateButton(false) }
      >
        x
      </button>
    </div>);
};

export default ClearFilter;
