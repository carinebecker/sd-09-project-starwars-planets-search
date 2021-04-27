import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

Provider.propTypes = {
  children: PropTypes.objectOf({}),
}.isRequired;

export default Provider;
