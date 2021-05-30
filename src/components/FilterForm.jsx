import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { createInput, createDropDown, createButton, COLUMNS } from './Store';

function Form() {
  const STATE = { column: 'population', comparison: 'maior que', value: 0 };
  const { nameFilter, changeFilters } = useContext(Context);
  const [state, setState] = useState(STATE);
  const [columns, setColumns] = useState(COLUMNS);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const handleFilterButton = () => {
    changeFilters(state);
    setColumns(columns.filter((el) => el !== state.column));
  };

  return (
    <section>
      <label htmlFor="name">
        SEARCH
        { createInput('name-filter', 'name', 'text', nameFilter) }
      </label>
      { createDropDown('column-filter', 'column', columns, handleChange) }
      { createDropDown('comparison-filter', 'comparison', comparisons, handleChange) }
      { createInput('value-filter', 'value', 'number', handleChange) }
      { createButton('button-filter', 'FILTER', handleFilterButton) }
    </section>
  );
}

export default Form;
