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
      addNewNumericFilter(info) {
        setNumericValue([...numericValues, info]);
      },
      removeNumericFilter(column) {
        const updatedFilters = numericValues
          .filter(({ column: filterColumn }) => column !== filterColumn);
        setNumericValue(updatedFilters);
      },
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
