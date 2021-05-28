import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const SelectColumn = () => {
  const { setColumn, setActivateButton } = useContext(AppContext);
  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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

export default SelectColumn;
