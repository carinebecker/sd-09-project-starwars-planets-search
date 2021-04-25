import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { createDropDown, createRadioInput, createButton, COLUMNS } from './Store';

const STATE = { column: 'name', sort: 'ASC' };

const columns = ['name', ...COLUMNS];

function OrderForm() {
  const { changeOrder } = useContext(Context);
  const [state, setState] = useState(STATE);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleColumnSortButton = () => {
    changeOrder(state);
  };

  return (
    <section>
      { createDropDown('column-sort', 'column', columns, handleChange) }
      { createRadioInput('column-sort-input-asc', 'sort', 'ASC', handleChange) }
      { createRadioInput('column-sort-input-desc', 'sort', 'DESC', handleChange) }
      { createButton('column-sort-button', 'SORT', handleColumnSortButton) }
    </section>
  );
}

export default OrderForm;
