import React, { createContext, useState } from 'react';
import planetsDataAPI from '../services/StarWarsAPI';

export const Context = createContext({});

export function ContextProvider({ children }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    const result = await planetsDataAPI();
    setData(result);
  };

  return (
    <ContextProvider
      value={ {
        data,
        setData,
        getData,
      } }
    >
      { children }
    </ContextProvider>
  );
}

ContextProvider.propTypes = { children: React.ReactNode }.isRequired;
