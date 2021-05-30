import React, { createContext, useState } from 'react';

export const Context = createContext({});

export function ContextProvider({ children }) {
  const [data, setData] = useState([]);

  return(
    <ContextProvider value={{
      data, setData
    }}>
      { children }
    </ContextProvider>
  );
}
