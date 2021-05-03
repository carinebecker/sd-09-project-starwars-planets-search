import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const initialState = { column: 'population', comparison: 'maior que', value: 0 };

function SearchBar() {
  const { handleName, handleNum } = useContext(PlanetsContext);
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: { value, name } }) => (
    setValues({ ...values, [name]: value }));

  return (
    <div>
      <input
        data-testid="name-filter"
        name="name"
        type="text"
        placeholder="Filtrar por Nome"
        onChange={ handleName }
      />
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        style={ { width: 100 } }
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleNum(values) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchBar;
