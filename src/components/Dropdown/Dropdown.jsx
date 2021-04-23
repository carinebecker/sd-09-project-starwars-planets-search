import React from 'react';
import { arrayOf, string, func } from 'prop-types';

export default function Dropdown({ options, dataTestID, onHandleChange, value, name }) {
  // const formatedFieldName = (field) => field.replace('_', ' ');

  return (
    <select
      name={ name }
      value={ value }
      onChange={ onHandleChange }
      data-testid={ dataTestID }
    >
      <option value="">Selecione uma opção</option>
      {
        options.map((field, index) => (
          <option
            value={ field }
            key={ field + index }
          >
            { field }
          </option>
        ))
      }
    </select>
  );
}

Dropdown.propTypes = {
  options: arrayOf(string),
  dataTestID: string,
  handleChange: func,
  value: string,
  name: string,
}.isRequired;
