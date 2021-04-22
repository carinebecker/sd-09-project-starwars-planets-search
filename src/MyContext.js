import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import requestAPI from './services';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [keysData, setKeysData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestAPI()
      .then((results) => {
        setData(results.results);
        setIsLoading(false);
        setKeysData(Object.keys(results.results[0]));
      });
  }, []);

  const context = {
    data,
    isLoading,
    keysData,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext, MyContextProvider as Provider };
