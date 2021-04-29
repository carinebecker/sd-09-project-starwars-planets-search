import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './contextApi';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState([]);

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
    setNumericValues,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
