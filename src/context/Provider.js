import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './contextApi';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setnumericValues] = useState([]);

  const contextValue = {
    data: planets,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: numericValues,
    },
    setPlanets,
    setName,
    setnumericValues,
  };
  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf({}),
}.isRequired;

export default Provider;
