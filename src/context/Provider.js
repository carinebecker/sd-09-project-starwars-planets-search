import React, { useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './contextAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filtersValues, setFiltersValues] = useState([]);
  const contextValue = {
    data: planets,
    setPlanets,
    filters: {
      filterByName: { name },
      filterByNumericValues: filtersValues,
    },
    setName,
    setFiltersValues,
  };

  return (
    <myContext.Provider value={ contextValue }>
      { children }
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
