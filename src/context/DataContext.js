import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DataContext = createContext();
const { Provider } = DataContext;

function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const context = {
    data,
    setData,
  };
  return <Provider value={ { ...context } }>{children}</Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
