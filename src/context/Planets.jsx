import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const PlanetsContext = createContext();

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(
    { filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    },
  );
  const context = { data, setData, filters, setFilters };
  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

export function usePlanets() {
  const context = useContext(PlanetsContext);
  if (!context) throw new Error('usePlanets must be used within a PlanetsProvider');
  const { data, setData } = context;
  return { data, setData };
}

export function useFilters() {
  const context = useContext(PlanetsContext);
  if (!context) throw new Error('usePlanets must be used within a PlanetsProvider');
  const { filters, setFilters } = context;
  return { filters, setFilters };
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
