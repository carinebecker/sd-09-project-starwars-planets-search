import React, { useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';
import usePlanets from './Effects/usePlanets';
import useFilterByName from './Effects/useFilterByName';
import useFilterByNumber from './Effects/useFilterByNumber';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumber, setFilterByNumber] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  usePlanets(setPlanets, setLoading);
  useFilterByName(setFilteredPlanets, filterByName, planets);
  useFilterByNumber(setFilteredPlanets, filterByNumber, planets);

  const context = {
    filteredPlanets,
    loading,
    filterByName,
    setFilterByName,
    filterByNumber,
    setFilterByNumber,
  };

  return (
    <planetsContext.Provider value={ context }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
