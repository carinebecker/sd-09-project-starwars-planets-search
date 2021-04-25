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

  const createInput = (testid, id, type, onChange) => (
    <input data-testid={ testid } id={ id } type={ type } onChange={ onChange } />
  );

  const createDropDown = (testid, id, option, onChange) => (
    <select data-testid={ testid } id={ id } onChange={ onChange }>
      { option.map((el) => (
        <option key={ el } value={ el }>{ el }</option>))}
    </select>
  );

  const createRadioInput = (testid, name, value) => (
    <label htmlFor={ value }>
      { value }
      <input data-testid={ testid } name={ name } value={ value } type="radio" />
    </label>
  );

  const createButton = (testid, name, onClick) => (
    <button data-testid={ testid } type="button" onClick={ onClick }>
      { name }
    </button>
  );

  return (
    <form>
      { createInput('name-filter', 'name', 'text', nameFilter) }
      { createDropDown('column-filter', 'column', columns, handleChange) }
      { createDropDown('comparison-filter', 'comparison', comparisons, handleChange) }
      { createInput('value-filter', 'value', 'number', handleChange) }
      { createButton('button-filter', 'Filter', handleClick) }
      { createDropDown('column-sort', 'column-sort', columns) }
      { createRadioInput('column-sort-input-asc', 'SORT', 'ASC') }
      { createRadioInput('column-sort-input-desc', 'SORT', 'DESC') }
      { createButton('column-sort-button', 'SORT') }
    </form>
  );
}
