import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const FilterButton = () => {
  const { setActivateButton } = useContext(AppContext);
  return (
    <button
      type="button"
      data-testid="button-filter"
      onClick={ () => setActivateButton(true) }
    >
      Filtrar
    </button>
  );
};

export default FilterButton;
