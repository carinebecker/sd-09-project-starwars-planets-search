import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const context = useContext(StarWarsContext);
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [value, setValue] = useState();

  const btnOnClick = () => {
    context.setNumFilter({
      column,
      comparison,
      value,
    });
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => btnOnClick() }
      >
        Adicionar
      </button>
    </div>
  );
}

export default Filter;
