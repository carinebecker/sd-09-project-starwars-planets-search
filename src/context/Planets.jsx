import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/Api';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
    ],
  });
  async function fetchApi() {
    const dataAPI = await getPlanets();
    setPlanets(dataAPI);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <MyContext.Provider value={ { planets, filters, fetchApi, setFilters } }>
      {children}
    </MyContext.Provider>
  );
};

MyContextProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export { MyContext, MyContextProvider as Provider };
