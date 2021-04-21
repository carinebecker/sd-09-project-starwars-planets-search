import React, { useContext } from 'react';
import { Context } from '../Context';

export default function Form() {
  const { nameFilter } = useContext(Context);
  return (
    <form>
      <input data-testid="name-filter" type="text" onChange={ nameFilter } />
      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input data-testid="value-filter" type="number" />
      <button data-testid="button-filter" type="button">Filter</button>
    </form>
  );
}
