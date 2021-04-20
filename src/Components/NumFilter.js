import React, { useContext, useState } from 'react';
import { Context } from '../context';

function NumFilter() {
  const { setFilters } = useContext(Context);
  const [column, setColumn] = useState('');
  const [comparission, setcomparission] = useState('');
  const [value, setvalue] = useState('');

  const options = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const ranges = ['maior que', 'menor que', 'igual a'];

  function handleSelect({ target }) {
    const select = target.value;
    setColumn(select);
  }

  function handleRange({ target }) {
    const range = target.value;
    setcomparission(range);
  }

  function handleNumber({ target }) {
    const num = target.value;
    setvalue(num);
  }

  function handleClick() {
    const filterObj = {
      column,
      comparission,
      value,
    };
    setFilters((state) => ({
      ...state,
      filterByNumericValue: [
        ...state.filterByNumericValue,
        filterObj,
      ],
    }));
  }

  return (
    <div>
      <select onChange={ handleSelect } data-testid="column-filter">
        <option>Selecione...</option>
        { options.map((opt, i) => <option key={ i }>{ opt }</option>) }
      </select>
      <select onChange={ handleRange } data-testid="comparison-filter">
        <option>range...</option>
        { ranges.map((range, i) => <option key={ i }>{ range }</option>) }
      </select>
      <input type="number" onChange={ handleNumber } data-testid="value-filter" />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </div>
  );
}

export default NumFilter;
