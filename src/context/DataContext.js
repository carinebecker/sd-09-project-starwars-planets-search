import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DataContext = createContext();
const { Provider } = DataContext;

function DataProvider({ children }) {
  const [data, setData] = useState(null);

  const handleData = (newData) => {
    setData((prevState) => ({
      ...prevState,
      data: newData,
    }));
  };

  const context = {
    data,
    setData: handleData,
  };
  return <Provider value={ { ...context } }>{children}</Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
