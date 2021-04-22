import React, { useState } from 'react';
import { shape } from 'prop-types';
import FiltersContext from '../../context/FiltersContext';

export default function FiltersProvider({ children }) {
  const [nameQuery, setNameQuery] = useState('');
  const [numericValues, setNumericValue] = useState([]);

  const value = {
    filters: {
      filterByName: nameQuery,
      filterByNumericValues: numericValues,
    },
    setters: {
      setNameQuery,
      setNumericValue,
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
