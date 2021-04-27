import React, { useState } from 'react';
import context from './contextApi';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const contextValue = {
    data: planets,
    setPlanets,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

export default Provider;
