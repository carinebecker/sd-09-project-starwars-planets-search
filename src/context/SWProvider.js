import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const SWContext = createContext();

export default function SWProvider({ children }) {
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'Name',
        sort: 'ASC',
      },
    },
  );

  const values = { filters, setFilters };

  return (
    <SWContext.Provider value={ values }>
      { children }
    </SWContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(SWContext);
  const { filters, setFilters } = context;
  return { filters, setFilters };
}

SWProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};
