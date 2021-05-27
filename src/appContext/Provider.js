import React, { useState } from 'react';
import AppContext from './Context';

const AppProvider = ({ children }) => {
  const [data, setData] = useState();

  const contextValue = {
    data,
    setData,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;
