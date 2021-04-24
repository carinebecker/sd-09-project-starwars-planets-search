import React, { useContext, useState } from 'react';
import { Context } from '../Context';

const INITIAL_STATE = { column: 'population', comparison: 'maior que', value: 0 };
const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Form() {
  const { nameFilter, changeFilters } = useContext(Context);
  const [state, setState] = useState(INITIAL_STATE);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const handleClick = () => {
    changeFilters(state);
    setColumns(columns.filter((el) => el !== state.column));
  };

  const createDropDown = (testid, id, option) => (
    <select data-testid={ testid } id={ id } onChange={ handleChange }>
      { option.map((el) => (
        <option key={ el } value={ el }>{ el }</option>))}
    </select>
  );

  const createSortInput = (testid, name) => (
    <label htmlFor={ name }>
      { name }
      <input data-testid={ testid } name="SORT" value={ name } type="radio" />
    </label>
  );

  return (
    <form>
      <input data-testid="name-filter" type="text" onChange={ nameFilter } />
      { createDropDown('column-filter', 'column', columns) }
      { createDropDown('comparison-filter', 'comparison', comparisons) }
      <input
        data-testid="value-filter"
        type="number"
        id="value"
        onChange={ handleChange }
      />
      <button data-testid="button-filter" type="button" onClick={ handleClick }>
        Filter
      </button>
      <label htmlFor="column-sort">
        SORT
        { createDropDown('column-sort', 'column-sort', columns) }
      </label>
      { createSortInput('column-sort-input-asc', 'ASC') }
      { createSortInput('column-sort-input-desc', 'DESC') }
    </form>
  );
}
