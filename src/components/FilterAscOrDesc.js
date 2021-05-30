import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const FilterAscOrDesc = () => {
  const { setColumn,
    setOrderBool,
    setSequence,
  } = useContext(AppContext);

  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        value="ASC"
        name="select"
        onChange={ ({ target }) => setSequence(target.value) }
      />
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        value="DESC"
        name="select"
        onChange={ ({ target }) => setSequence(target.value) }
      />
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => setOrderBool(true) }
      >
        Ordenar
      </button>
    </div>);
};

export default FilterAscOrDesc;
