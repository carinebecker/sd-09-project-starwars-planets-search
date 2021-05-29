import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext, { initialState } from './Context';

const AppProvider = ({ children }) => {
  const [data, setData] = useState();
  const [name, setFilter] = useState(initialState);
  const [column, setColumn] = useState('name');
  const [comparison, setComparison] = useState(initialState);
  const [value, setValue] = useState(initialState);
  const [activateButton, setActivateButton] = useState(false);
  const [sequence, setSequence] = useState(initialState);
  const [orderBool, setOrderBool] = useState(false);
  const contextValue = {
    data,
    setData,
    name,
    setFilter,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    activateButton,
    setActivateButton,
    sequence,
    setSequence,
    orderBool,
    setOrderBool,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
