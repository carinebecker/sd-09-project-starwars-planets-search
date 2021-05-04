import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './context';

export default function Provider({ children }) {
  const [planetList, setPlanetList] = useState(null);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const contextValue = {
    planetList,
    setPlanetList,
    filters,
    setFilters,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      { children }
    </PlanetContext.Provider>);
}

Provider.propTypes = {
  children: PropTypes,
}.isRequired;
