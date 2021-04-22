import React, { useState } from 'react';
import { shape } from 'prop-types';
import FiltersContext from '../../context/FiltersContext';

export default function FiltersProvider({ children }) {
  const [nameQuery, setNameQuery] = useState('');

  const value = {
    filters: {
      filterByName: nameQuery,
    },
    setters: {
      setNameQuery,
    },
  };

  return (
    <FiltersContext.Provider value={ value }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: shape(),
}.isRequired;
