import React, { useState } from 'react';
import { node } from 'prop-types';
import TodoContext from './TodoContext';

function TodoProvider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [ValueColumn, setValueColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const value = {
    ValueColumn,
    setValueColumn,
    data,
    setData,
    newData,
    setNewData,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
  };

  return (
    <TodoContext.Provider value={ value }>
      {children}
    </TodoContext.Provider>
  );
}

TodoProvider.propTypes = { children: node }.isRequerid;

export default TodoProvider;
