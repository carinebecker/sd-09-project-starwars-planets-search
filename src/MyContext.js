import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import requestAPI from './services';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataToChange, setDataToChange] = useState([]);
  const [keysData, setKeysData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    requestAPI()
      .then((results) => {
        setData(results.results);
        setDataToChange(results.results);
        setIsLoading(false);
        setKeysData(Object.keys(results.results[0]));
      });
  }, []);

  const serchInput = ({ target }) => {
    const { value } = target;
    setName(value);
    const num = -1;
    const nameFiltered = data
      .filter((element) => element.name.indexOf(value) !== num);
    setDataToChange(nameFiltered);

    if (value === '') setDataToChange(data);
  };

  const filters = { filtersByName: { name } };

  const context = {
    data,
    dataToChange,
    isLoading,
    keysData,
    serchInput,
    filters,
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
