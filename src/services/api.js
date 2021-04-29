import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import response from '../testData';

const Context = createContext({});

function Planets({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  const contextValue = {
    data,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.element.isRequired,
};

export { Planets, Context };
