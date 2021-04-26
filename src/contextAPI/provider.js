import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './context';

const Provider = ({ children }) => {
  const [data, changeData] = useState([]);
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => {
        result.json()
          .then(({ results }) => {
            changeData(results);
          });
      });
  }, []);

  return (
    <AppContext.Provider value={ { data } }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
